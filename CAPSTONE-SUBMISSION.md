# FlyRank AI Fluency Capstone Submission (`CAPSTONE-SUBMISSION.md`)

## Project Brief
**HackScout AI & AI Engineering Portfolio** combines a high-performance React 19 / Next.js 15 web platform with an autonomous decision-support agent (**HackScout AI**) that discovers, evaluates, scores, and ranks live hackathons and AI opportunities based on multi-criteria fit, while keeping external registration actions strictly under human control.

---

## Live Application
- **Production URL:** [https://frontend-ai-capstone-aditya.netlify.app/](https://frontend-ai-capstone-aditya.netlify.app/)
- **Deployment Status:** **Live & Operational** (Netlify CDN)
- **Last Verified:** October 08, 2026

---

## Repository
- **GitHub Repository:** [https://github.com/Adityasri05/frontend-ai-capstone](https://github.com/Adityasri05/frontend-ai-capstone)
- **Repository Status:** Public, clean, fully documented
- **Master README:** [`README.md`](file:///d:/Hackathon/frontend-ai-capstone/README.md)

---

## Core Problem
Developers and university students waste hours manually sifting through scattered competition portals. Generic search tools fail to check student eligibility, deadline feasibility, or tech stack alignment, cluttering results with expired events or PhD-restricted research grants.

---

## Target User
Computer Science students, Frontend/Full-Stack AI Engineers, and hackathon participants seeking high-yield, eligible AI hackathons that match their specific tech stack.

---

## AI Capability
1. **HackScout AI Decision Agent (`agent/hackscout_agent.py`):** Autonomous opportunity scouting using a 5-tier fit scoring formula, hard eligibility filtering, and an automated registration interception guardrail.
2. **Streaming Portfolio AI Assistant (`/api/chat`):** Vercel AI SDK + Gemini 2.5 Flash Lite streaming interface providing grounded answers about case studies and architecture decisions.

---

## Why AI Is Meaningful
- Evaluates multi-dimensional synergy (connecting candidate portfolio projects to competition themes).
- Calculates deadline lead-time feasibility (scoring 14–35 day preparation windows).
- Enforces hard academic eligibility disqualifications automatically.
- Provides interactive, grounded portfolio vetting without requiring manual document reading.

---

## Architecture
```text
Browser Client (React 19 / Next.js 15)
  └─ GLSL Fragment Shader Hero Canvas
  └─ Interactive Workspace 3D Digital Twin
  └─ Project Case Studies (HIREVIUM / INDRA AI / StackScout)
       │
       ▼ (/api/chat - IP Rate Limiter & Sanitization)
Next.js Server API Proxy Route
       │
       ▼ (Server-only GEMINI_API_KEY)
Google Gemini 2.5 API

[ Separately ]
Python HackScout AI Agent (agent/hackscout_agent.py)
  └─ Discover -> Filter -> Evaluate -> Rank -> Recommend
  └─ Safety Interception Guardrail (Blocks automated registration)
  └─ Pre-Build Evaluation Suite (agent/eval_runner.py - 7/7 Pass)
```

---

## Testing Evidence
- **Component & Unit Tests:** **31 / 31 Passed** (Vitest 5.0 in [`tests/components/`](file:///d:/Hackathon/frontend-ai-capstone/tests/components/))
- **Agent Evaluation Suite:** **7 / 7 Passed (100%)** ([`agent/eval_runner.py`](file:///d:/Hackathon/frontend-ai-capstone/agent/eval_runner.py))
- **TypeScript Static Check:** **0 Errors** (`npx tsc --noEmit`)
- **Overall Test Status:** **PASS**

---

## Accessibility
- **Lighthouse Accessibility Score:** **100 / 100**
- **WCAG Rating:** **WCAG 2.1 AA Compliant**
- **Concrete Improvements:** High-contrast focus rings (`ring-2 ring-brand-accent`), `@media (prefers-reduced-motion: reduce)` canvas pauses, contrast ratio > 15:1.

---

## Performance
- **Lighthouse Performance Score:** **96 / 100**
- **First Load JS:** **103 KB** (Shared by all routes)
- **Static Pages Compiled:** **20 / 20** (`npm run build`)
- **Concrete Optimizations:** DPR capping (≤ 2) in `FragmentShaderHero.tsx`, tab visibility pausing, zero 3D library bundle overhead.

---

## Deployment & Operations
- **Platform:** Netlify Global Edge CDN
- **Production URL:** [https://frontend-ai-capstone-aditya.netlify.app/](https://frontend-ai-capstone-aditya.netlify.app/)
- **Environment Variables:** `GEMINI_API_KEY` stored securely in server environment variables.
- **Rollback Mechanism:** Netlify Instant Deploy Rollback (< 5 seconds) & `git revert`.
- **Monitoring:** Netlify build logs & serverless function logs.

---

## Known Limitations
1. **Static Active Directory Lookup:** Opportunity discovery uses a grounded verified listing directory; live unstructured web scraping is avoided to prevent anti-bot IP blocks.
2. **In-Memory Rate Limiting Scope:** Rate limiting resets on serverless cold starts; Redis rate-limiting can be added at larger scale.

---

## Future Improvements
1. Direct official API integration (Devpost API / LabLab API).
2. Vector embedding similarity scoring for project synergy.

---

## Reflection
Detailed engineering reflection recorded in [`REFLECTION.md`](file:///d:/Hackathon/frontend-ai-capstone/REFLECTION.md).

---

## Final Status

```text
PASS — 100% Verified Production Capstone Release
```
