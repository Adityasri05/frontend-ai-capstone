# HIREVIUM AI-Assisted React Portfolio

Welcome to the **HIREVIUM & Developer Portfolio** workspace. This repository contains the Next.js 15, React 19, and Tailwind CSS portfolio website for **Aditya Srivastav**, built as a capstone project for the FlyRank AI Frontend Engineering Internship.

Rather than just showing a list of skills, this portfolio provides interactive, high-fidelity proof of Aditya's ability to build secure, responsive React frontends that interface with AI agents.

---

## 1. Core Features

* **Home Page (`/`)**: Introduces Aditya's positioning statement, custom technical skill tabs (Frontend vs. AI/ML), and an AI Hackathon achievement timeline.
* **Terminal CLI Simulator (`TerminalView`)**: An interactive command-line simulator on the landing page that allows users to type commands (`help`, `about`, `skills`, `git`, `clear`) to inspect git logs and skill percentages.
* **Hirevium Case Study (`/projects/hirevium`)**: The technical deep-dive. Features:
  * A system architecture diagram mapping client -> FastAPI server proxy -> Gemini 2.5 Flash Lite workflow.
  * A **Dashboard Code Compare** toggler showing the contrast between a broken, unstyled component and a modern accessible workspace.
  * A **Live Vetting Simulator** integrating the `FilterPanel` and `SpecDashboard` with full filtering queries (Scores, Tech, and Personas).
  * A **Sync Scores** button utilizing React 19 concurrent `useTransition` to animate sync states and render pulse loading skeletons.
  * A **Candidate Twin Drawer** details panel with keyboard focus trapping, Esc key triggers, displaying simulated vector similarity matches and security proxy tokens.
* **Resume Page (`/resume`)**: A clean, scannable resume highlighting education, internship experience, and projects. Optimized with custom Tailwind print styles to export a perfect single-page PDF.

---

## 2. Tech Stack

* **Framework**: Next.js 15.1.0 (App Router)
* **Core Library**: React 19.0.0 (Strict Mode, Concurrent Features)
* **Language**: TypeScript 5.7.2 (Strict compilation)
* **Styling**: Tailwind CSS 4.0.0 (Utility-first, CSS imports)
* **Environment**: Node.js v20+

---

## 3. Project Structure

The project directory structure is laid out as follows:

```text
src/
├── app/
│   ├── globals.css                # Tailwind CSS global styles
│   ├── layout.tsx                 # Root layout with Navbar and Footer
│   ├── page.tsx                   # Interactive landing page with TerminalView
│   ├── resume/
│   │   └── page.tsx               # Print-ready scannable Resume page
│   └── projects/
│       └── hirevium/
│           └── page.tsx           # Case study with filter-matching dashboard
├── components/
│   ├── common/
│   │   ├── Navbar.tsx             # Responsive header menu with LinkedIn CTA
│   │   └── Footer.tsx             # Anchor footer for professional CTA
│   └── features/
│       ├── TerminalView.tsx       # Interactive shell command CLI mockup
│       └── TwinDrawer.tsx         # Slide-out candidate vetting report drawer
```

---

## 4. AI-Assisted Development & Manual Improvements

This application was developed using an AI-assisted loop: **PLAN → IMPLEMENT → REVIEW → TEST → IMPROVE**. 

AI-generated code was critically reviewed and corrected manually to resolve bugs:
1. **Component Interface Parity**: Resolved a mismatch between `FilterPanel.tsx` (filtering by tech skills) and `SpecDashboard.tsx` (candidate schema lacked a skills array) by updating interfaces and writing matching checks.
2. **Missing Component Instantiations**: Resolved layout bugs where the AI imported the Footer in `layout.tsx` but failed to instantiate it in the returned JSX tree.
3. **Transition Skeletons**: Wrapped scoring synchronization in a 700ms `Promise` timeout to ensure loading skeletons and React 19 transition animations are visible to the user.
4. **Keyboard Accessibility (a11y)**: Configured focus-restoration logic inside the slide drawer to prevent focus loss to the document body on dismissal.

For complete logs, view:
* [PROJECT_SPEC.md](file:///d:/Hackathon/frontend-ai-capstone/PROJECT_SPEC.md)
* [AI_DEVELOPMENT_LOG.md](file:///d:/Hackathon/frontend-ai-capstone/AI_DEVELOPMENT_LOG.md)
* [AI_MISTAKES.md](file:///d:/Hackathon/frontend-ai-capstone/AI_MISTAKES.md)
* [TESTING.md](file:///d:/Hackathon/frontend-ai-capstone/TESTING.md)
* [SUBMISSION.md](file:///d:/Hackathon/frontend-ai-capstone/SUBMISSION.md)

---

## 5. Running Locally

### Installation
Install the dependencies:
```bash
npm install
```

### Development Server
Run the local dev server:
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to inspect the interactive portfolio.

### Production Build
Verify the production build:
```bash
npm run build
```

---

## 6. License
This project is licensed under the MIT License. See [LICENSE](file:///d:/Hackathon/frontend-ai-capstone/LICENSE) for details.