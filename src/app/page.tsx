import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 sm:py-24">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-brand-card/40 backdrop-blur-md border border-brand-border rounded-3xl p-6 sm:p-10 shadow-brand-shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/hero-texture.svg')] bg-repeat -z-10 opacity-70" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-accent/5 via-transparent to-transparent -z-10" />

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-xs font-mono font-semibold text-brand-accent mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          <span>Empty but Live • Portfolio Scaffold</span>
        </div>

        {/* Name & Positioning */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-brand-text mb-4">
          Aditya Srivastav
        </h1>
        <p className="text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto mb-4 font-medium leading-relaxed">
          Frontend Engineer building AI-powered products and practical AI-integrated interfaces.
        </p>
        <p className="text-xs sm:text-sm text-brand-muted/80 max-w-xl mx-auto mb-8">
          B.Tech Computer Science &amp; Engineering student focused on resilient frontend architectures, LLM workflows, and secure client-server routing.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 items-center">
          <a
            href="https://www.linkedin.com/in/aditya-srivastav-64906927a/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-brand-accent hover:bg-brand-primary-hover text-slate-100 font-semibold text-sm rounded-xl transition-all duration-300 active:scale-95 shadow-md flex items-center gap-2"
          >
            <span>Connect on LinkedIn</span>
            <span aria-hidden="true">↗</span>
          </a>

          <Link
            href="/projects"
            className="px-6 py-3 bg-brand-card hover:bg-brand-border text-brand-text border border-brand-border font-semibold text-sm rounded-xl transition-all duration-300 active:scale-95"
          >
            View Planned Projects
          </Link>

          <Link
            href="/resume"
            className="px-6 py-3 bg-transparent hover:bg-brand-card text-brand-muted hover:text-brand-text font-semibold text-sm rounded-xl transition-all duration-300"
          >
            Resume
          </Link>
        </div>
      </section>

      {/* Planned Projects Summary */}
      <section className="mt-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-border">
          <div>
            <h2 className="text-xl font-bold text-brand-text">Planned Portfolio Projects</h2>
            <p className="text-xs text-brand-muted mt-1">Full case studies and production interfaces currently in development.</p>
          </div>
          <Link
            href="/projects"
            className="text-xs font-semibold text-brand-accent hover:underline flex items-center gap-1"
          >
            <span>All Projects</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Project 1 */}
          <Link
            href="/projects/hirevium"
            className="group p-6 bg-brand-card border border-brand-border hover:border-brand-accent/40 rounded-2xl transition-all duration-300 hover:shadow-brand-shadow-lg flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-mono font-bold text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded border border-brand-accent/20">
                AI Hiring
              </span>
              <span className="text-xs text-brand-muted group-hover:text-brand-accent transition-colors">
                In Development →
              </span>
            </div>
            <h3 className="text-base font-bold text-brand-text group-hover:text-brand-accent transition-colors mb-2">
              HIREVIUM
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed flex-1">
              AI Hiring Intelligence Operating System with adaptive candidate Q&amp;A and recruiter scoring telemetry.
            </p>
          </Link>

          {/* Project 2 */}
          <Link
            href="/projects/indra-ai"
            className="group p-6 bg-brand-card border border-brand-border hover:border-brand-accent/40 rounded-2xl transition-all duration-300 hover:shadow-brand-shadow-lg flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-mono font-bold text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded border border-brand-accent/20">
                Enterprise RAG
              </span>
              <span className="text-xs text-brand-muted group-hover:text-brand-accent transition-colors">
                In Development →
              </span>
            </div>
            <h3 className="text-base font-bold text-brand-text group-hover:text-brand-accent transition-colors mb-2">
              INDRA AI
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed flex-1">
              Institutional Knowledge Intelligence featuring verifiable citation mapping and trust-score panels.
            </p>
          </Link>

          {/* Project 3 */}
          <Link
            href="/projects/stackscout"
            className="group p-6 bg-brand-card border border-brand-border hover:border-brand-accent/40 rounded-2xl transition-all duration-300 hover:shadow-brand-shadow-lg flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-mono font-bold text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded border border-brand-accent/20">
                Autonomous Agents
              </span>
              <span className="text-xs text-brand-muted group-hover:text-brand-accent transition-colors">
                In Development →
              </span>
            </div>
            <h3 className="text-base font-bold text-brand-text group-hover:text-brand-accent transition-colors mb-2">
              StackScout
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed flex-1">
              Autonomous Software Procurement Agent with progressive scraper logs and vendor comparison grids.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
