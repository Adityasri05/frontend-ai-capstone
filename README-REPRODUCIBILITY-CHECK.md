# README Reproducibility Audit (FL-09)

This audit evaluates `README.md` from the perspective of a technical reviewer or stranger cloning the repository for the first time.

---

## Reproducibility Audit Matrix

| # | Stranger Question | Audit Result | Section in README | Evidence in README |
| :---: | :--- | :---: | :--- | :--- |
| **1** | **What does this agent do?** | ✅ PASS | One-line description & Section 2 | Clear summary of hackathon discovery, 5-tier scoring, eligibility filtering, and report generation. |
| **2** | **Who is it for?** | ✅ PASS | Section 3 | Computer Science students, Frontend/Full-Stack AI Engineers, and hackathon participants. |
| **3** | **What do I need installed?** | ✅ PASS | Section 8 (Prerequisites) | Explicitly lists Node.js v18.17+, Python 3.10+, and Git. |
| **4** | **Which environment variables are required?** | ✅ PASS | Section 8 (Environment variables) | Table showing optional `NODE_ENV` and `NEXT_PUBLIC_SITE_URL`; notes agent runs out-of-the-box. |
| **5** | **How do I install it?** | ✅ PASS | Section 8 (Clone & Install) | Clear `git clone` and `npm install` shell snippets. |
| **6** | **How do I run it?** | ✅ PASS | Section 9 (Run Locally) | Exact commands for Python agent (`python agent/hackscout_agent.py`), eval suite (`python agent/eval_runner.py`), and web app (`npm run dev`). |
| **7** | **What input should I provide?** | ✅ PASS | Section 10 (Usage Example) | Shows sample CLI prompt input: `"Find the best AI hackathons for me with realistic deadlines"`. |
| **8** | **What should I expect?** | ✅ PASS | Section 10 (Usage Example) | Displays real formatted Markdown output table with Fit Scores, deadlines, and deep dive recommendation. |
| **9** | **What tools does it use?** | ✅ PASS | Section 11 (Tools) | Structured table listing `search_opportunities`, `fetch_opportunity_details`, `score_opportunity`, and `HackScoutAgent.run`. |
| **10** | **What are the limitations?** | ✅ PASS | Section 14 (Limitations) | Honest breakdown of static directory lookup and substring tech stack matching with What, Impact, Why, Next improvement. |
| **11** | **How was it evaluated?** | ✅ PASS | Section 13 (Evaluation — V2) | Complete 7-case benchmark table showing 7/7 PASS (100% pass score) with exact test case IDs. |

---

## Final Verdict
**PASS — 100% Reproducible by a Stranger.**
