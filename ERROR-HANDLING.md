# Production Error Handling & UX Resilience Matrix (`ERROR-HANDLING.md`)

This document defines how the application handles errors gracefully across client components, API proxy routes, and AI agent execution.

---

## 1. UI UX State Resilience

Every interactive component and AI feature supports 6 explicit UI states:

1. **Idle State:** Default clear view with accessible labels and starter topic prompts.
2. **Submitting State:** Form buttons disabled with visual spinner to prevent duplicate submissions.
3. **Streaming / Loading State:** Skeleton loaders or dynamic pulsing indicator indicating active computation.
4. **Success State:** Clear rendered output, Markdown formatting, and preserved source links.
5. **Error State:** Friendly, non-technical error alert with retry CTA button.
6. **Fallback / Local Mode State:** Graceful static fallback when API keys are unconfigured.

---

## 2. Failure Detection & Recovery Matrix

| Failure Scenario | Detection Mechanism | User-Facing Message | Recovery / Fallback Behavior |
| :--- | :--- | :--- | :--- |
| **Network Disconnection** | `navigator.onLine === false` or `fetch` throws `TypeError: Failed to fetch`. | `"Network connection lost. Please check your internet connection."` | Displays offline alert with `"Retry Connection"` button. |
| **AI Provider Outage (500/503)** | API route catches HTTP 500/503 from Gemini API. | `"AI service is temporarily busy. Please try again in a moment."` | Provides an exponential backoff retry button. |
| **Rate Limit Exceeded (429)** | Server rate limiter returns HTTP 429 status code. | `"Request rate limit exceeded. Please wait 60 seconds."` | Temporarily disables submit button with countdown timer. |
| **Invalid / Empty Input** | Client validation detects 0-length string or whitespace. | `"Please enter a valid query before submitting."` | Focuses input field and prevents network request dispatch. |
| **Request Timeout** | `AbortController` triggers after 10,000ms. | `"Request timed out. The server took too long to respond."` | Cancels pending request and enables retry CTA. |
| **Automated Action Interception** | Keyword check detects `"register me"` / `"submit application"`. | `⚠️ Guardrail Notice: Automated Registration Blocked` | Refuses automated submission; provides official portal URL for manual registration. |
| **Unverified Opportunity URL** | `fetch_opportunity_details` fails to find listing match. | `"External Opportunity — Unknown / Needs verification"` | Displays explicit verification flag rather than hallucinating details. |

---

## 3. Error Logging & Privacy Safeguards

- **User Privacy:** Error messages never expose internal stack traces, API keys, file paths, or raw environment variables.
- **Console Cleanliness:** Production build strips debug logging while preserving standard browser error boundaries.
