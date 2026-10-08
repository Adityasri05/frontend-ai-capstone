'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FRAG_SHADER, VERT_SHADER } from '@/shaders/heroShader';

interface FragmentShaderHeroProps {
  children?: React.ReactNode;
  className?: string;
}

export default function FragmentShaderHero({ children, className = '' }: FragmentShaderHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // Animation frame and WebGL state references
  const animFrameId = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Check Reduced Motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 2. Initialize WebGL Context (Support webgl2 with webgl fallback)
    const gl = (canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

    if (!gl) {
      console.warn('FragmentShaderHero: WebGL context not supported. Falling back to CSS gradient.');
      setWebglSupported(false);
      return () => mediaQuery.removeEventListener('change', handleMotionChange);
    }

    // Compile Vertex Shader
    const vertShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertShader) {
      setWebglSupported(false);
      return;
    }
    gl.shaderSource(vertShader, VERT_SHADER);
    gl.compileShader(vertShader);

    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
      console.error('Vertex Shader Compilation Failed:', gl.getShaderInfoLog(vertShader));
      setWebglSupported(false);
      return;
    }

    // Compile Fragment Shader
    const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragShader) {
      setWebglSupported(false);
      return;
    }
    gl.shaderSource(fragShader, FRAG_SHADER);
    gl.compileShader(fragShader);

    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
      console.error('Fragment Shader Compilation Failed:', gl.getShaderInfoLog(fragShader));
      setWebglSupported(false);
      return;
    }

    // Link WebGL Program
    const program = gl.createProgram();
    if (!program) {
      setWebglSupported(false);
      return;
    }
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program Link Failed:', gl.getProgramInfoLog(program));
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // 3. Set up Fullscreen Quad Geometry
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // 2 Triangles forming a clip-space fullscreen quad
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Get Uniform Locations
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');

    // 4. Device Pixel Ratio (DPR) Cap & Resize Handler
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // DPR capped at 2 for performance

      const width = Math.floor(rect.width * dpr);
      const height = Math.floor(rect.height * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      // Default mouse to center if uninitialized
      if (mousePosRef.current.x === 0 && mousePosRef.current.y === 0) {
        mousePosRef.current = { x: width * 0.5, y: height * 0.5 };
        targetMouseRef.current = { x: width * 0.5, y: height * 0.5 };
      }
    };

    updateSize();
    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(container);

    // 5. Mouse Interaction Handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Convert to WebGL bottom-left coordinate space
      const x = (e.clientX - rect.left) * dpr;
      const y = (rect.height - (e.clientY - rect.top)) * dpr;
      targetMouseRef.current = { x, y };
    };

    const handleMouseLeave = () => {
      // Smoothly return cursor influence to screen center when cursor leaves
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      targetMouseRef.current = {
        x: rect.width * 0.5 * dpr,
        y: rect.height * 0.5 * dpr,
      };
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // 6. Render Frame Function
    const render = () => {
      // Smooth lerp mouse coordinates to prevent abrupt jitter
      mousePosRef.current.x += (targetMouseRef.current.x - mousePosRef.current.x) * 0.08;
      mousePosRef.current.y += (targetMouseRef.current.y - mousePosRef.current.y) * 0.08;

      const elapsedSeconds = (Date.now() - startTimeRef.current) / 1000;

      gl.useProgram(program);

      if (uTimeLoc) gl.uniform1f(uTimeLoc, elapsedSeconds);
      if (uResolutionLoc) gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      if (uMouseLoc) gl.uniform2f(uMouseLoc, mousePosRef.current.x, mousePosRef.current.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Only request next frame if continuous motion is allowed and tab is visible
      if (!mediaQuery.matches && document.visibilityState === 'visible') {
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    // Initial render (Static frame if reduced motion, loop if normal motion)
    if (mediaQuery.matches) {
      render(); // Render one static frame
    } else {
      animFrameId.current = requestAnimationFrame(render);
    }

    // 7. Tab Visibility Listener (Pause animation in background tabs)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animFrameId.current !== null) {
          cancelAnimationFrame(animFrameId.current);
          animFrameId.current = null;
        }
      } else {
        if (!mediaQuery.matches && animFrameId.current === null) {
          animFrameId.current = requestAnimationFrame(render);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup resources on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current);
      }
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-brand-border bg-slate-950 shadow-brand-shadow-lg ${className}`}
    >
      {/* Layer 1 — WebGL Shader Canvas or CSS Gradient Fallback */}
      {webglSupported ? (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          role="img"
          data-reduced-motion={isReducedMotion}
          aria-label="Personalized ambient GLSL fragment shader background"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-85 transition-opacity duration-700"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 opacity-90 pointer-events-none"
        />
      )}

      {/* Layer 2 — Controlled Contrast Layer & Backdrop Blur */}
      {/* Ensures text remains crisp and passes WCAG AAA contrast ratio */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] pointer-events-none -z-0" />

      {/* Layer 3 — Hero Content & Interactive Controls */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
