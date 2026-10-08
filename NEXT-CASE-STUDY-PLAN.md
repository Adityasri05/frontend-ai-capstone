# Next Case Study Plan (`NEXT-CASE-STUDY-PLAN.md`)

This plan establishes **HackScout AI** as the next real case study to be integrated into the portfolio.

---

## 1. Selected Project

- **Project Name:** **HackScout AI — Autonomous Hackathon & AI Opportunity Scout Agent**
- **Why This Project Is Next:** HackScout AI represents my most sophisticated AI agent engineering work. While HIREVIUM, INDRA AI, and StackScout demonstrate interface design and search tools, HackScout AI provides concrete proof of an autonomous decision-support loop, deterministic 5-tier scoring, and active safety guardrail interception.
- **What New Proof It Adds:** Adds empirical evidence of autonomous tool calling, multi-criteria evaluation formulas, eligibility disqualification filtering, automated registration interception, and a 100% passing 7-case evaluation suite (`agent/eval_runner.py`).
- **Primary Audience:** AI/ML startup recruiters, technical reviewers, and engineering hiring managers evaluating agent design and AI safety capabilities.
- **Likely Case-Study Angle:** *"Building a Safe, Verifiable Decision-Support Agent for AI Hackathons & Grants."*
- **Expected Evidence:** Source code (`agent/hackscout_agent.py`), automated evaluation runner (`agent/eval_runner.py`), flow map (`AGENT-FLOW-MAP.md`), guardrail notes (`GUARDRAIL-DEMO-NOTES.md`), and CLI execution logs.

---

## 2. Preliminary Three-Beat Outline

### 1. Problem
Developers and university students waste hours manually searching scattered hackathon portals (Devpost, LabLab.ai, Kaggle, Unstop), struggling to filter out expired events, PhD-restricted research grants, or competitions unaligned with their tech stack. Generic search tools lack lead-time awareness and fail to evaluate whether a competition's technical theme synergizes with a developer's portfolio. Without automated eligibility checks and lead-time scoring, developers miss optimal competition windows or waste time applying to restricted tracks.

### 2. What I Did
I engineered **HackScout AI** (`agent/hackscout_agent.py`), a Python decision-support agent operating on a Discover-Filter-Evaluate-Rank loop. I designed a deterministic 5-tier Personal Fit Scoring formula allocating points across Skill Fit (30%), Eligibility Fit (25%), Deadline Feasibility (20%), Project Synergy (15%), and Value/Effort (10%). To protect user credentials, I implemented an automated registration interception guardrail that blocks autonomous external application submissions and directs users to verified official portal links.

### 3. What Came of It
I built an automated pre-build evaluation suite (`agent/eval_runner.py`) testing 7 distinct operational scenarios—including student eligibility filtering, deadline lead-time prioritization, missing data handling, PhD program disqualification, and safety interception. HackScout AI achieved a **100% pass score (7/7 eval cases passed)** with zero hallucinations or unauthorized external actions. The complete agent codebase, evaluation suite, and execution flow maps are open-sourced on GitHub.

---

## 3. Project Readiness Assessment

| Evidence Dimension | Readiness Status | Evidence Location / Missing Items |
| :--- | :---: | :--- |
| **Problem Understood** | `READY` | Clear user problem documented in [`README.md`](file:///d:/Hackathon/frontend-ai-capstone/README.md) and [`agent/hackscout_agent.py`](file:///d:/Hackathon/frontend-ai-capstone/agent/hackscout_agent.py). |
| **Personal Contribution Clear** | `READY` | 100% individual design and implementation of scoring math, disqualification filters, and guardrails. |
| **Screenshots Available** | `PARTIAL` | Visual flow map available (`AGENT-FLOW-MAP.md`); CLI terminal screenshots to be captured during final page placement. |
| **Live / Demo URL** | `READY` | Deployed web platform live at `https://frontend-ai-capstone-aditya.netlify.app/`; Python agent CLI runs locally. |
| **Repository** | `READY` | Open-source on GitHub at `https://github.com/Adityasri05/frontend-ai-capstone`. |
| **Technical Decisions** | `READY` | Grounded in deterministic 5-tier formula, safety interception, and JSON profile ingestion. |
| **Outcome / Evidence** | `READY` | Empirical 7/7 evaluation score in [`agent/eval_runner.py`](file:///d:/Hackathon/frontend-ai-capstone/agent/eval_runner.py). |
| **Evaluation / Testing** | `READY` | Automated Python evaluation suite verified with zero failures. |
| **Final Case-Study Page** | `NEEDS VERIFICATION` | Page file `src/app/projects/hackscout-ai/page.tsx` ready for insertion following [`NEXT-CASE-STUDY-GUIDE.md`](file:///d:/Hackathon/frontend-ai-capstone/NEXT-CASE-STUDY-GUIDE.md). |
