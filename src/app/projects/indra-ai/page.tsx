import React from 'react';
import Link from 'next/link';

export default function IndraAiPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 sm:py-16">
      {/* Breadcrumb */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs font-mono text-brand-muted">
          <li>
            <Link href="/" className="hover:text-brand-text">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/projects" className="hover:text-brand-text">Projects</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-brand-accent font-semibold">INDRA AI</li>
        </ol>
      </nav>

      {/* Case Study Header Card */}
      <article className="p-8 sm:p-12 bg-brand-card border border-brand-border rounded-3xl shadow-brand-shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/hero-texture.svg')] bg-repeat -z-10 opacity-50" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-xs font-mono font-semibold text-brand-accent mb-6">
          <span>Project Case Study • In Development</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-text mb-4">
          INDRA AI
        </h1>
        <p className="text-lg text-brand-muted font-medium mb-6">
          Institutional Knowledge Intelligence &amp; Verifiable RAG
        </p>

        <p className="text-sm sm:text-base text-brand-muted leading-relaxed mb-8 max-w-2xl">
          Enterprise search dashboard built to make AI outputs transparent and verifiable through grounded RAG responses, numbered inline citations, side-drawer document viewing, and trust-score indicators.
        </p>

        {/* Status Notice */}
        <div className="p-5 bg-brand-bg border border-brand-border rounded-2xl mb-8">
          <h2 className="text-xs font-mono font-bold text-brand-text uppercase tracking-wider mb-1">
            🚧 Case Study Coming Soon
          </h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            The full engineering breakdown, citation drawer interaction design, and real RAG interface captures are being prepared for the upcoming portfolio build.
          </p>
        </div>

        {/* Back Link & CTA */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/projects"
            className="px-5 py-2.5 bg-brand-bg border border-brand-border hover:border-brand-accent/40 text-brand-text text-xs font-semibold rounded-xl transition-all"
          >
            ← Back to Projects
          </Link>
          <a
            href="https://www.linkedin.com/in/aditya-srivastav-64906927a/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-brand-accent hover:bg-brand-primary-hover text-slate-100 text-xs font-semibold rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            <span>Discuss on LinkedIn</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </div>
  );
}
