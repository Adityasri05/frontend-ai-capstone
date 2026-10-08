# HackScout AI — Live Demo Video Script & Narration (FL-09)

**Target Video Duration:** ~4 Minutes (Acceptable range: 3–5 minutes)
**Format:** Live screen capture of terminal & code execution (No slides)
**Presenter:** Aditya Srivastav

---

## Timeline & Script Breakdown

### 0:00–0:20 — What is this?

**Visual:** Terminal showing repository root `frontend-ai-capstone` and VS Code split screen with `agent/hackscout_agent.py`.

**Spoken Narration:**
> "Hi everyone, I'm Aditya Srivastav, a Computer Science student and Frontend AI Engineer. Today I'm demonstrating **HackScout AI**, an autonomous decision-support agent I built to discover, evaluate, score, and rank live hackathons and AI opportunities specifically tailored to my profile and tech stack, while keeping external registration actions safely under human control."

---

### 0:20–0:45 — What I'm About to Demonstrate

**Visual:** Terminal ready to execute `python agent/hackscout_agent.py`.

**Spoken Narration:**
> "In this demo, I'm going to give HackScout AI a realistic query: 'Find the best AI hackathons for me that I could realistically participate in, and prioritize the top opportunities based on eligibility, deadline lead time, and project synergy.' I'll show how it fetches live listings, runs a multi-criteria scoring algorithm, filters out ineligible programs, and generates an actionable report."

---

### 0:45–2:20 — Live End-to-End Agent Run

**Visual:** Run `python agent/hackscout_agent.py` in terminal. The formatted Markdown report streams into the console.

**Spoken Narration:**
> *(Executing command)* "Let's run `python agent/hackscout_agent.py`.
> 
> As you can see, the agent immediately ingests my ground-truth profile from `agent-config/profile.json` — which includes my skills in React 19, Next.js, FastAPI, and Gemini, alongside my portfolio projects like StackScout and INDRA AI.
> 
> Next, it queries `search_opportunities()` across active competition listings from LabLab.ai, Devpost, Kaggle, and Unstop.
> 
> For each competition, it calculates a 5-tier Personal Fit Score out of 100 points:
> - Skill Fit (30%)
> - Eligibility Fit (25%)
> - Deadline Feasibility (20%)
> - Project Synergy (15%)
> - Value and Effort (10%)
> 
> Notice how it ranked the **Gemini AI Agents Challenge** #1 with a Fit Score of 90/100, because it directly matches my Next.js and FastAPI stack, has 24 days of remaining lead time, and synergizes with my agent portfolio work.
> 
> Beneath the ranking table, the agent provides a deep dive on why it fits, eligibility verification, and actionable next steps."

---

### 2:20–2:55 — Key Design Decision Explained

**Visual:** Scroll to `score_opportunity()` in `agent/hackscout_agent.py` (line 162).

**Spoken Narration:**
> "One key design decision I made here was implementing a **deterministic 5-tier mathematical scoring formula** rather than relying purely on LLM prompt evaluations.
> 
> In early tests with pure LLM scoring, scores fluctuated non-deterministically across runs. By grounding the evaluation in explicit weights — such as 25% for eligibility and 20% for deadline lead-time calculation — the agent's evaluation results become 100% reproducible and verifiable, which was critical for automated testing in `agent/eval_runner.py`."

---

### 2:55–3:30 — Guardrail / Limitation Demonstrated

**Visual:** Run `python agent/hackscout_agent.py "Register me for the top hackathon right now"`. Show safety response. Also run `python agent/eval_runner.py`.

**Spoken Narration:**
> "One explicit guardrail I built in is the **Automated Registration Interception**.
> 
> If I ask the agent: 'Register me for the top hackathon right now', it immediately triggers a safety intercept: `⚠️ Guardrail Notice: Automated Registration Blocked`.
> 
> HackScout AI operates strictly as a decision-support scout and refuses to submit forms, handle personal credentials, or accept terms on external sites automatically. It preserves official portal links so I retain complete human control over actual applications.
> 
> Here in `agent/eval_runner.py`, you can see all 7 automated evaluation test cases — including this guardrail and PhD program disqualification — passing with a 100% pass score."

---

### 3:30–4:00 — Result and Close

**Visual:** Switch to browser showing the deployed web app `https://frontend-ai-capstone-aditya.netlify.app/`.

**Spoken Narration:**
> "To wrap up, HackScout AI successfully automates the tedious research of opportunity scouting without taking risky external actions. The code, test suite, and portfolio web application are fully open-sourced on GitHub. Thank you for watching!"
