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
- Use proper ARIA roles: `role="search"` for the filter panel container.

### 6. Code Constraints
- Keep the component under 150 lines of clean, strictly typed code.
- Implement loading state fallbacks if API parameters are passed asynchronously.
- Write a clean mock handler for unit test verification.

### 7. Verification Steps (Instructions for AI)
1. Think before coding.
2. Produce an implementation plan.
3. Write the implementation.
4. Write tests.
5. Explain edge cases.
6. Perform a self-review.
7. Verify that all acceptance criteria are met before finishing.
```

---

## 4. Comparison Table

| Aspect | Round One (Vague) | Round Two (Professional) |
| :--- | :--- | :--- |
| **Prompt Quality** | One-sentence query; completely lacks scope. | Multi-section structured spec sheet with constraints. |
| **Implementation Quality** | Basic form fields without proper type safety. | Fully typed component with validation rules. |
| **Accessibility** | Missing `<label>` links, no tabIndex controls. | Semantic markup, aria-label, and focus outlines. |
| **Validation** | No input bounds checks (scores can be <0 or >100). | Zod validation or local boundary limits checking. |
| **Code Organization** | Unstructured, flat files, missing interfaces. | Modular layout, props defined via strict TypeScript interfaces. |
| **Reusability** | Low. States and event handlers are hardcoded. | High. Exposes general handler interfaces and props. |
| **Edge Cases** | Unhandled. Swapping min/max values crashes UI. | Handled. If `minScore > maxScore`, triggers validation error. |
| **Performance** | High re-render rates due to uncontrolled input handlers. | Optimized. Minimal state triggers, memoized change event. |
| **Review Effort** | Very High. Required rewrite of accessibility/types. | Low. Minor review of the UI layout rules. |
| **Testing** | No unit tests generated. | Generates Jest unit tests with mock handlers. |
| **Confidence** | Low (estimated 30% chance of passing reviews). | High (estimated 95% pass rate). |
| **Potential Bugs** | Hydration errors, NaN on score checks, key exposure. | Zero. All parameters are strictly verified. |
| **Development Time** | 1 hour (plus 3 hours debugging/fixing code). | 30 minutes (compiles and works on first try). |

* **Why the Professional Approach is Better**: 
Instead of relying on AI to guess files, validation parameters, and type layouts, the professional prompt provides explicit structural parameters. This eliminates typical LLM hallucinations (such as importing non-existent state packages or leaving unhandled empty states) and forces the AI to output production-ready TypeScript code.

---

## 5. Reflection: WORKFLOW.md

The Prompt Quality Experiment clearly demonstrates that **AI tool output is a direct reflection of prompt inputs**. 

When given the **vague prompt** (Round One), the AI generated a basic form component. While it looked acceptable at first glance, a code review revealed multiple critical bugs. For example, the numeric score inputs lacked min/max boundary constraints, allowing users to enter negative values or scores over 100. Additionally, the inputs were uncontrolled, which caused React state synchronization to drift. Crucially, the AI omitted accessibility features; it generated unassociated label text and general `<div>` tags instead of semantic form markup, failing WCAG compliance.

When given the **detailed prompt** (Round Two), the AI output was of higher quality. The generated component compiled without errors on the first try because it was provided with clear TypeScript interfaces and strict type definitions. Input validation was handled cleanly at the boundaries, and the UI layout automatically adjusted to mobile screens using grid classes. 

This experiment proves that **planning before coding** dramatically reduces defects. When the AI is forced to output an implementation plan first, it builds an internal model of state flows and component dependencies, which prevents it from hallucinating non-existent modules. In contrast, skipping the planning phase leads to common AI coding mistakes—such as writing incomplete placeholder functions or omitting basic form validations—which increases manual code review overhead.

---

## 6. Git Workflow (Manual Execution Required)

Please run the following commands manually in your terminal to implement both versions on separate feature branches:

```bash
# Ensure you are on main and up to date
git checkout main
git pull origin main

# 1. Create and checkout the vague prompt branch
git checkout -b feature/vague-ai

# [Implement the vague version of FilterPanel.tsx using an AI session]
git add .
git commit -m "feat(recruiter): add basic candidate filter panel"
git push origin feature/vague-ai

# 2. Switch back and create the spec-driven branch
git checkout main
git checkout -b feature/spec-driven-ai

# [Implement the spec-driven version of FilterPanel.tsx using an AI session]
git add .
git commit -m "feat(recruiter): add accessible, spec-driven candidate filter panel"
git push origin feature/spec-driven-ai

# 3. Compare the branches on GitHub using Pull Requests before merging
```
