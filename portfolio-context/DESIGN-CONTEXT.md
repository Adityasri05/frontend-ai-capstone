# Visual System & Design Context

## 1. Typography System
* **Headings / Display**: `Space Grotesk` (Geometric, engineering precision)
* **Body / UI**: `Inter` (Neutral, highly legible UI font)

## 2. Color Palette & CSS Variables
* `--color-brand-bg`: `#fcfcfd` (Soft Paper Base)
* `--color-brand-card`: `#f1f5f9` (Slate Card Base)
* `--color-brand-primary`: `#2563eb` (Tech Cobalt Primary)
* `--color-brand-border`: `#e2e8f0` (Subtle Hairline Border)
* `--color-brand-text`: `#0f172a` (Slate Navy Text - WCAG AAA > 15:1)
* `--color-brand-muted`: `#475569` (Muted Slate Text)

## 3. Interaction & Accessibility Rules
* Minimum touch target size: `44x44px`.
* Focus indicators: Visible focus rings (`focus-visible:ring-2 focus-visible:ring-brand-accent`).
* Reduced motion: Respect `@media (prefers-reduced-motion: reduce)` in CSS and WebGL.
* iOS zoom prevention: Form inputs use `text-base sm:text-xs`.
