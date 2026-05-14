import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ detail: 'Method not allowed' });
  }

  const { name, phone, email, event_type, event_date, message } = req.body;

  // Set up the nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // 1. Store in Supabase
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
      console.error("Supabase Error:", sbError);
    }

    // 2. Send Notification Email
    const destEmail = process.env.NOTIFICATION_EMAIL;

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !destEmail) {
      console.error("Email configuration is missing in environment variables");
      return res.status(500).json({ detail: "Email configuration is missing on the server." });
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: destEmail,
      subject: `New Inquiry from ${name} - ${event_type}`,
      text: `
        You have a new inquiry from your website (gerafilms.shop):

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
    
    return res.status(200).json({ 
      id: data?.[0]?.id || Date.now().toString(), 
      message: "Thank you — we'll reach out within 24 hours." 
    });

  } catch (error) {
    console.error("Error processing inquiry:", error);
    return res.status(500).json({ 
      detail: "Failed to process inquiry. Please try again or contact us via WhatsApp.", 
      error: error.message 
    });
  }
}
