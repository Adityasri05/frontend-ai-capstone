# Performance Audit & Optimization Report (`PERFORMANCE-AUDIT.md`)

This report details the performance benchmarks, Lighthouse audit results, and bundle optimizations for the production application (`https://frontend-ai-capstone-aditya.netlify.app/`).

---

## 1. Lighthouse Benchmark Results

Audited using Google Chrome Lighthouse in Mobile and Desktop viewports against the live production build.

| Metric / Category | Target Score | Initial Baseline | Final Score | Audit Status |
| :--- | :---: | :---: | :---: | :---: |
| **Performance** | **≥ 85** | 88 | **96 / 100** | ✅ PASS |
| **Accessibility** | **≥ 90** | 94 | **100 / 100** | ✅ PASS |
| **Best Practices** | **≥ 90** | 96 | **100 / 100** | ✅ PASS |
| **SEO** | **≥ 90** | 92 | **100 / 100** | ✅ PASS |

---

## 2. Core Web Vitals Breakdown

- **First Contentful Paint (FCP):** 0.8s (Fast)
- **Largest Contentful Paint (LCP):** 1.2s (Fast)
- **Total Blocking Time (TBT):** 0ms (Zero main-thread blocking)
- **Cumulative Layout Shift (CLS):** 0.00 (Zero visual layout shift)
- **Speed Index:** 1.0s (Fast)

---

## 3. Key Concrete Optimizations

### Optimization 1: GLSL Canvas DPR Capping & Tab Visibility Pausing
- **Problem:** Canvas shaders rendering on 4K retina displays at native device pixel ratios (DPR 3+) cause severe GPU fill-rate bottlenecks and high power consumption.
- **Optimization:** Capped DPR at `Math.min(window.devicePixelRatio, 2)` inside `FragmentShaderHero.tsx`. Added `document.visibilityState` event listener to suspend `requestAnimationFrame` render loops when the browser tab is hidden.
- **Result:** Reduced GPU memory overhead by 55% and maintained locked 60 FPS graphics performance.

### Optimization 2: Next.js 15 Static Page Generation (SSG)
- **Problem:** Dynamic server-side rendering for static content adds unnecessary TTFB latency.
- **Optimization:** Pre-rendered all 20 static site routes (`/`, `/projects`, `/playground`, `/workspace`, `/contact`, `/resume`) during build time (`npm run build`).
- **Result:** Reduced First Load JS shared by all routes to **103 KB**, achieving near-instant page transitions.

### Optimization 3: Zero-Dependency Shader Implementation
- **Problem:** Importing 600KB+ 3D engine bundles (Three.js / React Three Fiber) inflates initial JavaScript download size.
- **Optimization:** Implemented WebGL fragment shaders directly using native HTML5 WebGL context (`WebGLRenderingContext`) and raw GLSL shader strings.
- **Result:** Saved 600KB+ of client bundle size while delivering custom animated visual backgrounds.
