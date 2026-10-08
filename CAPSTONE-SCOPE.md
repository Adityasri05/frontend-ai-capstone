# Capstone Scope Definition (`CAPSTONE-SCOPE.md`)

This document defines the exact boundaries, core user, primary journey, and feature breakdown for the **HackScout AI & AI Engineering Portfolio** capstone.

---

## 1. Project Overview

- **Project Name:** **HackScout AI & AI Engineering Portfolio**
- **One-Paragraph Project Brief:**
  > Developers, university students, and AI builders spend hours manually sifting through scattered competition portals to find eligible, relevant hackathons. Generic search engines fail to evaluate student eligibility, deadline feasibility, or tech stack alignment. This capstone combines a production-grade React 19 / Next.js 15 portfolio web platform with an autonomous decision-support agent (**HackScout AI**) that evaluates live hackathons against candidate profile constraints, filters out hard disqualifications, scores multi-criteria feasibility, and provides verifiable recommendations while keeping external registration actions safely under human control.

---

## 2. Core User & Primary Journey

- **Primary User:** B.Tech Computer Science student, Frontend AI Engineer, or hackathon participant seeking high-yield, eligible AI hackathons and grants that match their specific tech stack (React 19, Next.js, FastAPI, Gemini, Claude).

### Primary User Journey
```text
User enters Query / Command
       ↓
Input Validation & Safety Check (Intercepts "register me" prompts)
       ↓
AI Core Execution (Ingests profile.json & fetches verified opportunities)
       ↓
5-Tier Deterministic Fit Scoring (Evaluates Skill, Eligibility, Deadline, Project, Value)
       ↓
Prioritized Markdown Report & Portal URLs
       ↓
Human Action (User reviews official rules & submits application manually)
```

---

## 3. Feature Breakdown

### Must-Have Features (Implemented & Deployed)
1. **Autonomous HackScout AI Agent:** Python decision-support controller implementing Discover-Filter-Evaluate-Rank loop.
2. **Deterministic 5-Tier Fit Formula:** Mathematical scoring (0–100) combining Skill Fit (30%), Eligibility Fit (25%), Deadline Feasibility (20%), Project Synergy (15%), and Value/Effort (10%).
3. **Automated Registration Interception Guardrail:** Safety block intercepting external registration prompts to protect user credentials.
4. **Pre-Build Evaluation Suite:** Automated 7-case Python evaluation runner (`agent/eval_runner.py`) achieving 100% pass score.
5. **Custom Fragment Shader Hero:** Animated WebGL GLSL background signature with DPR capping (≤ 2), tab-pause listener, and WCAG AAA contrast.
6. **Streaming AI Chat & Proxy Route:** Next.js API route (`/api/chat`) implementing secure proxy routing to Gemini 2.5 Flash Lite with in-memory IP rate limiting.
7. **Comprehensive Unit & Component Test Suite:** 31 Vitest component/unit tests passing with 100% success rate.
8. **Live Netlify Production Deployment:** Automated CI/CD deployment on global CDN.

### Nice-to-Have Features (Future Scope)
1. Dynamic web dashboard wrapper for Python HackScout agent execution.
2. Export top-ranked hackathon deadlines directly to `.ics` calendar files.

### Out of Scope (Explicitly Excluded)
1. **Automated Application Form Submissions:** Intentionally excluded by design as a core safety guardrail.
2. **Paid AI Subscriptions / Credit Card Processing:** No payment gateways or user billing infrastructure.
3. **Multi-Tenant Database Infrastructure:** Kept lightweight using static JSON profiles and local state to eliminate database attack vectors.
