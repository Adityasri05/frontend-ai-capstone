# Shader Practical Modification Exercises

This guide contains 5 practical modification exercises demonstrating how to customize the GLSL fragment shader (`src/shaders/heroShader.ts`).

---

### Exercise 1: Make the Animation Twice as Slow

* **Target File**: `src/shaders/heroShader.ts`
* **Target Line**: Inside `main()` under Section 5 (Base Field & Motion).
* **Code to Modify**:
  ```glsl
  // Current speed multiplier:
  float t = u_time * 0.35;
  ```
* **Modification**: Change `0.35` to `0.175`:
  ```glsl
  // Twice as slow speed multiplier:
  float t = u_time * 0.175;
  ```
* **Expected Result**: Wave propagation and field domain rotation run at 50% speed, creating an even calmer background.

---

### Exercise 2: Change the Primary Accent Color to Emerald Green

* **Target File**: `src/shaders/heroShader.ts`
* **Target Line**: Inside `main()` under Section 7 (Brand Palette Mapping).
* **Code to Modify**:
  ```glsl
  // Current Tech Cobalt accent (#2563eb):
  vec3 colorCobalt = vec3(0.145, 0.388, 0.922);
  ```
* **Modification**: Replace with Emerald Green (`#10b981` -> `vec3(0.063, 0.725, 0.506)`):
  ```glsl
  // Emerald Green accent (#10b981):
  vec3 colorCobalt = vec3(0.063, 0.725, 0.506);
  ```
* **Expected Result**: The active signal waves and field energy peaks shift from cobalt blue to vibrant emerald green.

---

### Exercise 3: Increase Mouse Attraction Influence by 2x

* **Target File**: `src/shaders/heroShader.ts`
* **Target Line**: Inside `main()` under Section 4 (Mouse Interaction).
* **Code to Modify**:
  ```glsl
  // Current mouse distortion multiplier (0.18):
  vec2 distortedUV = uv - (uv - mouseUV) * mousePull * 0.18;
  ```
* **Modification**: Increase `0.18` to `0.36`:
  ```glsl
  // Doubled magnetic pull multiplier (0.36):
  vec2 distortedUV = uv - (uv - mouseUV) * mousePull * 0.36;
  ```
* **Expected Result**: The cursor pulls signal field vectors twice as far when moving across the hero background.

---

### Exercise 4: Move the Visual Center of the Field Toward the Left

* **Target File**: `src/shaders/heroShader.ts`
* **Target Line**: Inside `main()` under Section 3 (Coordinate Normalization).
* **Code to Modify**:
  ```glsl
  // Current centered UV:
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  ```
* **Modification**: Shift center X coordinate by adding offset `+ vec2(0.3, 0.0)`:
  ```glsl
  // Visual center shifted 30% to the left:
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y + vec2(0.3, 0.0);
  ```
* **Expected Result**: The focal origin of radial pulses shifts towards the left side of the screen.

---

### Exercise 5: Make the Background Darker Behind the Main Headline

* **Target File**: `src/components/hero/FragmentShaderHero.tsx`
* **Target Line**: Layer 2 Backdrop Overlay container.
* **Code to Modify**:
  ```tsx
  // Current contrast overlay:
  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] pointer-events-none -z-0" />
  ```
* **Modification**: Increase opacity from `40%` to `70%` and blur from `2px` to `6px`:
  ```tsx
  // Darker contrast overlay:
  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[6px] pointer-events-none -z-0" />
  ```
* **Expected Result**: The background behind the headline becomes significantly darker and softer, further heightening text readability.
