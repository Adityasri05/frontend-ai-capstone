# HIREVIUM AI Vetting Portfolio — Build Notes & Foundations

This document provides a technical overview of the Next.js 15, React 19, and Tailwind CSS 4.x application foundation for Aditya Srivastav's FlyRank AI Internship Capstone.

---

## 1. Route Architecture
The application uses the Next.js App Router for server-rendered routing. The folder layout defines the following endpoints:

* **`/` (Home)**: Portfolio hero branding, technical skill tabs, hackathon milestones, and Lighthouse scores.
* **`/projects/hirevium` (Hirevium Case Study)**: Recruiter dashboard workspace demo, systems workflow mapping, and toggle comparisons.
* **`/resume` (Resume)**: Clean scannable curriculum sheet.
* **`/health` (System Diagnostics)**: Asynchronous status checkers querying local server filesystems.

---

## 2. Server vs. Client Components
To optimize payload sizes and page loading times, we default to **Server Components** (`use client` omitted) and isolate client-side interactions to leaf nodes:

* **Server Components (Default)**:
  * `src/app/layout.tsx` — Standard root wrapper.
  * `src/components/common/Navbar.tsx` — Sticky header structure (logo and links container).
  * `src/components/common/Footer.tsx` — Bottom navigation CTA.
  * `src/app/health/page.tsx` — Diagnostics data fetching.
  * `src/app/projects/hirevium/page.tsx` — Structural case study details.
  * `src/app/resume/page.tsx` — Static resume content.

* **Client Components (`"use client"`)**:
  * `src/components/common/NavbarClient.tsx` (`DesktopNav` & `MobileNav`) — Necessary because active highlights require client-side routing pathname checks (`usePathname()`) and mobile hamburger icons require toggling states (`useState()`).
  * `src/components/features/TerminalView.tsx` — Form submit handlers and command input states.
  * `src/components/features/TwinDrawer.tsx` — Focus trapping, keyboard Escape listeners, and slide-in overlay triggers.
  * `src/app/page.tsx` — State checks for selecting active skills tabs (Frontend vs. AI/ML).
  * Vetting components: `FilterPanel.tsx` (state checkbox inputs), `SpecDashboard.tsx` (refresh callbacks), `FailedDashboard.tsx` (deprecations).

---

## 3. Design System & Tailwind v4 Customizations
We configure design tokens directly inside `src/app/globals.css` using Tailwind v4's CSS-first `@theme` block. These variables map to standard utility classes:

### Colors
* **Background (`bg-background`)**: `#020617` (Deep blue-black slate)
* **Foreground (`text-foreground`)**: `#f8fafc` (Off-white reading text)
* **Muted (`text-muted`)**: `#94a3b8` (Slate-400 description text)
* **Primary (`bg-primary`, `text-primary`)**: `#4f46e5` (Indigo-600 action outlines)
* **Secondary (`bg-secondary`)**: `#7c3aed` (Violet-600 highlights)
* **Border (`border-border`)**: `#1e293b` (Slate-800 borders)
* **Card (`bg-card`)**: `#0f172a` (Slate-900 boxes)

### Typography & Structure
* **Font-Sans (`font-sans`)**: Standard system-ui reading stacks.
* **Font-Mono (`font-mono`)**: Technical command stacks.
* **Spacing (`p-custom-sm`, `gap-custom-md`)**: Consistent padding and margin multipliers.
* **Radius (`rounded-custom`)**: Modern rounded corners (`0.75rem`).
* **Shadows (`shadow-elevation-1`, `shadow-elevation-2`)**: Standardized depth levels.

---

## 4. Health Check Diagnostics
The `/health` page routes to a Server Component (`src/app/health/page.tsx`) that retrieves system telemetry from the local environment:

* **Mechanism**: Utilizes Node.js filesystem APIs (`fs.promises.readFile`) to asynchronously read the application's root `package.json` file.
* **Telemetry**: Fetches and parses package details (app name and package versions) alongside `process.env.NODE_ENV` parameters and a live UTC timestamp.
* **Errors**: Unhandles file path errors or JSON parse exceptions are caught via clean try-catch blocks and rendered as diagnostic warning alerts.
* **Loading State**: Wrapped inside a React `<Suspense>` boundary containing a pulsing dashboard layout skeleton.

---

## 5. Environment Variables & Secrets Security
Telemetry and keys are structured in `.env.example` to prevent API key leaks:

* **Example Variables**:
  * `NODE_ENV` — Active environment mode.
  * `NEXT_PUBLIC_API_URL` — Absolute local or production backend URLs.
* **Ignored Files**: Local secrets are configured inside `.env` or `.env.local` which are explicitly blocked from Git commits inside `.gitignore`.
* **Security Rule**: No Gemini API keys (`GOOGLE_API_KEY`) or cloud variables are hardcoded in client-side code blocks.

---

## 6. Deployment Workflow
The application is pre-configured for standard **Vercel** preview deployments:

1. **Framework Detection**: Vercel automatically detects Next.js App Router workspace configurations.
2. **Build Settings**:
   * Build Command: `next build` (triggered via `npm run build`).
   * Output Directory: `.next` (prerendered static content).
3. **Trigger**: Pushing to the `main` branch or opening GitHub Pull Requests triggers automated compilation checks and yields a live Vercel Preview URL.

---

## 7. Verification Logs
We verified the foundation build logs locally:

* **Typescript Typecheck**: `npx tsc --noEmit` passed with 0 compile errors.
* **Production Compilation (`npm run build`)**: Compiled successfully. Static pages generated:
  * `/` (Static)
  * `/projects/hirevium` (Static)
  * `/resume` (Static)
  * `/health` (Static)
* **Mobile / Desktop viewports**: Verified responsive borders, flex wraps, and navigation menu Hamburger transitions at both mobile width (`375px`) and desktop width (`1280px`).
