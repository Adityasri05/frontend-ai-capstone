# CLAUDE.md — AI Engineering Guild Standards

Welcome! This file establishes the development standards, architecture rules, and collaboration directives for AI code assistants working in the `frontend-ai-capstone` repository.

---

## 1. Project Overview
The `frontend-ai-capstone` is a premium web application developed for the FlyRank AI Frontend Engineering Internship. The project serves as an evaluation framework for autonomous frontend engineering.

---

## 2. Tech Stack
- **Next.js**: 15.x (using App Router, Server/Client component separations)
- **React**: 19.x (utilizing compiler compatibility, modern hooks)
- **TypeScript**: 5.x (strict type checks)
- **Tailwind CSS**: 4.x/3.x (compiled via modern directives)
- **Node.js**: LTS (v20+)
- **Developer Tooling**: Claude Code, Cursor, Git, VS Code

---

## 3. Architecture Principles
- **Server-First Hydration**: Rely on Server Components (`use client` omitted) for page composition, initial rendering, and SEO optimizations.
- **Leaf-Node Interaction**: Limit Client Components (`"use client"`) to low-level leaf components requiring user actions (inputs, tabs, buttons, toggles).
- **Zero Placeholders**: Do not check in boilerplate text, incomplete methods, or mock mockups. Write complete, functional implementations.
- **Uncompromising Visuals**: Implement elegant gradients, state transitions, micro-interactions, responsive padding, and curated color palettes.

---

## 4. Coding Standards
- **Clean Code**: Follow DRY (Don't Repeat Yourself) and KISS (Keep It Simple, Stupid) standards.
- **Formatting**: Maintain consistent spacing, double-quotes for TSX attributes, and single-quotes for JavaScript strings.
- **JSDoc**: Annotate complex utility methods, parameters, and hook return values.

---

## 5. React Best Practices
- **Actions API**: Use React 19's form actions and transitioning hooks (`useTransition`, `useActionState`, `useFormStatus`) to manage mutation states, pending flags, and error callbacks.
- **Suspense Boundaries**: Wrap asynchronous server fetch components or client-rendered lazily imported panels in `<Suspense>` loaders to improve visual feedback.
- **Ref forwarding**: Avoid legacy `forwardRef` API; in React 19, pass `ref` as a standard prop.

---

## 6. TypeScript Guidelines
- **Strict Typing**: Set `strict: true` in `tsconfig.json`. Do not bypass type errors using `// @ts-ignore` or `any`.
- **Typing Return Types**: Declare return types explicitly for all export interfaces and API handlers.
- **Discriminated Unions**: Standardize state structures with status flags (`status: 'idle' | 'loading' | 'success' | 'error'`).

---

## 7. Tailwind CSS Conventions
- **Class Ordering**: Sort utility classes consistently: Layout -> Sizing -> Spacing -> Typography -> Visual -> Interactions.
- **Import Directive**: Use `@import "tailwindcss";` in `globals.css` rather than the old `@tailwind` directives.
- **Theme Variables**: Use design tokens (e.g. `bg-slate-900`) instead of custom hex values (`bg-[#0f172a]`), ensuring dark-mode integration.

---

## 8. Naming Conventions
- **Component Files**: Use `PascalCase` (e.g. `Button.tsx`, `EventCard.tsx`).
- **Utility Files & Folders**: Use `kebab-case` (e.g. `date-formatter.ts`, `data-fetching/`).
- **Interfaces & Types**: Use `PascalCase` for TS declarations. Do not prefix interfaces with `I`.
- **Variables & Functions**: Use `camelCase`.
- **Constants**: Use `UPPER_SNAKE_CASE` (e.g. `API_MAX_TIMEOUT`).

---

## 9. Folder Organization
```text
src/
├── app/               # App Router pages, layout configurations, and globals.css
├── components/        # UI components divided into ui/ primitives and common/ shared templates
│   ├── ui/            # Basic buttons, inputs, icons, dialogs
│   └── common/        # Page shells, headers, navbars
├── hooks/             # Custom state hooks
├── lib/               # Utilities, libraries, third-party clients
├── types/             # Common TypeScript interfaces
└── context/           # Shared state providers
```

---

## 10. Component Design Rules
- **Decoupled Logic**: Keep layout and representation separated from API interaction.
- **Prop Typing**: Create descriptive TypeScript interfaces for all component props.
- **Fallback Tolerances**: Guard against undefined values inside rendering trees.

---

## 11. State Management Guidelines
- **Server Data**: Let Next.js handle server state caching, pagination, and invalidation via Server Actions or fetch tags.
- **Client UI States**: Manage local toggles using standard `useState` hooks. For shared configuration context, use small React Context Providers or Zustand.

---

## 12. Accessibility Requirements
- **Semantic Structure**: Always write semantic HTML elements (`<header>`, `<main>`, `<button>`).
- **Alt attributes**: Ensure all `<Image />` elements include descriptive `alt` tags.
- **Keyboard Access**: Check that focus indicators (`focus:ring-2`) are active and tabbable.

---

## 13. Performance Best Practices
- **Bundle Optimization**: Use `next/dynamic` for large components that do not need to be loaded during initial render.
- **Font & Images**: Leverage `next/font` and the native Next.js `<Image />` component for automated optimization.

---

## 14. Error Handling
- **Application Boundaries**: Wrap critical UI panels in React `ErrorBoundary` wrappers.
- **Schema Validation**: Validate form and API response shapes with schema validation libraries (e.g., Zod) on both client and server.

---

## 15. Documentation Standards
- Complete descriptions in `README.md` for major architectural features.
- Provide comprehensive inline JSDocs for shared custom hooks.

---

## 16. Git Workflow
- Develop changes locally in feature branches.
- Commit frequently with atomic, semantic changes.

---

## 17. Conventional Commit Rules
Commit messages must align with the Conventional Commits format:
- `feat:` for new UI features or components.
- `fix:` for fixing errors.
- `docs:` for documentation.
- `style:` for style revisions.
- `refactor:` for architectural reorganizations.
- `chore:` for tooling or packages.

---

## 18. AI Collaboration Instructions
1. **Analyze First**: Before editing, inspect existing files to align with existing design systems.
2. **Consult CLAUDE.md**: Follow strict rules for React 19, strict TypeScript types, and Tailwind styles.
3. **No Unfinished Code**: Always write complete helper functions and component files.

---

## 19. Code Review Checklist
- [ ] Are all types explicitly declared (no `any`)?
- [ ] Is contrast and screen reader accessibility compliant?
- [ ] Do Client Components contain the `"use client"` directive?
- [ ] Has the Tailwind class ordering been applied?
- [ ] Are React 19 action rules utilized?
