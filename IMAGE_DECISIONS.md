# Aditya Srivastav — Image Curation Decisions & Consistency System

This document outlines the evaluation framework, consistency rules, single prompt template, and KEEP/REJECT decisions for all visual assets in the portfolio.

---

## 1. The 7-Point Curation Evaluation Framework

Every candidate visual asset is strictly evaluated against these 7 questions before inclusion:

1. **Does it strengthen my portfolio claim?** (Does it prove frontend engineering, AI integration, or client-server architecture?)
2. **Does it fit the visual identity?** (Does it match the Soft Paper `#fcfcfd`, Slate Navy `#0f172a`, and Tech Cobalt `#2563eb` palette without neon clutter?)
3. **Does it distract from the actual project?** (Is the project work the loudest element?)
4. **Does it look believable and intentional?** (Does it look like deliberate software craftsmanship rather than auto-generated stock art?)
5. **Does it communicate something useful?** (Does it convey data architecture, layout structure, or UX workflows?)
6. **Does it look consistent with the other visuals?** (Does it share geometric language and lighting tone?)
7. **Would a hiring manager benefit from seeing it?** (Does it provide verifiable technical proof?)

---

## 2. AI Connective Visuals: Consistency Rules

All AI-generated connective graphics must belong to the **SAME visual family** by obeying these rules:

- **Visual Style**: Minimalist technical blueprint / wireframe geometry.
- **Lighting Approach**: Flat, clean, non-directional light on light background (no dark vignetting or glowing light points).
- **Geometry Language**: Orthogonal lines, 90-degree intersections, clean rounded corners (`rx=8px`), and subtle coordinate dots.
- **Texture Treatment**: Fine hairline vector strokes (0.5px to 1px) at 2% to 6% opacity.
- **Composition Rules**: Edge-aligned or modular matrix patterns that frame text content without center-blocking.
- **Background Treatment**: Light `#fcfcfd` canvas with subtle slate `#334155` or cobalt `#2563eb` hairline strokes.
- **Aspect Ratios**: Seamless repeating tile (1:1 pattern box) or wide 16:9 banner container.

### Unified Prompt Template (Master Template)
```text
Minimal technical vector wireframe diagram, clean orthogonal blueprint grid, subtle geometric lines and coordinate points, slate gray (#334155) and cobalt blue (#2563eb) lines on off-white paper background (#fcfcfd), 2D flat architectural precision, no neon glow, no 3D elements, no gradients, no human figures, high resolution SVG style.
```

### Derived Prompt: Hero Technical Blueprint Texture
```text
Seamless repeating 40px modular technical grid pattern, hairline coordinate crosshairs every 40px, subtle 10px minor subdivision lines in slate blue (#2563eb) at 4% opacity, on flat off-white background (#fcfcfd), minimal clean engineering aesthetic.
```

---

## 3. Visual Decisions Log (KEEP vs. REJECT)

### Candidate 1: Vector Blueprint Grid Texture (`/hero-texture.svg`)
- **Type**: AI-Generated Connective Visual
- **Decision**: **KEEP**
- **Evaluation**:
  - Strengths: Quiet, vector-based architectural framing. Enhances the engineering feel without creating visual clutter. High performance (<1 KB SVG).
  - Alignment: 100% compliant with the 4-color palette and Space Grotesk/Inter typography.

### Candidate 2: Neural Network Glow Graphic (`rejected-hero-neural-glow.png`)
- **Type**: AI-Generated Hero Banner Background
- **Decision**: **REJECT**
- **Specific Rejection Rationale**:
  * "The image was visually loud with neon cyan/purple glows and floating binary nodes, which competed directly with the project headlines and destroyed the calm technical hierarchy."
  * "The visual looked like generic AI stock artwork and provided zero evidence of actual frontend engineering or practical LLM routing."

### Candidate 3: 3D Isometric Robot Holding Dashboard (`rejected-about-ai-robot.png`)
- **Type**: AI-Generated About Section Illustration
- **Decision**: **REJECT**
- **Specific Rejection Rationale**:
  * "The visual introduced a cartoonish 3D render style that clashed completely with the flat typographic design system."
  * "It framed AI development as a gimmicky mascot rather than a rigorous engineering discipline, weakening the hiring manager's confidence."

### Candidate 4: Real Work Screenshots (HIREVIUM, INDRA AI, StackScout)
- **Type**: REAL WORK (Capture)
- **Decision**: **KEEP (Strict Priority)**
- **Specific Rationale**:
  * "Real screenshots prove the developer wrote functioning Next.js/React code, styled dense layouts, and integrated actual AI APIs. AI mockups would destroy professional credibility."

### Candidate 5: Real Professional Photograph (Aditya Srivastav Headshot)
- **Type**: REAL PHOTO
- **Decision**: **KEEP (Strict Priority)**
- **Specific Rationale**:
  * "Recruiters at AI startups require authentic human representation. Using an AI-generated portrait would be dishonest and destroy trust immediately."
