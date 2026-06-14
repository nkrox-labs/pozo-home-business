import { Router } from "express";
import { db, adminsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { z } from "zod";
import { adminLoginRateLimit, requireAdmin } from "../middlewares/security";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

router.post("/login", adminLoginRateLimit, async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Credenciales inválidas." });
    return;
  }

  const { email, password } = parsed.data;

  try {
    const [admin] = await db.select().from(adminsTable).where(eq(adminsTable.email, email.toLowerCase()));

    if (!admin || !admin.isActive) {
      res.status(401).json({ error: "Credenciales incorrectas." });
      return;
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Credenciales incorrectas." });
      return;
    }

    await db.update(adminsTable).set({ lastLoginAt: new Date() }).where(eq(adminsTable.id, admin.id));

    const sess = req.session as { adminId?: number; adminEmail?: string; adminName?: string };
    sess.adminId = admin.id;
    sess.adminEmail = admin.email;
    sess.adminName = admin.name;

    res.json({ id: admin.id, email: admin.email, name: admin.name });
  } catch (err) {
    req.log.error({ err }, "Login failed");
    res.status(500).json({ error: "Error al iniciar sesión." });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

router.get("/me", requireAdmin, (req, res) => {
  const sess = req.session as { adminId?: number; adminEmail?: string; adminName?: string };
  if (!sess.adminId) {
    res.status(401).json({ error: "No autenticado." });
    return;
  }
  res.json({ id: sess.adminId, email: sess.adminEmail, name: sess.adminName });
});

export default router;
