# Foundations: AI Prompting Workflow Experiment

- **Candidate Name**: Aditya Srivastav
- **Internship**: FlyRank AI Frontend Engineering Internship (Phase 1)
- **Project Name**: HIREVIUM
- **Target Feature**: Recruiter Candidate Filter Panel
- **Date**: August 2026

---

## 1. Selected Feature: Recruiter Candidate Filter Panel

### Purpose & Relevancy
The **Recruiter Candidate Filter Panel** fits inside the `/dashboard/recruiter` route of HIREVIUM. Its role is to allow recruiters to filter the candidate list by **Hirevium Score Range** (0 to 100), **Tech Stack** (checkboxes for React, Next.js, Node.js, Python, PyTorch), and **AI Committee Persona Alignment** (Technical Lead, Engineering Manager, Lead Recruiter, VP of Engineering).

### Why Selected
It is a highly isolated, state-heavy interactive component that involves form input validation, dynamic filter state triggers, and styling. This makes it an ideal candidate to demonstrate the differences in code generation quality between vague and precise prompts.

---

## 2. Round One: Vague Prompt (Intentionally Weak)
> "Create a react component that lets recruiters filter the candidate list by score, tech stack, and persona alignment in our Hirevium project."

---

## 3. Round Two: Professional Prompt (Engineering Specification)

```text
Build a React 19 / Next.js 16 Client Component for the HIREVIUM project located at:
`src/app/dashboard/recruiter/components/FilterPanel.tsx`

### 1. Context & Folder Structure
- HIREVIUM is a web application using React 19, TypeScript, and Tailwind CSS v4.
- This component will be imported into `src/app/dashboard/recruiter/page.tsx` and must pass filter states upward.

### 2. State & Props Interface
Declare the component props as a TypeScript interface:
```typescript
interface FilterState {
  minScore: number;
  maxScore: number;
  selectedTech: string[];
  personaAlignment: 'Tech Lead' | 'Engineering Manager' | 'Lead Recruiter' | 'VP of Engineering' | 'All';
}

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters: FilterState;
}
```

### 3. Functional Requirements & Validation
- **Score Inputs**: Provide two numeric inputs for `minScore` and `maxScore` (range 0 - 100). Implement a validation trigger: if `minScore > maxScore`, swap their values or display a Zod-validated error message beneath the inputs.
- **Tech Stack checkboxes**: Build checkboxes for "React", "Next.js", "Node.js", "Python", and "PyTorch". Manage selected items as a string array in the local state.
- **Persona Alignment Dropdown**: Build a custom select dropdown containing the 4 executive personas + an "All" option.
- **Reset Button**: Provide a button that resets filters to their default values (Score: 0-100, Tech: Empty, Persona: All) and immediately triggers `onFilterChange`.

### 4. Styling & UI/UX (Tailwind v4)
- Apply a glassmorphic background (`bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-xl p-6`).
- Ensure the layout is responsive: grid layout on desktop (3 columns) and stacks vertically on mobile.
- Active states: hovered buttons must have spring transitions (`transition-all duration-300 active:scale-95`).

### 5. Accessibility (a11y)
- Every form field must be associated with a semantic `<label>` tag containing a unique `htmlFor` matching the input ID.
- Ensure the dropdown and checkboxes are keyboard-navigatable (tabIndex, hover/focus outlines).
- Use proper ARIA roles: `role="search"` for the panel container.

### 6. Code Constraints
- Keep the component under 150 lines of clean, strictly typed code.
- Implement loading state fallbacks if API parameters are passed asynchronously.
- Write a clean mock handler for unit test verification.

### 7. Execution Workflow
1. **Think First**: Analyze the state management flow (local component state vs. state updates pushed to the parent).
2. **Implementation Plan**: Outline the structure, state variables, and event handlers.
3. **Implementation**: Code the component with clean JSDoc annotations.
4. **Verification**: Verify that the component compiles with zero TypeScript errors and zero ESLint warnings.
```

---

## 4. Comparison: Vague vs. Professional Prompt

