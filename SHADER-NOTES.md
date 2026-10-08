# Fragment Shader Hero — Technical Notes

## 1. What I Built
A custom, lightweight GLSL fragment shader background integrated into the primary portfolio hero section (`src/components/hero/FragmentShaderHero.tsx` & `src/shaders/heroShader.ts`). It renders an atmospheric, procedural **“AI Interface / Intelligence Field”** featuring dynamic wave interference, grid telemetry lines, and interactive magnetic cursor attraction.

## 2. Why I Chose This Visual
As a Frontend AI Engineer, I wanted a visual signature that reflects the nature of machine intelligence: dynamic, mathematical, structured, and continuous. The visual avoids neon cyberpunk clichés, instead utilizing a restrained slate navy (#0f172a) and tech cobalt (#2563eb) palette that matches my portfolio identity.

## 3. Uniforms
```text
u_time
Purpose: Continuous elapsed animation time in seconds.
Where updated: Updated on every animation frame in requestAnimationFrame inside FragmentShaderHero.tsx.
How it affects the shader: Animates sine wave frequencies, rotates the 2D domain matrix, and drives procedural grain noise.

u_resolution
Purpose: Width and height of the canvas in physical pixels.
Where updated: Recalculated during window resize or element container ResizeObserver callbacks.
How it affects the shader: Normalizes fragment coordinates (gl_FragCoord.xy) so coordinates remain aspect-corrected without horizontal or vertical stretching.

u_mouse
Purpose: Normalized cursor position inside the hero container (bottom-left origin).
Where updated: Tracked via mousemove and mouseleave event listeners on the hero container.
How it affects the shader: Distorts local UV space using an exponential decay pull radius, attracting signal waves towards the cursor position.
```

## 4. UV Mental Model
```text
Screen Coordinates (gl_FragCoord.xy in range [0, width] x [0, height])
      ↓
Normalized Coordinates (Divided by canvas height)
      ↓
Centered Coordinates (Offset by 0.5 * resolution to place (0,0) at viewport center)
      ↓
Aspect Ratio Correction (Prevents circular wave distorting into ellipses on wide screens)
      ↓
Visual Field Calculation (Domain rotation, multi-frequency sine wave synthesis)
```

## 5. Shader Sections
- **Section 1: Uniform Declarations**: Accepts `u_time`, `u_resolution`, and `u_mouse` from JavaScript.
- **Section 2: Utility Functions**: Includes 2D rotation matrix `rotate2D()` and pseudo-random noise `hash21()`.
- **Section 3: UV Normalization**: Center-aligned, aspect-ratio corrected coordinate mapping.
- **Section 4: Mouse Influence**: Exponential distance decay calculation creating localized magnetic vector warping.
- **Section 5: Base Field & Wave Synthesis**: Multi-layer sine wave interference simulating AI data stream flow.
- **Section 6: Grid Overlay**: Subtraction of procedural grid coordinate lines for structural software aesthetics.
- **Section 7: Palette Mapping**: Interpolation between Slate Navy (#0f172a), Tech Cobalt (#2563eb), and Soft Electric Highlight (#93c5fd).
- **Section 8: Vignette Pass**: Subtle darkening towards canvas borders to keep visual focal point centered on hero text.
- **Section 9: Film Grain Pass**: Procedural noise injection preventing color banding and adding tactile visual texture.
- **Section 10: Final Pixel Output**: Writes `gl_FragColor`.

## 6. Palette
The palette is derived directly from `IDENTITY_KIT.md`:
- **Slate Navy (`#0f172a`)**: Base background tint providing high text contrast.
- **Tech Cobalt (`#2563eb`)**: Primary accent representing energy peaks and active data flow.
- **Soft Electric Highlight (`#93c5fd`)**: Subtle highlight for energy nodes and grid lines.

## 7. Mouse Interaction
Cursor movement tracks pixel position within the container and passes WebGL coordinates to `u_mouse`. The GLSL calculates `distToMouse = length(uv - mouseUV)` and applies an exponential pull `exp(-distToMouse * 3.2)` to gently distort the coordinates without violent motion.

## 8. Time
Animation time is derived via `Date.now() - startTimeRef` in JavaScript and passed as float `u_time` (seconds). In GLSL, time is scaled down (`float t = u_time * 0.35`) to ensure a calm, restrained ambient atmosphere suitable for reading portfolio text.

## 9. Performance
- **DPR Cap**: Capped strictly at `Math.min(window.devicePixelRatio || 1, 2)` to prevent excessive pixel fill rates on 4K/Retina displays.
- **Tab Visibility**: Render loop pauses completely when `document.visibilityState === 'hidden'` using `visibilitychange` event listeners.
- **Shader Complexity**: Pure 2D analytical wave calculation with zero raymarching loops or heavy texture lookups.
- **Mobile Behavior**: Touch devices default cursor influence gracefully to screen center; DPR cap prevents GPU throttling.

## 10. Reduced Motion
Reduced-motion users receive a static single-rendered frame of the personalized shader palette, while continuous animation pauses and WebGL rendering overhead is minimized.

## 11. WebGL Fallback
If WebGL context creation fails or browser WebGL is disabled, `FragmentShaderHero.tsx` automatically falls back to an accessible CSS gradient backdrop (`from-slate-950 via-slate-900 to-blue-950`) preserving complete hero typography and CTA functionality.
