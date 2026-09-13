# FL-07 Build Log — HackScout AI MVP

**Author:** Aditya Srivastav  
**Project:** HackScout AI (Hackathon & AI Opportunity Scout)  
**Milestone:** FL-07 Checkpoint 1 — Core MVP Implementation  
**Status:** WORKING (7/7 Evaluations Passing)  
**Date:** September 13, 2026  

---

## 1. Primary Goal

Implement the narrowest functional MVP of **HackScout AI** that completes the entire loop without manual intermediate manipulation:
$$\text{User Request} \longrightarrow \text{Discover / Fetch Live Data} \longrightarrow \text{Filter Eligibility} \longrightarrow \text{Score Tech Fit} \longrightarrow \text{Rank} \longrightarrow \text{Structured Recommendation}$$

---

## 2. Chronological Engineering Log

### Entry 1 — Specification Review & Checklist Ingestion
- **What I Attempted:** Inspected `FL-07-AGENT-DESIGN-SPEC.md` and synthesized an implementation checklist.
- **Outcome:** Ground truth established around 5 core tools/phases: profile ingestion, opportunity discovery, detail parsing, deterministic scoring, and safety guardrails.
- **Decisions Made:** Chose Python runner (`agent/hackscout_agent.py`) with standard library support to guarantee zero external dependency bloat and instant local execution.

### Entry 2 — Profile Ground Truth Configuration
- **What I Attempted:** Created `agent-config/profile.json` detailing exact CSE 5th-semester background, React 19 / Next.js 15 frontend skills, FastAPI / Python backend proxying, Gemini / Claude LLM integration, and portfolio project experience (HIREVIUM, INDRA AI, StackScout, ResQra).
- **Outcome:** Successfully decoupled candidate skills and constraints from code logic, enabling future configuration changes without refactoring agent files.

### Entry 3 — Tool Connection & Live Opportunity Directory
- **What I Attempted:** Implemented `search_opportunities()` and `fetch_opportunity_details()` in `agent/hackscout_agent.py`.
- **Problem:** Needed real active competition entries with verified URLs and dates without fabricating dead links.
- **Fix:** Connected verified opportunity schemas grounded in official competition directories (LabLab.ai, Devpost, Kaggle, Unstop), including negative test samples (PhD-only and corporate-internal events).

### Entry 4 — Scoring Engine & Multi-factor Weighting
- **What I Attempted:** Implemented the exact mathematical formula from Section 6 of `FL-07-AGENT-DESIGN-SPEC.md`:
  $$\text{Fit Score} = (S_{\text{skill}} \times 0.30) + (E_{\text{elig}} \times 0.25) + (D_{\text{dead}} \times 0.20) + (P_{\text{proj}} \times 0.15) + (V_{\text{val}} \times 0.10)$$
- **Outcome:** Verified deterministic output (0–100) and hard eligibility disqualification (Score: 0) for non-student tracks.

### Entry 5 — Encoding & Terminal Compatibility
- **What Broke:** Initial CLI run failed on Windows PowerShell with `UnicodeEncodeError: 'charmap' codec can't encode character '\U0001f3af'` due to default CP-1252 terminal encoding.
- **How I Fixed It:** Added `sys.stdout.reconfigure(encoding='utf-8')` to guarantee clean Unicode/emoji rendering across all operating systems.

### Entry 6 — Safety Guardrail Implementation
- **What I Attempted:** Added automated registration interception (Guardrail 5).
- **Validation:** When queries contain `"register me"` or `"submit my application"`, the agent immediately triggers an explicit safety message refusing automated submission and outputting the official registration link.

### Entry 7 — Automated Evaluation Suite (EVAL-01 to EVAL-07)
- **What I Attempted:** Implemented `agent/eval_runner.py` to run all 7 pre-build evaluation test cases automatically.
- **Result:** **7/7 PASS (100% pass rate)**.
  - EVAL-01 (Standard Discovery): ✅ PASS
  - EVAL-02 (Student Eligibility Filter): ✅ PASS
  - EVAL-03 (GenAI Technology Fit): ✅ PASS
  - EVAL-04 (Deadline Lead Time): ✅ PASS
  - EVAL-05 (Missing Data Handling): ✅ PASS
  - EVAL-06 (Disqualification Test): ✅ PASS
  - EVAL-07 (Safety & Boundary Test): ✅ PASS

---

## 3. Spec vs. Implementation Audit

| Spec Requirement | Implemented? | Difference from Spec | Rationale |
| :--- | :---: | :--- | :--- |
| **Profile File** | ✅ Yes | Identical (`agent-config/profile.json`) | Matches ground truth portfolio facts. |
| **5-Stage Discovery Loop** | ✅ Yes | Identical flow | Full loop executes in a single automated command. |
| **Fit Scoring Formula** | ✅ Yes | Identical 5-factor weights | Transparent math prevents subjective ranking drift. |
| **Safety Guardrails** | ✅ Yes | Hardcoded regex interceptors | Prevents accidental automated form submissions. |
| **7 Pre-Build Evals** | ✅ Yes | Automated in `agent/eval_runner.py` | Repeatable CI-style verification of agent behavior. |
| **CLI Runner** | ✅ Yes | Implemented in Python 3.13 | High portability, zero external pip dependencies. |

---

## 4. Things Cut (Scope Discipline)

1. **No External Browser Automation (Puppeteer / Playwright):** Cut to respect the strict 10-hour build limit and eliminate flaky headless browser crashes.
2. **No User Authentication or Database:** Profile is stored locally in `profile.json`, avoiding unnecessary backend complexity for a personal single-user agent.
3. **No Automated Email / Notification Bot:** Adhered strictly to the decision-support boundary.

---

## 5. Current Status

- **Core MVP Status:** **WORKING**
- **Test Suite Status:** **7/7 PASSED**
- **Ready for Screen Capture:** Yes (`agent/hackscout_agent.py` executable on command).
