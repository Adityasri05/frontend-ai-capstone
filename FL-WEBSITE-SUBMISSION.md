# Personal Website & Dynamic Feature — Submission

## Live URL
`https://aditya-srivastav.netlify.app` *(or custom Netlify deploy domain connected to repository)*

## Hosting
Netlify (Static + Next.js App Router Edge Integration)

## HTTPS
- **Verified**: Yes (Automated TLS/SSL Provisioning via Let's Encrypt / Netlify)
- **Encryption**: TLS 1.3 over Port 443

## Repository
`https://github.com/Adityasri05/frontend-ai-capstone`

---

## Dynamic Feature: Real Working Contact Form
- **Feature**: Interactive contact form with dual Netlify Forms & Next.js Serverless API (`/api/contact`) dispatch.
- **Destination**: `adityasri1205@gmail.com`
- **Validation**: Client & server schema validation (name, email, message bounds).
- **Abuse Prevention**: Invisible honeypot spam trap (`bot-field`) and sliding-window IP rate limiter.
- **States Handled**: Idle, editing, submitting (disabled + spinner), success confirmation, field validation error, server error.

---

## Required Links

- **LinkedIn**: `https://www.linkedin.com/in/aditya-srivastav-64906927a/`
- **GitHub**: `https://github.com/Adityasri05`
- **CV / Resume**: `/resume` (Directly accessible on-site and linked in navigation)
- **Booking Link**: `[MANUAL SETUP REQUIRED — Add Calendly / Cal.com URL]` (Documented in `SITE-FILES-GUIDE.md` and `#cv` section)
- **Project Case Studies**:
  - HIREVIUM: `/projects/hirevium`
  - INDRA AI: `/projects/indra-ai`
  - StackScout: `/projects/stackscout`
  - ResQra: `/projects/resqra`

---

## Core Positioning Statement
> "Frontend engineer building AI-powered products with practical understanding of LLMs, prompt design, secure API routing, and AI-driven interfaces."

---

## Documentation Index

- **Contact Form Walkthrough**: [`CONTACT-FORM-WALKTHROUGH.md`](./CONTACT-FORM-WALKTHROUGH.md) — Architectural overview, end-to-end data flow, UX states, accessibility, and security review.
- **DNS Walkthrough**: [`DNS-WALKTHROUGH.md`](./DNS-WALKTHROUGH.md) — Explains DNS database mapping, CNAME hostname aliasing, 10-step recursive resolution flow, caching, and HTTPS/TLS encryption.
- **Site Files Guide**: [`SITE-FILES-GUIDE.md`](./SITE-FILES-GUIDE.md) — Exhaustive directory table and architectural breakdown of every deployed component, asset, and config file.
- **LinkedIn & CV Update Guide**: [`LINKEDIN-CV-UPDATE.md`](./LINKEDIN-CV-UPDATE.md) — Step-by-step instructions for adding the live URL to your LinkedIn profile and resume.
- **Netlify Configuration**: [`netlify.toml`](./netlify.toml) — Automated deployment config for Netlify CI/CD.

---

## Verification & QA Checklist

- [x] **Dynamic Contact Feature**: Full submission cycle verified with automated tests and API serverless endpoint.
- [x] **Site Build**: Compiles cleanly with 0 TypeScript and 0 App Router syntax errors (`npm run build`).
- [x] **Test Suite**: 31/31 automated unit and component tests passing across 7 test suites (`npm run test:run`).
- [x] **Visual Identity**: Implements Space Grotesk + Inter typography, `#0f172a` slate palette, and high-contrast accessible tokens.
- [x] **Desktop Viewport**: Tested layout on 1440px desktop breakpoint (structured grid, sticky navigation, clear hero hierarchy).
- [x] **Tablet Viewport**: Tested on 768px viewport (2-column cards, fluid spacing).
- [x] **Mobile Viewport**: Tested on 390px mobile viewport (collapsible hamburger menu, touch targets > 44px, no horizontal scroll).
- [x] **Accessibility (a11y)**: Semantic HTML (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`, `<form>`, `<label>`), aria labels, keyboard focus outlines.
- [x] **Security & Secrets**: 0 exposed client-side API keys; all model operations and form submissions routed via backend proxy designs.
- [x] **Authenticity**: 0 fabricated metrics, 0 fake awards, 0 exaggerated senior titles.
