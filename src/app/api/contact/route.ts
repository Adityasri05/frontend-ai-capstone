import { NextResponse } from 'next/server';

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  'bot-field'?: string;
  honeypot?: string;
}

// Simple in-memory rate limiting tracker for basic abuse mitigation
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - record.lastReset > RATE_LIMIT_WINDOW_MS) {
    record.count = 1;
    record.lastReset = now;
    rateLimitMap.set(ip, record);
    return false;
  }

  record.count += 1;
  rateLimitMap.set(ip, record);
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting Check
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'localhost';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a minute before sending another message.' },
        { status: 429 }
      );
    }

    // 2. Parse Payload (supports JSON or URL-encoded form data)
    let body: Partial<ContactPayload> = {};
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      body = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      body = {
        name: formData.get('name')?.toString() || '',
        email: formData.get('email')?.toString() || '',
        subject: formData.get('subject')?.toString() || '',
        message: formData.get('message')?.toString() || '',
        'bot-field': formData.get('bot-field')?.toString() || '',
        honeypot: formData.get('honeypot')?.toString() || '',
      };
    } else {
      return NextResponse.json(
        { success: false, error: 'Unsupported Content-Type header.' },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;
    const botField = body['bot-field'] || body.honeypot;

    // 3. Honeypot Spam Protection Check
    if (botField && botField.trim().length > 0) {
      // Silently accept without processing to fool automated scrapers
      return NextResponse.json(
        { success: true, message: 'Message sent successfully. Thanks for reaching out.' },
        { status: 200 }
      );
    }

    // 4. Server-Side Input Validation
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    const trimmedSubject = typeof subject === 'string' ? subject.trim() : 'Portfolio Contact Submission';
    const trimmedMessage = typeof message === 'string' ? message.trim() : '';

    if (!trimmedName || trimmedName.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please provide your name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    if (trimmedName.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Name must be 100 characters or fewer.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (trimmedEmail.length > 255) {
      return NextResponse.json(
        { success: false, error: 'Email address is too long.' },
        { status: 400 }
      );
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters long.' },
        { status: 400 }
      );
    }

    if (trimmedMessage.length > 3000) {
      return NextResponse.json(
        { success: false, error: 'Message must be 3000 characters or fewer.' },
        { status: 400 }
      );
    }

    // 5. Destination Dispatch & Audit Logging
    const destinationEmail = process.env.CONTACT_EMAIL || 'adityasri1205@gmail.com';
    const timestamp = new Date().toISOString();

    const submissionPayload = {
      destination: destinationEmail,
      timestamp,
      sender: {
        name: trimmedName,
        email: trimmedEmail,
      },
      subject: trimmedSubject,
      message: trimmedMessage,
      ip: ip !== 'localhost' ? `${ip.substring(0, 6)}***` : 'localhost',
    };

    console.log('[Portfolio Contact Submission Received]:', JSON.stringify(submissionPayload, null, 2));

    // Optional webhook / external provider forwarder if webhook URL is provided in env
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionPayload),
        });
      } catch (webhookErr) {
        console.warn('[Contact Webhook Warning]: Failed to trigger optional webhook', webhookErr);
      }
    }

    // 6. Return Clean Success Response
    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully. Thanks for reaching out.',
        receivedAt: timestamp,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact API Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again or reach out on LinkedIn.' },
      { status: 500 }
    );
  }
}
