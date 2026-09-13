# Aditya Srivastav — Visual Identity Kit

This document establishes the official visual identity system for the personal portfolio of **Aditya Srivastav**, Frontend AI Engineer.

---

## 1. Positioning & Audience

- **Role**: Frontend AI Engineer (B.Tech Computer Science & Engineering)
- **Target Audience**: Hiring Managers and Engineering Leads at AI/ML-first startups.
- **Core Value Proposition**: Practical AI product development, strong frontend implementation, thoughtful UI/UX, secure client/server architecture, and turning complex systems into understandable interfaces.
- **Visual Direction**: *Calm Technical* — restrained, minimal, confident, and human-crafted. The visual system stays quiet so the actual engineering proof remains the loud element.

---

## 2. Typography System

The portfolio uses an intentional combination of exactly two free Google fonts optimized for technical clarity and editorial legibility.

| Role | Font Family | Weights | Scale / Line Height | Usage Rationale |
| --- | --- | --- | --- | --- |
| **Headings / Display** | **Space Grotesk** | Bold (700), SemiBold (600), Medium (500) | `h1`: 36px–48px / 1.15<br>`h2`: 24px–30px / 1.25<br>`h3`: 18px–22px / 1.35 | Geometric, structured sans-serif communicating engineering precision and structural discipline. |
| **Body / UI** | **Inter** | Regular (400), Medium (500), SemiBold (600) | `body`: 14px–16px / 1.6<br>`small`: 12px–13px / 1.5<br>`mono/meta`: 11px–12px / 1.4 | Highly legible, neutral sans-serif designed for UI screens, technical documentation, and long-form case study reads. |

### Mobile Typography Constraints
- All headings wrap gracefully down to `375px` viewport width without horizontal overflow or word-breaking truncation.
- Minimum body text size is `14px` on mobile with a minimum `1.5` line-height for high accessibility.

---

## 3. Color System & Tokens

A restrained 4-color palette designed to keep readability high and eliminate generic dark "cyberpunk / AI-hacker" clichés.

| Design Token | Color Name | Hex Code | Role & Interface Usage | Contrast Ratio |
| --- | --- | --- | --- | --- |
| `--color-brand-text` | **Slate Navy** | `#0f172a` | Near-black primary text, headings, prominent borders | 15.8:1 (WCAG AAA) |
| `--color-brand-bg` | **Soft Paper** | `#fcfcfd` | Near-white light background, clean cards, page base | Base |
| `--color-brand-primary` | **Steel Slate** | `#334155` | Secondary text, structural cards, badge outlines, icons | 8.2:1 (WCAG AAA) |
| `--color-brand-accent` | **Tech Cobalt** | `#2563eb` | Single primary accent: CTA buttons, active links, focus rings | 4.6:1 (WCAG AA) |
| `--color-brand-border` | **Slate Border** | `#e2e8f0` | Subtle hairline layout borders and structural dividers | 1.2:1 (Structural) |

### Anti-Patterns Strictly Excluded:
- ❌ No neon purple / cyan glow gradients.
- ❌ No dark "AI-hacker" pitch-black canvas.
- ❌ No rainbow or multi-colored pill tags.
- ❌ No heavy glassmorphic blurs that obscure underlying data.

---

## 4. Logo & Favicon Identity

### Logo Concept
A minimal, geometric typographic monogram based on the initials **AS**. The monogram is enclosed in a crisp 2.5px rounded rectangular technical frame (`rx=8`), conveying structured software craftsmanship.

- **Navbar Mark**: Monogram box (`32x32px`) paired with clean wordmark `ADITYA SRIVASTAV` in Space Grotesk.
- **Asset Path**: `/logo.svg`

### Favicon Concept
A square version of the **AS** monogram optimized specifically for tab visibility across 16px, 32px, and high-DPI displays.

- **Asset Path**: `/favicon.svg`

---

## 5. Visual Mood Statement

> **"Technical, confident, minimal, thoughtful."**  
> The interface presents itself as a tool built by a thoughtful software engineer who values user experience, semantic code, and practical product applications over decorative visual noise.

---

## 6. Official Two-Line Style Note

```text
Fonts: Space Grotesk for headings, Inter for body. Palette: #0f172a, #fcfcfd, #334155, #2563eb.
Mood: Calm, precise, and technical — the interface stays quiet so the engineering work remains the focus.
```
