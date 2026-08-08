# HIREVIUM AI-Assisted React Application — AI Mistakes Log

This log documents the genuine mistakes identified in the initial code templates and during development, outlining why they occurred and how they were corrected.

---

## Mistake 1: Data Model Property Mismatch (TypeScript & Functional Bug)

### Mistake
The `FilterPanel.tsx` component allowed recruiters to check boxes for technology skills (React, Next.js, Node.js, Python, PyTorch) to filter candidates. However, the candidate data schema defined in `SpecDashboard.tsx` (`VettedCandidate`) did not contain any property to store candidate skills or tech stacks.

### Why It Was Wrong
This created a type error and functional blocker. If we attempted to filter candidates by tech stacks inside the parent case study page, TypeScript threw a compiler warning because `candidate.techStack` did not exist. Functionally, selecting technologies in the Filter Panel had zero impact because the dashboard could not verify candidate compatibility.

### My Fix
I manually modified the `VettedCandidate` interface inside `src/app/dashboard/recruiter/components/SpecDashboard.tsx` to add `techStack: string[]`. I then populated this array for all mock candidates (e.g., adding `['React', 'Next.js', 'Node.js', 'Python', 'PyTorch']` for Aditya's candidate card) and implemented the matching filter query using a strict `.every()` verification array search.

### Lesson
AI often generates files in isolation. If a dashboard is split into separate input panels and list displays, the AI might not align the data properties between files. Developers must verify interface parity before integrating components.

---

## Mistake 2: Omission of Layout Layout Components (Rendering Bug)

### Mistake
When generating the layout replacement chunk for `src/app/layout.tsx` to wrap pages with the common header and footer, the AI omitted the `<Footer />` tag in the layout's TSX output, though it correctly imported it.

### Why It Was Wrong
This led to a page layout error where the footer was not rendered. The page ended abruptly after the main children body, which violated our sitemap spec and personal branding designs.

### My Fix
I manually reviewed the file change diff and added the `<Footer />` component call immediately below the `<main>` tag, aligning it with a sticky flex container structure.

### Lesson
Always verify that imports are actually rendered in the JSX. AI can occasionally import a component but forget to instantiate it in the return statement.

---

## Mistake 3: Zero-Duration Asynchronous UI States (UX Bug)

### Mistake
In the sync scores action handler, the AI initially wrote a sync callback that updated the scores instantaneously.

### Why It Was Wrong
Because the mock sync occurred in 0 milliseconds, the UI resolved immediately. This made it impossible for users to see the loading skeleton states, the "Syncing..." button indicator, or the React 19 transition animation. From a user's perspective, the sync action felt broken or static because the transition was too fast to register.

### My Fix
I manually wrapped the sync scoring logic inside a proper JavaScript `Promise` that resolves after a 700ms `setTimeout` delay. This simulated network latency, allowing the React 19 `useTransition` state (`isPending`) to correctly trigger loading skeleton animations in the UI.

### Lesson
Loading fallbacks and skeletons cannot be evaluated or enjoyed if async hooks execute instantly. Adding realistic network latency to mock API interfaces is necessary to audit and confirm the user experience.

---

## Mistake 4: Keyboard Accessibility Focus Loss (a11y Bug)

### Mistake
When the interactive candidate `TwinDrawer` details panel was closed (either by clicking the close button or pressing the `Escape` key), the keyboard focus defaulted back to the document `body` instead of returning to the button that triggered the drawer.

### Why It Was Wrong
This is a standard Web Accessibility (a11y) violation. When focus is lost to the document body, a keyboard-only user must tab through the entire page layout from the top of the document to get back to the candidate cards, which creates a frustrating user journey.

### My Fix
I updated the drawer trigger callback to record the button that initiated the click (`document.activeElement`) and stored it in a reference. Upon drawer dismissal, I manually called `.focus()` on the stored trigger element.

### Lesson
Keyboard accessibility is more than just focus trapping while a panel is open; managing focus transitions on panel dismissal is just as critical to satisfying WCAG accessibility checks.
