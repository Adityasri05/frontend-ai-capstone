# FL-09 — 4-Minute Demo Video Script

**Target Duration**: 3:30 – 4:00 minutes  
**Format**: Live application screen recording + developer voice narration (No PowerPoint slides)  
**Presenter**: Aditya Srivastav (Frontend AI Engineer)

---

## 0:00 – 0:20 | Introduction (18 seconds)

> *"Hi everyone, I'm Aditya Srivastav. This is my Frontend AI Engineering Capstone—a production developer portfolio and AI product showcase.
> 
> It's built for technical recruiters and engineering leads to evaluate how I build resilient human-AI interfaces, secure API proxies, and accessible WebGL graphics using Next.js 15, React 19, TypeScript, and the Vercel AI SDK."*

---

## 0:20 – 1:00 | Starting State & Hero Signature (35 seconds)

> *"Let's open the live application at frontend-ai-capstone-aditya.netlify.app.
> 
> Right away in the hero section, you're looking at my personalized Fragment Shader Hero signature. I call this the 'AI Intelligence Field'.
> 
> Notice how as I move my cursor across the hero, the GLSL wave field magnetically distorts towards the pointer. This isn't a pre-rendered video—it's pure WebGL compiling custom fragment GLSL shaders in real time. It's capped at Device Pixel Ratio 2, pauses automatically if I switch browser tabs to save battery, and has a dark contrast overlay ensuring text contrast exceeds 15-to-1."*

---

## 1:00 – 2:15 | Live End-to-End AI Run — HIREVIUM Workspace (75 seconds)

> *"Now let's jump into the core AI integration: HIREVIUM, my dual-sided AI Technical Qualification Interviewer.
> 
> I'll type a technical answer about Next.js 15 streaming architecture and press Send.
> 
> Notice how response tokens stream in real time. All Anthropic Claude calls route securely through my backend API endpoint at `/api/chat`. My server proxy validates payload schemas, enforces a 10 request-per-minute IP rate limit, and strictly protects the `ANTHROPIC_API_KEY` server-side so keys never leak to client JavaScript.
> 
> Now, I'll type 'Evaluate my performance and generate my scorecard.' Watch what happens:
> 
> Claude invokes a server-side tool called `scoreCandidate`. The server streams tool execution events directly to the UI—first showing `input-streaming`, then executing the assessment, and rendering this structured Candidate Qualification Score Card with score metrics and technical strengths."*

---

## 2:15 – 2:50 | Key Technical & Architectural Decision (35 seconds)

> *"One technical decision I made here was to use a native HTML5 WebGL canvas context for the fragment shader rather than importing Three.js or React Three Fiber.
> 
> By writing raw GLSL shader code in `src/shaders/heroShader.ts`, I eliminated over 600KB of 3D engine bundle bloat. This allowed the homepage first-load JS to remain under 112KB while achieving 60 FPS animation performance and instant reduced-motion fallback."*

---

## 2:50 – 3:30 | Real Honest Limitation (40 seconds)

> *"One real limitation I want to be clear about is my IP rate limiting implementation.
> 
> Right now, the sliding-window rate limiter in `/api/chat` uses an in-memory JavaScript Map on the serverless handler. While this effectively blocks single-client script spam, in a multi-region serverless environment where cold starts spin up separate instances, state isn't shared across regions. 
> 
> In a V2 production upgrade, I would back this rate limiter with a centralized Redis instance using Upstash."*

---

## 3:30 – 4:00 | Conclusion & Wrap-Up (25 seconds)

> *"To summarize: I've shipped a fully hardened portfolio featuring WebGL graphics, verifiable AI tool outputs, 31 automated Vitest unit tests, and 100% WCAG AA accessibility.
> 
> You can clone the repository, follow the setup guide in the README, or test the live deployment link directly. Thank you for watching!"*
