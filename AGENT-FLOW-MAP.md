# HackScout AI — Agent Execution Flow Map (FL-09)

This document traces the actual execution path of **HackScout AI** (`agent/hackscout_agent.py`) from user input through evaluation, ranking, guardrail checks, and final output generation.

---

## 1. Execution Path Overview

```text
User Request / Query
       ↓
Input Parsing & Safety Interception
 (Checks for "register me" / "PhD" guardrails)
       ↓
Candidate Profile Ingestion
 (Loads agent-config/profile.json)
       ↓
Opportunity Discovery & Fetching
 (Executes search_opportunities() directory lookup)
       ↓
Multi-Criteria Fit Evaluation & Scoring
 (Computes 5-tier Fit Score formula: 0 to 100)
       ↓
Eligibility & Disqualification Filter
 (Enforces hard disqualifications: PhD, Corporate internal, Expired)
       ↓
Opportunity Ranking & Prioritization
 (Sorts by total_score descending)
       ↓
Markdown Report Synthesis
 (Generates prioritized table + top deep-dive + next actions)
       ↓
Human Review & Decision
 (User selects link, verifies rules, and applies manually)
```

---

## 2. Stage Breakdown & Code Grounding Table

| Stage | What Happens | Actual File(s) | Empirical Evidence |
| :--- | :--- | :--- | :--- |
| **Input Parsing** | Accepts string query from CLI (`sys.argv`) or function call (`run(user_query)`). Immediately tests string against safety guardrails. | [`agent/hackscout_agent.py`](file:///d:/Hackathon/frontend-ai-capstone/agent/hackscout_agent.py#L256-L282) | `query_lower` checks `"register me"` → triggers `⚠️ Guardrail Notice: Automated Registration Blocked`. |
| **Profile Ingestion** | Ingests ground-truth candidate profile (skills, portfolio projects, target eligibility). | [`agent/hackscout_agent.py`](file:///d:/Hackathon/frontend-ai-capstone/agent/hackscout_agent.py#L28-L34), [`agent-config/profile.json`](file:///d:/Hackathon/frontend-ai-capstone/agent-config/profile.json) | `load_profile()` reads JSON containing user skills (React 19, FastAPI, Gemini) and portfolio context. |
| **Discovery / Fetching** | Scans live active directory of verified AI hackathons grounded in official platforms (LabLab.ai, Devpost, Kaggle, Unstop). | [`agent/hackscout_agent.py`](file:///d:/Hackathon/frontend-ai-capstone/agent/hackscout_agent.py#L40-L138) | `search_opportunities()` returns active listings with URL, deadline, eligibility, prizes, and tech stack. |
| **Evaluation & Scoring** | Computes 5-tier Fit Score (Skill 30%, Eligibility 25%, Deadline 20%, Project 15%, Value 10%). | [`agent/hackscout_agent.py`](file:///d:/Hackathon/frontend-ai-capstone/agent/hackscout_agent.py#L162-L243) | `score_opportunity()` computes exact numerical breakdown (0-100) per opportunity. |
| **Disqualification Filter** | Disqualifies restricted tracks (PhD required, corporate internal employees) and expired events. | [`agent/hackscout_agent.py`](file:///d:/Hackathon/frontend-ai-capstone/agent/hackscout_agent.py#L167-L177) | Hard check returns `status: "DISQUALIFIED"` and `total_score: 0` for PhD restricted events. |
| **Ranking** | Filters qualified opportunities (`score >= 60`) and sorts descending by `total_score`. | [`agent/hackscout_agent.py`](file:///d:/Hackathon/frontend-ai-capstone/agent/hackscout_agent.py#L287-L297) | `sorted(scored_opportunities, key=lambda x: x["score_data"]["total_score"], reverse=True)`. |
| **Report Synthesis** | Generates structured Markdown output containing ranked summary table, deep dive into #1, and actionable checklists. | [`agent/hackscout_agent.py`](file:///d:/Hackathon/frontend-ai-capstone/agent/hackscout_agent.py#L300-L336) | Returns formatted Markdown string with source URLs preserved. |
| **Human Decision** | Preserves original source link for human review; blocks automatic external submission. | [`agent/hackscout_agent.py`](file:///d:/Hackathon/frontend-ai-capstone/agent/hackscout_agent.py#L332-L334) | Output includes clickable portal links for manual human registration. |

---

## 3. Key Human-In-The-Loop Boundary

HackScout AI is designed as a **semi-autonomous decision-support agent**.
- **Model / Code Decision:** Discovery, multi-criteria fit calculation, hard eligibility disqualification, lead-time scoring, and ranking.
- **Human Decision:** Reviewing the output recommendations, forming team rosters, verifying official rules, and submitting the application on external platforms.
