# Site Files Architecture Guide

A complete reference guide explaining every deployed file and configuration in this repository, its architectural purpose, and how it impacts build time, runtime, and styling.

---

## 1. Project Directory Table

| File / Path | Purpose | Why It Exists | Impact Layer |
| :--- | :--- | :--- | :--- |
| `src/app/page.tsx` | Main Portfolio Homepage | Renders the primary single-page portfolio layout including Hero, Selected Work (HIREVIUM, INDRA AI, StackScout, ResQra), Approach, Tech Stack, Resume, and Contact Form with mobile-first responsive scaling. | **Runtime & Build** (Next.js App Router Page) |
| `src/components/contact/ContactForm.tsx` | Dynamic Contact Form Component | Interactive client component managing form states, honeypot anti-spam, iOS zoom prevention (`text-base sm:text-xs`), and WCAG touch targets (≥ 44px). | **Runtime & Client Interaction** (`'use client'`) |
| `src/app/api/contact/route.ts` | Contact Submission Serverless Route | Validates payload, checks honeypot field, enforces IP rate limits, and forwards message dispatch to `adityasri1205@gmail.com`. | **Serverless API Runtime** (HTTP POST Handler) |
| `public/__forms.html` | Netlify Build Crawler Discovery | Static HTML form definition for Netlify's crawler to register the form in Netlify Forms dashboard. | **Deployment & Form Automation** |
| `src/app/layout.tsx` | Root Layout Shell | Defines HTML `<html>` and `<body>` wrappers, font variables (`Space Grotesk`, `Inter`, `Geist`), global `<Header />`, and `<Footer />`. | **Runtime & Build** (Layout Wrapper) |
| `src/app/globals.css` | Global CSS & Design System Tokens | Declares color variables, contrast tokens, `@media (prefers-reduced-motion: reduce)`, and smooth scroll behaviors. | **Styling** (Tailwind CSS & Custom Properties) |
| `src/app/projects/page.tsx` | All Projects Index Page | Displays the complete catalog of projects, filtering tabs, and status badges for deep-dive exploration. | **Runtime & Build** (Route Page) |
| `src/app/projects/[slug]/page.tsx` | Dynamic Case Study Route | Renders individual case study breakdowns with technical problem definitions, contribution details, and reflection notes. | **Runtime & Build** (Dynamic Route) |
| `src/app/resume/page.tsx` | Online Resume & CV Page | Presents structured academic background, technical skills matrix, project highlights, and verified links. | **Runtime & Build** (Route Page) |
| `src/components/common/Header.tsx` | Sticky Navigation Header | Responsive navigation with WCAG touch targets (≥ 44px), mobile auto-close on anchor selection, and `Escape` key support. | **Runtime & Client Interaction** (`'use client'`) |
| `src/features/auth/AuthContext.tsx` | Client Auth State Provider | Manages local session state and mock credentials without introducing external database latency. | **Runtime** (React Context Provider) |
| `src/features/favourites/FavoritesContext.tsx` | Project Bookmarking Provider | Provides reactive state for saving and filtering portfolio items in local storage. | **Runtime** (React Context Provider) |
| `public/favicon.svg` | Browser Favicon | Clean, high-contrast SVG favicon featuring the "AS" monogram logo for browser tabs. | **Static Asset** (Asset Delivery) |
| `public/hero-texture.svg` | Subtle Background Texture | Lightweight decorative SVG grid pattern enhancing the hero section visuals without heavy image bandwidth. | **Styling & Asset** (Visual Texture) |
| `package.json` | Project Manifest & Scripts | Declares project dependencies (Next.js 15, React 19, TypeScript, Tailwind CSS), test runners (Vitest), and build scripts. | **Build & Dependency Management** |
| `tsconfig.json` | TypeScript Configuration | Configures strict type-checking, JSX transpilation, path aliases (`@/*`), and modern ES target features. | **Build & Type Checking** |
| `next.config.ts` | Next.js Server & Build Settings | Configures App Router behavior, image optimization rules, and output build options. | **Build & Server Runtime** |
| `netlify.toml` | Netlify Deployment Configuration | Defines build commands (`npm run build`), publish directory (`.next`), and Next.js Netlify runtime plugin. | **Deployment Infrastructure** |
| `vitest.config.ts` | Unit & Component Test Config | Configures Vitest test environment (JSDOM), aliases, and mock runners for fast automated testing. | **Testing & CI** |
| `tests/components/contact-form.test.tsx` | Contact Form Unit Test Suite | 6 automated interaction tests validating idle, error, submitting, and success states. | **Testing & CI** |
| `REVIEWER-PACKAGE.md` | Reviewer Evaluation Package | Complete unbiased review prompt with Chapter 1 proof statement and the two 10-second test questions. | **Critique & Evaluation** |
| `PORTFOLIO-REVIEW.md` | Critique Capture & Triage | Raw reviewer feedback capture, initial reflections, and MUST-FIX vs NICE-TO-HAVE triage table. | **Critique & Evaluation** |
| `MUST-FIX-VERIFICATION.md` | Must-Fix Verification Log | Tracks the implementation and testing of all 3 critique resolutions. | **Critique & Quality Assurance** |
| `REVIEWER-FOLLOW-UP.md` | Reviewer Response Draft | Professional follow-up response summarizing live fixes and thanking the reviewer. | **Critique & Communication** |
| `REAL-PHONE-CHECKLIST.md` | Real Phone Mobile QA Checklist | Structured checklist for verifying layout, touch targets, forms, contrast, and orientation on physical smartphones. | **Quality Assurance & Verification** |
| `WEEK-07-FIX-LOG.md` | Mobile & Production Polish Fix Log | Complete before/after audit log covering iOS zoom fixes, touch targets, reduced-motion, and link audit. | **Audit & Documentation** |
| `AUDIT.md` | Accessibility & Performance Audit Deliverable | Comprehensive Lighthouse, WAVE, Keyboard, and AI streaming audit with before/after benchmarks and Web Vitals analysis. | **Quality Assurance & Audit Deliverable** |
| `audit/README.md` | Audit Screenshots & Testing Guide | Standardized procedures for capturing and verifying real Lighthouse Mobile and WAVE audit screenshots. | **Quality Assurance & Testing** |
| `BREAK-TEST-PLAN.md` | Edge-Case & Break-Test Plan | Structured stress-testing plan covering input validation, rapid double-submit, network failure, viewports, and SEO. | **Testing & Hardening Plan** |
| `WHERE-IT-BREAKS.md` | Failure Modes & Triage Log | Real production findings categorized under FIX-NOW, KNOWN LIMITATIONS, and NOT REPRODUCED. | **Hardening & Quality Assurance** |
| `HARDENING-FIXES.md` | Edge-Case Hardening Fixes | Detailed architectural descriptions of frontend submit locks, server-side deduplication, and SEO metadata. | **Engineering & Fix Log** |
| `HARDENING-REVIEW-PACKAGE.md` | External Reviewer Package | Unbiased hardening evaluation guide and test prompt for external peer review. | **Hardening & Review Package** |
| `HARDENING-REVIEW.md` | External Hardening Review Record | Captured peer reviewer findings, triage table, must-fixes applied, and production verification checklist. | **Review & Quality Assurance** |
| `src/app/robots.ts` | Robots.txt Route Handler | Generates dynamic `/robots.txt` allowing crawler discovery across all public pages. | **SEO & Discovery** |
| `src/app/sitemap.ts` | XML Sitemap Route Handler | Generates dynamic `/sitemap.xml` indexing all 7 core portfolio routes. | **SEO & Discovery** |
| `public/og-image.svg` | Social Open Graph Card Asset | High-resolution 1200×630 vector preview banner for rich social sharing cards. | **SEO & Social Preview** |
| `agent/hackscout_agent.py` | HackScout AI Agent Script | Python agent for discovering, scoring, and prioritizing hackathons and developer opportunities. | **Capstone Agent Runtime** |
| `agent/eval_runner.py` | Agent Evaluation Suite | Deterministic test runner running 7 rigorous unit tests against the HackScout AI agent logic. | **Testing & Agent Evaluation** |
| `agent-config/profile.json` | Candidate Profile Ground Truth | Machine-readable source of truth defining verified skills, URLs, projects, and target roles. | **Agent & Portfolio Metadata** |

