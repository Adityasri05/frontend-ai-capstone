# HIREVIUM AI Interaction Failure Matrix

| Failure Mode | Trigger / Condition | Expected UI Presentation | Recovery Mechanism | Tested |
| :--- | :--- | :--- | :--- | :---: |
| **Network Failure** | `navigator.onLine === false` or fetch network drop | Amber offline banner with connection alert & human-readable explanation | Click `[Retry Request]` when connection returns; preserves input & message history | **YES** |
| **Server / API Error** | HTTP 500, 502, 503 from backend / Claude API | Designed error callout with specific error reason | Single-click `[Retry]` resends failed candidate message without duplicates | **YES** |
| **Mid-Stream Failure** | Stream aborts/breaks after partial tokens delivered | Retains partial assistant text with `[Response Interrupted]` badge | Inline `[Retry from here]` replaces failed attempt and continues generation | **YES** |
| **Rate Limiting** | HTTP 429 received from AI provider | Cooldown notice: *"Service is experiencing high traffic."* | Countdown timer disables retry button briefly, preventing spam | **YES** |
| **Empty Input** | User submits blank or whitespace-only text | Send button disabled; accessible validation tooltip if Enter pressed | Keeps user on input field; zero network requests sent | **YES** |
| **No Result / Empty Response** | AI returns 0 tokens and no tool calls | Friendly empty-result box with suggested prompt pills | Single-click `[Try Again]` or choose a suggested follow-up | **YES** |
| **First-Run Onboarding** | Empty conversation state | Clean hero panel with 4 role-specific HIREVIUM starter prompts | Click any starter prompt to immediately populate and submit | **YES** |
| **Slow Response / High Latency** | Server latency > 2.5s before first token | Smooth progressive `ThinkingIndicator` with contextual phase labels | User can wait or click `[Stop]` to cancel anytime | **YES** |
| **Double-Click / State Lock** | User spam-clicks Send or Retry | Disabled buttons & debounce guards during `submitting`/`streaming` | Explicit state machine transitions prevent UI lockups | **YES** |
| **Mobile Viewport Issues** | 375px–1280px screen widths, virtual keyboards | `100dvh` layout, safe padding, zero horizontal scrollbars | Fluid flexbox with auto-scroll and floating `Jump to latest` | **YES** |
