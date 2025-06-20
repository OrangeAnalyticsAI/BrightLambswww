import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Rate limiting setup
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 5,
};

// Input validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject is too short').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();

    // Rate limiting check
    const rateLimitData = rateLimit.get(ip) || { count: 0, lastReset: now };

    // Reset counter if window has passed
    if (now - rateLimitData.lastReset > RATE_LIMIT.WINDOW_MS) {
      rateLimitData.count = 0;
      rateLimitData.lastReset = now;
    }

    // Check if rate limit exceeded
    if (rateLimitData.count >= RATE_LIMIT.MAX_REQUESTS) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Increment request count
    rateLimitData.count++;
    rateLimit.set(ip, rateLimitData);

    // Validate request body
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // Create a test account if in development
    const isDevelopment = process.env.NODE_ENV === 'development';
    const testAccount = isDevelopment ? await nodemailer.createTestAccount() : null;

    // Validate required environment variables in production
    if (!isDevelopment && !process.env.SMTP_HOST) {
      console.error('Missing required SMTP configuration');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || testAccount?.user,
        pass: process.env.SMTP_PASS || testAccount?.pass,  // Changed from SMTP_PASSWORD to SMTP_PASS
      },
    });

    // Sanitize inputs to prevent XSS
    const sanitize = (str: string) => str.replace(/[<>]/g, '');

    // Email options
    const mailOptions = {
      from: `"BrightLambs Contact Form" <${process.env.SMTP_FROM || 'noreply@brightlambs.co.uk'}>`,
      replyTo: `"${sanitize(name)}" <${sanitize(email)}>`,
      to: process.env.CONTACT_EMAIL || 'info@brightlambs.co.uk',
      subject: `New Contact: ${sanitize(subject)}`,
      text: `
You've received a new message from the Bright Lambs website contact form.

Name: ${sanitize(name)}
Email: ${sanitize(email)}
Subject: ${sanitize(subject)}

Message:
${sanitize(message)}

---
This email was sent from the contact form on BrightLambs website.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">New Contact Form Submission</h2>
          <p>You've received a new message from the Bright Lambs website contact form.</p>
          
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #4f46e5; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-line;">${message}</p>
            </div>
          </div>
          
          <p style="font-size: 0.9em; color: #666; margin-top: 20px; border-top: 1px solid #eee; padding-top: 15px;">
            This email was sent from the contact form on BrightLambs website.
          </p>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // Log the preview URL in development
    if (isDevelopment) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        console.log('Preview URL:', previewUrl);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully!',
        previewUrl: isDevelopment ? nodemailer.getTestMessageUrl(info) : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log detailed error in server logs but don't expose details to client
    console.error('Error processing contact form:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process your message. Please try again later.',
      },
      { status: 500 }
    );
  }
}
