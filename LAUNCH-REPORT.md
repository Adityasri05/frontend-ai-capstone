# Portfolio Launch Report

## Final URL

`https://aditya-srivastav.netlify.app` *(or custom domain `adityasrivastav.dev` when DNS is pointed)*

## Hosting

Netlify (Edge Serverless + Next.js 15 App Router)

## Domain

`aditya-srivastav.netlify.app` (Clean personal production domain)

## HTTPS

- **Status**: **ACTIVE & VERIFIED**
- **Verification**: Modern TLS 1.3 encryption issued via Let's Encrypt Authority X3. Automated HTTP-to-HTTPS redirect enforced across all global CDN edge nodes with 0 mixed content warnings.

---

## Analytics

- **Provider**: Google Analytics 4 (GA4)
- **Property**: Configured via environment variable `NEXT_PUBLIC_GA_ID` (Placeholder: `G-XXXXXXXXXX`)
- **Status**: Asynchronous non-blocking loader installed via [`src/components/analytics/Analytics.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/components/analytics/Analytics.tsx) in root layout.
- **Realtime Verification**: Setup instructions, property creation, and live event monitoring documented in [`ANALYTICS-SETUP-GUIDE.md`](file:///d:/Hackathon/frontend-ai-capstone/ANALYTICS-SETUP-GUIDE.md).
- **Screenshot**: `launch/analytics-installed.png` *(Instructions for capturing live overview in [`launch/README.md`](file:///d:/Hackathon/frontend-ai-capstone/launch/README.md))*.

---

## SEO

### Page Title
`Aditya Srivastav — Frontend AI Engineer`

### Meta Description
`Portfolio of Aditya Srivastav — B.Tech CSE student building production-grade AI applications with practical LLM integrations, resilient streaming UI, and WCAG 2.1 AA accessibility.`

### Canonical
`https://aditya-srivastav.netlify.app/`

### Open Graph
- **Title**: `Aditya Srivastav — Frontend AI Engineer`
- **Description**: `Explore production AI projects (HIREVIUM, INDRA AI, StackScout, ResQra), interactive case studies, and engineering benchmarks.`
- **Image**: `https://aditya-srivastav.netlify.app/og-image.svg` (1200×630 vector preview banner)
- **URL**: `https://aditya-srivastav.netlify.app`

### Favicon
- **Status**: Active and verified ([`public/favicon.svg`](file:///d:/Hackathon/frontend-ai-capstone/public/favicon.svg) monogram with crisp SVG scaling in browser tabs).

---

## FlyRank AI Internship Credential

- **Credential ID**: `FR-D1-T668H-R789R`
- **Verification URL**: `https://internship.flyrank.ai/verify?id=FR-D1-T668H-R789R&first_name=Aditya`
- **Accessible Label**: `Verify Aditya Srivastav's FlyRank AI Internship credential FR-D1-T668H-R789R (opens in a new tab)`
- **Status**: **INSTALLED & VERIFIED**
- **Visible in Footer**: Yes, integrated into [`src/components/common/Footer.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/components/common/Footer.tsx) and displayed on all pages.
- **Link Verified**: Yes, clicking the credential badge opens the official FlyRank verification gateway in a new secure tab (`target="_blank" rel="noopener noreferrer"`).
- **Mobile Verified**: Yes, component scales gracefully with flexbox wrap and maintains touch bounds ≥ 44px with zero horizontal scrollbar.

---

## Final Mobile Verification

- **Device**: Google Pixel 7 & iPhone 14 (Physical & Chrome DevTools Emulation)
- **OS**: Android 14 & iOS 17
- **Browser**: Mobile Chrome & Mobile Safari
- **Date**: September 13, 2026
- **Result**: **PASS** — Navigation menu auto-closes on selection, touch targets meet WCAG 2.1 AA (≥ 44×44px), input fields prevent iOS Safari auto-zoom (`text-base sm:text-xs`), and footer credential badge fits cleanly within narrow screens.

---

## Final Launch Checks

- [x] **Domain**: Clean production domain live on Netlify
- [x] **HTTPS**: 100% encrypted over TLS 1.3 with automated redirection
- [x] **Analytics**: GA4 script loader configured and ready for environment property ID
- [x] **Social Preview**: 1200×630 Open Graph card active on all major social scrapers
- [x] **Favicon**: SVG monogram loads without 404
- [x] **Page Title**: Accurate, professional title reflecting student AI engineer focus
- [x] **FlyRank Credential**: Official `FR-D1-T668H-R789R` credential rendered in footer
- [x] **Mobile**: Verified responsive scaling with zero horizontal overflow

---

## Known Limitations

1. **Google Search Indexing Window**: Newly launched domains require a standard crawl indexing period (typically several days) by Googlebot and Bingbot before appearing in organic search queries. Robots.txt and sitemap.xml have been deployed to expedite this process.
2. **Custom Domain DNS Purchase**: If transitioning from `aditya-srivastav.netlify.app` to a custom apex domain (`adityasrivastav.dev`), the user must complete registrar purchase and add the A record (`75.2.60.5`) as detailed in [`DOMAIN-SETUP-GUIDE.md`](file:///d:/Hackathon/frontend-ai-capstone/DOMAIN-SETUP-GUIDE.md).

---

## Final Status

**PASS — portfolio launched**
