/**
 * Fragment Shader Hero — GLSL Source & Shader Definitions
 * Portfolio Visual Signature: "AI Interface / Intelligence Field"
 * 
 * Target Persona: Aditya Srivastav (Frontend AI Engineer)
 * Palette: Slate Navy (#0f172a), Tech Cobalt (#2563eb), Soft Highlight (#93c5fd), Paper Background (#fcfcfd)
 */

export const VERT_SHADER = `
attribute vec2 a_position;

void main() {
  // Simple vertex shader: passes the 2D clip-space coordinates of a fullscreen quad quad directly to WebGL
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const FRAG_SHADER = `
precision highp float;

// 1. Uniforms passed from JavaScript
uniform float u_time;        // Elapsed animation time in seconds
uniform vec2 u_resolution;   // Width and height of canvas in pixels
uniform vec2 u_mouse;        // Mouse cursor position in pixels (0,0 is top-left)

// 2. Utility helper functions

// 2D matrix rotation helper to swirl signal field vectors
mat2 rotate2D(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

// Pseudo-random noise function for subtle procedural grain
float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  // 3. Coordinate Normalization (UV Mental Model)
  // Shift center to (0,0) and scale by canvas height so field doesn't stretch on wide screens
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

  // Normalize mouse coordinates into the same centered, aspect-corrected coordinate space
  vec2 mouseUV = (u_mouse - 0.5 * u_resolution.xy) / u_resolution.y;

  // 4. Mouse Interaction (Magnetic Field Distortion)
  // Calculate distance between current pixel and normalized cursor position
  float distToMouse = length(uv - mouseUV);
  
  // Exponential decay creates a localized magnetic pull radius around the cursor
  float mousePull = exp(-distToMouse * 3.2);
  
  // Gently distort coordinate field towards the cursor without violent warping
  vec2 distortedUV = uv - (uv - mouseUV) * mousePull * 0.18;

  // 5. Base Field & Motion (AI Signal Flow / Intelligence Field)
  // Slow down animation time for a restrained, professional mood
  float t = u_time * 0.35;

  // Rotate coordinates slightly over time for subtle ambient drift
  vec2 p = rotate2D(t * 0.12) * distortedUV;

  // Signal Wave 1: Primary horizontal signal flow
  float wave1 = sin(p.x * 4.5 + t * 1.2) * cos(p.y * 3.5 - t * 0.8);

  // Signal Wave 2: Diagonal data pulse
  float wave2 = sin((p.x + p.y) * 6.0 - t * 1.4) * 0.4;

  // Signal Wave 3: Radial pulse emanating from the intelligence field core
  float distFromCenter = length(p);
  float radialPulse = sin(distFromCenter * 8.0 - t * 1.8) * 0.25;

  // Combine scalar field components
  float field = wave1 + wave2 + radialPulse;
  
  // Add subtle cursor bloom to highlight mouse position
  field += mousePull * 0.45;

  // 6. Technical Grid Overlay (Minimal computational grid lines)
  vec2 gridUV = fract(uv * 14.0) - 0.5;
  float gridLines = smoothstep(0.48, 0.5, max(abs(gridUV.x), abs(gridUV.y)));

  // 7. Brand Palette Mapping (Personalization)
  // Color 1: Slate Navy (#0f172a) -> vec3(0.059, 0.090, 0.165)
  // Color 2: Tech Cobalt (#2563eb) -> vec3(0.145, 0.388, 0.922)
  // Color 3: Soft Electric Highlight -> vec3(0.576, 0.772, 0.992)
  vec3 colorNavy = vec3(0.059, 0.090, 0.165);
  vec3 colorCobalt = vec3(0.145, 0.388, 0.922);
  vec3 colorHighlight = vec3(0.576, 0.772, 0.992);

  // Map intensity field value into brand color spectrum
  float intensity = smoothstep(-0.9, 1.1, field);
  vec3 finalColor = mix(colorNavy, colorCobalt, intensity * 0.75);
  
  // Add highlight accents to energy peaks
  finalColor = mix(finalColor, colorHighlight, pow(clamp(intensity, 0.0, 1.0), 3.5) * 0.5);

  // Blend subtle technical grid lines using highlight color
  finalColor += colorHighlight * gridLines * 0.04;

  // 8. Contrast Layer & Vignette
  // Darken canvas edges to keep focus on centered hero text content
  float vignette = 1.0 - smoothstep(0.4, 1.3, length(uv));
  finalColor *= vignette;

  // 9. Film Grain Finishing Pass
  // Procedural noise pass to eliminate color banding and give tactile texture
  float grain = (hash21(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.025;
  finalColor += grain;

  // 10. Output Final Pixel Color
  gl_FragColor = vec4(finalColor, 1.0);
}
`;
