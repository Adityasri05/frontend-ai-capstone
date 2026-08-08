# Portfolio Content Map — Aditya Srivastav

This document maps the page-by-page structure and conversion goals for Aditya Srivastav's personal portfolio.

---

## 1. Portfolio Flow
```text
Home (Claim & Preview) ──> Projects (Technical List) ──> Case Studies (Evidence) ──> Resume (Verification) ──> Convert (LinkedIn Contact)
```

---

## 2. Page Content Maps

### Page 1: Home (`/`)
1. **Hero Header**:
   - *Claim*: *"I build React user experiences that make LLM outputs and autonomous agent workflows transparent."*
   - *Primary CTA*: *"Contact me on LinkedIn"* (Primary conversion action).
   - *Secondary CTA*: *"View My Projects"* (Scrolls to selected work section).
2. **Selected Work (Featured Grid)**:
   - *Purpose*: Prove the positioning claim immediately using actual product snapshots.
   - *Featured Projects*: HIREVIUM (AI Vetting Platform) and INDRA AI (Knowledge Search).
3. **About Section**:
   - *Purpose*: Introduce Aditya as a B.Tech Computer Science student and Frontend AI Engineer Intern at FlyRank.
   - *Direct CTA*: *"Discuss internship opportunities on LinkedIn"*.
4. **Skills/Technical Focus**:
   - *Purpose*: Display developer skills: Frontend (React, Next.js, Tailwind, TypeScript) and AI/ML foundations (Python, Gemini API, PyTorch).
5. **Final Footer CTA**:
   - *Purpose*: Capture leaving visitors.
   - *CTA*: *"Let's connect on LinkedIn to discuss how I can help build secure, AI-powered interfaces for your team."*

---

### Page 2: Projects Index (`/projects`)
- **Visual Order**:
  1. **HIREVIUM**: Leading project (live interview React UI, FastAPI proxies, adaptive controller).
  2. **INDRA AI**: Supporting project (type-safe tRPC connections, RAG side drawers, trust-score tags).
  3. **StackScout**: Supporting project (agent scraping status logging, comparison matrices).
- **Ranking Rationale**:
  HIREVIUM is ranked first because it represents a complete product workflow with both recruiter-facing analytic metrics and candidate-facing real-time interview states, demonstrating highest frontend complexity and direct API proxy integrations.

---

### Page 3: Case Study Structure
Every case study page (e.g. `/projects/hirevium`) adheres to this strict, evidence-driven section outline:

1. **The Problem**: Explain the real-world operational problem (e.g. screening bottlenecks, ungrounded LLM hallucinations, manual vendor review overhead).
2. **What I Built**: Detail Aditya's specific contribution to the codebase (React UI elements, state hooks, API routing).
3. **Technical Decisions**: Document important choices and trade-offs (e.g., standard React state vs Zustand for prototype, HTTP polling vs Server-Sent Events).
4. **Key Interface (Screenshots)**: Real captures proving the code renders cleanly on mobile and desktop viewports.
5. **Outcome**: Detail outcomes (tested functionality, validated deployments, or learned technical mechanics. Mark missing items as **NEEDS EVIDENCE**).
6. **Reflection**: Share what would be refactored or improved in the next release (e.g. streaming LLM tokens, TanStack Query integration).
7. **Primary Page CTA**: *"Interested in my work on HIREVIUM? Connect with me on LinkedIn"*

---

### Page 4: Resume Page (`/resume`)
- **Purpose**: Fast professional credential verification for hiring managers.
- **Sections**:
  1. *Education*: B.Tech Computer Science & Engineering (5th Semester).
  2. *Technical Skills*: React, Next.js, Node.js, Python, PyTorch, tRPC.
  3. *Experience*: Frontend AI Engineering Intern at FlyRank.
  4. *Case Study Summary*: Condensed links to HIREVIUM, INDRA AI, and StackScout.
  5. *CTA Banner*: *"Download full PDF CV"* (Secondary) and *"Contact me on LinkedIn"* (Primary).

---

## 3. CTA System Map

| Page | Primary CTA | Secondary Action | Purpose |
| --- | --- | --- | --- |
| **Home** | *"Contact me on LinkedIn"* | *"View my projects"* | Establish initial interest and route to evidence. |
| **Projects** | *"Contact me on LinkedIn"* | *"Read HIREVIUM Case Study"* | Target active recruiters browsing capabilities. |
| **Case Study** | *"Contact me on LinkedIn"* | *"Explore next project"* | Convert readers who have reviewed technical proof. |
| **Resume** | *"Contact me on LinkedIn"* | *"Download PDF CV"* | Provide immediate conversion path during background check. |
