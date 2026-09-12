'use client';

import React from 'react';
import { AlertCircle, RotateCcw, ShieldAlert } from 'lucide-react';

interface ToolErrorStateProps {
  error?: string;
  onRetry?: () => void;
}

export default function ToolErrorState({
  error = "We couldn't complete the candidate qualification assessment.",
  onRetry,
}: ToolErrorStateProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="my-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-foreground shadow-sm transition-all duration-200 animate-in fade-in"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-destructive/15 text-destructive flex-shrink-0 mt-0.5">
          <ShieldAlert className="h-4 w-4" aria-hidden="true" />
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-destructive">
              Assessment Unavailable
            </h3>
            <span className="rounded bg-destructive/15 px-1.5 py-0.2 text-[10px] font-mono font-bold text-destructive">
              TOOL ERROR
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {error} Your interview responses and conversational history remain fully preserved and available.
          </p>

          {onRetry && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onRetry}
                aria-label="Retry candidate assessment tool call"
                className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/30 bg-background px-3 py-1.5 text-xs font-bold text-destructive hover:bg-destructive hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Try Again</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
