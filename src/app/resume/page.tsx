import React from 'react';
import Link from 'next/link';

export default function ResumePage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-brand-border">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-xs font-mono font-semibold text-brand-accent mb-4">
          <span>Portfolio Scaffold • Resume</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text mb-2">
          Aditya Srivastav — Resume
        </h1>
        <p className="text-sm sm:text-base text-brand-muted">
          Computer Science &amp; Engineering Student • Frontend AI Engineer
        </p>
      </div>

      {/* Resume Placeholder Container */}
      <article className="p-8 sm:p-10 bg-brand-card border border-brand-border rounded-3xl shadow-brand-shadow-lg relative">
        <div className="space-y-8">
          {/* Quick Bio */}
          <div>
            <h2 className="text-xs font-mono font-bold text-brand-accent uppercase tracking-wider mb-2">
              Focus &amp; Positioning
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed">
              B.Tech Computer Science student specializing in building high-performance, responsive React/Next.js applications integrated securely with AI agents, LLM pipelines, and client-server proxies.
            </p>
          </div>

          {/* Core Stack */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-brand-border/60">
            <div>
              <h3 className="text-xs font-mono font-bold text-brand-text uppercase tracking-wider mb-2">
                Frontend Engineering
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                React 19, Next.js 15 (App Router), TypeScript, Tailwind CSS, Responsive Systems, State Management (Zustand/Context), Semantic HTML/a11y.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold text-brand-text uppercase tracking-wider mb-2">
                AI &amp; Backend Integration
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                LLM Workflows (Gemini / Claude / OpenAI APIs), FastAPI Proxying, Vector RAG UI &amp; Citations, PyTorch Foundations, Node.js.
              </p>
            </div>
          </div>

          {/* Placeholder Status Note */}
          <div className="p-5 bg-brand-bg border border-brand-border rounded-2xl">
            <h3 className="text-xs font-mono font-bold text-brand-text uppercase tracking-wider mb-1">
              📄 Interactive Resume In Active Preparation
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              The complete verifiable resume—including detailed coursework milestones, open-source PRs, and project deep-dives—is being structured for the live portfolio release.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-brand-border/60">
            <a
              href="https://www.linkedin.com/in/aditya-srivastav-64906927a/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-brand-accent hover:bg-brand-primary-hover text-slate-100 text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <span>Connect on LinkedIn</span>
              <span aria-hidden="true">↗</span>
            </a>
            <Link
              href="/projects"
              className="px-6 py-3 bg-brand-bg border border-brand-border hover:border-brand-accent/40 text-brand-text text-xs font-semibold rounded-xl transition-all"
            >
              View Projects
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
