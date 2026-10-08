# Browser Compatibility Matrix

This document tracks browser compatibility testing across desktop and mobile browsers for the deployed production application.

---

## Browser Test Matrix

| Browser | Device | Version / OS | Main Flow | AI Flow (HIREVIUM) | Contact Form | Layout & WebGL | Status |
|---|---|---|---|---|---|---|---|
| **Chrome** | Desktop | 133.0 / Windows 11 | PASS | PASS (Streaming & Tool Card) | PASS | PASS (GLSL Shader 60 FPS) | **PASS** |
| **Firefox** | Desktop | 134.0 / Windows 11 | PASS | PASS (Streaming & Tool Card) | PASS | PASS (WebGL Canvas OK) | **PASS** |
| **Edge** | Desktop | 133.0 / Windows 11 | PASS | PASS (Streaming & Tool Card) | PASS | PASS (GLSL Shader 60 FPS) | **PASS** |
| **Safari** | Desktop | macOS Sequoia | PASS | PASS (ReadableStream stream) | PASS | PASS (Backdrop blur & GLSL) | **PASS** |
| **Safari** | iPhone | iOS 18.2 / iPhone 15 Pro | PASS | PASS (Mobile Stream & Touch UI) | PASS (iOS zoom prevention) | PASS (DPR Capped ≤2) | **PASS** |
| **Chrome** | Android | Android 15 / Pixel 8 | PASS | PASS (Mobile Stream) | PASS | PASS (Responsive touch targets) | **PASS** |

---

## Responsive Breakpoint Verification

- **Mobile Viewports (`375px` - `640px`)**: Verified single-column stacked layout, touch targets ≥ 44px, sticky header auto-close on link selection, and text wrap without horizontal scrollbars.
- **Tablet Viewports (`641px` - `1024px`)**: Verified 2-column project grids and centered hero canvas.
- **Desktop Viewports (`1025px+`)**: Verified full multi-column grid, interactive GLSL mouse tracking, and desktop floating score cards.

---

## WebGL & Performance Verification

- **Device Pixel Ratio (DPR)**: Capped at `Math.min(window.devicePixelRatio || 1, 2)`.
- **Tab Visibility Pause**: Verified animation pauses on background tab via `document.visibilityState`.
- **Reduced Motion**: Verified `@media (prefers-reduced-motion: reduce)` renders static shader frame.
- **WebGL Fallback**: Verified CSS gradient fallback triggers if WebGL context is unavailable.
