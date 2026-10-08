# Next Case Study Workflow (`NEXT-CASE-STUDY-WORKFLOW.md`)

This document outlines the concise, repeatable workflow for adding future case studies to the portfolio.

---

## 1. Repeatable Workflow Sequence

```text
Finish Real Project
        ↓
Collect Empirical Evidence (URLs, Code, Eval Logs, Screenshots)
        ↓
Identify the Problem (Who, What, Why)
        ↓
Write What I Did (Personal Contributions & Technical Decisions)
        ↓
Document the Outcome (Verifiable Metrics & Test Pass Rates)
        ↓
Create Case-Study Page (src/app/projects/[slug]/page.tsx)
        ↓
Add to Project Listing (src/app/projects/page.tsx)
        ↓
Human Verification & Verification Checks (tsc, vitest, next build)
        ↓
Deploy to Production (git push origin main → Netlify)
        ↓
Update Portfolio Context Registry (portfolio-context/PROJECTS.md)
        ↓
Update Calendar Reminder
```

---

## 2. Mandatory Human Review Step

> ⚠️ **Human Verification Rule:** AI coding assistants can draft case studies, format layout components, and summarize technical decisions. However, **you must personally verify all facts, code contributions, metrics, screenshots, and evaluation results** before committing the case study to production. Never publish synthetic metrics or unverified claims.
