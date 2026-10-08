# AI Route Security Audit

## Route
`POST /api/chat`

## Request Flow
```text
Browser Client
   ↓ (HTTP POST /api/chat)
Next.js App Router API Route (src/app/api/chat/route.ts)
   ↓
IP-Based Rate Limit Check (isChatRateLimited: 10 req/min/IP)
   ↓
Schema & Payload Validation (validateChatMessages in src/lib/ai/config.ts)
   ↓
Server-Side API Key Check (process.env.ANTHROPIC_API_KEY)
   ↓ (If Present: Anthropic Claude 3.5 Sonnet API | If Absent: Local Simulated Stream)
Server-Side Tool Calling (scoreCandidate tool execution)
   ↓
Streaming Chunk Encoding (TextEncoder / streamText toTextStreamResponse)
   ↓ (HTTP 200 chunked transfer-encoding)
Client UI Renderer (src/components/ai/InterviewChat.tsx)
```

## Input Validation
- **Implementation**: Handled by `validateChatMessages()` in `src/lib/ai/config.ts`.
- **Schema Rules**:
  - Requires Array payload of messages.
  - Rejects empty arrays (`messages.length === 0`).
  - Rejects attempts to inject `system` role (`role` MUST be strictly `"user"` or `"assistant"`).
  - Sanitizes and trims whitespace from message strings.

## Rate Limiting
- **Implementation**: `isChatRateLimited(ip)` using an in-memory sliding window tracker (`chatRateLimitMap`).
- **Limit**: Maximum 10 requests per 60-second window per IP.
- **Exceeded Action**: Returns `HTTP 429 Too Many Requests` with header `Retry-After: 60`.
- **Note**: Best-effort in-memory rate limiting appropriate for single-instance serverless functions.

## Input Caps
- **Max Turn History**: 50 messages total (`messages.length <= 50`).
- **Max Message Length**: 4,000 characters per individual message (`content.length <= 4000`).
- **Max Total Payload**: ~200,000 characters total across conversation turns.

## Streaming Timeout
- **`maxDuration`**: Configured to `60` seconds (`export const maxDuration = 60`).
- **Reason**: Allows legitimate multi-turn tool execution while preventing hanging serverless functions.

## API Key Protection
- **Storage**: Kept strictly server-side in Netlify production environment variables as `ANTHROPIC_API_KEY`.
- **Client Bundles**: Zero exposure in browser JavaScript assets (verified via code audit). No `NEXT_PUBLIC_ANTHROPIC` variable exists.

## Failure Handling
- **HTTP 400 Bad Request**: Malformed JSON or invalid data structure.
- **HTTP 422 Unprocessable Entity**: Payload validation failure (oversized text or forbidden role).
- **HTTP 429 Rate Limit**: Client rate limit exceeded or upstream Anthropic rate limit.
- **HTTP 500 Internal Server Error**: Generic safe error message returned to client without leaking stack traces or credentials.
- **Client Cancellation**: `abortSignal: req.signal` passed directly to `streamText()`. Cancels upstream model generation immediately upon client abort.

## Remaining Risks & Mitigation
- **In-Memory Rate Limiting Scope**: Multi-region serverless deployments might reset in-memory maps across distinct cold instances.
- **Mitigation**: Upstream model budgets and Netlify edge limits provide secondary cost caps.
