# Shader Line-by-Line Walkthrough

## Overview
This document provides a line-by-line learning guide for the GLSL fragment shader running in the portfolio hero (`src/shaders/heroShader.ts`).

---

## 1. Uniforms
```glsl
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
```
* **`u_time`**: Receives elapsed seconds (float). Passed from JS animation loop.
* **`u_resolution`**: Receives canvas physical pixel dimensions `(width, height)`.
* **`u_mouse`**: Receives mouse cursor coordinates in pixels (bottom-left origin).

---

## 2. Utility Functions

### `rotate2D(float angle)`
```glsl
mat2 rotate2D(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}
```
* **Receives**: Angle in radians (float).
* **Returns**: A 2x2 rotation matrix (`mat2`).
* **Why it exists**: Rotates 2D vector space `(x, y)` around the origin `(0, 0)`.
* **What changes if modified**: Increasing matrix scale or angle multiplier increases rotational swirl speed and domain angle.

### `hash21(vec2 p)`
```glsl
float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
```
* **Receives**: 2D coordinate vector `p` (`vec2`).
* **Returns**: Pseudo-random scalar float between `[0.0, 1.0]`.
* **Why it exists**: Generates high-frequency noise for procedural film grain.
* **What changes if modified**: Modifying multiplier constant `43758.5453123` changes noise distribution density.

---

## 3. Coordinate Setup (UV Mental Model)
```glsl
vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
vec2 mouseUV = (u_mouse - 0.5 * u_resolution.xy) / u_resolution.y;
```
* **`gl_FragCoord.xy`**: Current pixel screen coordinate `(x, y)` in range `[0..width, 0..height]`.
* **`0.5 * u_resolution.xy`**: Subtracting half resolution centers `(0,0)` in middle of viewport.
* **Dividing by `u_resolution.y`**: Scales `y` axis from `-0.5` to `+0.5`, automatically aspect-correcting `x` axis to prevent wide-screen stretching.

---

## 4. Mouse Influence
```glsl
float distToMouse = length(uv - mouseUV);
float mousePull = exp(-distToMouse * 3.2);
vec2 distortedUV = uv - (uv - mouseUV) * mousePull * 0.18;
```
* **`length(uv - mouseUV)`**: Calculates Euclidean distance between pixel UV and normalized mouse position.
* **`exp(-distToMouse * 3.2)`**: Exponential decay formula. Creates strong pull near cursor that drops off smoothly with distance.
* **`distortedUV`**: Offsets coordinate field towards mouse. `0.18` controls distortion intensity.

---

## 5. Motion & Main Visual (Intelligence Field)
```glsl
float t = u_time * 0.35;
vec2 p = rotate2D(t * 0.12) * distortedUV;

float wave1 = sin(p.x * 4.5 + t * 1.2) * cos(p.y * 3.5 - t * 0.8);
float wave2 = sin((p.x + p.y) * 6.0 - t * 1.4) * 0.4;
float distFromCenter = length(p);
float radialPulse = sin(distFromCenter * 8.0 - t * 1.8) * 0.25;

float field = wave1 + wave2 + radialPulse + mousePull * 0.45;
```
* **`t`**: Time multiplier scaling motion speed (`0.35` ensures smooth, non-distracting animation).
* **`wave1` & `wave2`**: Orthogonal and diagonal sine wave frequencies creating interference patterns.
* **`radialPulse`**: Concentric circular signal waves propagating outward.
* **`field`**: Summed scalar field value representing energy density at pixel `(x,y)`.

---

## 6. Grid Overlay
```glsl
vec2 gridUV = fract(uv * 14.0) - 0.5;
float gridLines = smoothstep(0.48, 0.5, max(abs(gridUV.x), abs(gridUV.y)));
```
* **`fract(uv * 14.0)`**: Repeats coordinates 14 times across screen height for grid cell tiling.
* **`smoothstep(...)`**: Isolates outer edges of grid cells to draw crisp 1-pixel technical grid lines.

---

## 7. Palette Mapping
```glsl
vec3 colorNavy = vec3(0.059, 0.090, 0.165);
vec3 colorCobalt = vec3(0.145, 0.388, 0.922);
vec3 colorHighlight = vec3(0.576, 0.772, 0.992);

float intensity = smoothstep(-0.9, 1.1, field);
vec3 finalColor = mix(colorNavy, colorCobalt, intensity * 0.75);
finalColor = mix(finalColor, colorHighlight, pow(clamp(intensity, 0.0, 1.0), 3.5) * 0.5);
```
* Maps normalized scalar field `intensity` into identity colors: Slate Navy base, Tech Cobalt body, and Soft Highlight energy peaks.

---

## 8. Contrast & Vignette
```glsl
float vignette = 1.0 - smoothstep(0.4, 1.3, length(uv));
finalColor *= vignette;
```
* Darkens corners of the hero section so centered white text remains instantly readable.

---

## 9. Grain Finishing Pass & Final Output
```glsl
float grain = (hash21(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.025;
finalColor += grain;
gl_FragColor = vec4(finalColor, 1.0);
```
* Injects microscopic noise preventing color banding gradients and writes final `vec4` RGBA color to WebGL frame buffer.

---

## 60-Second Mentor Explanation

> “The hero shader receives normalized screen coordinates, time, resolution, and mouse position. In GLSL, I shift screen space to the center `(0,0)` and divide by resolution height so the visual maintains aspect ratio without stretching on wider screens.
>
> I construct an analytical ‘Intelligence Field’ by layering horizontal, diagonal, and radial sine waves with a domain rotation matrix. Cursor movement calculates distance from the pixel to the mouse, applying an exponential decay pull that magnetically distorts signal waves towards the pointer.
>
> The resulting scalar energy field is mapped into my portfolio identity palette—Slate Navy, Tech Cobalt, and Soft Highlight—with a grid overlay, vignette contrast pass, and procedural grain filter before rendering the final pixel output.”
