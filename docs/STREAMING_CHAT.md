# Production-Quality Streaming AI Chat for HIREVIUM (FE-06)

## 1. Architectural Overview

The HIREVIUM AI Technical Qualification Interview feature implements an end-to-end streaming architecture with strict client/server separation:

```text
+-----------------------------------------------------------------------------------+
| CANDIDATE CLIENT COMPONENT (Browser)                                              |
|                                                                                   |
|  [ src/components/ai/InterviewChat.tsx ]                                          |
|   ├── Message State (`messages: MessageItem[]`)                                   |
|   ├── Streaming Decoding (AI SDK stream + text stream deltas)                     |
|   ├── Live Thinking State (`ThinkingIndicator.tsx`)                               |
|   ├── Streaming-Safe Content Renderer (`ChatMessage.tsx`)                         |
|   ├── Scroll & Floating Jump-to-Latest Control (`JumpToLatest.tsx`)               |
|   └── Accessible Action Bar (Send / Stop Generation via `AbortController`)        |
+-----------------------------------------------------------------------------------+
                                   │  ▲
           POST /api/chat          │  │ Real Streaming Response
         (Message History)         │  │ (`ReadableStream` / `toTextStreamResponse`)
                                   ▼  │
+-----------------------------------------------------------------------------------+
| NEXT.JS ROUTE HANDLER (Server-Side)                                               |
|                                                                                   |
|  [ src/app/api/chat/route.ts ]                                                    |
|   ├── 1. Input & Payload Validation (Role enforcement, length limits)             |
|   ├── 2. Injects Server-Side System Prompt (`src/lib/ai/config.ts`)               |
|   ├── 3. Securely accesses `process.env.ANTHROPIC_API_KEY` (Never sent to client) |
|   └── 4. Calls AI SDK `streamText` with Claude Model (`claude-3-5-sonnet`)       |
|                                  │  ▲
|                                  ▼  │ Streaming Tokens
|  [ Anthropic Claude API ]                                                         |
+-----------------------------------------------------------------------------------+
```

---

## 2. Security & Secret Isolation

1. **Zero Browser Exposure**:
   - `ANTHROPIC_API_KEY` is exclusively read on the server within `src/app/api/chat/route.ts` via `process.env.ANTHROPIC_API_KEY`.
   - Never prefixed with `NEXT_PUBLIC_`.
   - No client components, bundle outputs, or browser storage mechanisms (`localStorage`, `sessionStorage`, cookies, URL params) touch the API key.
2. **Server-Side System Prompt Isolation**:
   - The system prompt (`HIREVIUM_INTERVIEWER_SYSTEM_PROMPT`) is hardcoded in `src/lib/ai/config.ts` and attached server-side.
   - Client requests attempting to submit `role: 'system'` are explicitly rejected with a `422 Unprocessable Entity` status.
3. **Payload Sanitization**:
   - Max 50 turns per conversation session.
   - Max 4000 characters per message.
   - Enforces strict message structure: only `user` and `assistant` roles are permitted from the client.

---

## 3. Streaming Mechanics & Rendering Safety

1. **Incremental Server Stream**:
   - Server utilizes Vercel AI SDK's `streamText` and returns a real `ReadableStream` response (`toTextStreamResponse()`).
   - The browser streams data chunks via `ReadableStreamDefaultReader` and `TextDecoder`, appending tokens to the active assistant message in real-time.
2. **Streaming-Safe Markdown & Code Rendering**:
   - `ChatMessage.tsx` inspects code blocks (` ``` `). If a code block is currently being streamed and unclosed, it renders with a specialized `(STREAMING...)` status container without breaking layout or throwing syntax errors.
   - Inline bold (`**`), inline code (`` ` ``), bullet lists, and paragraphs are parsed with streaming-safe regex delimiters.
3. **Flicker-Free Thinking Transition**:
   - `ThinkingIndicator.tsx` renders while waiting for initial server latency.
   - Upon receipt of the very first token (`hasReceivedFirstToken = true`), the thinking indicator smoothly transitions to the live streaming assistant bubble with zero blank frames.

---

## 4. Cancellation & Stop Behavior

1. **Client-Side Abort**:
   - Generation is bound to an `AbortController`.
   - When the user clicks the semantic `[Stop]` button, `abortControllerRef.current.abort()` terminates the active fetch request and stream reader.
2. **State Preservation**:
   - Catching `AbortError` ensures that the partial assistant message accumulated up to that exact token remains intact in `messages` state.
   - Textarea and controls are immediately re-enabled.
   - The candidate can immediately ask a follow-up or clarify their answer.

---

## 5. Auto-Scroll & Viewport UX

1. **Smart Pinned-to-Bottom Tracking**:
   - Container scroll is evaluated on scroll events: `scrollHeight - scrollTop - clientHeight < 40px`.
   - If `isAtBottom === true`, incoming tokens automatically follow down.
2. **Scroll Detachment & Non-Hijacking**:
   - If the candidate scrolls upward to inspect older messages while streaming is active, `isAtBottom` becomes `false`.
   - Token streaming continues in the background without forcing the viewport down (no scroll-jacking).
   - An accessible floating control (`JumpToLatest.tsx`) appears.
   - Clicking "Jump to latest" smoothly animates back to the bottom and re-engages the auto-scroll lock.

---

## 6. Accessibility (a11y) & Keyboard Navigation

- **ARIA Live Regions**: `aria-live="polite"` on thinking states and message lists to announce incoming content to screen readers.
- **Keyboard Shortcuts**:
  - `Enter`: Submits technical response.
  - `Shift + Enter`: Inserts newline in textarea.
- **Accessible Names & Semantics**:
  - Semantic `<article>` tags for messages with `aria-label="AI Interviewer message"` / `aria-label="Candidate message"`.
  - Accessible names on all interactive buttons (`Stop generating response`, `Send technical answer`, `Scroll to latest interview message`, `Copy message to clipboard`).
  - High-contrast visible focus rings conforming to WCAG 2.1 AA.

---

## 7. Error Handling & Edge Cases

- **Missing API Key**: Server gracefully falls back to an interactive simulated qualification interview stream, enabling full offline / local evaluation of all UI, streaming, cancellation, and multi-turn features without crashing.
- **Malformed Request**: Returns sanitized `400` / `422` JSON with clear descriptions.
- **Network / Stream Abort**: Handled gracefully without exposing internal server stack traces or API keys.
- **Stream Interruption**: Partial text remains visible in the conversation history with a non-intrusive error banner.
