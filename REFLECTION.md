# Engineering Reflection & Capstone Retrospective (`REFLECTION.md`)

This document records an honest engineering reflection on the capstone development process, technical trade-offs, and lessons learned.

---

## 1. What Was Hardest?

The hardest technical challenge was **balancing high-performance animated WebGL graphics rendering with strict accessibility standards and low power consumption**. Creating a visual signature for the portfolio hero section using raw GLSL fragment shaders required managing WebGL contexts directly without importing heavy 3D frameworks like Three.js.

---

## 2. Why Was It Difficult?

- **Fill-Rate Bottlenecks on High-DPI Displays:** On 4K retina displays with device pixel ratios (DPR) of 3+, unconstrained WebGL canvases compute millions of fragment shader evaluations per frame, leading to GPU fill-rate throttling and battery drain.
- **Contrast Ratios:** Dynamic multi-frequency sine wave animations can create bright background spots that degrade text contrast. Achieving WCAG AAA text contrast (> 15:1) required engineering a custom dark radial vignette overlay (`#0f172a` backdrop) over the WebGL canvas.
- **Tab Visibility:** Preventing background render loops when the browser tab is hidden required wiring explicit `document.visibilityState` listeners to pause `requestAnimationFrame`.

---

## 3. What Would I Do Differently Next Time?

Next time, I would implement **distributed Redis-backed sliding window rate limiting** (using Upstash Redis) for the `/api/chat` route rather than relying on in-memory Node.js state. While in-memory tracking is lightweight and zero-dependency, serverless platforms like Netlify re-instantiate in-memory state on cold starts, making Redis a more durable rate-limiting backend for high-traffic environments.

---

## 4. One Thing I Learned That Surprised Me

I was surprised by how much **deterministic weighted scoring formulas outperform raw LLM prompt evaluations** when building decision-support agents. In early tests with HackScout AI, asking LLMs to output subjective scores (e.g. "Rate this hackathon 1 to 100") resulted in non-deterministic score drift across runs. Switching to a deterministic 5-tier formula (Skill 30%, Eligibility 25%, Deadline 20%, Project 15%, Value 10%) made agent evaluation **100% reproducible and testable** in Python automated test suites.

---

## 5. What I Am Proud Of

I am proud of delivering a **complete, production-ready, accessible, and fully verified AI application package**:
- Achieved **96/100 Lighthouse Performance** and **100/100 Accessibility** ratings.
- Engineered a **100% passing Python agent evaluation suite (7/7 cases passed)** with zero automated registration guardrail violations.
- Built a **100% passing Vitest component suite (31/31 tests passed)**.
- Deployed a stable, live production site on Netlify Edge CDN with zero credential leaks.
