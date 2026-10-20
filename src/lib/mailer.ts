import "server-only";

export type MailMessage = { subject: string; text: string; html: string; replyTo?: string };

/**
 * Sends a notification email. Provider is chosen from env vars:
 *   1. RESEND_API_KEY              → Resend
 *   2. SMTP_HOST (+ SMTP_* vars)   → Nodemailer SMTP
 *   3. neither                     → logged to the server console (dev / preview)
 */
export async function sendMail(message: MailMessage): Promise<{ provider: "resend" | "smtp" | "console" }> {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "AXON ADHD Website <no-reply@axonadhd.com>";

  if (to && process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({ from, to, subject: message.subject, text: message.text, html: message.html, replyTo: message.replyTo });
    if (error) throw new Error(`Resend error: ${error.message}`);
    return { provider: "resend" };
  }

  if (to && process.env.SMTP_HOST) {
    const nodemailer = await import("nodemailer");
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    });
    await transport.sendMail({ from, to, subject: message.subject, text: message.text, html: message.html, replyTo: message.replyTo });
    return { provider: "smtp" };
  }

  console.info("[mailer] No email provider configured — logging message instead.\n", message.subject, "\n", message.text);
  return { provider: "console" };
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}
