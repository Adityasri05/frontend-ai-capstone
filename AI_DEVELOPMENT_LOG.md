# HIREVIUM AI-Assisted React Application — Development Log

This document records the exact development timeline, prompts, AI interactions, and manual corrections made during the building of Aditya Srivastav's AI-Assisted React Portfolio.

---

## Feature 1: Project Setup & Navigation Layout

### Prompt Used
> "Help me set up the common navigation and structure for my Next.js 15 / React 19 app. I need a glassmorphic Navbar with links to Home, Case Study, and Resume, plus a prominent LinkedIn CTA button. Create the Footer component with my AI positioning statement: 'I build responsive React frontends that communicate securely with Gemini 2.5 Flash Lite agents...'. Wrap these inside a layout that matches my dark theme and has a sticky-footer flex structure."

### AI Contribution
* Generated the Navbar component at `src/components/common/Navbar.tsx` with mobile menu states.
* Generated the Footer component at `src/components/common/Footer.tsx`.
* Proposed the replacement chunk for `src/app/layout.tsx` to wrap children with the Navbar and Footer inside a flex-col box.

### My Review
* Checked that page links correctly map to `/`, `/projects/hirevium`, and `/resume`.
* Verified that metadata parameters are updated to represent Aditya's profile.

### Problems Found
* The initial generation of `layout.tsx` omitted the `<Footer />` component in the JSX structure, rendering only the `<Navbar />` and children.

### Manual Improvements
* Corrected the JSX structure in `src/app/layout.tsx` to include the `<Footer />` tag immediately below the `<main>` container.
* Added custom responsive print classes (`print:hidden` on Navbar, footer, and buttons) to ensure that layout controls do not clutter paper or PDF print sheets.

### Final Result
The layout loads with a cohesive dark backdrop. The Navbar remains sticky on scrolling, and the Footer is aligned at the bottom of thin pages.

---

## Feature 2: Terminal Command Simulator (Home Page)

### Prompt Used
> "Create a command line simulator component called TerminalView in TypeScript. It should let visitors interact with a mock console using standard inputs. Support these commands: help, about, skills, git, clear. Make the styling dark, green-prompted, and place it in a separate file to respect our 150-line component size boundary."

### AI Contribution
* Designed `src/components/features/TerminalView.tsx` with local state management for historical line arrays and input strings.
* Written command outputs: `about` prints Aditya's profile summary; `skills` shows mock ASCII competency bars; `git` lists commits corresponding to the development logs.
* Used refs to automatically scroll the terminal output container to the bottom.

### My Review
* Ensured the form submission correctly halts defaults (`e.preventDefault()`).
* Check that CLI body clicks focus the input.

### Problems Found
* Pressing enter in the terminal form caused parent form triggers when integrated in complex layouts.

### Manual Improvements
* Wrapped the command handler in a specific form submission check, isolating the input box and ensuring focus shifts appropriately.
* Added keyboard `aria-label` tags to the terminal command input to ensure screen reader compatibility.

### Final Result
The landing page includes an interactive, scrollable terminal mockup that acts as a compelling differentiator for tech leads inspecting the portfolio.

---

## Feature 3: Spec Vetting Dashboard Mismatch (State Management)

### Prompt Used
> "We are integrating the SpecDashboard candidate list and the FilterPanel filters. I noticed a property mismatch in the provided components. FilterPanel handles filtering by technologies (selectedTech: string[]), but the VettedCandidate interface in SpecDashboard doesn't contain a tech list. Help me edit the interface and candidate mock data to resolve this compile error."

### AI Contribution
* Modified `src/app/dashboard/recruiter/components/SpecDashboard.tsx` to include the `techStack: string[]` parameter in the `VettedCandidate` type interface.

### My Review
* Checked that editing the interface did not break any other properties in the component.

### Problems Found
* While the interface was updated, the original component did not render or indicate the technologies on the candidate cards.

### Manual Improvements
* Implemented the candidate filtering logical match in the parent Case Study page, writing a filter matching method that performs a strict `.every()` verification on selected technology checkboxes.
* Added technology tag bubbles to the candidate list cards in the dashboard demo to make technology filters visually trackable.

### Final Result
Recruiters can select checkboxes like "React" or "Python" in the Filter Panel, and the candidate list will filter correctly.

---

## Feature 4: Candidate Twin Drawer (Accessibility & a11y)

### Prompt Used
> "Build a TwinDrawer sliding details panel to render Candidate assessment details, PyTorch embedding confidences, FastAPI proxy status logs, and simulated interview transcript snippets. The drawer must be fully accessible: contain a focus trap inside the drawer, handle Esc key dismissals, and dim the background with a backdrop blur overlay."

### AI Contribution
* Created `src/components/features/TwinDrawer.tsx` incorporating overlays and text blocks.
* Designed standard modal structures with keyboard event listeners.

### My Review
* Evaluated keyboard tab indices.
* Check focus trapping loops.

### Problems Found
* The drawer did not return focus to the trigger button when dismissed.
* The backdrop click overlay did not have an interactive key listener or correct ARIA roles, which can trigger screen reader warnings.

### Manual Improvements
* Handled focus transitions by saving the active trigger button and restoring focus to it upon closing the drawer.
* Configured the backdrop with `aria-hidden="true"` and isolated the key handler strictly to the dialog elements to satisfy a11y checkers.
* Implemented custom print CSS filters so that the drawer is hidden when the resume/page is printed.

### Final Result
Clicking "View Twin" on a candidate card opens a slide drawer with vector analysis. Users can tap `Escape` to close the panel.

---

## Feature 5: Async Vetting Sync (Error & Transition Handling)

### Prompt Used
> "Create the Case Study page for HIREVIUM at src/app/projects/hirevium/page.tsx. I want to show the full case study description, a system architecture ASCII flow, a code toggle to compare our unstyled FailedDashboard with the SpecDashboard, and integrate the FilterPanel and SpecDashboard. For the Sync Scores sync button, use React 19 useTransition to manage asynchronous state updates and show loading skeletons."

### AI Contribution
* Wrote `src/app/projects/hirevium/page.tsx`.
* Implemented state trackers for filtering, active layouts, loading flags, and sync states.
* Configured the dashboard comparison toggle.

### My Review
* Ensured page compiles correctly in strict mode.
* Verified that clicking "Sync Scores" displays the loading skeletons.

### Problems Found
* The async transition function did not correctly block UI indicators because the mock resolver resolved instantly, rendering skeletons for only 1ms.

### Manual Improvements
* Modified the sync scores resolver to return a proper Javascript `Promise` that awaits a 700ms timeout before completing. This allows the React 19 `useTransition` transition state (`isPending`) to correctly trigger and animate the sync indicator in the UI.

### Final Result
Clicking "Sync Scores" triggers a smooth React transition, updating scores dynamically after a short mock network delay.
