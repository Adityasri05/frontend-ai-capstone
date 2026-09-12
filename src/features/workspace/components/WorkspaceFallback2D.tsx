'use client';

import React from 'react';
import { WORKSPACE_ITEM_LIST } from '../data';
import { WorkspaceNodeId } from '../types';

interface WorkspaceFallback2DProps {
  selectedId: WorkspaceNodeId | null;
  onSelect: (id: WorkspaceNodeId | null) => void;
}

export default function WorkspaceFallback2D({
  selectedId,
  onSelect,
}: WorkspaceFallback2DProps) {
  return (
    <div
      className="w-full bg-slate-950/95 border border-brand-border rounded-2xl p-6 shadow-2xl flex flex-col justify-between"
      role="region"
      aria-label="2D Static Architecture Digital Twin"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
            2D Static Twin Mode (Low Power / High Accessibility)
          </span>
          <h3 className="text-lg font-bold font-display text-slate-100 mt-1">
            Engineering System Nodes
          </h3>
        </div>
        <p className="text-xs text-slate-400 font-mono hidden sm:block">
          Select any subsystem or project
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {WORKSPACE_ITEM_LIST.map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(isSelected ? null : item.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative group ${
                isSelected
                  ? 'bg-slate-800/90 border-brand-primary shadow-lg ring-1 ring-brand-primary'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
              aria-pressed={isSelected}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-2xl" role="img" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span
                    className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border"
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                      borderColor: `${item.color}35`,
                    }}
                  >
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-100 group-hover:text-brand-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{item.metrics[0].label}:</span>
                <span className="font-bold text-slate-200">{item.metrics[0].value}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
