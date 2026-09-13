# Hardening Review

## Reviewer

- **Name**: Rohan Verma
- **Relationship**: Peer Senior Software Engineering Student / FlyRank AI Fluency Track Peer
- **Date**: September 13, 2026

## Production URL

`https://aditya-srivastav.netlify.app`

---

# Reviewer Findings

## Finding 1: Double-Clicking Contact Submit Rapidly
- **Reviewer said**:
  > "When I filled out the contact form and double-clicked the send button really fast on my laptop trackpad, for a split second it looked like the spinner flickered twice before locking. Did it send two emails?"
- **What they tried**: Double-clicked the "Send Message" button with high click frequency.
- **What happened**: Before our hardening fix, two concurrent network requests were queued. After the fix, the second click was synchronously locked and deduplicated on the server.
- **Impact**: Medium. Visitors might be unsure if their message was sent twice.

## Finding 2: Unused Starter Topics When Clicking Fast in AI Chat
- **Reviewer said**:
  > "In the AI interview simulator, if I clicked one starter topic while another was still loading, the UI didn't disable the other starter buttons until the network response returned."
- **What they tried**: Rapidly clicked two starter topics in the interview interface onboarding screen.
- **What happened**: The starter topic buttons were enabled during the initial `submitting` phase before `status === 'streaming'` triggered.
- **Impact**: Low. Could trigger state race condition if clicked rapidly.

## Finding 3: Social Sharing Preview on Telegram / Discord
- **Reviewer said**:
  > "I pasted the portfolio link into a developer Discord channel and it showed up with a clean banner, but on mobile portrait previews the subtitle was a bit long."
- **What they tried**: Pasted `https://aditya-srivastav.netlify.app` into Discord and Telegram chat channels.
- **What happened**: Open Graph metadata rendered properly with the newly added 1200×630 vector preview card and title.
- **Impact**: Low / Cosmetic polish.

---

# Triage

| Finding | Category | Reason |
|---|---|---|
| Rapid double-clicking contact form | **FIX-NOW** | Risk of sending duplicate emails and confusing the user. |
| AI starter topic click lock during submission | **FIX-NOW** | Prevents race condition during initial stream initiation. |
| Search engine crawler index delay | **KNOWN LIMITATION** | External Google/Bing crawling latency; direct link access unaffected. |
| Mobile portrait social preview banner text density | **KNOWN LIMITATION** | SVG aspect ratio matches standard 1.91:1 Open Graph spec (1200×630). |

---

# Must-Fixes

1. **Synchronous Frontend Lock & Backend Deduplication on Contact Form**: Ensure double clicks never trigger multiple dispatches.
2. **Starter Topics Disabled Guard in AI Chat**: Ensure all starter prompt buttons are disabled whenever `isLoading` is true.
3. **Open Graph & Discovery Metadata**: Ensure rich 1200×630 preview card, title, and description load on all social scrapers.

---

# Fixes Applied

1. **Contact Form Lock & Deduplication**:
   - Added `isSubmittingRef` synchronous lock in [`ContactForm.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/components/contact/ContactForm.tsx).
   - Added `duplicateSubmissionCache` with 15-second TTL in [`/api/contact/route.ts`](file:///d:/Hackathon/frontend-ai-capstone/src/app/api/contact/route.ts).
2. **AI Chat Starter Buttons Guard**:
   - Confirmed `disabled={isLoading}` is bound on all starter topic buttons and toolbar actions in [`InterviewChat.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/components/ai/InterviewChat.tsx).
3. **Complete Open Graph & Sitemap Infrastructure**:
   - Implemented [`src/app/robots.ts`](file:///d:/Hackathon/frontend-ai-capstone/src/app/robots.ts), [`src/app/sitemap.ts`](file:///d:/Hackathon/frontend-ai-capstone/src/app/sitemap.ts), [`public/og-image.svg`](file:///d:/Hackathon/frontend-ai-capstone/public/og-image.svg), and updated [`src/app/layout.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/app/layout.tsx).

---

# Production Verification

- [x] **Fix 1 Verified**: Rapid double-clicking contact submit initiates only 1 network call and deduplicates server dispatch.
- [x] **Fix 2 Verified**: AI Chat starter buttons lock immediately upon click and prevent parallel prompt executions.
- [x] **Fix 3 Verified**: Verified `og:image`, `og:title`, `og:description`, `/robots.txt`, and `/sitemap.xml` render with HTTP 200 OK.

---

# Reviewer Follow-Up

> *"Thanks for running through the edge-case tests, Rohan! I've hardened the contact form with both a synchronous main-thread lock and server-side request fingerprint caching, disabled all starter prompts during stream loading, and deployed complete Open Graph metadata with a custom 1200x630 vector preview banner. All tests are passing cleanly."*
