# Fragment Shader Hero — Submission

## Live URL
https://frontend-ai-capstone-aditya.netlify.app/

## What I Built
A custom, lightweight GLSL fragment shader background integrated into the personal developer portfolio hero (`src/components/hero/FragmentShaderHero.tsx`). It features a personalized **“AI Interface / Intelligence Field”** rendering wave interference patterns, coordinate grid lines, and magnetic cursor attraction.

## Shader Source
- `src/shaders/heroShader.ts` (GLSL source code, vertex & fragment shader strings, personalized inline comments)
- `src/components/hero/FragmentShaderHero.tsx` (React component managing WebGL lifecycle, DPR cap, resize listener, tab visibility, reduced motion, and CSS gradient fallback)

## Uniforms Used
- `u_time` (float): Animates wave propagation and domain rotation over time.
- `u_resolution` (vec2): Normalizes coordinates to prevent wide-screen stretching.
- `u_mouse` (vec2): Creates localized magnetic vector distortion around cursor.

## Personalization
Starting from an abstract wave field concept, I remixed and personalized the GLSL architecture by:
1. **Palette**: Replaced generic neon rainbow/cyberpunk colors with strict identity palette—Slate Navy (`#0f172a`), Tech Cobalt (`#2563eb`), and Soft Electric Highlight (`#93c5fd`).
2. **Motion**: Restrained animation speed (`t = u_time * 0.35`) for a calm technical aesthetic suitable for portfolio text.
3. **Spatial Composition**: Layered horizontal, diagonal, and radial sine waves with technical coordinate grid lines.
4. **Interaction**: Built smooth lerped magnetic cursor attraction using exponential decay decay radius `exp(-dist * 3.2)`.
5. **Finishing Pass**: Added procedural noise film grain pass (`hash21`) and vignette contrast pass to guarantee WCAG AAA text contrast.

## Reduced Motion
Reduced-motion users receive a static version of the shader palette, while animation pauses and WebGL rendering is minimized.

## Performance
- **DPR cap**: Capped at `Math.min(window.devicePixelRatio || 1, 2)` to eliminate excess fill-rate rendering on high-DPI displays.
- **Hidden-tab behavior**: Rendering loop pauses completely when `document.hidden` is true via `visibilitychange` listener.
- **Mobile behavior**: Smooth performance on mobile devices with graceful default cursor placement at container center.
- **WebGL fallback**: Automatic detection of WebGL context failure triggering an accessible CSS gradient backdrop (`from-slate-950 via-slate-900 to-blue-950`).

## Accessibility
- **Contrast**: Text uses `text-slate-100` over dark backdrop overlay (`bg-slate-950/40`), achieving > 15:1 contrast ratio (WCAG AAA).
- **Keyboard**: Canvas has `pointer-events-none` and `aria-hidden="true"`; hero CTAs maintain standard tab ordering and visible focus rings (`ring-blue-400`).
- **Focus**: Focus indicators remain clearly visible on interactive links/buttons.
- **Reduced motion**: Standard `@media (prefers-reduced-motion: reduce)` media query toggles static render state.

## Validation
- **Build**: Passed `next build` without errors.
- **Typecheck**: Passed TypeScript validation (`tsc --noEmit`).
- **Lint**: Passed Next.js ESLint validation.
- **Production verification**: Verified responsive hero layout, shader animation, mouse attraction, tab pause, and keyboard interaction.

## Mentor Explanation
> “The shader receives normalized screen coordinates, time, resolution, and mouse position. I transform the coordinates to maintain aspect ratio, generate the base field mathematically using layered sine waves and matrix rotation, gently distort it based on cursor position, map the resulting scalar field into my portfolio palette, and apply contrast vignette and grain before outputting the final pixel color.”

## Known Limitations
- Touch devices without mouse hover reflect static centered cursor attraction rather than real-time finger tracking; touchmove listeners could be added as an optional enhancement.
