# Portfolio Context Index (`PORTFOLIO-CONTEXT-INDEX.md`)

This master index maps all preserved portfolio context files in `portfolio-context/` so future AI coding assistants and human maintainers can understand the portfolio's identity, technical stack, writing voice, design system, and case-study structure without needing to rebuild context from scratch.

---

## Canonical Context Files Directory

All canonical identity and architectural files live in the `portfolio-context/` directory:

| Context Dimension | File Location | Purpose & Summary |
| :--- | :--- | :--- |
| **Master Context Guide** | [`portfolio-context/README.md`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/README.md) | High-level summary of the portfolio context pack and quick navigation links. |
| **Developer Identity** | [`portfolio-context/IDENTITY.md`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/IDENTITY.md) | Ground-truth positioning statement: *Frontend AI Engineer / CSE Student*. |
| **Voice & Tone Guidelines** | [`portfolio-context/VOICE-AND-WRITING.md`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/VOICE-AND-WRITING.md) | Writing principles: grounded, empirical, no hype, 3-beat structure. |
| **Proof Statement** | [`portfolio-context/PROOF-STATEMENT.md`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/PROOF-STATEMENT.md) | Core proof claims: React 19, Next.js 15, FastAPI proxy, WebGL shaders, agent evals. |
| **Tech Stack Reference** | [`portfolio-context/TECH-STACK.md`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/TECH-STACK.md) | Complete technology inventory (Frontend, Backend, AI/LLM, Testing, Deployment). |
| **Case Study Format** | [`portfolio-context/CASE-STUDY-FORMAT.md`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/CASE-STUDY-FORMAT.md) | Standard 3-beat template rules (Problem → What I Did → What Came of It). |
| **Site Architecture** | [`portfolio-context/PORTFOLIO-STRUCTURE.md`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/PORTFOLIO-STRUCTURE.md) | Route map (`/`, `/projects`, `/playground`, `/workspace`, `/contact`, `/resume`). |
| **Projects Registry** | [`portfolio-context/PROJECTS.md`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/PROJECTS.md) | Comprehensive directory of all built projects (HIREVIUM, INDRA AI, StackScout, HackScout AI). |
| **Design System Context** | [`portfolio-context/DESIGN-CONTEXT.md`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/DESIGN-CONTEXT.md) | Visual design tokens, typography, colors, dark vignette rules, and WebGL constraints. |

---

## Canonical vs. Derived Information

- **Canonical Information (Single Source of Truth):**
  - Developer identity & positioning: [`portfolio-context/IDENTITY.md`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/IDENTITY.md)
  - Color tokens & typography rules: [`portfolio-context/DESIGN-CONTEXT.md`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/DESIGN-CONTEXT.md)
  - Project inventory & status: [`portfolio-context/PROJECTS.md`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/PROJECTS.md)
- **Derived Information (Generated from Canonical):**
  - `src/app/projects/page.tsx` (Renders project list from `PROJECTS` array)
  - `README.md` (Summarizes tech stack and agent capabilities)
- **Manual Update Requirement:** When adding a new project or updating skills, update `portfolio-context/PROJECTS.md` and `portfolio-context/TECH-STACK.md` first before modifying React page components.
