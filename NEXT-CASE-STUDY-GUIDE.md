# How to Add My Next Case Study

This document details the exact, step-by-step process for adding a new project case study to the portfolio without rebuilding site architecture or losing visual identity.

---

## Step 1 — Create the Case Study Content

Target file location for static route:
```text
src/app/projects/fragment-shader-hero/page.tsx
```
Or for dynamic route lookup:
```text
src/app/projects/[slug]/page.tsx
```

The new file should export a standard Next.js App Router React page component utilizing the brand visual system (`Space Grotesk` headings, `Inter` body, slate card tokens).

---

## Step 2 — Use the Three-Beat Story

Every case study must follow the strict three-beat narrative structure:

### 1. Problem
* **Who had the problem?**: Visitors and recruiters browsing developer portfolios often see generic dark "cyberpunk" themes or heavy 3D canvas templates that cause GPU throttling, sluggish page loads, and poor text contrast.
* **What was difficult?**: Creating a distinctive visual background signature using WebGL without importing 600KB+ of Three.js libraries, while guaranteeing WCAG AAA text readability and tab visibility pausing.
* **Why did it matter?**: The hero section is the first 5-second impression; it must communicate engineering depth and design restraint without compromising accessibility.

### 2. What I Did
* **Implemented** a raw HTML5 WebGL canvas component (`src/components/hero/FragmentShaderHero.tsx`) rendering a personalized GLSL fragment shader (`src/shaders/heroShader.ts`).
* **Engineered** multi-frequency sine wave synthesis and 2D domain rotation to simulate an "AI Intelligence Field".
* **Built** exponential decay magnetic cursor attraction (`exp(-dist * 3.2)`).
* **Enforced** hardware constraints: DPR cap at `Math.min(devicePixelRatio, 2)`, `document.visibilityState` tab pause listener, `@media (prefers-reduced-motion: reduce)` static frame fallback, and dark vignette overlay (> 15:1 contrast ratio).

### 3. What Came Of It
* **60 FPS Graphics Performance**: 0KB external 3D dependency overhead, keeping first-load JS under 112KB.
* **Lighthouse Mobile Score**: Achieved 96/100 performance and 100/100 accessibility.
* **100% Production Tested**: Live and operational at `https://frontend-ai-capstone-aditya.netlify.app/`.

---

## Step 3 — Add Evidence

Gather and reference the following concrete evidence artifacts:
- **Live Production URL**: `https://frontend-ai-capstone-aditya.netlify.app/`
- **GitHub Repository**: `https://github.com/Adityasri05/frontend-ai-capstone`
- **GLSL Source Code**: `src/shaders/heroShader.ts`
- **Technical Documentation**: `SHADER-NOTES.md` & `SHADER-WALKTHROUGH.md`
- **Screenshot Evidence**: `docs/screenshots/hero-shader.svg`

---

## Step 4 — Add the Case to the Portfolio

To surface the new case study in the portfolio UI, update these exact repository files:

1. **Projects Index Page**:
   - File: `src/app/projects/page.tsx`
   - Action: Add the project metadata object to the `PROJECTS` array (title, category, tags, case study link `/projects/fragment-shader-hero`).
2. **Homepage Selected Work (Optional)**:
   - File: `src/app/page.tsx`
   - Action: Add a featured project `<article>` card under `#work`.
3. **Portfolio Context Master Registry**:
   - File: `portfolio-context/PROJECTS.md`
   - Action: Register project name, stack, live link, and status.

---

## Step 5 — Check Visual Consistency

Ensure the new case study aligns with `IDENTITY_KIT.md`:
- **Typography**: Headings use Space Grotesk (`font-display`), body uses Inter (`font-sans`).
- **Color Tokens**: Background `#fcfcfd`, cards `#f1f5f9`, Slate Navy text `#0f172a`, Tech Cobalt accent `#2563eb`, Slate Border `#e2e8f0`.
- **Layout & Spacing**: Padding `p-5 sm:p-8`, border radius `rounded-2xl`, subtle shadow `shadow-sm`.
- **Touch Targets**: All CTA buttons maintain `min-h-[44px]` with visible focus rings (`focus-visible:ring-2 focus-visible:ring-brand-accent`).

---

## Step 6 — Update the Through-Line

Ensure the project narrative reinforces Aditya's core positioning statement:
> *"Frontend engineer building AI-powered products with practical understanding of LLMs, prompt design, secure API routing, and AI-driven interfaces."*

---

## Step 7 — Test the New Case

Run this pre-publish regression checklist:
- [ ] Case study route `/projects/fragment-shader-hero` loads cleanly.
- [ ] Project card links work on `/projects` and `/`.
- [ ] GitHub repository link points to `https://github.com/Adityasri05/frontend-ai-capstone`.
- [ ] Images/SVGs load without broken asset icons.
- [ ] Tested responsive layout on mobile (375px) and desktop (1440px).
- [ ] TypeScript check passes (`npx tsc --noEmit`).
- [ ] Vitest test suite passes (`npm run test:run`).
- [ ] Production build succeeds (`npm run build`).

---

## Step 8 — Publish

Deploy updates using the standard git push workflow:

```bash
git add .
git commit -m "feat(projects): add Fragment Shader Hero case study"
git push origin main
```
Netlify Edge CDN will automatically trigger a production deployment.
