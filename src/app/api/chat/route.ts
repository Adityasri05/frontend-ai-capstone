import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { AI_CONFIG, validateChatMessages } from '@/lib/ai/config';

// Force dynamic execution for API streaming route
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Generates realistic contextual interview responses for local development / testing
 * when ANTHROPIC_API_KEY is not configured.
 */
function getSimulatedInterviewResponse(lastUserMessage: string, turnCount: number): string {
  const query = lastUserMessage.toLowerCase();

  if (turnCount <= 1 || query.includes('hello') || query.includes('hi') || query.includes('start')) {
    return `Welcome to the HIREVIUM Technical Qualification Interview! I'll be assessing your frontend architecture, React 19 / Next.js 15 depth, real-time AI streaming integration, and system design patterns.\n\nTo kick off: Could you explain how you would architect a streaming AI chat interface in Next.js 15 to handle high-frequency token updates without causing excessive React re-renders or breaking incomplete Markdown syntax?`;
  }

  if (query.includes('react') || query.includes('next') || query.includes('render') || query.includes('markdown') || query.includes('state')) {
    return `That's a solid architectural perspective. Specifically regarding state management and streaming safety:\n\n1. **Streaming Stability**: How do you ensure that unclosed markdown tags (such as code blocks \`\`\` or bold syntax) don't flicker or break layout during incremental token arrival?\n2. **Auto-Scroll UX**: When a candidate scrolls up to inspect previous answers while a new response is streaming in, how do you prevent viewport hijacking while still providing an accessible "Jump to latest" control?`;
  }

  if (query.includes('scroll') || query.includes('virtual') || query.includes('ref') || query.includes('bottom') || query.includes('jump')) {
    return `Excellent breakdown. Detaching scroll-lock upon user scroll-up while maintaining an accessible floating jump control is essential for a polished user experience.\n\nNow let's discuss **Network & Cancellation Resilience**:\nWhen a user clicks "Stop Generation" mid-stream, how does the frontend coordinate with the browser's AbortController and the server route handler to immediately free server resources while preserving the partial assistant message in the conversation history?`;
  }

  if (query.includes('stop') || query.includes('abort') || query.includes('cancel') || query.includes('fetch')) {
    return `Great explanation of \`AbortController\` signal propagation and local state preservation.\n\nLet's move to **Security & Production Hardening**:\nWhy must the LLM API key strictly remain on the server, and how do you prevent malicious client payloads from overriding the interviewer's system prompt or conducting prompt injection attacks?`;
  }

  return `Thank you for sharing those technical details. You've demonstrated a strong grasp of the underlying mechanics.\n\nCould you elaborate further on how you measure and ensure **WCAG 2.1 AA Accessibility** (focus management, ARIA live announcements for streaming text, and keyboard navigation) in real-time interactive AI applications?`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid JSON request body.' },
        { status: 400 }
      );
    }

    const { messages } = body;

    // Validate incoming messages schema and roles
    const validation = validateChatMessages(messages);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error || 'Message validation failed.' },
        { status: 422 }
      );
    }

    const validatedMessages = validation.messages;
    const apiKey = process.env.ANTHROPIC_API_KEY?.trim();

    // 1. LIVE PRODUCTION MODE: Real Claude streaming via Anthropic API
    if (apiKey) {
      const anthropic = createAnthropic({
        apiKey,
      });

      const result = streamText({
        model: anthropic(AI_CONFIG.model),
        system: AI_CONFIG.systemPrompt,
        messages: validatedMessages,
        temperature: AI_CONFIG.temperature,
        maxOutputTokens: AI_CONFIG.maxOutputTokens,
        abortSignal: req.signal,
      });

      return result.toTextStreamResponse({
        headers: {
          'Cache-Control': 'no-cache, no-transform',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    }

    // 2. LOCAL SIMULATED STREAMING MODE (When ANTHROPIC_API_KEY is not configured)
    // Streams genuine tokens incrementally using AI SDK Data Stream protocol
    const lastMessage = validatedMessages[validatedMessages.length - 1];
    const simulatedResponse = getSimulatedInterviewResponse(
      lastMessage?.content || '',
      validatedMessages.length
    );

    // Split into realistic streaming word chunks
    const words = simulatedResponse.split(/(\s+)/);
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send initial metadata
          controller.enqueue(
            encoder.encode(`2:[{"systemStatus":"HIREVIUM AI Simulated Interview Stream"}]\n`)
          );

          // Stream incremental text parts in AI SDK v1 Data Stream protocol (0:"text"\n)
          for (let i = 0; i < words.length; i++) {
            if (req.signal.aborted) {
              break;
            }
            const chunk = words[i];
            const escaped = JSON.stringify(chunk);
            controller.enqueue(encoder.encode(`0:${escaped}\n`));
            
            // Subtle natural token delay between 15ms and 35ms
            const delayMs = chunk.includes('\n') ? 50 : chunk.trim().length > 4 ? 30 : 15;
            await new Promise((resolve) => setTimeout(resolve, delayMs));
          }

          // Finish stream successfully
          controller.enqueue(encoder.encode(`d:{"finishReason":"stop"}\n`));
          controller.close();
        } catch (streamErr) {
          if (!req.signal.aborted) {
            controller.error(streamErr);
          }
        }
      },
      cancel() {
        // Stream aborted by client
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Content-Type-Options': 'nosniff',
        'x-vercel-ai-data-stream': 'v1',
      },
    });
  } catch (error: unknown) {
    console.error('Error in /api/chat route:', error);

    // Return sanitized error message - never leak server internals or API credentials
    return NextResponse.json(
      {
        error: 'An error occurred while generating the interview response. Please check your connection and try again.',
      },
      { status: 500 }
    );
  }
}
