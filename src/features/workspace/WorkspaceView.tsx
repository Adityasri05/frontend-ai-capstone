'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { WORKSPACE_ITEMS, WORKSPACE_ITEM_LIST } from './data';
import { WorkspaceNodeId } from './types';
import WorkspaceInfoPanel from './components/WorkspaceInfoPanel';
import WorkspaceFallback2D from './components/WorkspaceFallback2D';

// Lazy-load Three.js 3D canvas with ssr: false to guarantee clean client-only WebGL initialization
const WorkspaceCanvas = dynamic(() => import('./3d/WorkspaceCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-950 text-slate-200 rounded-2xl border border-brand-border/60">
      <div className="w-10 h-10 border-2 border-brand-primary border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-sm font-bold font-display">Mounting 3D Interactive Canvas...</p>
      <p className="text-xs text-slate-400 font-mono mt-1">Initializing React Three Fiber</p>
    </div>
  ),
});

export default function WorkspaceView() {
  const [selectedId, setSelectedId] = useState<WorkspaceNodeId | null>(null);
  const [use2DMode, setUse2DMode] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Detect system prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <section className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brand-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 bg-brand-primary/10 text-brand-primary text-xs font-mono font-bold rounded-md border border-brand-primary/20">
              3D DIGITAL TWIN
            </span>
            <span className="text-xs text-brand-muted font-mono">
              FE-10 Interactive Experience
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-text font-display">
            AI Engineering Workspace
          </h1>
          <p className="text-sm text-brand-muted mt-1 max-w-2xl leading-relaxed">
            An interactive 3D digital twin exploring our full-stack architecture: React 19 / Next.js 15 frontend, real-time AI neural core, edge API gateway, and flagship capstone projects.
          </p>
        </div>

        {/* View Mode Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 2D / 3D Mode Toggle */}
          <button
            type="button"
            onClick={() => setUse2DMode(!use2DMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all duration-200 border flex items-center gap-1.5 cursor-pointer shadow-sm ${
              use2DMode
                ? 'bg-brand-primary text-white border-brand-primary'
                : 'bg-brand-card hover:bg-brand-border text-brand-text border-brand-border'
            }`}
            aria-pressed={use2DMode}
            aria-label={use2DMode ? 'Switch to 3D WebGL Mode' : 'Switch to 2D Static Mode'}
            title="Toggle between 3D WebGL Canvas and 2D Static Grid"
          >
            <span>{use2DMode ? '📊 2D Static Mode' : '🌐 3D WebGL Mode'}</span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            type="button"
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all duration-200 border flex items-center gap-1.5 cursor-pointer shadow-sm ${
              reducedMotion
                ? 'bg-amber-500/15 text-amber-600 border-amber-500/30'
                : 'bg-brand-card hover:bg-brand-border text-brand-text border-brand-border'
            }`}
            aria-pressed={reducedMotion}
            aria-label={reducedMotion ? 'Enable full motion' : 'Enable reduced motion'}
            title="Toggle camera parallax and animation motion"
          >
            <span>{reducedMotion ? '⚡ Reduced Motion (ON)' : '✨ Motion (Active)'}</span>
          </button>

          {/* Reset View Button */}
          {selectedId && (
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="px-3 py-2 bg-brand-bg hover:bg-brand-card text-brand-muted hover:text-brand-text text-xs font-bold rounded-xl border border-brand-border transition-colors cursor-pointer"
            >
              Reset Selection
            </button>
          )}
        </div>
      </section>

      {/* Accessible Quick Filter Pills (Keyboard / Screen Reader Navigable) */}
      <section className="mb-6" aria-label="Workspace Node Quick Selectors">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <span className="text-[11px] font-mono font-bold uppercase text-brand-muted tracking-wider mr-1 whitespace-nowrap">
            Explore Node:
          </span>
          {WORKSPACE_ITEM_LIST.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(isSelected ? null : item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 border flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-brand-primary text-slate-100 border-brand-primary shadow-sm'
                    : 'bg-brand-card hover:bg-brand-border text-brand-text border-brand-border'
                }`}
                aria-pressed={isSelected}
              >
                <span>{item.icon}</span>
                <span>{item.title.split('—')[0].trim()}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 3D Canvas / 2D Fallback Stage */}
        <div className="lg:col-span-8 w-full min-h-[480px] md:min-h-[580px] lg:min-h-[640px] flex">
          {use2DMode ? (
            <WorkspaceFallback2D
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          ) : (
            <WorkspaceCanvas
              selectedId={selectedId}
              onSelect={setSelectedId}
              reducedMotion={reducedMotion}
            />
          )}
        </div>

        {/* Real-time HTML Specifications Panel */}
        <div className="lg:col-span-4 w-full">
          <WorkspaceInfoPanel
            selectedId={selectedId}
            onClose={() => setSelectedId(null)}
            onSelect={(id) => setSelectedId(id)}
          />
        </div>
      </div>

      {/* Architectural Summary Section */}
      <section className="mt-12 bg-brand-card/40 border border-brand-border rounded-3xl p-6 md:p-8">
        <div className="max-w-3xl">
          <span className="text-xs font-mono font-bold uppercase text-brand-primary tracking-wider">
            Engineering Blueprint
          </span>
          <h2 className="text-2xl font-bold font-display text-brand-text mt-1">
            Production 3D System Architecture
          </h2>
          <p className="text-xs text-brand-muted mt-2 leading-relaxed">
            This interactive 3D digital twin was built strictly using lightweight procedural Three.js meshes to eliminate heavy model downloads. It delivers 60 FPS rendering, respects user motion preferences, and maintains complete keyboard accessibility and screen reader parity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-brand-border">
          <div className="space-y-1">
            <h3 className="text-xs font-bold font-mono text-brand-text">0 MB External Assets</h3>
            <p className="text-[11px] text-brand-muted">
              Built with procedural geometry and WebGL shader materials to eliminate external GLB file overhead.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-xs font-bold font-mono text-brand-text">WCAG AA Accessible</h3>
            <p className="text-[11px] text-brand-muted">
              All 3D objects are 100% operable via keyboard pills and 2D static mode with ARIA live regions.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-xs font-bold font-mono text-brand-text">Adaptive DPR Clamping</h3>
            <p className="text-[11px] text-brand-muted">
              DPR is dynamically clamped between 1.0 and 1.5 to maintain stable framerates on mobile devices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
