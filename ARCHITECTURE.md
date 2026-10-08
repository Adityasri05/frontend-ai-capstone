# System Architecture Guide (`ARCHITECTURE.md`)

This guide explains the complete codebase architecture for developers joining the project.

---

## 1. High-Level System Architecture

```text
               ┌──────────────────────────────────────────────┐
               │    Browser Client (React 19 / Next.js 15)    │
               │  - Custom GLSL Fragment Shader Hero Canvas  │
               │  - Interactive Workspace 3D Digital Twin     │
               │  - Project Case Studies (HIREVIUM/INDRA/etc) │
               └──────────────────────┬───────────────────────┘
                                      │
                         HTTPS POST   │ /api/chat
                                      ▼
               ┌──────────────────────────────────────────────┐
               │         Next.js Server API Proxy Route       │
               │  - In-Memory IP Sliding Window Rate Limiter   │
               │  - Input Length Sanitization (≤ 1000 chars)   │
               │  - Server-Only process.env.GEMINI_API_KEY     │
               └──────────────────────┬───────────────────────┘
                                      │
                         Server-to-   │ Authorized SDK Request
                         Server API   ▼
               ┌──────────────────────────────────────────────┐
               │       External AI Provider (Gemini 2.5)       │
               └──────────────────────────────────────────────┘

                              [ Separately ]
                                      │
                                      ▼
               ┌──────────────────────────────────────────────┐
               │     HackScout AI Decision Agent (Python)     │
               │  - Discover -> Filter -> Evaluate -> Rank    │
               │  - Deterministic 5-Tier Personal Fit Formula  │
               │  - Safety Registration Interception Guardrail │
               │  - Automated Eval Suite (agent/eval_runner.py)│
               └──────────────────────────────────────────────┘
```

---

## 2. Directory Layout & Module Responsibilities

| File / Path | Primary Responsibility | Why It Exists |
| :--- | :--- | :--- |
| [`src/app/`](file:///d:/Hackathon/frontend-ai-capstone/src/app/) | Next.js 15 App Router routes and page layouts. | Manages site routing, metadata, and static page generation. |
| [`src/app/api/chat/route.ts`](file:///d:/Hackathon/frontend-ai-capstone/src/app/api/chat/route.ts) | Server-side AI proxy route handler. | Isolates `GEMINI_API_KEY`, enforces rate limiting, and streams responses. |
| [`src/components/hero/FragmentShaderHero.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/components/hero/FragmentShaderHero.tsx) | Raw HTML5 WebGL canvas wrapper component. | Renders high-performance background shaders with DPR capping & tab pausing. |
| [`src/shaders/heroShader.ts`](file:///d:/Hackathon/frontend-ai-capstone/src/shaders/heroShader.ts) | Custom GLSL fragment shader source string. | Computes 2D domain rotation & magnetic cursor attraction in WebGL. |
| [`agent/hackscout_agent.py`](file:///d:/Hackathon/frontend-ai-capstone/agent/hackscout_agent.py) | HackScout AI core agent controller. | Executes 5-tier fit scoring, eligibility filtering, and report synthesis. |
| [`agent/eval_runner.py`](file:///d:/Hackathon/frontend-ai-capstone/agent/eval_runner.py) | Automated 7-case Python evaluation runner. | Benchmarks agent decisions against FL-07 specifications. |
| [`agent-config/profile.json`](file:///d:/Hackathon/frontend-ai-capstone/agent-config/profile.json) | Candidate ground-truth profile configuration. | Supplies user skills, target categories, and portfolio projects to agent. |
| [`portfolio-context/`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/) | Master context preservation pack. | Stores developer identity, voice guidelines, proof claims, and tech stack. |
| [`tests/components/`](file:///d:/Hackathon/frontend-ai-capstone/tests/components/) | Vitest component test suites. | Verifies React UI components, form validation, and accessible attributes. |

---

## 3. Important Architectural Decisions

1. **Dual AI Surface Architecture:** Separates lightweight streaming UI assistance (`/api/chat`) from deterministic python agent decision-support (`agent/hackscout_agent.py`).
2. **Zero-Dependency WebGL Shader Canvas:** Direct HTML5 WebGL context eliminates 600KB+ Three.js library overhead.
3. **In-Memory IP Rate Limiting:** Prevents API credential abuse on public serverless endpoints.
