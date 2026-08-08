# AI-Assisted React Application — Final Submission

This document summarizes the final project submission for the FlyRank AI Frontend Engineering Internship Capstone. It outlines the application, development workflow, prompts, manual corrections, testing, and key learnings.

---

## 1. Project Overview

The application is an interactive portfolio website designed to showcase **Aditya Srivastav's** engineering capabilities at the intersection of **Frontend React/Next.js Engineering** and **AI/ML (FastAPI, Python, PyTorch)**. 

The highlight of the portfolio is the **HIREVIUM Recruiter War Room (Vetting Workspace)** simulator. Visitors can experience a live recruiter dashboard, filter simulated candidates by scores, technology tags, and roles, check sync animations, and slide open a candidate twin detail drawer containing simulated vector embeddings similarities, FastAPI proxy security hashes, and interview dialogue logs.

---

## 2. Technology Stack

* **Frontend Framework**: Next.js 15.1.0 / React 19.0.0 (App Router, strict mode).
* **Styling**: Tailwind CSS 4.0.0 (modern layout features, glassmorphic filters).
* **Language**: TypeScript 5.7.2 (strict compilation config).
* **Build / Dev Tools**: ESLint, PostCSS, next-build.

---

## 3. AI-Assisted Development Process

We followed a structured engineering workflow: **PLAN → IMPLEMENT → REVIEW → TEST → IMPROVE**.
1. **Plan**: Analyzed sitemaps and designed product specifications (`PROJECT_SPEC.md`) before writing any code.
2. **Implement**: Generated the layout elements (Navbar, Footer), followed by feature components (Terminal CLI View, Vetting Dashboard, Twin Drawer) in isolation.
3. **Review**: Reviewed each file manually to check for rendering bugs, style consistency, and compliance with the 150-line component size boundary rule.
4. **Test**: Verified functional states, keyboard accessibility (a11y), responsive breakpoints, and print stylesheets.
5. **Improve**: Addressed AI mistakes, type mismatches, and user-experience issues manually.

---

## 4. Prompts Used

At minimum, we utilized and documented prompts for:
1. **Project Setup**: Finding file layout structures and defining layouts.
2. **Initial UI**: Implementing a glassmorphic Navbar and Footer.
3. **Component Implementation**: Building the custom interactive terminal CLI simulator `TerminalView`.
4. **Responsive Design**: Collapsing mobile menus and stacking grid columns.
5. **State Management**: Adjusting component interfaces to resolve technology filter arrays.
6. **Form / Functionality**: Implementing real-time candidate filter query comparisons.
7. **Error / Async Handling**: Leveraging React 19 `useTransition` to animate sync states.
8. **Accessibility**: Restoring button focus and containing keyboard tabs inside active drawers.
9. **Testing / Debugging**: Checking compiler logs and handling empty/invalid search edge cases.
10. **Refactoring**: Isolating the CLI terminal and details drawer to meet code length standards.

---

## 5. Manual Improvements

We did not accept AI code blindly. Key manual corrections include:
* **Fixing Layout Rendering**: Corrected `src/app/layout.tsx` to ensure that the imported `<Footer />` component is rendered inside the layout layout tree.
* **Tag Indicators**: Added visual technology badge elements to candidate cards in the recruiter dashboard so that filters are easily verify-able.
* **Restoring Button Focus**: Wrote focus-restoration logic inside the `TwinDrawer` details panel to return active focus to the clicked card button upon modal dismissal.
* **Adding Layout Print Rules**: Added custom print CSS directives (`print:hidden`, print color text overrides) to the Navbar, Footer, and Resume buttons to ensure scannable PDF exports.

---

## 6. AI Mistakes

* **Mistake 1: Component Interface Mismatch**: The generated `FilterPanel` filtered candidates by technology checklists, but the `SpecDashboard` model interface did not contain any property to store candidate technologies, leading to compilation and functional blocker errors.
* **Mistake 2: Omitted layout tags**: The AI imported the Footer in `layout.tsx` but did not include it in the returned TSX tree.
* **Mistake 3: Zero-duration state updates**: The initial sync scores function occurred instantly, preventing users from seeing skeletons or the "Syncing..." loading text. We added a 700ms Promise timeout to resolve this.

---

## 7. Testing & Verification

We verified the application through manual scripts and automated compilation checks:
* **Manual Scripts**: Tested command inputs on the terminal simulator (`help`, `about`, `skills`, `git`, `clear`), score input boundary errors (e.g., alert triggers for scores over 100), vector similarity drawers, mobile viewport scaling, and print formatting.
* **Automated Builds**: Ran `npm run build` to verify Next.js builds, strict TypeScript compilation, and ESLint rule compliance.

---

## 8. Key Learnings

1. **Verify Interface Parity**: AI tools excel at writing isolated files but often create mismatches (like missing fields or mismatched parameters) when integrating parent-child states.
2. **Incorporate Real Latency**: Skeletons and transition states cannot be evaluated when mock operations execute instantly. Adding artificial delays is necessary to test user experience.
3. **Accessibility Requires Manual Review**: Focus trapping, Escape key listener traps, and focus restoration require explicit manual code additions because AI often omits detailed a11y behaviors.

---

## 9. Final Result

The capstone application compiles successfully with zero errors. It presents:
* A polished landing page showcasing Aditya's profile and interactive command line terminal simulator.
* The Hirevium Case Study including system architecture flows, recruiter workspace, live candidate filtering grids, sync transitions, and sliding detail drawers.
* An interactive, print-ready resume page that outputs a clean single-sheet PDF.
