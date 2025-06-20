// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { transporter, sendEmail } from "@/lib/email";

// in-memory rate-limit stores…
const ipRateLimitStore: Map<string, number[]>    = new Map();
const emailRateLimitStore: Map<string, number[]> = new Map();
const contactCooldownStore: Map<string, number>  = new Map();

// config
const RATE_LIMIT_WINDOW     = 60 * 1000;
const MAX_REQUESTS_PER_IP   = 5;
const MAX_REQUESTS_PER_EMAIL= 3;
const COOLDOWN_PERIOD       = 60 * 1000;

function checkRateLimit(key: string, store: Map<string, number[]>, max: number) {
  const now = Date.now();
  const timestamps = store.get(key) || [];
  const recent = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW);
  if (recent.length >= max) {
    store.set(key, recent);
    return true;
  }
  recent.push(now);
  store.set(key, recent);
  return false;
}

function isInCooldown(email: string) {
  const last = contactCooldownStore.get(email) || 0;
  if (Date.now() - last < COOLDOWN_PERIOD) {
    return true;
  }
  contactCooldownStore.set(email, Date.now());
  return false;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const ip = request.headers.get("x-forwarded-for")
            || request.headers.get("x-real-ip")
            || "unknown";

    const { name, email, company, message } = await request.json();

    if (!name || !email || !message) {
      return new NextResponse(
        JSON.stringify({ message: "Missing required fields (name, email, message)." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (checkRateLimit(ip, ipRateLimitStore, MAX_REQUESTS_PER_IP)) {
      return new NextResponse(
        JSON.stringify({ message: "Too many requests from this IP." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    if (checkRateLimit(email, emailRateLimitStore, MAX_REQUESTS_PER_EMAIL)) {
      return new NextResponse(
        JSON.stringify({ message: "Too many requests for this email." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    if (isInCooldown(email)) {
      return new NextResponse(
        JSON.stringify({ message: "Please wait before sending another message." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ verify your SMTP connection first
    await transporter.verify();

    // 1) Business notification
    const businessSubject = `New Contact from ${name}`;
    const businessHtml = `
      <p>You have a new contact form submission:</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Company:</strong> ${company || "(none)"}</li>
      </ul>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `;
    const businessText = `
You have a new contact form submission:

Name:    ${name}
Email:   ${email}
Company: ${company || "(none)"}

Message:
${message}
    `.trim();

    await sendEmail(
      process.env.SMTP_USER!,    // your internal address
      businessSubject,
      businessHtml,
      businessText
    );

    // 2) Confirmation to the user
    const userSubject = "Thank you for contacting us";
    const userHtml = `
      <p>Hi ${name},</p>
      <p>Thanks for your message. We’ll get back to you shortly.</p>
      <p>Best regards,<br>Convis AI Team</p>
    `;
    const userText = `
Hi ${name},

Thanks for your message. We’ll get back to you shortly.

Best regards,
The Team
    `.trim();

    // fire-and-forget
    sendEmail(email, userSubject, userHtml, userText)
      .catch(err => console.error("Confirmation email failed:", err));

    return new NextResponse(
      JSON.stringify({ message: "Your message has been sent!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    console.error("Contact API error:", err);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
