# CLAUDE.md — AI Assistant Guidelines

Welcome! This file establishes the development environment, engineering standards, architecture, and directives for AI code assistants working in the `frontend-ai-capstone` repository. Adhere strictly to these principles.

---

## 1. Project Overview & Technology Stack

The `frontend-ai-capstone` is a premium, AI-assisted frontend application designed as a capstone project for the FlyRank AI Frontend Engineering Internship.

- **Node.js**: LTS version (v20+)
- **Next.js**: 15.x (App Router)
- **React**: 19.x
- **TypeScript**: 5.x (strict configuration)
- **Tailwind CSS**: 4.x/3.x
- **AI Coding Tooling**: Claude Code, Gemini, Copilot

---

## 2. General AI Assistant Instructions

- **Understand First**: Always check existing components and patterns before proposing or writing code. Reference `CLAUDE.md` guidelines at the start of tasks.
- **Provide Actionable & Dry Code**: Avoid generic or incomplete placeholders. Write clean, complete, typed code.
- **Maintain Documentation Integrity**: Preserve file headers, markdown structures, and existing docstrings unless instructed to delete them.
- **Explain Intent, Not Code**: Explain *why* a design pattern was used rather than reciting what the code does line-by-line.

---

## 3. Folder Structure & Layout

Maintain the following standard App Router project architecture:

```text
frontend-ai-capstone/
├── .vscode/               # Workspace configuration
├── public/                # Static assets (images, fonts, SVG icons)
├── src/
│   ├── app/               # Next.js App Router (pages, layouts, API routes)
│   │   ├── globals.css    # Tailwind CSS and global style directives
│   │   ├── layout.tsx     # Root layout wrapper
│   │   └── page.tsx       # Landing page root
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # Atomic, primitive components (buttons, inputs)
│   │   └── common/        # Multi-page layouts (header, footer, nav)
│   ├── hooks/             # Custom React Hooks
│   ├── lib/               # Utility libraries, client SDK configurations
│   ├── types/             # Shared TypeScript type declarations
│   └── context/           # React context providers for state management
├── CLAUDE.md              # AI engineering standards & rules
├── README.md              # Repository overview & setup guide
├── LICENSE                # MIT license agreement
└── package.json           # Scripts and package dependencies
```

---

## 4. Coding Standards & Conventions

### Naming Conventions
- **Files**: Use kebab-case for directories and helper files (e.g., `event-utils.ts`, `data-fetching/`). Use PascalCase for component files (e.g., `Button.tsx`, `SiteShell.tsx`).
- **Variables & Functions**: Use `camelCase`.
- **Types & Interfaces**: Use `PascalCase`. Prefer prefixing interfaces with nothing (avoid `I`).
- **Constants**: Use `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`).

### TypeScript Rules
- Set `strict: true` in `tsconfig.json`.
- **No `any`**: Explicitly type all variables, function arguments, and return types. Use `unknown` or generics if dynamic behavior is needed.
- **Discriminated Unions**: Prefer discriminated unions over boolean flags for UI states (e.g., `status: 'idle' | 'loading' | 'success' | 'error'`).
- Use `type` for simple data containers/unions, and `interface` for shapes that need declaration merging or extension.

### React 19 Best Practices
- **Server vs. Client Components**:
  - Keep core UI pages as **Server Components** (`use client` omitted) for SEO, quick page load, and minimized client bundle size.
  - Apply `"use client"` at the leaf node level for interactive sub-components (buttons, modals, forms).
- **React Hooks**:
  - Standardize on `useTransition` and `useActionState` for handling loading and error states during actions.
  - Avoid unnecessary `useEffect` calls. Derive state values synchronously or fetch data on the server instead.
- **Compiler Compatibility**: Write standard JavaScript/TypeScript without complex hacks; keep code clean to support the upcoming React Compiler optimization.

---

## 5. Styling Guidelines (Tailwind CSS)

- **Utility Classes**: Arrange Tailwind classes in a consistent order:
  1. Layout & Display (`flex`, `grid`, `block`, `relative`, `absolute`)
  2. Spacing & Sizing (`m-4`, `p-2`, `w-full`, `h-screen`)
  3. Typography (`text-lg`, `font-bold`, `tracking-wider`)
  4. Colors & Borders (`bg-slate-900`, `text-slate-100`, `border-slate-800`)
  5. Interactive/State modifiers (`hover:bg-indigo-600`, `focus:ring-2`)
- **Theme Usage**: Reference theme-based tokens. Avoid hardcoding random hex values (e.g., use `bg-slate-900` rather than `bg-[#0f172a]`), unless explicitly required.
- **Tailwind v4 Directive**: Use `@import "tailwindcss";` at the top of the main CSS files instead of legacy `@tailwind base;` directives.

---

## 6. Accessibility (a11y) Requirements

- **Semantic Tags**: Prefer semantic HTML elements (`<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`, `<button>`) over general `<div>` tags.
- **Interactive Elements**: Every interactive control must be keyboard navigatable (proper `tabIndex`, hover/focus states).
- **ARIA Attributes**: Supply descriptive `aria-label` tags for buttons or links containing only icon assets.
- **Color Contrast**: Verify styling complies with WCAG AA standards (minimum contrast ratio of 4.5:1).

---

## 7. Performance & Optimization

- **Image Optimization**: Always use Next.js `<Image />` component for automatic sizing, WebP conversion, and lazy loading.
- **Font Strategy**: Rely on `next/font` for localizing Google Fonts to eliminate layout shifts (CLS).
- **Lazy Loading**: Use dynamic imports (`next/dynamic`) to split heavy component chunks that do not need to be loaded during initial paint.

---

## 8. Error Handling & Validation

- **Boundary Safety**: Wrap dynamic interface components in React `ErrorBoundary` handlers.
- **Input Validation**: Use client-side validations via robust schema validation libraries (e.g., Zod) before sending payloads.
- **Next.js Conventions**: Provide `error.tsx` and `not-found.tsx` overrides for each route group.

---

## 9. Documentation & Code Review Checklist

### Documentation Standards
- Write clean JSDoc syntax for complex helper functions and hook definitions.
- Keep `README.md` updated as new major feature routes are established.

### Code Review Checklist
- Does the change break Next.js server component rendering?
- Are all TypeScript variables fully and strictly typed?
- Is contrast, screen-reader support, and keyboard access preserved?
- Are loading states (`Suspense`) and fallback views implemented?

---

## 10. Conventional Commits & Git Rules

All commits must adhere to the Conventional Commits specification:

- **`feat:`**: A new feature implementation
- **`fix:`**: A bug fix
- **`docs:`**: Documentation-only updates (e.g., `CLAUDE.md`, comments)
- **`style:`**: Styling changes that do not affect code logic (e.g., Tailwind styling tweaks)
- **`refactor:`**: Code changes that neither fix bugs nor add features
- **`perf:`**: Performance improvements
- **`test:`**: Adding or correcting tests
- **`chore:`**: Maintenance, package updates, configuring project tools

Format: `<type>(<optional scope>): <description>`  
Example: `feat(ui): add accessible Modal component with focus-trap`
