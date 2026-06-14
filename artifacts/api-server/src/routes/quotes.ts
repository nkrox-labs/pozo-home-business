import { Router } from "express";
import { db, quotesTable } from "@workspace/db";
import { eq, count, gte, sql } from "drizzle-orm";
import { z } from "zod";
import { quoteSubmitRateLimit, requireAdmin, sanitizeInput } from "../middlewares/security";

const router = Router();

const quoteInputSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  address: z.string().min(5).max(300),
  serviceType: z.string().min(1).max(100),
  description: z.string().min(10).max(2000),
  priority: z.enum(["low", "normal", "urgent"]),
  imageUrls: z.array(z.string().url()).optional(),
});

const quoteUpdateSchema = z.object({
  status: z.enum(["pending", "reviewing", "in_progress", "completed"]).optional(),
  adminNotes: z.string().max(2000).optional(),
});

function formatQuote(q: typeof quotesTable.$inferSelect) {
  return {
    id: q.id,
    name: q.name,
    email: q.email,
    phone: q.phone,
    address: q.address,
    serviceType: q.serviceType,
    description: q.description,
    priority: q.priority,
    status: q.status,
    adminNotes: q.adminNotes ?? null,
    imageUrls: q.imageUrls ?? [],
    createdAt: q.createdAt.toISOString(),
    updatedAt: q.updatedAt ? q.updatedAt.toISOString() : null,
  };
}

router.get("/stats", requireAdmin, async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 7);

    const [totalResult, statusCounts, todayResult, weekResult] = await Promise.all([
      db.select({ count: count() }).from(quotesTable),
      db.select({ status: quotesTable.status, count: count() }).from(quotesTable).groupBy(quotesTable.status),
      db.select({ count: count() }).from(quotesTable).where(gte(quotesTable.createdAt, startOfDay)),
      db.select({ count: count() }).from(quotesTable).where(gte(quotesTable.createdAt, startOfWeek)),
    ]);

    const counts: Record<string, number> = { pending: 0, reviewing: 0, in_progress: 0, completed: 0 };
    for (const row of statusCounts) {
      counts[row.status] = Number(row.count);
    }

    res.json({
      total: Number(totalResult[0]?.count ?? 0),
      pending: counts["pending"],
      reviewing: counts["reviewing"],
      in_progress: counts["in_progress"],
      completed: counts["completed"],
      todayCount: Number(todayResult[0]?.count ?? 0),
      weekCount: Number(weekResult[0]?.count ?? 0),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get stats");
    res.status(500).json({ error: "Error al obtener estadísticas." });
  }
});

router.get("/", requireAdmin, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query["page"] as string ?? "1"));
    const limit = Math.min(100, Math.max(1, parseInt(req.query["limit"] as string ?? "20")));
    const status = req.query["status"] as string | undefined;
    const offset = (page - 1) * limit;

    const where = status ? eq(quotesTable.status, status) : undefined;

    const [rows, totalResult] = await Promise.all([
      db.select().from(quotesTable)
        .where(where)
        .orderBy(sql`${quotesTable.createdAt} DESC`)
        .limit(limit)
        .offset(offset),
      db.select({ count: count() }).from(quotesTable).where(where),
    ]);

    res.json({
      quotes: rows.map(formatQuote),
      total: Number(totalResult[0]?.count ?? 0),
      page,
      limit,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to list quotes");
    res.status(500).json({ error: "Error al obtener cotizaciones." });
  }
});

router.post("/", quoteSubmitRateLimit, async (req, res) => {
  const parsed = quoteInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Datos inválidos.", details: parsed.error.message });
    return;
  }

  const data = parsed.data;

  try {
    const [created] = await db.insert(quotesTable).values({
      name: sanitizeInput(data.name),
      email: data.email.toLowerCase().trim(),
      phone: sanitizeInput(data.phone),
      address: sanitizeInput(data.address),
      serviceType: sanitizeInput(data.serviceType),
      description: sanitizeInput(data.description),
      priority: data.priority,
      imageUrls: data.imageUrls ?? [],
      status: "pending",
    }).returning();

    res.status(201).json(formatQuote(created!));
  } catch (err) {
    req.log.error({ err }, "Failed to create quote");
    res.status(500).json({ error: "Error al guardar la cotización." });
  }
});

router.get("/:id", requireAdmin, async (req, res) => {
  const id = parseInt(req.params["id"] ?? "");
  if (isNaN(id)) {
    res.status(400).json({ error: "ID inválido." });
    return;
  }

  try {
    const [quote] = await db.select().from(quotesTable).where(eq(quotesTable.id, id));
    if (!quote) {
      res.status(404).json({ error: "Cotización no encontrada." });
      return;
    }
    res.json(formatQuote(quote));
  } catch (err) {
    req.log.error({ err }, "Failed to get quote");
    res.status(500).json({ error: "Error al obtener la cotización." });
  }
});

router.patch("/:id", requireAdmin, async (req, res) => {
  const id = parseInt(req.params["id"] ?? "");
  if (isNaN(id)) {
    res.status(400).json({ error: "ID inválido." });
    return;
  }

  const parsed = quoteUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Datos inválidos.", details: parsed.error.message });
    return;
  }

  try {
    const [updated] = await db.update(quotesTable)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(quotesTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Cotización no encontrada." });
      return;
    }
    res.json(formatQuote(updated));
  } catch (err) {
    req.log.error({ err }, "Failed to update quote");
    res.status(500).json({ error: "Error al actualizar la cotización." });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  const id = parseInt(req.params["id"] ?? "");
  if (isNaN(id)) {
    res.status(400).json({ error: "ID inválido." });
    return;
  }

  try {
    await db.delete(quotesTable).where(eq(quotesTable.id, id));
    res.status(204).end();
  } catch (err) {
    req.log.error({ err }, "Failed to delete quote");
    res.status(500).json({ error: "Error al eliminar la cotización." });
  }
});

export default router;
