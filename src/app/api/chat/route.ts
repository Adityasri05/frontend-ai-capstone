import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { AI_CONFIG, validateChatMessages } from '@/lib/ai/config';
import {
  scoreCandidate,
  executeScoreCandidate,
  type ScoreCandidateInput,
} from '@/lib/ai/tools/scoreCandidate';

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

  return `Thank you for sharing those technical details. You've demonstrated a strong grasp of modern frontend engineering and AI systems integration. Whenever you're ready, you can request an assessment scorecard to review your qualification metrics!`;
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
    const lastMessage = validatedMessages[validatedMessages.length - 1];
    const rawContent = lastMessage?.content || '';
    const query = rawContent.toLowerCase();

    // =========================================================================
    // DEVELOPMENT FAILURE TEST SABOTAGE HANDLERS
    // =========================================================================

    // 1. Sabotage: HTTP 500 Internal Server Error
    if (rawContent.includes('[SIMULATE:HTTP_500]')) {
      return NextResponse.json(
        { error: 'Simulated Internal Server Error: Upstream AI model provider returned HTTP 500.' },
        { status: 500 }
      );
    }

    // 2. Sabotage: HTTP 429 Rate Limit
    if (rawContent.includes('[SIMULATE:HTTP_429]')) {
      return NextResponse.json(
        { error: 'Rate limit exceeded: The AI service is temporarily experiencing high traffic (HTTP 429).' },
        {
          status: 429,
          headers: {
            'Retry-After': '4',
          },
        }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY?.trim();

    // 1. LIVE PRODUCTION MODE: Real Claude streaming via Anthropic API with Tool Calling
    if (apiKey) {
      const anthropic = createAnthropic({
        apiKey,
      });

      const result = streamText({
        model: anthropic(AI_CONFIG.model),
        system: AI_CONFIG.systemPrompt,
        messages: validatedMessages,
        tools: {
          scoreCandidate,
        },
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
    const encoder = new TextEncoder();

    // Check if the user is requesting an assessment score or deliberately triggering a tool error test
    const isAssessmentRequest =
      query.includes('assess') ||
      query.includes('score') ||
      query.includes('evaluate') ||
      query.includes('performance') ||
      query.includes('rating') ||
      query.includes('review') ||
      query.includes('card');

    const isFailureTest =
      query.includes('error') ||
      query.includes('fail') ||
      query.includes('failure') ||
      query.includes('simulate error');

    const isMidStreamSabotage = rawContent.includes('[SIMULATE:MID_STREAM_FAIL]');
    const isEmptyResponseSabotage = rawContent.includes('[SIMULATE:EMPTY_RESPONSE]');
    const isSlowResponseSabotage = rawContent.includes('[SIMULATE:SLOW_RESPONSE]');

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // 3. Sabotage: Empty response
          if (isEmptyResponseSabotage) {
            controller.close();
            return;
          }

          // 4. Sabotage: Slow initial latency
          if (isSlowResponseSabotage) {
            await new Promise((r) => setTimeout(r, 3500));
          }

          // 5. Sabotage: Mid-stream failure
          if (isMidStreamSabotage) {
            const partialWords = [
              'Based ',
              'on ',
              'your ',
              'technical ',
              'responses ',
              'regarding ',
              'React ',
              '19 ',
              'and ',
              'Next.js ',
              '15, ',
              'your ',
              'strongest ',
              'architectural ',
              'competency ',
            ];

            for (const word of partialWords) {
              if (req.signal.aborted) break;
              controller.enqueue(encoder.encode(word));
              await new Promise((r) => setTimeout(r, 40));
            }

            // Throw stream termination error
            throw new Error('Simulated mid-stream network connection drop.');
          }

          if (isAssessmentRequest || isFailureTest) {
            const toolCallId = `call_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

            // State 1: input-streaming
            const event1 = {
              type: 'tool-call',
              toolCallId,
              toolName: 'scoreCandidate',
              state: 'input-streaming',
            };
            controller.enqueue(encoder.encode(`__TOOL_EVENT__:${JSON.stringify(event1)}\n`));
            await new Promise((r) => setTimeout(r, 450));

            // State 2: input-available
            const toolInput: ScoreCandidateInput = {
              candidateName: 'Frontend Engineer Candidate',
              targetRole: 'Senior Frontend & AI SDK Engineer',
              technicalScore: isFailureTest ? 45 : 92,
              problemSolvingScore: isFailureTest ? 50 : 88,
              communicationScore: isFailureTest ? 60 : 85,
              strengths: [
                'Deep mastery of Next.js 15 App Router & Server Components',
                'Robust streaming token decoding and error resilience',
                'Strong accessibility (WCAG 2.1 AA) and keyboard UX patterns',
              ],
              skillGaps: [
                'Production observability & distributed tracing depth',
                'Automated end-to-end multi-agent integration tests',
              ],
              recommendation: isFailureTest ? 'needs-review' : 'strong',
              summary:
                'The candidate demonstrated exceptional architectural depth across streaming AI integration, state management, and WCAG AA compliance with clear trade-off analysis.',
              forceFailure: isFailureTest,
            };

            const event2 = {
              type: 'tool-call',
              toolCallId,
              toolName: 'scoreCandidate',
              state: 'input-available',
              input: toolInput,
            };
            controller.enqueue(encoder.encode(`__TOOL_EVENT__:${JSON.stringify(event2)}\n`));
            await new Promise((r) => setTimeout(r, 600));

            // Server-side tool execution
            try {
              const result = await executeScoreCandidate(toolInput);

              // State 3: output-available
              const event3 = {
                type: 'tool-call',
                toolCallId,
                toolName: 'scoreCandidate',
                state: 'output-available',
                result,
              };
              controller.enqueue(encoder.encode(`__TOOL_EVENT__:${JSON.stringify(event3)}\n`));
            } catch (err: unknown) {
              // State 4: output-error
              const errorMsg =
                err instanceof Error
                  ? err.message
                  : 'We encountered an unexpected error while generating the score card.';
              const eventError = {
                type: 'tool-call',
                toolCallId,
                toolName: 'scoreCandidate',
                state: 'output-error',
                error: errorMsg,
              };
              controller.enqueue(encoder.encode(`__TOOL_EVENT__:${JSON.stringify(eventError)}\n`));
            }

            // Stream follow-up commentary
            const followUp = isFailureTest
              ? '\n\nI attempted to generate your Qualification Score Card, but encountered a controlled test error. Your conversational history is safe and we can retry at any time.'
              : '\n\nI have generated your structured **Candidate Qualification Score Card** above based on your technical architectural depth, streaming resilience, and accessibility responses. Feel free to ask any questions or continue the interview!';

            for (const word of followUp.split(/(\s+)/)) {
              if (req.signal.aborted) break;
              controller.enqueue(encoder.encode(word));
              await new Promise((r) => setTimeout(r, 20));
            }
          } else {
            // Standard conversational interview response
            const simulatedResponse = getSimulatedInterviewResponse(
              lastMessage?.content || '',
              validatedMessages.length
            );
            const words = simulatedResponse.split(/(\s+)/);

            for (let i = 0; i < words.length; i++) {
              if (req.signal.aborted) break;
              const chunk = words[i];
              controller.enqueue(encoder.encode(chunk));
              const delayMs = chunk.includes('\n') ? 40 : chunk.trim().length > 4 ? 25 : 12;
              await new Promise((resolve) => setTimeout(resolve, delayMs));
            }
          }

          controller.close();
        } catch (streamErr) {
          if (!req.signal.aborted) {
            controller.error(streamErr);
          }
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error: unknown) {
    console.error('Error in /api/chat route:', error);

    return NextResponse.json(
      {
        error: 'An error occurred while generating the interview response. Please check your connection and try again.',
      },
      { status: 500 }
    );
  }
}
