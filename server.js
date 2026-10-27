require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body || {};
  if (!to || !subject || !message || !/^\S+@\S+\.\S+$/.test(to)) {
    return res.status(400).json({ success: false, message: 'Enter a valid recipient email, subject, and message.' });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return res.status(500).json({ success: false, message: 'SMTP is not configured. Copy .env.example to .env and add your SMTP credentials.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: String(SMTP_SECURE).toLowerCase() === 'true',
      auth: { user: SMTP_USER, pass: SMTP_PASS }
    });

    const info = await transporter.sendMail({
      from: `SMTP Web Demo <${SMTP_USER}>`,
      to,
      subject: subject.trim(),
      text: message.trim()
    });
    return res.json({ success: true, message: 'Email accepted by the SMTP server.', messageId: info.messageId });
  } catch (error) {
    console.error('SMTP send error:', error.message);
    return res.status(502).json({ success: false, message: 'Email could not be sent. Check your SMTP settings and app password, then try again.' });
  }
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`SMTP Email Demo running at http://localhost:${port}`));
