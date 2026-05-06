import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const port = 8000;

app.use(cors({ origin: process.env.CORS_ORIGINS?.split(',') || '*' }));
app.use(express.json());

// Set up the nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/api/inquiries', async (req, res) => {
  const { name, phone, email, event_type, event_date, message } = req.body;

  try {
    const destEmail = process.env.NOTIFICATION_EMAIL;

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !destEmail) {
      console.error("Email configuration is missing in .env");
      return res.status(500).json({ detail: "Email configuration is missing." });
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: destEmail,
      subject: `New Inquiry from ${name} - ${event_type}`,
      text: `
        You have a new inquiry from your website:

        Name: ${name}
        Phone: ${phone}
        Email: ${email || 'N/A'}
        Event Type: ${event_type}
        Event Date: ${event_date || 'N/A'}
        
        Message:
        ${message || 'No message provided.'}

        Sent at: ${new Date().toISOString()}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent to ${destEmail}`);
    
    // Return success to the frontend
    res.status(200).json({ id: Date.now().toString(), name, phone, email, event_type, event_date, message });

  } catch (error) {
    console.error("Failed to send notification email:", error);
    res.status(500).json({ detail: "Failed to send email." });
  }
});

app.get('/api', (req, res) => {
  res.send('Gera Films API (Node) is running');
});

app.listen(port, () => {
  console.log(`Node.js Server is running on http://localhost:${port}`);
});
