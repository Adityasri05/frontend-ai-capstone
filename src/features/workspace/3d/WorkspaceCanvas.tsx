'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import DeskScene from './DeskScene';
import { WorkspaceNodeId } from '../types';

interface WorkspaceCanvasProps {
  selectedId: WorkspaceNodeId | null;
  onSelect: (id: WorkspaceNodeId | null) => void;
  reducedMotion: boolean;
}

export default function WorkspaceCanvas({
  selectedId,
  onSelect,
  reducedMotion,
}: WorkspaceCanvasProps) {
  return (
    <div className="w-full h-full relative bg-slate-950 rounded-2xl overflow-hidden border border-brand-border/60 shadow-2xl">
      <Suspense fallback={<CanvasLoadingFallback />}>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 2.8, 4.8], fov: 45, near: 0.1, far: 50 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: false,
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <color attach="background" args={['#070a12']} />
          <DeskScene
            selectedId={selectedId}
            onSelect={onSelect}
            reducedMotion={reducedMotion}
          />
        </Canvas>
      </Suspense>

      {/* Subtle 3D Navigation Controls Hint */}
      <div className="absolute bottom-3 left-3 pointer-events-none z-10 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-[11px] font-mono text-slate-300 flex items-center gap-2 shadow-md">
        <span>🖱️ Drag to orbit • Scroll to zoom • Click objects to inspect</span>
      </div>
    </div>
  );
}

function CanvasLoadingFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-200 p-6 space-y-4">
      <div className="w-10 h-10 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
      <div className="text-center space-y-1">
        <p className="text-sm font-bold font-display tracking-wide">Loading 3D Digital Twin...</p>
        <p className="text-xs text-slate-400 font-mono">Initializing WebGL & procedural geometries</p>
      </div>
    </div>
  );
}
