# HIREVIUM & AI-Assisted React Portfolio — Project Specification

This document defines the functional, technical, and UI/UX specifications for the personal portfolio website of **Aditya Srivastav**, designed for the FlyRank AI Frontend Engineering Internship.

---

## 1. Application Purpose & Target User

### Application Purpose
The application is an interactive portfolio that showcases Aditya's unique engineering profile: the intersection of **Frontend React/Next.js Engineering** and **AI/ML (FastAPI, Python, PyTorch)**. Rather than listing static resume points, this application provides interactive proof of his ability to design secure, accessible, high-performance web applications that interface with AI agents.

### Target User (Audience)
* **Engineering Leads / Tech Leads**: Searching for junior engineers who understand type safety, API security (backend proxying), performance benchmarks, and React best practices.
* **Technical Recruiters**: Seeking candidates with structured portfolios, clean communication, and a clear call to action.

---

## 2. Core User Flow

```mermaid
graph TD
    Start([Visitor lands on Home Page]) --> Hero[Read Positioning Statement & view Terminal]
    Hero --> Skills[Inspect Tech Stack & AI Hackathon details]
    Skills --> ProjectClick{Click Hirevium Case Study?}
    ProjectClick -- Yes --> CaseStudy[Read Case Study & play with Recruiter Dashboard Demo]
    ProjectClick -- No --> ResumeClick{Click Resume?}
    CaseStudy --> LinkedInCTA[Click "Connect on LinkedIn" CTA]
    ResumeClick -- Yes --> Resume[Inspect scannable Resume & Coursework]
    ResumeClick -- No --> LinkedInCTA
    Resume --> LinkedInCTA
    LinkedInCTA --> LinkedIn([Redirected to LinkedIn Profile])
```

---

## 3. Required Pages & Routing

The application uses Next.js App Router. The sitemap consists of the following routes:

1. **Home Page (`/`)**: Introduces the positioning statement, core skills grid, AI Hackathon achievements, a simulated terminal for interactive git/repo stats, a performance scoreboard, and a prominent LinkedIn CTA.
2. **Hirevium Case Study (`/projects/hirevium`)**: The technical breakdown of the Hirevium AI agent interview simulator. Features:
   * System architecture diagrams (Mermaid).
   * Interactive recruiter vetting dashboard demo (connecting the `FilterPanel` and `SpecDashboard` components).
   * Technical explanations of FastAPI secure API proxying and PyTorch embedding classification.
3. **Resume Page (`/resume`)**: Clean, web-scannable resume highlighting 5th-semester subjects, open-source work, and FlyRank achievements, with clear download and LinkedIn redirect options.

---

## 4. Required Components

### Layout Components
* `Header` / `NavBar`: Sticky glassmorphic navigation bar with links to Home, Case Study, Resume, and LinkedIn.
* `Footer`: Simple footer reinforcing the One Action (LinkedIn) and copyright info.

### Feature-Specific Components
* **Home Page**:
  * `HeroSection`: Highlights the proof statement and includes the primary LinkedIn CTA.
  * `TerminalView`: An interactive command-line interface simulator that allows visitors to run simple commands (e.g., `help`, `git`, `skills`, `clear`) to view repository details or stats.
  * `SkillsGrid`: Tabbed interface categorizing Frontend (React, Next.js, Tailwind) and AI/ML (Python, PyTorch, Gemini, FastAPI).
  * `LighthouseScoreboard`: Visual gauge showcasing 100/100 performance scores for mobile/desktop.
  * `Timeline`: Dynamic, vertical track showing AI Hackathon finalist details and open-source contributions.
* **Hirevium Case Study**:
  * `ArchitectureDiagram`: Mermaid diagram showing client -> FastAPI -> Gemini flow.
  * `DemoSection`: Interactive container rendering the live Recruiter Vetting Dashboard.
  * `CompareDashboards`: A toggle to compare the "Failed Dashboard" (raw inline styles, unstyled table, poor UX) vs. the "Spec Dashboard" (accessible, styled, loading transitions) to highlight the difference code review makes.
  * `FilterPanel`: Controlled component filtering candidates by scores, technologies, and alignment personas.
  * `SpecDashboard`: Main recruiter layout displaying vetted candidates, status tags, and action buttons.
  * `TwinDrawer`: Sliding drawer that focus-traps and displays candidate twin details (e.g., matching transcript, PyTorch embedding score, and secure token validation).
