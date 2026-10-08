# FL-10 — Retrospective & Engineering Handoff

**Author**: Aditya Srivastav (Frontend AI Engineer)  
**Target Audience**: My Week 1 Self & Technical Evaluators  
**Word Count**: ~720 words

---

## 1. What I Set Out to Do

At the beginning of the FlyRank AI Fluency track, I set out to build a personal developer portfolio that would stand out to AI/ML startups and technical hiring managers. 

Initially, I envisioned a standard portfolio site with a basic chatbot widget pasted into the corner. I thought "building an AI frontend" simply meant fetching text from an LLM endpoint and rendering it inside a standard React state variable. I did not appreciate the deep engineering challenges of real-time token streaming, client-side security proxying, unclosed Markdown flicker, or WebGL shader performance.

---

## 2. What Actually Changed

Over the 10-week journey, my understanding evolved from building simple websites to engineering resilient **human-AI interfaces**.

The scope expanded from a static portfolio to a comprehensive AI Engineering Showcase comprising:
- **HIREVIUM**: A live streaming technical interviewer with server-side tool execution (`scoreCandidate`).
- **INDRA AI**: A grounded RAG knowledge search interface with sliding inline citation drawers `[1]`, `[2]`.
- **StackScout**: An autonomous agent decision pipeline visualizer.
- **Fragment Shader Hero**: A custom GLSL WebGL visual signature built from scratch with zero Three.js bundle bloat.

Architecturally, I shifted from naive client-side API calls to strict serverless proxy boundaries (`POST /api/chat`) enforcing IP rate limits, schema validation, character caps, and complete API key isolation.

---

## 3. What I Understand Now That I Didn't in Week 1

1. **AI API Keys Must Never Reach the Browser**: In Week 1, I didn't realize how easily client-side API keys can be extracted from browser network tabs. I now understand that all model calls must be proxied through server routes (`/api/chat`) where secrets remain protected in server environment variables.
2. **Streaming AI UX Requires Dedicated State Management**: Streaming tokens isn't just `setState(text)`. You must handle incomplete Markdown syntax, stream interruption signals (`AbortController`), auto-scroll detachment upon manual user scrolling, and structured JSON tool event decoding.
3. **Graphics Performance Requires Hard Hardware Constraints**: WebGL fragment shaders will incinerate mobile GPUs if un-capped. Implementing Device Pixel Ratio capping (`Math.min(window.devicePixelRatio, 2)`) and tab-visibility pausing (`document.visibilityState`) is essential for real-world production readiness.

---

## 4. The Three Most Transferable Things I Learned

### Lesson 1: Security-First API Proxy Routing
* **What changed in my behavior**: I never expose third-party AI keys in client bundles or `NEXT_PUBLIC_` variables. All model requests pass through serverless route handlers.
* **Why it transfers**: Every commercial web app integrating LLMs requires secure backend API proxies to protect API budgets and prevent prompt injection abuse.

### Lesson 2: Defensive Input Caps & Rate Limiting
* **What changed in my behavior**: I treat every public API route as vulnerable to bot traffic. I implement IP rate limiters, payload size caps (4,000 chars/msg), and role validation upfront.
* **Why it transfers**: Protecting serverless functions from denial-of-service and runaway API costs is a critical requirement for any production engineering role.

### Lesson 3: Accessibility & Hardware-Aware UI
* **What changed in my behavior**: I design with WCAG 2.1 AA standards from day one—enforcing touch targets ≥ 44px, keyboard focus trapping, visible focus rings, and `@media (prefers-reduced-motion: reduce)` fallbacks.
* **Why it transfers**: Building accessible, high-performance web products is mandatory for high-scale frontend engineering teams.

---

## 5. What Didn't Work

During early iterations of HIREVIUM, I attempted to render structured tool evaluation output (the candidate scorecard) by asking Claude to stream raw JSON strings directly inside the conversational text stream. 

This approach failed completely. As tokens arrived incrementally, `JSON.parse()` crashed on partial JSON strings, causing layout flickers and client UI crashes. 

**How I Fixed It**: I refactored the architecture to use formal Vercel AI SDK Tool Calling (`scoreCandidate`). The server handles tool execution deterministically and emits clean event frames (`__TOOL_EVENT__:input-available`), allowing the React client to render a robust, isolated `CandidateScoreCard` component without parsing raw stream strings.

---

## 6. What I Would Build Next

For V2, I would:
1. **Centralized Redis Rate Limiting**: Replace the in-memory rate limiter with Upstash Redis for multi-region serverless consistency.
2. **Vector DB RAG Pipeline**: Connect INDRA AI to a live Pinecone or Qdrant vector database for real-time document embeddings.
3. **Multi-Modal Touch Shader**: Expand the GLSL Fragment Shader Hero to support multi-touch tracking on mobile devices.

---

## 7. How I Work Differently Now

Compared to Week 1, I no longer copy AI-generated code blindly or build fragile prototypes. I approach software engineering with a **defensive, production-first mindset**: auditing API key boundaries, writing automated Vitest test suites (31/31 passing), capping performance metrics (Lighthouse 96), and documenting trade-offs clearly.
