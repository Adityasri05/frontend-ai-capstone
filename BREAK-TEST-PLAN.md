# Break Test Plan

## Environment

- **Production URL**: `https://aditya-srivastav.netlify.app`
- **Local URL**: `http://localhost:3000`
- **Primary Browser**: Google Chrome (v128+ / Desktop Windows 11)
- **Secondary Browser**: Mozilla Firefox & Microsoft Edge
- **Mobile Device**: Google Pixel 7 (Android 14) & Apple iPhone 14 (iOS 17 Safari Viewport)
- **Desktop Device**: Windows 11 PC (1920×1080 & 1440×900 displays)

---

## Form Tests

- [x] Empty submission (Blocked client-side with accessible alert)
- [x] Whitespace-only input (Trimmed and flagged as invalid)
- [x] Invalid email (`hello`, `hello@`, `@domain.com` caught by regex)
- [x] Extremely long name (> 100 characters bounded)
- [x] Extremely long email (> 255 characters bounded)
- [x] Extremely long message (> 3000 characters bounded)
- [x] Special characters (`< > " ' & / \ \`` safely rendered as text)
- [x] HTML-like input (`<b>Bold text</b>` parsed safely as string content)
- [x] Script-like input (`<script>alert("test")</script>` safely escaped)
- [x] Copy/paste unusual text (Unicode, emojis, multiline text handled)
- [x] Submit twice quickly (Debounced via `isSubmittingRef` lock & server deduplication)
- [x] Submit repeatedly (Enforced by in-memory rate limiter + deduplication cache)
- [x] Network interruption during submission (Caught in `catch` block with user-friendly retry banner)
- [x] Refresh during submission (State resets cleanly to idle)
- [x] Back button during submission (Browser navigation unaffected)

---

## Navigation Tests

- [x] Every navigation link (`#work`, `#approach`, `#stack`, `#cv`, `#contact`)
- [x] Every CTA ("Explore Projects", "Send Message", "Contact on LinkedIn", "Download CV")
- [x] Every project link (`/projects/hirevium`, `/projects/indra-ai`, `/projects/stackscout`)
- [x] Every demo link (Interactive interview simulator `/interview`, Netlify live apps)
- [x] Every repository link (`https://github.com/Adityasri05/...`)
- [x] LinkedIn (`https://www.linkedin.com/in/aditya-srivastav-64906927a/`)
- [x] GitHub (`https://github.com/Adityasri05`)
- [x] Resume/CV (`/resume` & `/aditya_srivastav_resume.pdf`)
- [x] Footer links (Repository, direct email, back-to-top)
- [x] Browser back (Restores previous view seamlessly)
- [x] Browser forward (Maintains router history)
- [x] Direct URL access (All 18 static/dynamic routes load without 404 or hydration crash)

---

## AI Chat Tests

- [x] Empty input (Validation alert displayed; submission prevented)
- [x] Whitespace input (Trimmed; flagged as empty)
- [x] Very long prompt (> 2000 chars sent cleanly to SSE stream)
- [x] Special characters (Code blocks, JSON strings, markdown syntax preserved)
- [x] Rapid repeated submission (Disabled send button & synchronous ref lock)
- [x] Stop during streaming (Immediately triggers `AbortController.abort()`, retains partial text)
- [x] Retry after error (Local retry button re-submits exact failed query)
- [x] Network failure (Interrupted connection preserves partial response and flags banner)
- [x] Empty AI response (Empty body triggers localized retry card)
- [x] Refresh during streaming (Clean unmount with no memory leaks)
- [x] Multiple messages (Multi-turn conversational context preserved)
- [x] Mobile keyboard interaction (`text-base sm:text-xs` prevents unwanted auto-zoom)

---

## Browser Tests

- [x] Primary browser (Google Chrome Desktop)
- [x] Secondary browser (Mozilla Firefox & Microsoft Edge)
- [x] Mobile browser (Mobile Chrome & iOS Safari)
- [x] Private/incognito mode (Verified 0 localStorage dependency crashes)
- [x] Slow connection (Simulated Slow 3G; layout shell renders in <1.5s)
- [x] JavaScript enabled (Full dynamic hydration)
- [x] Browser refresh (0 hydration mismatch warnings)
- [x] Back/forward navigation (History stack intact)

---

## Visual Tests

- [x] Very narrow viewport (320px iPhone SE width — no horizontal overflow)
- [x] Wide viewport (1440px+ — max-w bounds and centered grids)
- [x] Landscape mobile (480px–640px height — sticky header remains functional)
- [x] Zoomed browser (200% zoom — text scales smoothly without overlapping)
- [x] Large text settings where available (WCAG 1.4.4 compliant)
- [x] Long content (Card text wrapping and line clamps verified)
- [x] Missing/slow images (Fallback vector SVGs load instantly)

---

## SEO

- [x] Page title ("Aditya Srivastav — Frontend AI Engineer")
- [x] Meta description (Concise summary of student background, AI systems, and projects)
- [x] Canonical URL (`https://aditya-srivastav.netlify.app/`)
- [x] Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
- [x] Twitter/social metadata (`summary_large_image`)
- [x] Favicon (`/favicon.svg` with high-contrast monogram)
- [x] robots.txt (`/robots.txt` allowing all crawlers and indexing)
- [x] sitemap (`/sitemap.xml` linking all 7 primary public routes)
- [x] Search indexing configuration (Open indexing with GoogleBot directives)

---

## Performance

- [x] Speed test (Lighthouse Mobile: 96 Performance, 100 Accessibility)
- [x] Largest assets (All SVG vector graphics <3KB total)
- [x] Image payload (Zero bloated PNG/JPEG downloads)
- [x] JavaScript payload (103 kB First Load JS shared by all routes)
- [x] LCP (1.5s on mobile slow 4G)
- [x] CLS (0.000 Zero layout shift)
- [x] INP (32ms on simulated mobile)
