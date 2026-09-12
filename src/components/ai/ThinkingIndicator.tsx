'use client';

import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

interface ThinkingIndicatorProps {
  label?: string;
}

export default function ThinkingIndicator({ label = 'AI Interviewer is analyzing your response...' }: ThinkingIndicatorProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="flex items-start gap-3.5 max-w-2xl animate-fade-in my-2"
    >
      {/* Bot Avatar Icon */}
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center text-brand-primary shadow-sm">
        <Bot className="w-4 h-4 animate-pulse" aria-hidden="true" />
      </div>

      {/* Bubble Container */}
      <div className="flex flex-col gap-1.5 bg-brand-card/80 border border-brand-border/80 px-4 py-3 rounded-2xl rounded-tl-sm backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-primary">
          <Sparkles className="w-3.5 h-3.5 animate-spin text-brand-primary/80" aria-hidden="true" />
          <span className="font-mono text-[11px] tracking-wide uppercase">AI Interviewer</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-brand-muted">
          <span>{label}</span>
          <span className="inline-flex gap-1 items-center ml-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60 animate-bounce" />
          </span>
        </div>
      </div>
    </div>
  );
}
