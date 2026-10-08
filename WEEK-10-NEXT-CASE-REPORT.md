# Week 10 — The Plan to Keep Building Report (`WEEK-10-NEXT-CASE-REPORT.md`)

## Assignment
**FlyRank AI Fluency Track — Week 10: The Plan to Keep Building**

---

## Existing Portfolio Structure
- **Framework & Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS.
- **Project Listing Route:** [`src/app/projects/page.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/app/projects/page.tsx) (`PROJECTS` metadata array).
- **Individual Case-Study Target Route:** `src/app/projects/hackscout-ai/page.tsx` (or `src/app/projects/fragment-shader-hero/page.tsx`).
- **Context Preservation Directory:** [`portfolio-context/`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/) (Contains master context files).

---

## Next Case Study
**Project:** **HackScout AI — Autonomous Hackathon & AI Opportunity Scout Agent**

---

## Why This Project
HackScout AI is the strongest representation of my autonomous AI engineering work built during FL-07 through FL-09. While HIREVIUM, INDRA AI, and StackScout demonstrate interface design and search tools, HackScout AI adds verifiable proof of multi-criteria fit scoring, automated safety guardrail interception, and a 100% passing 7-case evaluation suite (`agent/eval_runner.py`).

---

## Three-Beat Plan

### 1. Problem
Developers waste hours manually searching scattered competition portals, missing deadlines or applying to ineligible PhD-restricted programs. Generic search engines lack lead-time awareness and fail to match competition themes with a candidate's portfolio.

### 2. What I Did
I engineered **HackScout AI** (`agent/hackscout_agent.py`), a Python decision-support agent using a 5-tier fit scoring formula (Skill 30%, Eligibility 25%, Deadline 20%, Project 15%, Value 10%) and an automated registration interception guardrail.

### 3. What Came of It
I built an automated pre-build evaluation suite (`agent/eval_runner.py`) achieving a **100% pass score across 7 evaluation cases**, verifying eligibility filtering, lead-time scoring, and zero unauthorized external actions.

---

## How to Add It
1. Create page component at `src/app/projects/hackscout-ai/page.tsx` using layout tokens from [`IDENTITY_KIT.md`](file:///d:/Hackathon/frontend-ai-capstone/IDENTITY_KIT.md).
2. Insert 3-beat content, Mermaid flow diagram, and evaluation metrics table.
3. Update `PROJECTS` array in [`src/app/projects/page.tsx`](file:///d:/Hackathon/frontend-ai-capstone/src/app/projects/page.tsx).
4. Register project in [`portfolio-context/PROJECTS.md`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/PROJECTS.md).
5. Run `npx tsc --noEmit` and `npm run build`; push to GitHub `main` branch to trigger Netlify deployment.

---

## Context Preservation
Future AI sessions can navigate the portfolio without rebuilding context by reading:
- [`PORTFOLIO-CONTEXT-INDEX.md`](file:///d:/Hackathon/frontend-ai-capstone/PORTFOLIO-CONTEXT-INDEX.md) (Master Index)
- [`portfolio-context/IDENTITY.md`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/IDENTITY.md) (Developer Identity)
- [`portfolio-context/VOICE-AND-WRITING.md`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/VOICE-AND-WRITING.md) (Writing Guidelines)
- [`portfolio-context/TECH-STACK.md`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/TECH-STACK.md) (Technology Inventory)
- [`portfolio-context/PROJECTS.md`](file:///d:/Hackathon/frontend-ai-capstone/portfolio-context/PROJECTS.md) (Master Projects Registry)

---

## Reminder
```text
MANUAL — Reminder instructions prepared for Google Calendar / Mobile Reminders
```
*(Documented in [`NEXT-CASE-REMINDER.md`](file:///d:/Hackathon/frontend-ai-capstone/NEXT-CASE-REMINDER.md) for October 15, 2026 @ 10:00 AM IST).*

---

## Evidence
- [`NEXT-CASE-STUDY-GUIDE.md`](file:///d:/Hackathon/frontend-ai-capstone/NEXT-CASE-STUDY-GUIDE.md) (Step-by-step implementation guide)
- [`NEXT-CASE-STUDY-PLAN.md`](file:///d:/Hackathon/frontend-ai-capstone/NEXT-CASE-STUDY-PLAN.md) (Selected project plan & readiness table)
- [`PORTFOLIO-CONTEXT-INDEX.md`](file:///d:/Hackathon/frontend-ai-capstone/PORTFOLIO-CONTEXT-INDEX.md) (Master context index)
- [`NEXT-CASE-REMINDER.md`](file:///d:/Hackathon/frontend-ai-capstone/NEXT-CASE-REMINDER.md) (Manual calendar reminder instructions)
- [`NEXT-CASE-STUDY-TEMPLATE.md`](file:///d:/Hackathon/frontend-ai-capstone/NEXT-CASE-STUDY-TEMPLATE.md) (Reusable 3-beat template)
- [`NEXT-CASE-STUDY-WORKFLOW.md`](file:///d:/Hackathon/frontend-ai-capstone/NEXT-CASE-STUDY-WORKFLOW.md) (Repeatable workflow)
- [`agent/hackscout_agent.py`](file:///d:/Hackathon/frontend-ai-capstone/agent/hackscout_agent.py) & [`agent/eval_runner.py`](file:///d:/Hackathon/frontend-ai-capstone/agent/eval_runner.py) (Agent core & 7/7 passing eval suite)

---

## Remaining Manual Actions
- [ ] Add Google Calendar reminder for October 15, 2026 @ 10:00 AM IST per [`NEXT-CASE-REMINDER.md`](file:///d:/Hackathon/frontend-ai-capstone/NEXT-CASE-REMINDER.md).
- [ ] Insert `src/app/projects/hackscout-ai/page.tsx` when publishing the live HackScout AI case study.

---

## Final Status
**PASS** — All required documentation, context preservation indexes, implementation guides, 3-beat plans, templates, workflows, and empirical repository evidence exist and are verified.
