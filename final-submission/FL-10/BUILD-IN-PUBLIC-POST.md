# Build-in-Public Post — FlyRank AI Fluency Capstone

🚀 **I built a production developer portfolio & AI engineering showcase with Next.js 15, WebGL fragment shaders, and streaming Anthropic Claude tool calling!**

Here is the story of how I built it, the security decisions I made, and the real limitations I encountered along the way.

---

### 1. The Hook
I wanted to transition from "building basic websites" to engineering **verifiable human-AI products** that recruiters and engineering leads can actually test live.

### 2. The Problem
Most AI portfolio demos exposed API keys in client bundles, crashed on unclosed Markdown tokens during streaming, or lacked basic rate limiting and accessibility standards.

### 3. What I Built
- **Fragment Shader Hero**: A personalized WebGL background signature ("AI Intelligence Field") rendering custom GLSL shaders with zero Three.js bundle bloat.
- **HIREVIUM**: A live technical interviewer streaming Claude 3.5 Sonnet responses and executing server-side tool calls (`scoreCandidate`).
- **INDRA AI**: A grounded RAG search UI with inline citation badges `[1]`, `[2]` and inspection drawers.

### 4. Real Architectural Decision
I built the fragment shader hero using native HTML5 WebGL canvas context rather than importing Three.js. This saved **~600KB of 3D engine bundle bloat**, keeping initial JS under 112KB while achieving 60 FPS animation performance.

### 5. Real Honest Limitation
The `/api/chat` route currently uses an in-memory `Map` for IP rate limiting (10 req/min). While it effectively blocks single-client script abuse, serverless cold starts across multiple regions do not share state. Upgrading to Upstash Redis is my planned V2 enhancement.

### 6. AI Transparency
I used Google DeepMind Antigravity and Claude 3.5 Sonnet for GLSL math scaffolding, test generation, and architecture brainstorming. I personally reviewed all code edits, built strict server-side API proxy handlers, verified 100% WCAG AA accessibility, and authored 31 Vitest unit tests.

### 7. Results & Links
* 🌐 **Live Demo**: [https://frontend-ai-capstone-aditya.netlify.app/](https://frontend-ai-capstone-aditya.netlify.app/)
* 💻 **GitHub Repository**: [https://github.com/Adityasri05/frontend-ai-capstone](https://github.com/Adityasri05/frontend-ai-capstone)
* 📹 **Demo Video**: `[DEMO VIDEO URL — ADD AFTER UPLOAD]`

### 8. What's Next
Connecting INDRA AI to a live Pinecone vector store and adding multi-touch GLSL interaction on mobile!
