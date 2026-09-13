# Hardening Fixes

## Fix 1: Rapid Duplicate Submission Guard (Frontend Lock & Backend Idempotency)

- **Problem**: Double-clicking "Send Message" or pressing `Enter` rapidly in the contact form could initiate concurrent HTTP POST requests before React re-rendered the disabled button state.
- **Root Cause**: Asynchronous `fetch` started before component state updated `status === 'submitting'`. Additionally, the backend route had no idempotency fingerprint check.
- **Implementation**:
  1. Added a synchronous `isSubmittingRef` lock in [`ContactForm.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/components/contact/ContactForm.tsx) to immediately reject concurrent submissions on the main thread.
  2. Implemented `duplicateSubmissionCache` in [`src/app/api/contact/route.ts`](file:///d:/Hackathon/frontend-ai-capstone/src/app/api/contact/route.ts) that caches request fingerprints (`ip:email:messageHash`) with a 15-second TTL. If identical payloads arrive within 15 seconds, the route returns the cached 200 response without duplicate email dispatch or log spam.
- **Files Changed**:
  - [`src/components/contact/ContactForm.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/components/contact/ContactForm.tsx)
  - [`src/app/api/contact/route.ts`](file:///d:/Hackathon/frontend-ai-capstone/src/app/api/contact/route.ts)
- **Production Verification**: Tested rapid double-submit in Chrome DevTools Network tab. The second click was synchronously blocked on the client, and repeated curl requests returned the cached response.

---

## Fix 2: Search Indexing & Open Graph Metadata Architecture

- **Problem**: Missing robots configuration, sitemap, and social preview cards led to poor search crawler discoverability and generic link previews on social platforms.
- **Root Cause**: Next.js App Router metadata was only configured with basic `title` and `description` without Open Graph, Twitter cards, or XML sitemap generation.
- **Implementation**:
  1. Created [`src/app/robots.ts`](file:///d:/Hackathon/frontend-ai-capstone/src/app/robots.ts) using Next.js Metadata Route APIs to explicitly allow search crawlers across all public pages while protecting private API endpoints.
  2. Created [`src/app/sitemap.ts`](file:///d:/Hackathon/frontend-ai-capstone/src/app/sitemap.ts) enumerating all 7 primary public routes with priorities and update frequencies.
  3. Created [`public/og-image.svg`](file:///d:/Hackathon/frontend-ai-capstone/public/og-image.svg) (1200×630 SVG social preview card) and wired it into `openGraph` and `twitter` metadata in [`src/app/layout.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/app/layout.tsx).
- **Files Changed**:
  - [`src/app/robots.ts`](file:///d:/Hackathon/frontend-ai-capstone/src/app/robots.ts)
  - [`src/app/sitemap.ts`](file:///d:/Hackathon/frontend-ai-capstone/src/app/sitemap.ts)
  - [`public/og-image.svg`](file:///d:/Hackathon/frontend-ai-capstone/public/og-image.svg)
  - [`src/app/layout.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/app/layout.tsx)
- **Production Verification**: Verified `/robots.txt` and `/sitemap.xml` in browser. Verified `<meta property="og:image">` and `<meta name="twitter:card">` in rendered HTML.

---

## Fix 3: AI Streaming Focus Retention & Screen-Reader Live Region

- **Problem**: Canceling a streamed AI evaluation via the Stop button caused focus loss to `<body>`, and screen readers were overwhelmed or uninformed during rapid token streaming.
- **Root Cause**: The Stop button unmounted upon status change without returning focus, and streaming lacked a debounced status announcer.
- **Implementation**:
  1. Added `role="status" aria-live="polite" aria-atomic="true"` in [`InterviewChat.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/components/ai/InterviewChat.tsx) for polite status notifications at lifecycle boundaries.
  2. Styled Stop button with `focus-visible:ring-2 focus-visible:ring-destructive` and added programmatic focus restoration to `textareaRef.current?.focus()`.
- **Files Changed**:
  - [`src/components/ai/InterviewChat.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/components/ai/InterviewChat.tsx)
- **Production Verification**: Tested using NVDA and keyboard Tab/Space navigation; confirmed zero focus drops and clear status announcements.
