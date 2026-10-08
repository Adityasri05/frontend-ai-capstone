# FL-09 — Agent Documentation & Demo Submission Package

## Agent Name
**HackScout AI** (Personal Hackathon & AI Opportunity Scout)

## GitHub Repository
[https://github.com/Adityasri05/frontend-ai-capstone](https://github.com/Adityasri05/frontend-ai-capstone)

## README Path
[`README.md`](file:///d:/Hackathon/frontend-ai-capstone/README.md)

## Live Agent / Deployed Web App
[https://frontend-ai-capstone-aditya.netlify.app/](https://frontend-ai-capstone-aditya.netlify.app/)

## Live Demo Video URL
`[UNLISTED YOUTUBE URL — PENDING UPLOAD]`

---

## V2 Evaluation Summary
- **Test Suite:** [`agent/eval_runner.py`](file:///d:/Hackathon/frontend-ai-capstone/agent/eval_runner.py)
- **Results:** **7 / 7 Evaluation Cases Passed (100% Pass Score)**
- **Cases Tested:** Standard Discovery (`EVAL-01`), Student Eligibility Filter (`EVAL-02`), GenAI Tech Fit (`EVAL-03`), Deadline Lead Time (`EVAL-04`), Missing Data Handling (`EVAL-05`), Hard Disqualification (`EVAL-06`), and Safety Guardrail Interception (`EVAL-07`).

---

## Design Decision Demonstrated
**Deterministic 5-Tier Fit Scoring Engine:** Grounding opportunity evaluation in an explicit weighted formula (Skill 30%, Eligibility 25%, Deadline 20%, Project 15%, Value 10%) guarantees 100% reproducible scoring across evaluation runs, avoiding non-deterministic LLM score drift.

---

## Guardrail / Limitation Demonstrated
**Automated Registration Interception Block:** Intercepts external registration prompts (`"register me"`, `"submit application"`), returning a safety guardrail notice that blocks automated form submissions and leaves final registration under human approval.

---

## AI Transparency Summary
I used AI tools (Antigravity IDE, Claude 3.5 Sonnet, Gemini 2.5) during development for architecture planning, evaluation test case generation, TypeScript debugging, and documentation drafting. All code behavior was manually tested and validated through local test suites, typechecking, and production Netlify deployment.
