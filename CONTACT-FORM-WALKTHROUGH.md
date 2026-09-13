# Dynamic Feature Architecture: Real Working Contact Form

A complete technical specification and walkthrough for the contact form feature added to Aditya Srivastav's portfolio.

---

## 1. Feature Decision & Architecture

| Metric | Decision |
| :--- | :--- |
| **Primary Feature** | Real Contact Form for visitor / hiring manager outreach |
| **Current Stack** | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS |
| **Current Hosting** | Netlify (`netlify.toml` with `@netlify/plugin-nextjs`) |
| **Best Approach** | Dual-tier hybrid: Netlify Forms static crawler registration + Next.js serverless route (`/api/contact`) |
| **Why This Approach** | Provides automatic form capture in Netlify's Forms dashboard with automated email notifications, while allowing instant local and cross-platform serverless API validation without third-party SaaS vendor dependencies. |
| **Destination Email** | `adityasri1205@gmail.com` *(configurable via `CONTACT_EMAIL` environment variable)* |

---

## 2. End-to-End Data Flow

```text
Visitor / Hiring Manager
          │
          ▼
Interactive Contact Form (React 19 Client Component)
          │
          ▼
Client-Side Validation (Name ≥ 2, Regex Email, Message ≥ 10)
          │ (If Invalid: Inline Field Error Banners)
          │ (If Valid: Button disabled, 'submitting' spinner)
          ▼
HTTP POST /api/contact (JSON Payload + Honeypot Check)
          │
          ├──> 1. Rate Limiter (Max 5 requests/min per IP)
          ├──> 2. Honeypot Filter (Silently drops spam bots if 'bot-field' is populated)
          ├──> 3. Server-Side Schema Validation (Length, regex, string trimming)
          ├──> 4. Audit Logger (Captures sender details & destination payload)
          └──> 5. Optional Webhook Forwarder (CONTACT_WEBHOOK_URL)
          │
          ▼
Server Returns HTTP 200 { success: true, message: "..." }
          │
          ▼
React Component Transitions to Success Banner
          │
          ▼
Visitor Receives Visual Delivery Confirmation
```

---

## 3. Form UX States

The form implements 6 distinct states with clear visual and screen-reader feedback:

1. **Idle State**:
   - Clean, high-contrast dark card (`bg-brand-card/70`) with subtle border highlights.
   - Distinct required badges (`*`) with hidden screen-reader text `(required)`.
   - Accessible placeholder examples.
2. **Editing State**:
   - Live controlled inputs (`useState`).
   - Automatically clears field-specific error messages as soon as the user starts typing.
3. **Submitting State**:
   - Submit button is disabled (`disabled={status === 'submitting'}`).
   - Sets `aria-busy="true"`.
   - Renders an animated SVG loading spinner with label *"Sending Message..."*.
   - Prevents duplicate or accidental double-submissions.
4. **Success State**:
   - Replaces the form fields with an accessible emerald confirmation banner (`role="status"`, `aria-live="polite"`).
   - Shows: *"Message sent successfully. Thanks for reaching out. I typically respond within 24–48 hours."*
   - Provides a *"Send Another Message"* reset button.
5. **Validation Error State**:
   - Field-level red error indicators with `aria-invalid="true"` and `aria-describedby="[field]-error"`.
   - Identifies specific issues: empty fields, invalid email format, or message < 10 characters.
6. **Server / Network Error State**:
   - Renders a top-level alert (`role="alert"`, `aria-live="assertive"`) explaining that a network or server issue occurred and invites the user to connect directly via LinkedIn.

---

## 4. Accessibility & Security

### Accessibility Features (WCAG 2.1 AA):
- Explicit `<label htmlFor="contact-name">` elements mapped to matching input IDs.
- Required fields indicated visually and programmatically via `aria-required="true"`.
- `aria-describedby` links inputs directly to dynamic error message IDs for screen readers.
- Visible focus rings with high-contrast accent outlines (`focus:ring-2 focus:ring-brand-accent`).
- Color is never used as the sole indicator of error states.

### Security Review:
- **Zero Exposed Secrets**: No private API keys or client tokens are bundled in JavaScript.
- **Honeypot Trap**: Invisible `bot-field` input (hidden with `aria-hidden="true"` and `tabIndex={-1}`). Spam bots that automatically fill all form inputs trigger silent rejection.
- **Strict Server Validation**: Sanitizes and enforces bounds (Name: 2–100 chars, Email: regex match & ≤ 255 chars, Message: 10–3000 chars).
- **IP Rate Limiting**: Built-in sliding-window limiter prevents automated form flooding (5 requests / minute / IP).

---

## 5. Automated Test Verification

All interaction paths and validation states are automated in [`tests/components/contact-form.test.tsx`](file:///d:/Hackathon/frontend-ai-capstone/tests/components/contact-form.test.tsx):

```text
✓ ContactForm Dynamic Component (6 tests passed)
  ✓ renders all required form inputs and accessible labels in idle state (380ms)
  ✓ shows client-side validation errors when submitting empty form
  ✓ validates invalid email formats correctly
  ✓ validates minimum message length (< 10 chars)
  ✓ submits valid data, enters submitting state, and renders success message on API success
  ✓ renders accessible error message when server responds with an error
```
*(Total suite: 31/31 unit and component tests passing across 7 test files)*
