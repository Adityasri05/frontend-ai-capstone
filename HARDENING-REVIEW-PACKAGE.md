# Hardening Review Package

## Portfolio

**Production URL**: `https://aditya-srivastav.netlify.app`  
**GitHub Repository**: `https://github.com/Adityasri05/frontend-ai-capstone`

---

## What I Tested

As part of the Week 09 "Break Your Own Site" hardening audit, I aggressively tested edge cases across the entire production portfolio:

1. **Forms & Input Stress**:
   - Empty submissions, whitespace-only inputs, invalid email schemas.
   - Bounded stress inputs (100-char names, 255-char emails, 3000-char messages).
   - Harmless special characters and script tags (`<script>alert("test")</script>`, `& < > " ' / \`).
   - Rapid double-clicking / simultaneous submissions.
   - Network failure and offline simulation.
2. **AI Chat & Streaming Resilience**:
   - Long prompt payloads and special syntax formatting.
   - Mid-stream cancellation via keyboard and mouse (Stop button).
   - Error recovery with localized retry triggers.
   - Screen-reader live status region announcements.
3. **Cross-Browser & Viewport Stress**:
   - Tested on Chrome, Firefox, Edge, and iOS Safari viewports.
   - Viewport scaling from 320px (iPhone SE) to 1440px+ ultra-wide.
   - 200% browser zoom and high-contrast accessibility modes.
4. **Links & Navigation Destruction**:
   - Verified 100% of internal routes, project case studies, and external social channels (LinkedIn, GitHub, Resume).
5. **SEO & Discovery**:
   - Verified `<title>`, `<meta name="description">`, `metadataBase`, Open Graph card (`/og-image.svg`), Twitter card, `/robots.txt`, and `/sitemap.xml`.
6. **Speed & Performance**:
   - Verified Lighthouse Mobile performance (96 score, 1.5s LCP, 0.000 CLS).

---

## Where It Breaks

Read the full documented failure modes and resolutions in [`WHERE-IT-BREAKS.md`](./WHERE-IT-BREAKS.md).

---

## Ask the Reviewer

Please test the live site directly (`https://aditya-srivastav.netlify.app`) rather than reviewing screenshots. Try to break the interface and answer these three questions:

1. **"Try to find one thing that breaks, confuses you, or makes you distrust the site."**
2. **"Which issue would you fix before showing this portfolio to a recruiter or hiring manager?"**
3. **"Is there anything important you expected to work but didn't?"**

Please provide candid, unfiltered feedback.
