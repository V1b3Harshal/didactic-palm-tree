// lib/email.ts
import nodemailer from "nodemailer";

// 1️⃣ create the transporter once
export const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// 2️⃣ generic sendEmail helper
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text?: string
) {
  return transporter.sendMail({
    // <-- from is baked in here
    from: `"CONVIS LABS" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    text: text || html.replace(/<[^>]*>/g, ""),
  });
}

// 3️⃣ any other helpers you need (e.g. magic link)
export async function sendMagicLinkEmail(email: string, verificationUrl: string) {
  const subject = "Your Magic Link for Connect API";
  const html = `…`;    // your existing HTML string
  const text = `…`;    // your fallback text
  return sendEmail(email, subject, html, text);
}
