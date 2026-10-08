# Showcase Post — FlyRank AI Fluency Capstone

**Project Name**: Aditya Srivastav — Portfolio & Frontend AI Engineering Showcase  
**Live URL**: [https://frontend-ai-capstone-aditya.netlify.app/](https://frontend-ai-capstone-aditya.netlify.app/)  
**GitHub Repository**: [https://github.com/Adityasri05/frontend-ai-capstone](https://github.com/Adityasri05/frontend-ai-capstone)  
**Demo Video**: `[DEMO VIDEO URL — ADD AFTER UPLOAD]`

---

## 1. One-Line Description
A production-ready developer portfolio and AI product showcase built with Next.js 15 (App Router), React 19, TypeScript, Vercel AI SDK, and a personalized WebGL fragment shader hero.

## 2. Key Highlights & Features
* **Fragment Shader Hero**: Custom GLSL shader signature ("AI Intelligence Field") rendering ambient wave interference, grid telemetry lines, and interactive magnetic cursor attraction.
* **HIREVIUM AI Technical Qualification Interview**: Live streaming technical screening workspace utilizing Anthropic Claude 3.5 Sonnet, tool calling (`scoreCandidate`), and dynamic scorecards.
* **INDRA AI Grounded RAG Search**: Enterprise documentation retrieval featuring inline citation badges `[1]`, `[2]` and keyboard-trapped inspection drawers.
* **Hardened Security & Performance**: 100% server-side API proxy routing, IP rate limiting (10 req/min), input character caps, 60s maxDuration limits, 31 Vitest component tests, and Lighthouse Mobile score of 96.

## 3. Key Design Decision
I chose a lightweight native HTML5 WebGL canvas for the hero background rather than bundling Three.js or React Three Fiber (`@react-three/fiber`). This decision eliminated ~600KB of 3D engine bundle overhead, keeping initial JS under 112KB while achieving 60 FPS GLSL animation performance.

## 4. Honest Limitation
The `/api/chat` route uses an in-memory `Map` for IP rate limiting. While effective against single-client script abuse, in a multi-region serverless deployment state is not shared across instances. Upgrading to a centralized Redis store (e.g. Upstash) is the planned next step.

## 5. AI Transparency Statement
AI coding tools (Google DeepMind Antigravity and Claude 3.5 Sonnet) were used during development for GLSL math scaffolding, architecture brainstorming, and test generation. I personally reviewed all code edits, implemented strict server-side API proxy boundaries, verified WCAG AA accessibility, and wrote all unit test suites.

## 6. What I Learned
Through this capstone, I mastered streaming token handling, serverless API proxy security, raw WebGL shader programming, and empirical evaluation workflows.
