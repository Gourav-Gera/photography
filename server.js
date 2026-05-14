import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

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
  console.log("Incoming Inquiry:", req.body);
  const { name, phone, email, event_type, event_date, message } = req.body;

  try {
    // 1. Store in Supabase
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && supabaseKey !== 'your_supabase_anon_key_here') {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data, error: sbError } = await supabase
          .from('inquiries')
          .insert([
            { 
              name, 
              phone, 
              email, 
              event_type, 
              event_date, 
              message,
              created_at: new Date().toISOString()
            }
          ]);

        if (sbError) {
          console.error("Supabase Error Object:", sbError);
        } else {
          console.log("Stored in Supabase successfully");
        }
      } catch (sbCatchError) {
        console.error("Supabase Exception:", sbCatchError.message);
      }
    } else {
      console.warn("Supabase credentials missing or default. Skipping DB store.");
    }

    // 2. Send Notification Email
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
    res.status(200).json({ 
      message: "Thank you — we'll reach out within 24 hours."
    });

  } catch (error) {
    console.error("Error processing inquiry:", error);
    res.status(500).json({ detail: `Failed to process inquiry: ${error.message}` });
  }
});

app.get('/api', (req, res) => {
  res.send('Gera Films API (Node) is running');
});

app.listen(port, () => {
  console.log(`Node.js Server is running on http://localhost:${port}`);
});
