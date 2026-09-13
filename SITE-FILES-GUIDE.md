# Site Files Architecture Guide

A complete reference guide explaining every deployed file and configuration in this repository, its architectural purpose, and how it impacts build time, runtime, and styling.

---

## 1. Project Directory Table

| File / Path | Purpose | Why It Exists | Impact Layer |
| :--- | :--- | :--- | :--- |
| `src/app/page.tsx` | Main Portfolio Homepage | Renders the primary single-page portfolio layout including Hero, Selected Work (HIREVIUM, INDRA AI, StackScout, ResQra), Approach, Tech Stack, Resume, and Contact Form. | **Runtime & Build** (Next.js App Router Page) |
| `src/components/contact/ContactForm.tsx` | Dynamic Contact Form Component | Interactive client component managing form states (idle, editing, submitting, success, validation error), honeypot anti-spam, and accessible ARIA attributes. | **Runtime & Client Interaction** (`'use client'`) |
| `src/app/api/contact/route.ts` | Contact Submission Serverless Route | Validates payload, checks honeypot field, enforces IP rate limits, and forwards message dispatch to `adityasri1205@gmail.com`. | **Serverless API Runtime** (HTTP POST Handler) |
| `public/__forms.html` | Netlify Build Crawler Discovery | Static HTML form definition for Netlify's crawler to register the form in Netlify Forms dashboard. | **Deployment & Form Automation** |
| `src/app/layout.tsx` | Root Layout Shell | Defines HTML `<html>` and `<body>` wrappers, font variables (`Space Grotesk`, `Inter`, `Geist`), global `<Header />`, and `<Footer />`. | **Runtime & Build** (Layout Wrapper) |
| `src/app/globals.css` | Global CSS & Design System Tokens | Declares color variables, dark theme palettes, typography bindings, utility classes, and glassmorphism definitions. | **Styling** (Tailwind CSS & Custom Properties) |
| `src/app/projects/page.tsx` | All Projects Index Page | Displays the complete catalog of projects, filtering tabs, and status badges for deep-dive exploration. | **Runtime & Build** (Route Page) |
| `src/app/projects/[slug]/page.tsx` | Dynamic Case Study Route | Renders individual case study breakdowns with technical problem definitions, contribution details, and reflection notes. | **Runtime & Build** (Dynamic Route) |
| `src/app/resume/page.tsx` | Online Resume & CV Page | Presents structured academic background, technical skills matrix, project highlights, and verified links. | **Runtime & Build** (Route Page) |
| `src/components/common/Header.tsx` | Sticky Navigation Header | Provides responsive desktop and mobile navigation links with active-route highlighting and direct LinkedIn contact CTA. | **Runtime & Client Interaction** (`'use client'`) |
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
| `agent/hackscout_agent.py` | HackScout AI Agent Script | Python agent for discovering, scoring, and prioritizing hackathons and developer opportunities. | **Capstone Agent Runtime** |
| `agent/eval_runner.py` | Agent Evaluation Suite | Deterministic test runner running 7 rigorous unit tests against the HackScout AI agent logic. | **Testing & Agent Evaluation** |
| `agent-config/profile.json` | Candidate Profile Ground Truth | Machine-readable source of truth defining verified skills, URLs, projects, and target roles. | **Agent & Portfolio Metadata** |

---

## 2. Detailed Component Explanations

### `src/components/contact/ContactForm.tsx`
* **What it does**: Provides the interactive frontend contact interface. Validates user input before sending, handles loading spinners, captures server responses, and displays accessible success or error banners.
* **Why the site needs it**: Fulfills the "Make It Do Something" assignment with a real communication channel for visitors and recruiters.
* **Impact Layer**: Runtime client component hydrated with React.

### `src/app/api/contact/route.ts`
* **What it does**: Serverless API route receiving contact form requests over HTTP POST. Enforces server-side validation rules, catches automated bot spam with a honeypot field, rate limits abusive IPs, and logs the payload destined for `adityasri1205@gmail.com`.
* **Why the site needs it**: Provides a secure backend API boundary without exposing email server credentials to the browser.
* **Impact Layer**: Serverless execution layer.

### `public/__forms.html`
* **What it does**: Static HTML file containing standard Netlify Form tags.
* **Why the site needs it**: Enables Netlify's build crawler to register the form schema during CI/CD deployment.
* **Impact Layer**: Build & hosting automation.
