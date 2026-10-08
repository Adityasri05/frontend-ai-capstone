# How to Add My Next Case Study (`NEXT-CASE-STUDY-GUIDE.md`)

This guide provides exact, step-by-step instructions for adding a new project case study to the portfolio without breaking the existing Next.js 15 App Router architecture, visual identity, or accessibility standards.

---

## A. Where the Next Case Study Goes

Based on the actual repository architecture (`d:\Hackathon\frontend-ai-capstone`):

- **Portfolio Section:** Projects / Work section (`/projects`)
- **Project Listing:** `src/app/projects/page.tsx` (`PROJECTS` data array)
- **Individual Case-Study Route:** `src/app/projects/[slug]/page.tsx` (e.g. `src/app/projects/hackscout-ai/page.tsx`)
- **Content Source:** Static React / TSX page component utilizing standard layout components & `portfolio-context/` metadata
- **Main Reusable Component:** Standard Card / Hero / Section containers formatted with Space Grotesk (`font-display`) and Inter (`font-sans`)
- **Supporting Assets:** `public/images/` or `public/screenshots/` (PNG / SVG asset files)
- **CTA Location:** Bottom of case study page pointing to GitHub repository, Live Demo / Netlify URL, and contact form (`/contact`)

---

## B. Exact Steps to Add a New Case

Follow this ordered checklist based on the real repository implementation:

1. **Prepare Content & Evidence:** Draft the 3-beat narrative (Problem → What I Did → What Came of It) and gather repository links, evaluation results, and screenshots.
2. **Create the Case Study Page:** Create a new page file at `src/app/projects/<slug>/page.tsx` (e.g. `src/app/projects/hackscout-ai/page.tsx`).
3. **Set Up Page Layout & Metadata:** Export page metadata (`title`, `description`, `openGraph`) and build the page header with project category badges.
4. **Implement Beat 1 — Problem:** Add 2–4 concise paragraphs explaining the specific user problem, technical difficulty, and why it mattered.
5. **Implement Beat 2 — What I Did:** Add 3–5 detailed bullet points highlighting personal architectural decisions, code contributions, tech stack choices, and safety guardrails.
6. **Implement Beat 3 — What Came of It:** Add concrete, empirical outcomes (e.g. 7/7 eval pass rate, 60 FPS GLSL performance, 0KB extra bundle size, Lighthouse score 96/100).
7. **Add Architecture Diagram & Code Snippets:** Insert Mermaid diagram or syntax-highlighted code blocks illustrating key logic.
8. **Add Supporting Visuals:** Place screenshots or SVG visual diagrams in `public/screenshots/` and render with Next.js `<Image />` components.
9. **Update Project Index Entry:** Add the project object to the `projects` array in `src/app/projects/page.tsx` with title, category, description, tech tags, and slug link.
10. **Register in Portfolio Context:** Update `portfolio-context/PROJECTS.md` with the new project metadata, live link, and status.
11. **Run Local Validation:**
    ```bash
    npx tsc --noEmit
    npm run test:run
    npm run build
    ```
12. **Test Responsive Layout:** Test page layout on desktop (1440px), tablet (768px), and mobile (375px) using browser devtools.
13. **Deploy & Verify:** Push changes to GitHub `main` branch to trigger Netlify build; verify live page URL.

---

## C. Three-Beat Case-Study Structure

Every portfolio case study must adhere strictly to the Week 2 three-beat narrative:

### 1. Problem
- **Who experienced the problem?** (Specific user audience or developer workflow bottleneck).
- **What was difficult?** (Technical, UX, or architecture challenge).
- **Why did it matter?** (Product impact, latency risk, credential safety, or readability).

### 2. What I Did
- **Personal Contribution:** What I personally built, decided, tested, or contributed.
- **Key Technical Decisions:** Explicit choice of frameworks, scoring formulas, state management, or guardrails.
- **Honest Attribution:** Clear distinction between individual build work and open-source packages or third-party APIs used.

### 3. What Came of It
- **Empirical Results:** Benchmark scores, pass rates (e.g. 7/7 eval cases), bundle size impacts, or page load metrics.
- **Technical Outcome:** Verifiable performance improvement, security hardening, or accessibility compliance.
- **Deployment Status:** Live URL and open-source GitHub repository proof.

---

## D. Evidence Checklist

Before writing the case study, collect and verify the following evidence artifacts:

- [ ] **Live URL:** Verified production URL (e.g. `https://frontend-ai-capstone-aditya.netlify.app/`)
- [ ] **GitHub Repository:** Absolute URL to repository (e.g. `https://github.com/Adityasri05/frontend-ai-capstone`)
- [ ] **Source Code Files:** Absolute file paths to core implementation (e.g. `agent/hackscout_agent.py`)
- [ ] **Test / Eval Evidence:** Log files or test output demonstrating 100% pass score (e.g. `agent/eval_runner.py`)
- [ ] **Screenshots / Diagrams:** Clear visual assets of user interface or architectural data flow
- [ ] **Measurable Outcomes:** Verifiable numbers (Lighthouse 96/100, 60 FPS, 0 KB extra bundle, 7/7 eval cases)

---

## E. Final Publishing Checklist

Run this quick audit prior to committing the new case study:

- [ ] **Problem is clear:** Explicitly stated in first 5 seconds of reading
- [ ] **My contribution is clear:** Personal ownership and design choices highlighted
- [ ] **Outcome is supported by evidence:** Supported by empirical metrics, no fabricated scores
- [ ] **Screenshots are real:** Assets exist in `public/` and render clearly
- [ ] **Links work:** All internal routes (`/projects`) and external links (GitHub/Live) resolve
- [ ] **Mobile layout works:** Verified on 375px mobile viewport without horizontal overflow
- [ ] **Accessibility intact:** Headings follow `h1` → `h2` → `h3` hierarchy; contrast > 15:1
- [ ] **SEO metadata updated:** Page `title` and `description` defined
- [ ] **Build passes:** `npx tsc --noEmit` and `npm run build` complete with zero errors
- [ ] **Live page verified:** Netlify production URL verified after git push
- [ ] **Portfolio index updated:** `src/app/projects/page.tsx` displays the new card
