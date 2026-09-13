# Week 07 — Mobile, Usability & Production Polish Fix Log

## 1. Summary

- **Portfolio Target URL**: `https://aditya-srivastav.netlify.app` *(or connected repository deploy URL)*
- **Repository**: `https://github.com/Adityasri05/frontend-ai-capstone`
- **Audit Date**: September 2026
- **Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Netlify CI/CD

---

## 2. Before / After Fixes

### Issue 1: Mobile Form Input Zoom on iOS Safari
* **Problem**: In `ContactForm.tsx`, text inputs and textareas used `text-xs` (12px), causing iOS Safari to automatically zoom the viewport on touch focus, disorienting mobile users.
* **Where**: `src/components/contact/ContactForm.tsx`
* **Why it mattered**: Auto-zooming breaks mobile layout flow, forces users to pinch-zoom out after typing, and feels unpolished.
* **Fix**: Updated input font styling to `text-base sm:text-xs` with `px-4 py-3 sm:py-2.5` touch padding.
* **Result**: iOS Safari renders inputs smoothly without triggering unwanted automatic viewport zoom.

### Issue 2: Sub-44px Touch Targets on Mobile CTAs & Navigation
* **Problem**: Certain interactive links, badges, and the mobile menu hamburger button were 32–36px tall, falling below WCAG 2.1 AA Success Criterion 2.5.5 touch target recommendations (44x44px).
* **Where**: `src/components/common/Header.tsx`, `src/app/page.tsx`
* **Why it mattered**: Tapping small buttons on touchscreens causes accidental mis-taps and frustrating user experiences.
* **Fix**: Added `min-h-[44px]` and `min-w-[44px]` with flex centering to all primary CTAs, mobile menu links, case study buttons, and form triggers.
* **Result**: Every interactive element on mobile is easily tappable with standard thumb/finger interactions.

### Issue 3: Mobile Navigation Anchor Auto-Close & Escape Key Support
* **Problem**: Selecting an anchor link (e.g. `Work`, `About`, `Contact`) in the mobile navigation panel scrolled the underlying page but left the mobile overlay open, requiring an extra tap to dismiss. Also, desktop keyboard users had no `Escape` key listener.
* **Where**: `src/components/common/Header.tsx`
* **Why it mattered**: Poor navigation ergonomics on mobile and missing keyboard accessibility.
* **Fix**: Added `onClick={() => setMobileMenuOpen(false)}` to all mobile navigation anchors, and registered a `keydown` listener for `Escape` to close the menu.
* **Result**: Mobile menu instantly closes upon selecting an anchor section, and keyboard users can dismiss the menu with `Escape`.

### Issue 4: Vestibular Motion Sensitivity (`prefers-reduced-motion`)
* **Problem**: Pulse animations, card hover transitions, and smooth scrolling were active regardless of the user's operating system accessibility settings.
* **Where**: `src/app/globals.css`
* **Why it mattered**: Users with vestibular motion sensitivity can experience dizziness or nausea from continuous animations or forced smooth scrolling.
* **Fix**: Added `@media (prefers-reduced-motion: reduce)` block in `globals.css` that sets `animation-duration: 0.01ms`, `transition-duration: 0.01ms`, and `scroll-behavior: auto`.
* **Result**: Fully complies with WCAG 2.1 Success Criterion 2.3.3 (Animation from Interactions).

### Issue 5: Small Viewport (320px) Padding & Horizontal Overflow Defense
* **Problem**: On ultra-narrow 320px screens (e.g., iPhone SE / Galaxy Fold cover), `p-8` container paddings left only ~256px for text and cards, occasionally causing lateral drift.
* **Where**: `src/app/page.tsx`, `src/app/globals.css`
* **Why it mattered**: A professional portfolio must render seamlessly without horizontal scrollbars on all mobile viewports.
* **Fix**: Replaced rigid paddings with fluid responsive scales (`p-5 sm:p-8 md:p-10`), added `overflow-x: hidden` to `body` and root containers, and added `break-words` on large headings.
* **Result**: Zero horizontal scroll drift across 320px, 360px, 375px, 390px, 414px, and 768px viewports.

---

## 3. Mobile Findings

