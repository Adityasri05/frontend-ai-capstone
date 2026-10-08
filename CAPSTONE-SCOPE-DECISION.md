# Capstone Scope Decision (`CAPSTONE-SCOPE-DECISION.md`)

This document records the architectural audit and scope decision for the final FlyRank AI Fluency capstone.

---

## 1. Current Project Inspection

- **Project Name:** **HackScout AI & AI Engineering Portfolio**
- **Repository:** [`https://github.com/Adityasri05/frontend-ai-capstone`](https://github.com/Adityasri05/frontend-ai-capstone)
- **Live Production URL:** [https://frontend-ai-capstone-aditya.netlify.app/](https://frontend-ai-capstone-aditya.netlify.app/)
- **Technology Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, WebGL GLSL Shaders, Vercel AI SDK, Python 3.10+, FastAPI Proxy, Netlify CDN.
- **Current AI Capabilities:**
  1. **HackScout AI Decision Agent:** Grounded opportunity discovery, deterministic 5-tier fit scoring formula, eligibility disqualification filter, safety registration interception, 7/7 automated eval suite.
  2. **Streaming AI Chat / Vercel AI SDK Integration:** Dynamic streaming responses (`/api/chat`), tool execution UI drawers, grounded citation rendering, and rate-limiting proxies.
- **Major Features Built:** Custom Animated Fragment Shader Hero, Interactive Workspace 3D Digital Twin, Case Study Showcase (HIREVIUM, INDRA AI, StackScout), Accessible Contact & Validation Forms.

---

## 2. Requirements Audit Matrix

| Capstone Requirement | Current Repository State | Gap Identified | Planned Action |
| :--- | :--- | :--- | :--- |
| **Accessible Components** | WCAG 2.1 AA semantic structure, focus rings (`focus-visible:ring-2`), keyboard navigation, screen reader labels. | Document formal WCAG 2.1 AA audit & axe report. | Write [`ACCESSIBILITY-AUDIT.md`](file:///d:/Hackathon/frontend-ai-capstone/ACCESSIBILITY-AUDIT.md). |
| **AI Integration** | Dual AI surface: `/api/chat` streaming proxy + Python `HackScoutAgent` scoring & evaluation suite. | Document AI security boundary and prompt schemas. | Write [`AI-INTEGRATION-EXPLAINER.md`](file:///d:/Hackathon/frontend-ai-capstone/AI-INTEGRATION-EXPLAINER.md) & [`AI-SECURITY-AUDIT.md`](file:///d:/Hackathon/frontend-ai-capstone/AI-SECURITY-AUDIT.md). |
| **Error Handling** | In-memory IP rate limiting, fallback boundaries, unknown URL verification flags, safety registration interception. | Formalize production failure matrix. | Write [`ERROR-HANDLING.md`](file:///d:/Hackathon/frontend-ai-capstone/ERROR-HANDLING.md). |
| **Testing** | 31 Vitest unit/component tests passing (100%); 7 Python HackScout evaluation cases passing (100%). | Consolidate testing strategy & execution proof. | Write [`TESTING-STRATEGY.md`](file:///d:/Hackathon/frontend-ai-capstone/TESTING-STRATEGY.md) & [`TEST-RESULTS.md`](file:///d:/Hackathon/frontend-ai-capstone/TEST-RESULTS.md). |
| **Performance** | DPR capped (≤ 2) WebGL fragment shader, 20/20 static page generation, zero extra 3D library bundle overhead. | Document Lighthouse scores & bundle analysis. | Write [`PERFORMANCE-AUDIT.md`](file:///d:/Hackathon/frontend-ai-capstone/PERFORMANCE-AUDIT.md). |
| **Deployment** | Live Netlify production build with automated Git CI/CD deployment (`main` branch). | Formalize pre/post deployment checklist & rollback plan. | Write [`DEPLOYMENT-CHECKLIST.md`](file:///d:/Hackathon/frontend-ai-capstone/DEPLOYMENT-CHECKLIST.md) & [`OPERATIONS-AND-ROLLBACK.md`](file:///d:/Hackathon/frontend-ai-capstone/OPERATIONS-AND-ROLLBACK.md). |
| **README** | Production-quality stranger README covering prerequisites, quickstart, tools, evals, and setup. | Comprehensive README complete. | Maintain [`README.md`](file:///d:/Hackathon/frontend-ai-capstone/README.md). |
| **Reflection** | Extensive weekly retrospects and architecture guides. | Synthesize concise capstone reflection. | Write [`REFLECTION.md`](file:///d:/Hackathon/frontend-ai-capstone/REFLECTION.md). |

---

## 3. Final Decision

```text
FINALIZE EXISTING PROJECT
```

### Rationale
The existing codebase is highly complete, fully functional, extensively tested, and deployed live at `https://frontend-ai-capstone-aditya.netlify.app/`. Building a fresh project would discard 10 weeks of verified engineering work (Next.js 15, WebGL GLSL shaders, Vercel AI SDK proxy routes, Python evaluation suites, and Vitest test coverage). Finalizing and auditing the existing project provides maximum engineering depth and production credibility.