* **Resume Page**:
  * `ResumeSection`: Standardized container for education, experience, and projects.
  * `PrintCSS`: Tailwind overrides to format the resume nicely when printed or saved as PDF.

---

## 5. Functional & Interactive Requirements

### Recruiter Dashboard Simulation (`/projects/hirevium`)
* **Filtering Logic**: The candidate list must filter in real time or via transition-based application when clicking "Apply Filters".
* **Sync Scores**: The "Sync Scores" button must trigger a React 19 transition (`useTransition`) and mock a short network latency (e.g., 600ms) with full loading skeletons before displaying updated data.
* **Twin Drawer**: Clicking "View Twin" on any candidate must slide in a side drawer containing:
  * Simulated interview response transcript.
  * Adaptive difficulty metrics.
  * PyTorch alignment analysis.
  * Close button with focus trapping and keyboard listener (`Escape` key).
* **Code Compare Toggle**: Users can switch between a broken/failed implementation (visual mess) and the optimized workspace component.

### Terminal Simulator (`/`)
* **Interactive Shell**: Standard input field styled as a terminal prompt.
* **Supported Commands**:
  * `help`: Lists all available commands.
  * `about`: Prints Aditya's profile bio.
  * `skills`: Lists technologies with percentage bars or ratings.
  * `git`: Displays mock git log showing commits from this capstone development.
  * `clear`: Clears the terminal screen.

---

## 6. UI & Design System

### Aesthetic Theme
* **Dark Mode by Default**: Deep slate base (`#0f172a` to `#020617`) with indigo/violet gradients (`from-blue-400 via-indigo-300 to-violet-500`) to match an AI-agent vibe.
* **Glassmorphism**: Backdrop blur utility classes (`backdrop-blur-md bg-slate-900/50 border border-slate-800/80`) for all cards and dashboards.
* **Typography**: Modern, clean sans-serif stack utilizing system fonts as defined in `globals.css` with Outfit or Inter style scales.
* **Interactive Elements**: Micro-animations on hover (scale-up, border glow, text color shifts) and active states (`active:scale-95`).

---

## 7. Technical & Code Quality Requirements

* **Next.js & React 19 Rules**:
  * Keep heavy page logic in Server Components where appropriate.
  * Client components must carry the `'use client'` directive.
  * Avoid raw `useEffect` calls where state derivation or transitions are possible.
  * Leverage `useTransition` for async state updates.
* **TypeScript Correctness**:
  * `tsconfig.json` has `strict` mode enabled.
  * No `any` types. All props and state interfaces must be fully declared.
* **Accessibility (a11y)**:
  * Strict semantic tags: `<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`, `<button>`.
  * Associated labels for all form inputs with matching `htmlFor` and `id`.
  * Keyboard navigation support: buttons must use `<button>` (not clickable `div`s) and drawer must handle focus containment.
* **Tailwind CSS**:
  * Strict utility class ordering.
  * Theme token reliance. No arbitrary hardcoded colors; use Tailwind's `indigo`, `slate`, `emerald`, `red`, and `yellow` scales.

---

## 8. Acceptance Criteria

1. **Accessibility**: All interactive pages pass basic keyboard navigation testing (tab focus, enter to trigger, escape to dismiss drawers).
2. **Visual Consistency**: The UI is responsive, adjusting gracefully between mobile viewport (under 768px) and wide desktop screens.
3. **Correct State Behavior**: Applying filters in the Hirevium dashboard correctly updates the candidate list or displays the empty state if zero matches occur.
4. **Build Integrity**: Running `npm run build` generates a production-ready Next.js output without TypeScript or ESLint errors.
5. **No Broken Links**: The LinkedIn CTA redirects to Aditya's LinkedIn profile.
