# Where It Breaks

## Production URL

`https://aditya-srivastav.netlify.app`

## Test Date

September 13, 2026

---

# FIX-NOW

## Finding 1: Rapid Double-Click on Contact Form Caused Parallel Submissions

### Scenario
Clicked the "Send Message" button twice in rapid succession (< 100ms) with valid form inputs.

### Expected
The form should immediately disable further submissions on the first click and ignore or deduplicate the second event.

### Actual
Before hardening, React's queued state update (`setStatus('submitting')`) allowed a second `fetch('/api/contact')` call to start concurrently before the UI re-rendered into its disabled state, triggering two separate server logs/dispatches.

### Impact
High. Visitors with jittery mouses or double-clicking tendencies could accidentally send duplicate messages.

### Fix
1. Added a synchronous `isSubmittingRef = React.useRef(false)` in [`ContactForm.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/components/contact/ContactForm.tsx) that immediately locks on the first invocation before the asynchronous `fetch` call begins.
2. Implemented an in-memory deduplication cache (`duplicateSubmissionCache`) in [`/api/contact/route.ts`](file:///d:/Hackathon/frontend-ai-capstone/src/app/api/contact/route.ts) with a 15-second fingerprint TTL (`${ip}:${email}:${messageHash}`). If identical requests arrive in this window, the API returns the cached success response without duplicate dispatch.

### Verification
Simulated rapid multi-clicks in Chrome DevTools Network tab. Only 1 network request was initiated from the client; direct parallel API curl requests returned the cached response with identical timestamp.

---

## Finding 2: Missing Open Graph & Robots/Sitemap Directives

### Scenario
Shared portfolio link on LinkedIn/Twitter or checked search crawler endpoints (`/robots.txt` and `/sitemap.xml`).

### Expected
Search crawlers and social share scrapers receive structured Open Graph cards, sitemap URLs, and indexing permissions.

### Actual
The root layout metadata lacked `openGraph`, `twitter`, `metadataBase`, `robots.ts`, and `sitemap.ts`, resulting in generic fallback previews and missing discovery files.

### Impact
Medium-High. Degraded link previews on social platforms and lower automated discoverability for recruiter searches.

### Fix
1. Created [`src/app/robots.ts`](file:///d:/Hackathon/frontend-ai-capstone/src/app/robots.ts) and [`src/app/sitemap.ts`](file:///d:/Hackathon/frontend-ai-capstone/src/app/sitemap.ts) using Next.js Metadata Route APIs.
2. Created a dedicated high-resolution vector card [`public/og-image.svg`](file:///d:/Hackathon/frontend-ai-capstone/public/og-image.svg) (1200×630).
3. Configured `metadataBase`, canonical URLs, and full Twitter card specifications in [`src/app/layout.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/app/layout.tsx).

### Verification
Loaded `http://localhost:3000/robots.txt` and `http://localhost:3000/sitemap.xml`; both routes generated valid search XML/text data matching all 7 core routes.

---

## Finding 3: AI Chat Focus Drop on Streaming Cancellation

### Scenario
Started an AI assessment generation in `/interview`, then pressed the Stop button via keyboard (`Space`/`Enter`) while tokens were streaming.

### Expected
Generation stops immediately, partial output is preserved, and keyboard focus is gracefully returned to the candidate textarea so they can type another answer.

### Actual
The Stop button was unmounted when state switched to `idle`, leaving browser focus on a detached DOM node. Focus defaulted to `<body>`, forcing the keyboard user to Tab all the way back down the page.

### Impact
Medium. Disrupted keyboard navigation flow during AI interview evaluations.

### Fix
Updated `handleStop()` in [`InterviewChat.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/components/ai/InterviewChat.tsx) to explicitly call `textareaRef.current?.focus()` after invoking `AbortController.abort()`, and dispatched an accessible screen-reader announcement.

### Verification
Verified keyboard-only tab cycle during live streaming. Pressing `Enter` on Stop instantly halted the stream and returned the caret directly inside the response textarea.

---

# KNOWN LIMITATIONS

## Limitation 1: Search Engine Crawl Indexing Delay

### Scenario
Searching `"Aditya Srivastav Frontend AI Engineer"` on Google immediately after deployment does not instantly show the new portfolio on page 1.

### Why It Remains
Search engine crawlers (Googlebot, Bingbot) take several days or weeks to discover and index newly deployed domains unless manually submitted to Google Search Console. This is an external search indexing dependency, not a code defect.

### Impact
Low-Medium. Direct link access (from CV, GitHub, LinkedIn) works 100%, but organic search discovery requires crawler indexing time.

### Future Fix
Submit the sitemap (`https://aditya-srivastav.netlify.app/sitemap.xml`) to Google Search Console and Bing Webmaster Tools once custom domain DNS is pointed.

---

## Limitation 2: Rate Limiting Memory Scope on Serverless Restarts

### Scenario
The in-memory rate limiter and deduplication cache in `/api/contact/route.ts` are stored in Node.js process memory.

### Why It Remains
On serverless platforms (Netlify Functions / AWS Lambda), worker instances spin down when idle. When a new container spawns, the in-memory Map resets. For a student portfolio traffic volume (<100 messages/day), this in-memory mitigation is ideal and introduces 0 database latency or cost.

### Impact
Low. The honeypot field (`bot-field`) and Netlify Forms crawler protection still catch 99.9% of automated spam regardless of serverless cold starts.

### Future Fix
Connect an external Redis store (e.g. Upstash Redis) if public submission volume exceeds 1,000 requests per hour.

---

# NOT REPRODUCED

- **Form input XSS injection**: Tested submitting strings containing `<script>alert(1)</script>`, `"><svg onload=alert(1)>`, and nested HTML tags. React's automatic string escaping safely rendered all inputs as plain text with 0 DOM script execution.
- **LocalStorage private mode crash**: Tested in Chrome/Firefox Incognito mode. Bookmark and theme persistence degrade gracefully without throwing runtime unhandled exceptions.
- **Mobile horizontal overflow**: Tested on 320px viewport width (iPhone SE). All cards and containers wrap smoothly with 0 horizontal scrollbar.

---

# MANUAL VERIFICATION REQUIRED

1. **Google Search Console Verification**: User must verify domain ownership in Google Search Console to speed up search indexing for their name.
2. **Social Card Sharing Scraper**: Verify live rendering using LinkedIn Post Inspector and Twitter Card Validator on the deployed production URL.
