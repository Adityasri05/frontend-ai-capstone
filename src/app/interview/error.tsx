'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, RotateCcw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function InterviewErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log sanitized error metrics without leaking sensitive internals
    console.error('Captured interview boundary error:', error.message);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 bg-brand-bg">
      <div
        role="alert"
        aria-live="assertive"
        className="w-full max-w-lg rounded-2xl border border-destructive/30 bg-brand-card p-6 shadow-xl text-center space-y-4 animate-in fade-in"
      >
        <div className="w-12 h-12 rounded-2xl bg-destructive/15 border border-destructive/25 text-destructive flex items-center justify-center mx-auto shadow-sm">
          <ShieldAlert className="w-6 h-6" aria-hidden="true" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-lg font-bold text-foreground font-display">
            Interview Session Notice
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The interview workspace encountered an unexpected runtime state. Your previous session responses are safe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={reset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reload Interview Session</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-brand-border bg-brand-card hover:bg-brand-border text-foreground text-xs font-semibold transition-all shadow-sm"
          >
            <Home className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
            <span>Return to Browse</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
