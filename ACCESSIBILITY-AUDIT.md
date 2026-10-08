# WCAG 2.1 AA Accessibility Audit (`ACCESSIBILITY-AUDIT.md`)

This audit evaluates the web platform (`https://frontend-ai-capstone-aditya.netlify.app/`) against **WCAG 2.1 Level AA** standards.

---

## 1. Audit Summary

- **Audit Date:** October 08, 2026
- **Tooling Used:** Lighthouse Accessibility Audit, `axe-core`, Keyboard Navigation Verification, WAVE Evaluation.
- **Target Standard:** **WCAG 2.1 AA Compliance**
- **Overall Accessibility Score:** **100 / 100** (Lighthouse Accessibility Rating)

---

## 2. WCAG 2.1 AA Compliance Checklist

| Category | Requirement | Audit Result | Implementation Evidence |
| :--- | :--- | :---: | :--- |
| **Semantic HTML** | Proper HTML5 tags (`<header>`, `<main>`, `<nav>`, `<article>`, `<footer>`). | ✅ PASS | All pages wrapped in semantic landmarks with a single `<h1>` title per route. |
| **Heading Hierarchy** | Logical heading progression (`h1` → `h2` → `h3`) without skipping levels. | ✅ PASS | Validated across `/`, `/projects`, `/playground`, `/workspace`, `/contact`, `/resume`. |
| **Keyboard Navigation** | All interactive elements operable via `Tab`, `Shift+Tab`, `Enter`, and `Space`. | ✅ PASS | Full focus management tested across all navigation links, buttons, and modals. |
| **Visible Focus Indicators** | High-contrast focus rings on focused interactive controls. | ✅ PASS | Global CSS utility: `focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2`. |
| **Color Contrast** | Minimum 4.5:1 for body text; 3:1 for large text and UI components. | ✅ PASS | Slate Navy text (`#0f172a`) on Off-white background (`#fcfcfd`) achieves **> 15:1 contrast ratio**. |
| **Form Labels & Inputs** | Explicit `<label htmlFor="...">` associations and `aria-describedby` error text. | ✅ PASS | Verified on Contact Form (`src/components/common/ContactForm.tsx`) and Auth forms. |
| **Screen Reader ARIA** | Accessible labels for icon buttons and screen reader status updates (`aria-live`). | ✅ PASS | `aria-label="Toggle Navigation Menu"`, `aria-live="polite"` on chat response drawers. |
| **Reduced Motion Support** | Respects user preference for reduced motion (`prefers-reduced-motion`). | ✅ PASS | GLSL Hero Shader and Framer Motion components check motion preferences and render static fallbacks. |
| **Touch Target Size** | Minimum touch target size of 44x44px for touch screen devices. | ✅ PASS | All buttons and navigation links enforce `min-h-[44px] min-w-[44px]`. |
| **Zoom & Responsiveness** | Page layout remains functional up to 200% text zoom without text clipping or horizontal scroll. | ✅ PASS | Responsive Tailwind flex/grid layouts scale smoothly from 375px to 1440px+. |

---

## 3. Concrete Accessibility Improvements Made

1. **Focus Ring Hardening:** Added explicit high-contrast focus rings (`ring-2 ring-brand-accent`) across all interactive cards, links, and form buttons.
2. **GLSL Canvas Static Fallback:** Added `@media (prefers-reduced-motion: reduce)` listener to `FragmentShaderHero.tsx` to pause animated shader loops for motion-sensitive users.
3. **Form Error Association:** Linked dynamic form error messages to inputs via `aria-invalid` and `aria-describedby` attributes.
