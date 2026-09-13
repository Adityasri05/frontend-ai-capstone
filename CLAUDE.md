# CLAUDE.md — AI Engineering Guidelines & Project Context

Welcome! This file establishes the project context, development environment, engineering standards, architecture, and directives for AI code assistants working in the `frontend-ai-capstone` repository.

---

## 1. Project Context & Positioning

- **Identity**: Aditya Srivastav — Computer Science & Engineering student building AI-powered frontend products and practical AI-integrated interfaces.
- **Audience**: Hiring Managers and Engineering Leads at AI/ML-first startups.
- **Primary CTA**: Contact me on LinkedIn (`https://www.linkedin.com/in/aditya-srivastav-64906927a/`).
- **Visual & Design Direction**: Technical, minimal, confident, thoughtful.
- **Two-Line Style Note**:
  ```text
  Fonts: Space Grotesk for headings, Inter for body. Palette: #0f172a, #fcfcfd, #334155, #2563eb.
  Mood: Calm, precise, and technical — the interface stays quiet so the engineering work remains the focus.
  ```

---

## 2. Technology Stack & Framework

- **Framework**: Next.js 15.x (App Router)
- **UI Library**: React 19.x
- **Language**: TypeScript 5.x (Strict mode)
- **Styling**: Tailwind CSS (with predefined semantic tokens in `globals.css`)
- **Icons**: Lucide React / Custom lightweight SVG monograms
- **Package Manager**: npm

---

## 3. Core Engineering Rules & Directives

1. **TypeScript Preferred**: Set `strict: true`, no implicit `any`, use strict Discriminated Unions for UI states (`idle` | `loading` | `success` | `error`).
2. **Server vs. Client Components**: Use React Server Components by default for fast TTFB, SEO, and minimal client bundle size. Apply `"use client"` only at leaf node levels where user interactivity or browser state is required.
3. **Component Architecture**: Keep components focused, reusable, and under 150 lines of code. Split complex logic into custom React hooks (`src/hooks/`).
4. **Mobile-First Responsive Design**: Test all layouts across `375px`, `768px`, `1024px`, `1280px`, and `1440px`. Prevent horizontal overflow and unreadable text wrapping.
5. **Accessibility (a11y)**: Semantic HTML elements (`<header>`, `<main>`, `<nav>`, `<article>`, `<button>`), accessible `<label>` pairing, explicit `aria-label` tags for icon-only buttons, and WCAG AA contrast compliance.
6. **Security & API Keys**: **NEVER** hardcode or expose API keys (Gemini, OpenAI, Claude, etc.) in client code or Git. All AI calls must route through backend proxy endpoints.
7. **Authenticity & Integrity**:
   - Never invent project results or benchmark statistics.
   - Never fabricate user testimonials or mock metrics.
   - Real project screenshots are strictly preferred over decorative AI imagery.
8. **Motion & Performance**: Keep animations purposeful, subtle, and lightweight. Always optimize static assets and leverage Next.js `<Image />` where applicable.
9. **Avoid Unnecessary Dependencies**: Prefer native web APIs, Tailwind utilities, and existing project dependencies before adding new npm packages.

---

## 4. Folder Structure

```text
frontend-ai-capstone/
├── portfolio-context/          # Grounded project context & case study specs
│   ├── identity-kit.md
│   ├── case-studies.md
│   ├── content-map.md
│   ├── portfolio-claim.md
│   └── sitemap.md
├── public/                     # Static assets (favicons, SVG logos, textures)
├── src/
│   ├── app/                    # Next.js App Router routes & layouts
│   │   ├── projects/           # Project case study routes
│   │   ├── resume/             # Interactive resume route
│   │   ├── globals.css         # Tailwind tokens & global styling
│   │   ├── layout.tsx          # Root layout shell
│   │   └── page.tsx            # Minimal scaffold homepage
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Header, Footer, Navigation
│   │   └── ui/                 # Atomic UI primitives
│   ├── features/               # Feature models & view-models
│   └── lib/                    # Shared utilities & configurations
├── CLAUDE.md                   # This instruction file
└── package.json
```
