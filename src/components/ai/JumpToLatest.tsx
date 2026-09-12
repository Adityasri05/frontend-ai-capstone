'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

interface JumpToLatestProps {
  visible: boolean;
  onClick: () => void;
  unreadCount?: number;
}

export default function JumpToLatest({ visible, onClick, unreadCount = 0 }: JumpToLatestProps) {
  if (!visible) return null;

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
      <button
        type="button"
        onClick={onClick}
        aria-label="Scroll to latest interview message"
        className="group flex items-center gap-2 px-4 py-2 bg-brand-primary text-white text-xs font-semibold rounded-full shadow-lg hover:bg-brand-primary-hover hover:shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary cursor-pointer border border-white/20"
      >
        <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
        <span>Jump to latest</span>
        {unreadCount > 0 && (
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" title="New tokens arriving" />
        )}
      </button>
    </div>
  );
}
