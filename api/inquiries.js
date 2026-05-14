import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ detail: 'Method not allowed' });
  }

  const { name, phone, email, event_type, event_date, message } = req.body;

  // Set up the nodemailer transporter
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  
  console.log(`Attempting to send email via: ${smtpUser} (Port: 465)`);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    // 1. Store in Supabase
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && supabaseKey !== 'your_supabase_anon_key_here') {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: {
            persistSession: false,
          }
        });
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
      console.error("Email configuration is missing in environment variables");
      return res.status(500).json({ detail: "Email configuration is missing on the server. Please check Vercel settings." });
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
      message: "Thank you — we'll reach out within 24 hours." 
    });

  } catch (error) {
    console.error("Error processing inquiry:", error);
    return res.status(500).json({ 
      detail: `Failed to process inquiry: ${error.message}`, 
    });
  }
}
