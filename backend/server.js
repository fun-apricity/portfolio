import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 5000;

/* ═══════════════════════════════════════════════
   Middleware
   ═══════════════════════════════════════════════ */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://portfolio-nine-xi-5qpg1kbrxq.vercel.app",
    ],
  })
);

app.use(express.json({ limit: "10kb" })); // limit body size

// Rate limiter — max 5 contact submissions per IP per 15 min
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages. Please try again later." },
});

/* ═══════════════════════════════════════════════
   Nodemailer Transport
   ═══════════════════════════════════════════════ */

let transporter = null;

if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verify connection on startup
  transporter.verify((err) => {
    if (err) {
      console.error("❌ Email transport verification failed:", err.message);
      console.error("   → Contact form will log messages to console instead.");
      transporter = null;
    } else {
      console.log("✅ Email transport ready");
    }
  });
} else {
  console.warn("⚠  EMAIL_USER / EMAIL_PASS not set — emails will be logged to console only.");
}

/* ═══════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════ */

/** Basic sanitizer — strip HTML tags */
const sanitize = (str) =>
  String(str).replace(/<[^>]*>/g, "").trim();

/** Email-format check */
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/** Build a beautiful HTML email */
const buildEmailHTML = (name, email, message) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#030712; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#030712; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111827; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px 24px; background: linear-gradient(135deg, rgba(34,211,238,0.1), rgba(168,85,247,0.1));">
              <h1 style="margin:0; font-size: 24px; color: #22d3ee;">📩 New Contact Message</h1>
              <p style="margin: 8px 0 0; font-size: 13px; color: #6b7280;">from your portfolio website</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(34,211,238,0.3), rgba(168,85,247,0.3), transparent);"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 20px;">
                    <p style="margin:0 0 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #22d3ee;">Name</p>
                    <p style="margin:0; font-size: 16px; color: #e2e8f0;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 20px;">
                    <p style="margin:0 0 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #a855f7;">Email</p>
                    <a href="mailto:${email}" style="font-size: 16px; color: #22d3ee; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin:0 0 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #ec4899;">Message</p>
                    <div style="padding: 16px; background-color: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">
                      <p style="margin:0; font-size: 15px; color: #d1d5db; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: rgba(0,0,0,0.2);">
              <p style="margin:0; font-size: 12px; color: #4b5563; text-align: center;">
                Sent via Portfolio Contact Form · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

/* ═══════════════════════════════════════════════
   Routes
   ═══════════════════════════════════════════════ */

// Root — health check for deployment platforms
app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "portfolio-backend" });
});

// Health
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    email: transporter ? "configured" : "console-only",
    timestamp: new Date().toISOString(),
  });
});

// Contact form
app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    let { name, email, message } = req.body;

    // Validate
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Sanitize
    name = sanitize(name);
    email = sanitize(email);
    message = sanitize(message);

    // Length checks
    if (name.length > 100) {
      return res.status(400).json({ error: "Name is too long." });
    }
    if (email.length > 254) {
      return res.status(400).json({ error: "Email is too long." });
    }
    if (message.length > 5000) {
      return res.status(400).json({ error: "Message is too long (max 5000 chars)." });
    }

    // Format check
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    // Log to console (always)
    console.log("─".repeat(50));
    console.log("📩 New contact submission:");
    console.log(`   Name:    ${name}`);
    console.log(`   Email:   ${email}`);
    console.log(`   Message: ${message}`);
    console.log("─".repeat(50));

    // Send email (if configured)
    if (transporter) {
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        replyTo: email,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        subject: `Portfolio: New message from ${name}`,
        html: buildEmailHTML(name, email, message),
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      });
      console.log("✅ Email sent successfully");
    }

    res.json({
      success: true,
      message: "Message received! I'll get back to you soon.",
    });
  } catch (err) {
    console.error("❌ Contact form error:", err);
    res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
});

/* ═══════════════════════════════════════════════
   Start
   ═══════════════════════════════════════════════ */
app.listen(PORT, () => {
  console.log(`\nBackend running on port ${PORT}\n`);
});
