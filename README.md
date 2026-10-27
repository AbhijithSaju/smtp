# SMTP Email Communication Demo

A small responsive web app demonstrating outgoing email with SMTP, Express, Node.js, and Nodemailer.

## Requirements
- Node.js 18 or newer
- SMTP account credentials. For Gmail, enable 2-Step Verification and create an App Password. Do not use your regular Gmail password.

## Setup
1. Extract the project ZIP and open a terminal in the `smtp-email-demo` folder.
2. Install packages:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env`.
   - Windows Command Prompt: `copy .env.example .env`
   - PowerShell: `Copy-Item .env.example .env`
   - macOS/Linux: `cp .env.example .env`
4. Edit `.env` and enter your SMTP username and app password. Keep `.env private; never upload it to GitHub.
5. Start the app:
   ```bash
   npm start
   ```
6. Open `http://localhost:3000` in your browser.

## Gmail settings example
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
PORT=3000
```

Port 465 uses implicit TLS (`SMTP_SECURE=true`). Alternatively, port 587 normally uses STARTTLS (`SMTP_SECURE=false`). Provider settings may vary.

## Demonstration flow
Browser form → Express `/send-email` endpoint → Nodemailer SMTP connection → outgoing mail server → recipient mail server/mailbox.

## Troubleshooting
- `SMTP is not configured`: check that `.env` exists and variable names match exactly.
- Authentication error: verify SMTP username and app password; Gmail generally requires an App Password rather than your normal password.
- Email not in inbox: check Spam/Junk and the recipient address.
- Never expose SMTP credentials in `public/app.js` or commit `.env` to source control.