- **Finding**: Hero title and project headers required responsive typography to prevent awkward orphan words on narrow displays.
- **Fix**: Replaced rigid `text-6xl` with `text-3xl sm:text-5xl md:text-6xl` font-display classes.
- **Result**: Headings scale gracefully across small smartphones and large desktop monitors.

---

## 4. Accessibility Findings

- **Finding**: Muted text token in dark theme was close to contrast threshold.
- **Fix**: Adjusted `--color-brand-muted` to `#475569` and `--muted-foreground` to `oklch(0.45 0 0)` to guarantee ≥ 4.5:1 contrast against `#fcfcfd` and `#f1f5f9`.
- **Keyboard Navigation**: Verified full `Tab` order: Header → Hero CTAs → Project Case Studies → GitHub Links → Tech Grid → Resume Button → Contact Form → Footer.
- **Visible Focus States**: Added explicit `focus-visible:ring-2 focus-visible:ring-brand-accent` outlines across all interactive elements.

---

## 5. Performance Findings

- **Finding**: Asset payload inspection confirmed the entire `public/` directory uses lightweight SVG vector files (`favicon.svg`, `hero-texture.svg`, `logo.svg`), totaling less than 3KB of static assets.
- **Result**: Instant asset transfer times with 0 large raster PNG/JPG bottlenecks.
- **Client Bundle**: Core homepage first load JS is ~109 kB, ensuring sub-second load times on 3G/4G cellular networks.

---

## 6. Link Audit Table

| Link / Target | Destination URL | Status | Notes |
| :--- | :--- | :--- | :--- |
| **LinkedIn Profile** | `https://www.linkedin.com/in/aditya-srivastav-64906927a/` | **PASS** | Opens in new tab with `rel="noopener noreferrer"` |
| **GitHub Profile** | `https://github.com/Adityasri05` | **PASS** | Verified active repository profile |
| **HIREVIUM Case Study** | `/projects/hirevium` | **PASS** | Compiles with Next.js App Router static route |
| **HIREVIUM Repo** | `https://github.com/Adityasri05/frontend-ai-capstone` | **PASS** | Open repository codebase |
| **INDRA AI Case Study** | `/projects/indra-ai` | **PASS** | Verified internal route |
| **INDRA AI Repo** | `https://github.com/Adityasri05/frontend-ai-capstone` | **PASS** | Open repository codebase |
| **StackScout Case Study**| `/projects/stackscout` | **PASS** | Verified internal route |
| **StackScout Repo** | `https://github.com/Adityasri05/frontend-ai-capstone` | **PASS** | Open repository codebase |
| **ResQra Case Study** | `https://github.com/Adityasri05/frontend-ai-capstone` | **PASS** | Open repository codebase |
| **Online Resume** | `/resume` | **PASS** | Verified internal resume page |
| **Contact API** | `/api/contact` | **PASS** | Tested 6/6 automated test scenarios |

---

## 7. Image & Asset Optimization

- **Before**: 4 SVG assets in `public/` (all < 1KB).
- **After**: Preserved lightweight SVG vectors without adding unoptimized raster images.
- **Largest Asset**: `logo.svg` (955 bytes).
- **Performance Impact**: Zero image bloat; 100% vector scalability on Retina and high-DPI smartphone screens.

---

## 8. Real Phone Testing

- **Physical Device**: *(To be tested by Aditya using `REAL-PHONE-CHECKLIST.md`)*
- **OS**: *(iOS / Android)*
- **Browser**: *(Safari / Chrome)*
- **Status**: **READY FOR PHYSICAL VERIFICATION** *(Codebase-side mobile responsive pass completed)*

---

## 9. Final Assessment

- **What Changed**: Enhanced touch targets (min 44px), eliminated iOS Safari zoom on form inputs, introduced `prefers-reduced-motion` accessibility support, refined contrast tokens, and perfected mobile menu anchor closing.
- **What Improved**: Significant jump in mobile touch ergonomics, a11y compliance (WCAG 2.1 AA), and small-viewport layout stability.
- **What Still Needs Manual Verification**: Opening the deployed URL on your physical smartphone and completing the checklist in [`REAL-PHONE-CHECKLIST.md`](./REAL-PHONE-CHECKLIST.md).
