# Week 2: Frame It as Cases — Portfolio Case Studies

- **Candidate Name**: Aditya Srivastav
- **Internship**: FlyRank AI Frontend Engineering Internship (Phase 1)
- **Target Role**: Frontend AI Engineer
- **Date**: August 2026

---

# Voice Card
- **Voice Card (5–7 words)**: `Direct, honest, technical, practical, human, concise.`
- **Claude Project Directive**: 
  > "Adopt a direct, honest, and practical tone. Avoid generic developer buzzwords. Focus on technical evidence, explain decisions and trade-offs clearly, and remain approachable and human."

---

# About Me
I am a B.Tech Computer Science student and Frontend AI Engineering Intern at FlyRank. I focus on building React user interfaces that integrate securely with AI agents and LLMs. Rather than treating AI as a black box, I design interfaces that make automated pipelines transparent, combining tools like Next.js, FastAPI, and Gemini to build secure, responsive web applications. I am actively learning Node.js and machine learning (PyTorch) to strengthen the connection between client-side user experience and backend model orchestration. My goal is to build interfaces that communicate uncertainty, display source citations, and provide verifiable evidence, making AI tools more reliable and transparent for real-world users.

---

# Case Study 1: HIREVIUM (AI Hiring Operating System)

### 1. The Problem
Early-stage technical screening is highly inefficient. Recruiters spend hours scanning resumes that often exaggerate technical skills, while engineering managers waste valuable sprint time interviewing candidates who lack core competencies. Traditional online coding assessments fail to help: they are static, repetitive for strong candidates, and do not evaluate how a developer explains their reasoning, handles hints, or responds to technical pressure. 

### 2. What I Built & Why
I built the user-facing experience and AI integration for HIREVIUM, a dual-sided technical screening workspace. In the live interview workspace, I designed a React Q&A interface that works with an **Adaptive Difficulty Controller** on the backend. Instead of using a fixed questionnaire, the difficulty scales up or down dynamically based on the candidate's response score. 

I chose to manage the interview state using standard React hooks (`useState` and `useEffect`) because the scope was focused on a single view, avoiding the unnecessary overhead of global state libraries. For security, I routed all Gemini 2.5 Flash Lite API calls through a FastAPI backend proxy to prevent exposing the Google API credentials in the browser, making the frontend purely responsible for capturing input, managing local timers, and displaying loading skeletons and validation errors.

### 3. Outcome & Reflection
The adaptive interview flow worked as expected, clearly demonstrating how AI can simulate a real developer interview. However, waiting for the full response from the Gemini API sometimes caused latency in the UI. If I were rebuilding HIREVIUM today, I would implement **streaming AI responses** on the frontend to render tokens progressively. I would also migrate the interview state to Zustand to simplify state updates as we introduce collaborative multi-user recruiter panels.

---

# Case Study 2: INDRA AI (Enterprise Knowledge Base)

### 1. The Problem
As organizations grow, valuable documentation is scattered across PDFs, wikis, and chat histories, leading to knowledge silos. When companies try to use generative AI to solve this, they encounter trust issues: generic AI models often hallucinate or output inaccurate answers because they lack access to the company's trusted documents. In an enterprise environment, unverified information creates security risks and reduces confidence in AI tools.

### 2. What I Built & Why
I developed the frontend search and collection dashboard for INDRA AI. My primary goal was to make AI outputs transparent and verifiable for enterprise users. I built reusable React components to display grounded RAG responses paired with numbered inline citations **[1]**, **[2]** pointing to supporting files, alongside color-coded trust score badges (green, yellow, and red). 

To ensure type safety across the application, I integrated the UI with the backend using tRPC, which caught API parameter mismatches during compilation. For viewing cited documents, I chose to implement a sliding **side drawer panel** with keyboard focus trapping. This allowed users to read the supporting source text next to the AI's answer without losing their place in the chat or navigating away from the search page.

### 3. Outcome & Reflection
SURFACING citations and trust scores directly addressed the enterprise trust deficit: users could verify answers in real-time, making the assistant feel more reliable. The biggest lesson was that error states and loading feedback are just as important as the model's accuracy. Today, I would improve the architecture by implementing **document highlighting** (scrolling the drawer directly to the cited text segment) and adding client-side caching via TanStack Query to reduce database loads.

---

# Case Study 3: StackScout (Autonomous Procurement Agent)

### 1. The Problem
Evaluating software platforms (monitoring tools, CRMs, databases) is a manual and time-consuming task. Procurement managers and engineers spend hours reading documentation, comparing feature matrices, and analyzing pricing tiers spread across multiple vendor websites. General AI recommendations are often outdated or incorrect. This research overhead diverts developers from building actual features.

### 2. What I Built & Why
I built the frontend dashboard and tracking interfaces for StackScout, an autonomous procurement agent. Because background scraping can take several minutes, displaying a simple loading spinner would make the app look frozen. I designed the UI using **progressive disclosure** principles: a high-level status pipeline showed the current agent phase (*Planning*, *Crawling*, *Scoring*, *Report Generation*), while detailed scraper logs were hidden behind expandable panels. 

For the prototype, I implemented **HTTP polling** via React hooks to update the progress bar. Polling was a pragmatic decision that simplified local deployment and met our initial workload needs. The UI translated crawling errors (like blocked websites or rate limits) into clear warning labels and provided a simple "retry" trigger.

### 3. Outcome & Reflection
Surfacing the agent's progress step-by-step built trust and prevented users from closing the app during long crawling sessions. The main takeaway is that autonomous workflows require continuous UI feedback. For a production environment, I would replace the polling architecture with **real-time event streaming via Server-Sent Events (SSE)**. This would reduce network requests and provide instant UI updates as the agent navigates external web pages.

---

# Contact
### Option 1 (Professional)
I am looking for junior Frontend AI Engineering roles. Contact me on LinkedIn to discuss how I can help build secure, AI-powered web applications for your team.

### Option 2 (Friendly)
I love talking about React, secure API proxying, and building AI agents. Let's connect on LinkedIn to discuss internship opportunities or share developer stories!

### Option 3 (Minimal)
Contact me on LinkedIn to discuss junior Frontend AI Engineering opportunities or collaborate on intelligent web applications.

---

# Before / After Example

### Vague AI Version
> "We implemented an innovative, world-class RAG solution with Pinecone and tRPC, leveraging cutting-edge LLMs to revolutionize enterprise search with best-in-class performance."

### My Edited Version
> "I built the Next.js search dashboard and integrated it with our backend using tRPC to provide type-safe queries. Rather than asking users to trust the AI's responses blindly, I designed a side drawer panel that lets users read cited source documents next to the answer."

### Why the Edited Version is Stronger
The generic version is full of buzzwords (*world-class, leveraging, revolutionize, best-in-class*) that offer no concrete details. The edited version explains the exact technologies used (Next.js, tRPC), describes the specific layout decision (side drawer panel), and focuses on the core user benefit (trust and verifiability) in plain, honest language.

---

# Final Reflection
This workflow audit and case study mapping has helped me understand that a premium portfolio is not built on generic adjectives, but on concrete engineering decisions. Highlighting trade-offs (like choosing standard React state hooks over Zustand for a prototype, or using HTTP polling instead of WebSockets) makes my experience far more believable to a senior tech lead. Exposing the secure API proxy boundaries in my code proves that I build web tools that are not only functional, but secure and production-ready.
