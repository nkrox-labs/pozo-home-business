import { Router } from "express";
import { Resend } from "resend";
import { z } from "zod";

const router = Router();

const resend = process.env["RESEND_API_KEY"] ? new Resend(process.env["RESEND_API_KEY"]) : null;

const sendQuoteEmailSchema = z.object({
  to: z.string().email(),
  clientName: z.string().min(1),
  quoteNumber: z.string().min(1),
  projectDescription: z.string(),
  totalNet: z.number(),
  totalIva: z.number(),
  totalFinal: z.number(),
  validUntil: z.string(),
  type: z.enum(["quote", "missing_info"]),
  missingInfoMessage: z.string().optional(),
});

router.post("/send-quote-email", async (req, res) => {
  if (!resend) {
    return res.status(503).json({ error: "Servicio de correo no configurado." });
  }

  const parsed = sendQuoteEmailSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Datos inválidos.", details: parsed.error.issues });
  }

  const { to, clientName, quoteNumber, projectDescription, totalNet, totalIva, totalFinal, validUntil, type, missingInfoMessage } = parsed.data;

  const adminEmail = process.env["ADMIN_NOTIFICATION_EMAIL"] ?? "contacto.pozohomebusiness@gmail.com";

  try {
    if (type === "quote") {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to,
        subject: `Cotización ${quoteNumber} - Pozo Home & Business`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;">
            <div style="background:#0a0a0a;padding:24px;text-align:center;">
              <h1 style="color:#C99A3F;margin:0;font-size:1.5rem;">POZO HOME & BUSINESS</h1>
              <p style="color:#aaa;margin:4px 0 0;font-size:0.85rem;">Soluciones integrales para tu hogar y negocio</p>
            </div>
            <div style="padding:24px;border:1px solid #eee;">
              <p style="color:#333;">Estimado/a <strong>${clientName}</strong>,</p>
              <p style="color:#333;">Junto con saludar, le hacemos llegar su cotización de servicios:</p>
              <div style="background:#f9f6f0;border-left:4px solid #C99A3F;padding:16px;margin:16px 0;border-radius:4px;">
                <p style="margin:4px 0;color:#333;"><strong>N° Cotización:</strong> ${quoteNumber}</p>
                <p style="margin:4px 0;color:#333;"><strong>Descripción:</strong> ${projectDescription}</p>
                <p style="margin:4px 0;color:#333;"><strong>Validez:</strong> hasta el ${validUntil}</p>
              </div>
              <table style="width:100%;border-collapse:collapse;margin:16px 0;">
                <tr style="background:#f5f0e8;">
                  <th style="padding:10px;text-align:left;border:1px solid #ddd;color:#5a4010;">Concepto</th>
                  <th style="padding:10px;text-align:right;border:1px solid #ddd;color:#5a4010;">Monto</th>
                </tr>
                <tr>
                  <td style="padding:10px;border:1px solid #ddd;">Monto Neto</td>
                  <td style="padding:10px;border:1px solid #ddd;text-align:right;">$${totalNet.toLocaleString('es-CL')}</td>
                </tr>
                <tr style="background:#fafafa;">
                  <td style="padding:10px;border:1px solid #ddd;">IVA (19%)</td>
                  <td style="padding:10px;border:1px solid #ddd;text-align:right;">$${totalIva.toLocaleString('es-CL')}</td>
                </tr>
                <tr style="background:#f5f0e8;font-weight:bold;">
                  <td style="padding:12px;border:2px solid #C99A3F;color:#5a4010;font-size:1.1rem;">TOTAL A PAGAR</td>
                  <td style="padding:12px;border:2px solid #C99A3F;text-align:right;color:#8B6914;font-size:1.2rem;">$${totalFinal.toLocaleString('es-CL')}</td>
                </tr>
              </table>
              <p style="color:#555;font-size:0.9rem;">Para consultas comuníquese al:</p>
              <p style="color:#333;"><strong>📱 WhatsApp:</strong> +56 9 4807 2210</p>
              <p style="color:#333;"><strong>📧 Email:</strong> contacto.pozohomebusiness@gmail.com</p>
            </div>
            <div style="background:#0a0a0a;padding:16px;text-align:center;">
              <p style="color:#888;font-size:0.75rem;margin:0;">Pozo Home & Business · Paine, Región Metropolitana, Chile</p>
            </div>
          </div>
        `,
      });

      // Notify admin too
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: adminEmail,
        subject: `[Enviado] Cotización ${quoteNumber} a ${to}`,
        html: `<p>Se envió la cotización <strong>${quoteNumber}</strong> al cliente <strong>${clientName}</strong> (${to}) por un total de <strong>$${totalFinal.toLocaleString('es-CL')}</strong>.</p>`,
      });

    } else if (type === "missing_info") {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to,
        subject: `Información requerida - Cotización ${quoteNumber} - Pozo Home & Business`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;">
            <div style="background:#0a0a0a;padding:24px;text-align:center;">
              <h1 style="color:#C99A3F;margin:0;font-size:1.5rem;">POZO HOME & BUSINESS</h1>
            </div>
            <div style="padding:24px;border:1px solid #eee;">
              <p>Estimado/a <strong>${clientName}</strong>,</p>
              <p>Para continuar con su cotización <strong>${quoteNumber}</strong>, necesitamos la siguiente información adicional:</p>
              <div style="background:#fff8e1;border-left:4px solid #C99A3F;padding:16px;margin:16px 0;border-radius:4px;white-space:pre-wrap;color:#333;">
                ${missingInfoMessage}
              </div>
              <p style="color:#333;"><strong>📱 WhatsApp:</strong> +56 9 4807 2210</p>
              <p style="color:#333;"><strong>📧 Email:</strong> contacto.pozohomebusiness@gmail.com</p>
            </div>
            <div style="background:#0a0a0a;padding:16px;text-align:center;">
              <p style="color:#888;font-size:0.75rem;margin:0;">Pozo Home & Business · Paine, Región Metropolitana, Chile</p>
            </div>
          </div>
        `,
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({ error: "Error al enviar el correo." });
  }
});

export default router;