---

## 2. Detailed Component Explanations

### `src/components/contact/ContactForm.tsx`
* **What it does**: Provides the interactive frontend contact interface. Validates user input before sending, handles loading spinners, captures server responses, and displays accessible success or error banners with iOS zoom protection.
* **Why the site needs it**: Fulfills the "Make It Do Something" assignment with a real communication channel for visitors and recruiters.
* **Impact Layer**: Runtime client component hydrated with React.

### `src/app/api/contact/route.ts`
* **What it does**: Serverless API route receiving contact form requests over HTTP POST. Enforces server-side validation rules, catches automated bot spam with a honeypot field, rate limits abusive IPs, and logs the payload destined for `adityasri1205@gmail.com`.
* **Why the site needs it**: Provides a secure backend API boundary without exposing email server credentials to the browser.
* **Impact Layer**: Serverless execution layer.

### Critique Artifacts (`REVIEWER-PACKAGE.md`, `PORTFOLIO-REVIEW.md`, `MUST-FIX-VERIFICATION.md`, `REVIEWER-FOLLOW-UP.md`)
* **What they do**: Provide the structured peer critique package, feedback capture, triage classification, verification records, and professional reviewer follow-up draft.
* **Why the site needs them**: Mandatory deliverables for "Survive the Crit" proving the ability to iterate on direct feedback and ship must-fixes to production.
* **Impact Layer**: Documentation and Quality Assurance.
