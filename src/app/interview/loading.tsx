import React from 'react';

export default function InterviewLoading() {
  return (
    <div className="h-[calc(100vh-4rem)] max-w-5xl mx-auto w-full flex flex-col bg-brand-bg animate-pulse">
      {/* Skeleton Header */}
      <div className="h-16 border-b border-brand-border bg-brand-card/60 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-border" />
          <div className="space-y-1.5">
            <div className="w-48 h-3.5 rounded bg-brand-border" />
            <div className="w-32 h-2.5 rounded bg-brand-border/60" />
          </div>
        </div>
        <div className="w-24 h-8 rounded-xl bg-brand-border" />
      </div>

      {/* Skeleton Body */}
      <div className="flex-1 p-6 space-y-4">
        <div className="w-3/4 max-w-lg h-24 rounded-2xl bg-brand-card/70 border border-brand-border" />
        <div className="w-2/3 max-w-md h-16 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 ml-auto" />
        <div className="w-4/5 max-w-xl h-28 rounded-2xl bg-brand-card/70 border border-brand-border" />
      </div>

      {/* Skeleton Input Toolbar */}
      <div className="p-4 border-t border-brand-border bg-brand-card/60">
        <div className="h-14 rounded-2xl bg-background border border-brand-border" />
      </div>
    </div>
  );
}
