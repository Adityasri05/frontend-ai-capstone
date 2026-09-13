# Site Files Architecture Guide

A complete reference guide explaining every deployed file and configuration in this repository, its architectural purpose, and how it impacts build time, runtime, and styling.

---

## 1. Project Directory Table

| File / Path | Purpose | Why It Exists | Impact Layer |
| :--- | :--- | :--- | :--- |
| `src/app/page.tsx` | Main Portfolio Homepage | Renders the primary single-page portfolio layout including Hero, Selected Work (HIREVIUM, INDRA AI, StackScout, ResQra), Approach, Tech Stack, Resume, and Contact CTA. | **Runtime & Build** (Next.js App Router Page) |
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
| `agent/hackscout_agent.py` | HackScout AI Agent Script | Python agent for discovering, scoring, and prioritizing hackathons and developer opportunities. | **Capstone Agent Runtime** |
| `agent/eval_runner.py` | Agent Evaluation Suite | Deterministic test runner running 7 rigorous unit tests against the HackScout AI agent logic. | **Testing & Agent Evaluation** |
| `agent-config/profile.json` | Candidate Profile Ground Truth | Machine-readable source of truth defining verified skills, URLs, projects, and target roles. | **Agent & Portfolio Metadata** |

---

## 2. Detailed Component Explanations

### `src/app/page.tsx`
* **What it does**: Represents the root route (`/`) of the web application.
* **Why the site needs it**: It is the single entry point where recruiters review Aditya Srivastav's positioning, case studies (HIREVIUM, INDRA AI, StackScout, ResQra), technical expertise, and contact CTAs.
* **Impact Layer**: Builds into static and server-rendered HTML at compile time, hydrated with React on the client for smooth anchor scrolling.

### `src/app/globals.css`
* **What it does**: Imports Tailwind CSS directives (`@tailwind base; @tailwind components; @tailwind utilities;`) and defines custom CSS custom properties (variables) like `--brand-bg: #0f172a`, `--brand-card: #1e293b`, and `--brand-accent: #2563eb`.
* **Why the site needs it**: Ensures consistent, accessible color contrast ratios and dark-mode visual hierarchy across all viewports.
* **Impact Layer**: Styling only; compiled by PostCSS into a single optimized stylesheet.

### `netlify.toml`
* **What it does**: Instructs the Netlify CI/CD build runner how to execute the production build pipeline (`npm run build`) and which output folder to host (`.next` with `@netlify/plugin-nextjs`).
* **Why the site needs it**: Enables automated continuous deployment and instant preview builds whenever code is pushed to GitHub.
* **Impact Layer**: Deployment and build automation.

### `public/favicon.svg`
* **What it does**: Supplies the high-resolution vector icon rendered on the browser tab, bookmarks bar, and search engine results.
* **Why the site needs it**: Provides a recognizable, professional identity without large raster image downloads.
* **Impact Layer**: Static asset; served directly via HTTP GET without server processing.