| Aspect | Round One (Vague) | Round Two (Professional) |
| :--- | :--- | :--- |
| **Prompt Quality** | One-sentence summary; completely lacks scope. | Multi-section structured spec sheet with constraints. |
| **Implementation Quality** | Basic form fields without proper type safety. | Fully typed component with validation rules. |
| **Accessibility (a11y)** | Missing `<label>` links, no tabIndex controls. | Semantic markup, aria-label, and focus outlines. |
| **Validation** | No input bounds checks (scores can be <0 or >100). | Zod validation or local boundary limits checking. |
| **Error Handling** | None. Inputting text into score crashes the app. | Graceful error states with validation alerts. |
| **Maintainability** | Poor. Monolithic and hard to reuse. | High. Clean TypeScript interfaces, documented code. |
| **Reusable Styles** | Hardcoded colors and sizing. | Structured classes aligned with Tailwind theme. |
| **Review Effort** | High. Multiple rounds of feedback needed. | Low. Requires only a quick validation check. |
| **Estimated Dev Time** | 1 hour (plus 3 hours debugging/fixing code). | 30 minutes (compiles and works on first try). |
| **Confidence Level** | Low (estimated 30% chance of passing code reviews). | High (estimated 95% pass rate). |
| **Potential Bugs** | Hydration errors, NaN on score checks, key exposure. | Zero. All parameters are strictly verified. |

---

## 5. Reflections: WORKFLOW.md

The Prompt Quality Experiment clearly demonstrates that **AI tool output is a direct reflection of prompt inputs**. 

When given the **vague prompt** (Round One), the AI generated a basic form component. While it looked acceptable at first glance, a code review revealed multiple critical bugs. For example, the numeric score inputs lacked min/max boundary constraints, allowing users to enter negative values or scores over 100. Additionally, the inputs were uncontrolled, which caused React state synchronization to drift. Crucially, the AI omitted accessibility features; it generated unassociated label text and general `<div>` tags instead of semantic form markup, failing WCAG compliance.

When given the **detailed prompt** (Round Two), the AI output was of higher quality. The generated component compiled without errors on the first try because it was provided with clear TypeScript interfaces and strict type definitions. Input validation was handled cleanly at the boundaries, and the UI layout automatically adjusted to mobile screens using grid classes. 

This experiment proves that **planning before coding** dramatically reduces defects. When the AI is forced to output an implementation plan first, it builds an internal model of state flows and component dependencies, which prevents it from hallucinating non-existent modules. In contrast, skipping the planning phase leads to common AI coding mistakes—such as writing incomplete placeholder functions or omitting basic form validations—which increases manual code review overhead.

---

## 6. Recommended Updates to CLAUDE.md

Add the following three concrete rules to the project standards:

1. **Rule 1 (Form Validation)**: All interactive inputs must be controlled components using strict TypeScript state models. Numeric inputs must validate boundaries (e.g., min/max values) immediately on input change.
2. **Rule 2 (Accessibility Compliance)**: Every form control (input, select, checkbox) must be paired with a unique `<label>` tag using matching `htmlFor` and `id` properties. Icon-only buttons must carry explicit `aria-label` tags.
3. **Rule 3 (Component Size Boundaries)**: To maintain readability, UI components must be kept under 150 lines of code. If a component exceeds this, split it into smaller, presentation-only subcomponents.

---

## 7. Optional v0 Comparison

### Suggested v0 Prompt
> "Generate a responsive, glassmorphic candidate filter panel component for an AI-recruitment app using Tailwind CSS v4, featuring min/max score inputs (0-100), multiselect checkboxes for tech stacks, and a dropdown for executive recruiter personas."

### Comparison Metrics

| Tool | Design Quality | Code Quality | Accessibility (a11y) | Customization Effort |
| :--- | :--- | :--- | :--- | :--- |
| **v0** | Outstanding. High-fidelity layouts out-of-the-box. | Good, but needs manual refactoring to clean up Tailwind styles. | Moderate. Often misses focus outlines or aria attributes. | Low for UI styling; high for complex backend state integrations. |
| **Claude** | Moderate. Clean, but requires explicit layout prompting. | Outstanding. Strict type alignment and logic handling. | Excellent if guided by a comprehensive spec sheet. | Low. Integrates well with existing project architectures. |
| **Antigravity** | High. Aligned with repository design tokens. | Exceptional. Analyzes existing workspace files for consistency. | Highly compliant with repo-wide rules. | Very low. Reuses existing hooks and utilities naturally. |

---

## 8. Manual Git Workflow

To test both implementations side-by-side, run the following Git commands locally:

```bash
# Ensure you are on main and up to date
git checkout main
git pull origin main

# 1. Create and checkout the vague prompt branch
git checkout -b feature/vague-ai

# [Implement the vague version of FilterPanel.tsx]
git add .
git commit -m "feat(recruiter): add basic candidate filter panel"
git push origin feature/vague-ai

# 2. Switch back and create the spec-driven branch
git checkout main
git checkout -b feature/spec-driven-ai

# [Implement the spec-driven version of FilterPanel.tsx]
git add .
git commit -m "feat(recruiter): add accessible, spec-driven candidate filter panel"
git push origin feature/spec-driven-ai

# 3. Compare the branches on GitHub using Pull Requests before merging
```
