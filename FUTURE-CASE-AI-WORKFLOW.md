# Future Case Study AI Workflow

This 10-step repeatable workflow allows you to add future case studies to your portfolio in a short 10-minute AI conversation without rebuilding your identity, voice, stack, or site context.

---

## 10-Step Repeatable Workflow

### Step 1 — Load Preserved Build Context
Open your AI assistant (Claude, Antigravity, or Cursor) and load or reference the [`portfolio-context/`](./portfolio-context/) directory.

### Step 2 — Provide Project Evidence
Paste or attach the new project's evidence:
* Source code / README
* Live production URL & GitHub repo link
* Screenshots / architecture diagrams
* Evaluation results / test outputs

### Step 3 — AI Interactive Interview
Prompt the AI assistant to interview you using these 10 core questions:
1. *What problem did you solve, and who had the problem?*
2. *Why was this problem difficult or important?*
3. *What did you personally build and contribute?*
4. *What was the hardest technical decision you made?*
5. *What alternative solutions did you consider, and what were the trade-offs?*
6. *What changed or improved because of your implementation?*
7. *What empirical evidence proves the outcome (metrics, tests, deployments)?*
8. *Where did AI tools assist during development?*
9. *What did you manually inspect, test, or verify yourself?*
10. *What real limitation still remains?*

### Step 4 — Generate Three-Beat Case Study
Instruct the AI assistant to draft the case study adhering strictly to:
```text
1. Problem (Who had it, difficulty, impact)
      ↓
2. What I Did (Implementation, key decision, trade-off)
      ↓
3. What Came Of It (Verified outcome, performance, tests)
```

### Step 5 — Fact-Check Every Claim
Review the draft against your actual code and evidence. Eliminate any exaggerated buzzwords, unverified metrics, or corporate marketing claims.

### Step 6 — Add Case to Portfolio Codebase
Follow [`NEXT-CASE-STUDY-GUIDE.md`](./NEXT-CASE-STUDY-GUIDE.md) to add the case study page (`src/app/projects/[slug]/page.tsx`) and project card metadata (`src/app/projects/page.tsx`).

### Step 7 — Run Portfolio Regression Checklist
- [ ] TypeScript typecheck passes (`npx tsc --noEmit`).
- [ ] Automated Vitest suite passes (`npm run test:run`).
- [ ] Tested responsive layout on mobile (375px) and desktop (1440px).
- [ ] All CTA links work.

### Step 8 — Deploy
Commit and push to trigger automated deployment:
```bash
git add .
git commit -m "feat(projects): add [Project Name] case study"
git push origin main
```

### Step 9 — Update Portfolio Context
Update [`portfolio-context/PROJECTS.md`](./portfolio-context/PROJECTS.md) with the new project entry.

### Step 10 — Update Case-Study Index
Update [`INDEX.md`](./INDEX.md) and [`final-submission/INDEX.md`](./final-submission/INDEX.md) to reflect the new deliverable.
