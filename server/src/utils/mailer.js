import nodemailer from 'nodemailer';
import { env } from './env.js';

let transporterPromise;

const getTransporter = async () => {
  if (transporterPromise) return transporterPromise;

  transporterPromise = (async () => {
    // Prefer real SMTP (e.g., Gmail) if env vars provided; fallback to Ethereal for dev
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    // If port is 587, force STARTTLS (secure=false)
    const smtpSecure = smtpPort === 587 ? false : String(process.env.SMTP_SECURE || 'true') === 'true';

    if (smtpHost && smtpUser && smtpPass) {
      return nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        requireTLS: smtpPort === 587,
        tls: { minVersion: 'TLSv1.2' },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
      });
    }

    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
      requireTLS: true,
      tls: { minVersion: 'TLSv1.2' },
    });
  })();

  return transporterPromise;
};

export const sendMail = async ({ to, subject, text, html }) => {
  const baseFrom = env('SMTP_FROM', 'SlotMe <no-reply@slotme.local>');
  const primary = await getTransporter();

  const mailOptions = {
    from: baseFrom,
    to,
    subject,
    text,
    html,
  };

  // First attempt
  try {
    const info = await primary.sendMail(mailOptions);
    return { messageId: info.messageId, previewUrl: nodemailer.getTestMessageUrl(info) };
  } catch (err) {
    const host = process.env.SMTP_HOST || '';
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    // If Gmail over 465 fails, try STARTTLS on 587
    const isGmail = host.includes('gmail.com') || host === 'smtp.gmail.com';
    const isTimeoutOrConn = err && (err.code === 'ETIMEDOUT' || err.code === 'ECONNECTION');

    if (isGmail && user && pass && isTimeoutOrConn) {
      const fallback = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: { user, pass },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
        pool: true,
        maxConnections: 2,
      });

      const info = await fallback.sendMail(mailOptions);
      return { messageId: info.messageId, previewUrl: nodemailer.getTestMessageUrl(info) };
    }

    throw err;
  }
};


