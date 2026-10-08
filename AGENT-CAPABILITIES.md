# HackScout AI — Agent Capabilities Inventory (FL-09)

This document provides an honest, empirical categorization of **HackScout AI** capabilities, separating fully working features from partially implemented features and future scope.

---

## 1. Implemented Capabilities (100% Working)

These features exist in `agent/hackscout_agent.py` and have been verified via unit/eval execution (`agent/eval_runner.py`).

| Capability | Implementation File | Verification / Evidence |
| :--- | :--- | :--- |
| **Deterministic 5-Tier Fit Scoring** | `agent/hackscout_agent.py` (`score_opportunity`) | Evaluates Skill Fit (30%), Eligibility Fit (25%), Deadline Feasibility (20%), Project Synergy (15%), and Value/Effort (10%). |
| **Hard Eligibility Disqualification** | `agent/hackscout_agent.py` (`score_opportunity`) | Disqualifies PhD/postdoctoral restricted programs and corporate-internal hackathons (`total_score = 0`). Passed in `EVAL-06`. |
| **Automated Registration Interception Guardrail** | `agent/hackscout_agent.py` (`HackScoutAgent.run`) | Intercepts queries containing `"register me"`, `"submit my application"`, or `"sign me up"`, returning a safety block notice. Passed in `EVAL-07`. |
| **Deadline Lead-Time Evaluation** | `agent/hackscout_agent.py` (`score_opportunity`) | Calculates remaining calendar days until deadline and penalizes events with < 5 days or past deadlines (`EXPIRED`). Passed in `EVAL-04`. |
| **Source Link Preservation** | `agent/hackscout_agent.py` (`run`) | Retains official source URLs (LabLab.ai, Devpost, Kaggle, Unstop) in Markdown output table for human verification. |
| **Missing Data / Unverified Source Handling** | `agent/hackscout_agent.py` (`fetch_opportunity_details`) | Flags unknown URLs as `"Unknown / Needs verification"` without hallucinating deadlines or eligibility. Passed in `EVAL-05`. |
| **Automated Pre-Build Evaluation Suite** | `agent/eval_runner.py` | 7 automated test cases (EVAL-01 to EVAL-07) running in Python with 100% pass score. |

---

## 2. Partially Implemented Capabilities

Features that exist and function, but operate with documented scope limitations.

| Capability | Current Status | Limitation / Scope Boundary |
| :--- | :--- | :--- |
| **Live Opportunity Discovery** | Operates on a curated, verified active directory of live hackathons (`search_opportunities`). | Uses grounded listing records instead of live headless browser crawling to prevent web scraping blocks. |
| **Candidate Profile Personalization** | Reads profile parameters from `agent-config/profile.json`. | Requires updating `profile.json` file manually rather than presenting a dynamic settings UI form. |
| **Project Synergy Matching** | Matches keywords (e.g. "agent", "rag", "telemetry") against candidate's past portfolio projects. | Uses string substring keyword overlap rather than vector embedding similarity scores. |

---

## 3. Planned / Not Implemented Features

Features described in preliminary design specifications or target roadmaps that are **not** currently present in the codebase.

| Capability | Status | Reason / Roadmap |
| :--- | :--- | :--- |
| **Direct Web Scraping of Unstructured Hackathon Pages** | Planned (V3) | Requires complex Playwright headless browser integration and anti-bot bypass. Currently avoided in favor of grounded verified listings. |
| **Automated Form Filling / Application Submission** | Intentionally Excluded | Excluded by design as an active guardrail to preserve human authorization over personal credentials. |
| **Calendar Sync (iCal / Google Calendar)** | Planned (V3) | Will automatically export deadline reminders to `.ics` calendar files. |
| **Multi-Agent Debating / Peer Verification** | Planned (V3) | Future architecture enhancement to run multi-agent critic consensus scoring. |
