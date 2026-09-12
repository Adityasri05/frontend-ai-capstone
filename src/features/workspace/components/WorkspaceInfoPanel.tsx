'use client';

import React from 'react';
import Link from 'next/link';
import { WORKSPACE_ITEMS } from '../data';
import { WorkspaceNodeId } from '../types';

interface WorkspaceInfoPanelProps {
  selectedId: WorkspaceNodeId | null;
  onClose: () => void;
  onSelect: (id: WorkspaceNodeId) => void;
}

export default function WorkspaceInfoPanel({
  selectedId,
  onClose,
  onSelect,
}: WorkspaceInfoPanelProps) {
  const currentItem = selectedId ? WORKSPACE_ITEMS[selectedId] : null;

  return (
    <aside
      className="w-full bg-brand-card/90 backdrop-blur-md border border-brand-border rounded-2xl p-5 md:p-6 shadow-brand-shadow-lg flex flex-col justify-between transition-all duration-300 min-h-[420px]"
      aria-label="Selected Workspace Node Specifications"
      aria-live="polite"
    >
      {currentItem ? (
        <div className="space-y-5">
          {/* Header & Category Badge */}
          <div className="flex items-start justify-between gap-3 border-b border-brand-border pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xl" role="img" aria-hidden="true">
                  {currentItem.icon}
                </span>
                <span
                  className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md tracking-wider border"
                  style={{
                    backgroundColor: `${currentItem.color}15`,
                    color: currentItem.color,
                    borderColor: `${currentItem.color}35`,
                  }}
                >
                  {currentItem.badge}
                </span>
                <span className="text-[11px] font-mono text-brand-muted uppercase">
                  {currentItem.category}
                </span>
              </div>
              <h2 className="text-xl font-bold font-display text-brand-text tracking-tight">
                {currentItem.title}
              </h2>
              <p className="text-xs font-semibold text-brand-primary mt-0.5">
                {currentItem.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg border border-brand-border hover:bg-brand-bg text-brand-muted hover:text-brand-text text-xs transition-colors cursor-pointer"
              aria-label="Deselect item and reset 3D view"
              title="Close panel"
            >
              ✕
            </button>
          </div>

          {/* Description */}
          <p className="text-xs text-brand-muted leading-relaxed font-sans">
            {currentItem.description}
          </p>

          {/* Key Metrics Grid */}
          <div>
            <h3 className="text-[11px] font-mono font-bold uppercase text-brand-muted tracking-wider mb-2">
              Performance & Architecture Metrics
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              {currentItem.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-brand-bg/80 border border-brand-border p-2.5 rounded-xl flex flex-col"
                >
                  <span className="text-[10px] text-brand-muted font-medium">
                    {metric.label}
                  </span>
                  <span className="text-xs font-bold font-mono text-brand-text mt-0.5">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h3 className="text-[11px] font-mono font-bold uppercase text-brand-muted tracking-wider mb-2">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {currentItem.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-brand-bg border border-brand-border text-brand-text text-[11px] font-mono rounded-lg font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Architectural Details */}
          <div>
            <h3 className="text-[11px] font-mono font-bold uppercase text-brand-muted tracking-wider mb-2">
              Key Engineering Highlights
            </h3>
            <ul className="space-y-1.5 text-xs text-brand-muted">
              {currentItem.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold mt-0.5">▹</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Links */}
          {currentItem.actionLink && (
            <div className="pt-2 border-t border-brand-border flex items-center justify-between gap-3">
              <Link
                href={currentItem.actionLink}
                className="flex-1 text-center py-2.5 px-4 bg-brand-primary hover:bg-brand-primary-hover text-slate-100 font-bold text-xs rounded-xl transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
              >
                {currentItem.actionLabel || 'Inspect Component'}
              </Link>

              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 bg-brand-bg hover:bg-brand-card border border-brand-border text-brand-text font-bold text-xs rounded-xl transition-all duration-200 cursor-pointer"
              >
                Reset View
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Default Empty State */
        <div className="flex flex-col items-center justify-center text-center py-8 px-2 space-y-4 my-auto">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-2xl">
            🌐
          </div>
          <div>
            <h2 className="text-base font-bold font-display text-brand-text">
              Interactive 3D Digital Twin
            </h2>
            <p className="text-xs text-brand-muted mt-1 max-w-xs mx-auto leading-relaxed">
              Click any 3D node in the workspace scene or use the quick filter buttons below to inspect architecture specs and live projects.
            </p>
          </div>

          <div className="w-full pt-4 border-t border-brand-border grid grid-cols-2 gap-2 text-left">
            <button
              type="button"
              onClick={() => onSelect('hirevium')}
              className="p-2.5 bg-brand-bg hover:bg-brand-card border border-brand-border rounded-xl text-xs font-bold text-brand-text transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>🎯</span>
              <span>HIREVIUM OS</span>
            </button>
            <button
              type="button"
              onClick={() => onSelect('frontend')}
              className="p-2.5 bg-brand-bg hover:bg-brand-card border border-brand-border rounded-xl text-xs font-bold text-brand-text transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>🖥️</span>
              <span>React 19 Core</span>
            </button>
            <button
              type="button"
              onClick={() => onSelect('ai-core')}
              className="p-2.5 bg-brand-bg hover:bg-brand-card border border-brand-border rounded-xl text-xs font-bold text-brand-text transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>🧠</span>
              <span>AI Neural Core</span>
            </button>
            <button
              type="button"
              onClick={() => onSelect('backend')}
              className="p-2.5 bg-brand-bg hover:bg-brand-card border border-brand-border rounded-xl text-xs font-bold text-brand-text transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>⚡</span>
              <span>API Gateway</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
