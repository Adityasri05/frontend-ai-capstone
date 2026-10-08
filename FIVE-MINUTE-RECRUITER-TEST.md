# Five-Minute Recruiter Navigation Test

This audit evaluates the portfolio layout and documentation from the perspective of an external technical recruiter or engineering manager evaluating the repository for the first time.

---

## 5-Minute Evaluation Questions & Verified Answers

| # | Recruiter Question | Verified Answer in Portfolio | Location in Repository / Site |
|---|---|---|---|
| 1 | **Who is this person?** | **Aditya Srivastav**, B.Tech Computer Science student specializing in **Frontend AI Engineering**. | Homepage Hero & `IDENTITY_KIT.md` |
| 2 | **What can they build?** | Resilient human-AI web interfaces, serverless API proxies, WebGL fragment shaders, and WCAG AA accessible React applications. | `README.md` & Homepage Tech Grid |
| 3 | **What is the strongest project?** | **HIREVIUM** — Dual-sided AI Technical Qualification Interview workspace with streaming Claude response tokens and tool-call scorecards. | `/projects/hirevium` & `README.md` |
| 4 | **What does it actually do?** | Simulates technical candidate interviews, scales question difficulty dynamically, and executes server-side tool calls to produce scorecards. | HIREVIUM Case Study & `/interview` |
| 5 | **How does AI fit into it?** | AI acts as a structured interviewer via serverless API route (`/api/chat`) using Claude 3.5 Sonnet, tool calling (`scoreCandidate`), and streaming text. | `AI-ROUTE-SECURITY-AUDIT.md` |
| 6 | **What did they personally contribute?** | Built the React 19 UI workspace, serverless proxy handlers, IP rate limiters, WebGL fragment shader, 31 Vitest unit tests, and accessibility audit. | `README.md` & `CHECKPOINT-2-REPORT.md` |
| 7 | **Can I see it working?** | **YES**. Live production URL is publicly accessible at `https://frontend-ai-capstone-aditya.netlify.app/`. | `README.md` & Production URL |
| 8 | **Can I find the GitHub repository?** | **YES**. Linked prominently in header, footer, and case study cards (`github.com/Adityasri05/frontend-ai-capstone`). | Site Navigation & Footer |
| 9 | **Can I find the demo?** | **YES**. Demo script (`DEMO-SCRIPT.md`) and showcase thread (`SHOWCASE-POST.md`) are documented in repository root. | `DEMO-SCRIPT.md` & `SHOWCASE-POST.md` |
| 10 | **Do they understand limitations?** | **YES**. Honest limitations (in-memory rate limiting across cold starts, touch-device hover fallbacks) are explicitly documented. | `README.md` & `RETROSPECTIVE.md` |

---

## Conclusion
The repository and live site pass the 5-Minute Recruiter Navigation Test. A complete stranger can immediately understand candidate positioning, test live features, inspect source code, verify test coverage, and assess technical maturity.
