'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TerminalView from '@/components/features/TerminalView';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'frontend' | 'ai-backend'>('frontend');

  const frontendSkills = [
    { name: 'React 19 / Next.js 15', desc: 'App Router, Server Components, concurrent patterns, actions' },
    { name: 'TypeScript', desc: 'Strict interfaces, discriminated unions, static type safety' },
    { name: 'Tailwind CSS v4', desc: 'Modern responsive designs, glassmorphic filters, animations' },
    { name: 'Responsive Web Design', desc: 'Fluid layout adjustments, mobile-first viewports' }
  ];

  const aiBackendSkills = [
    { name: 'FastAPI & Python', desc: 'Secure backend API routing, request validation, proxy patterns' },
    { name: 'Gemini 2.5 Flash Lite', desc: 'AI agent orchestration, custom prompt templates, JSON schema output' },
    { name: 'PyTorch', desc: 'Embedding classification, basic model training, tensor operations' },
    { name: 'Node.js', desc: 'Secure REST endpoints, asynchronous middleware, package management' }
  ];

  const lighthouseMetrics = [
    { label: 'Performance', score: 100, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { label: 'Accessibility', score: 100, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { label: 'Best Practices', score: 100, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { label: 'SEO', score: 100, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col gap-16 md:gap-24">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-12" aria-label="Introduction & positioning">
        <div className="flex flex-col gap-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold w-fit">
            <span>●</span> Available for Fall 2026 Internships
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-500 leading-tight">
            I build secure, responsive frontends for AI agents
          </h1>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed">
            I bridge React/Next.js frontend engineering and secure FastAPI backend routing to deploy responsive web interfaces for Gemini 2.5 Flash Lite agents. By routing client operations through a secure FastAPI proxy, I keep API keys hidden on the server while managing smooth conversation flows and custom error fallbacks.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <a
              href="https://www.linkedin.com/in/adityasri05/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-sm font-semibold text-slate-100 bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:scale-102 active:scale-98"
            >
              Discuss my projects on LinkedIn
            </a>
            <Link
              href="/projects/hirevium"
              className="px-6 py-3 text-sm font-semibold text-slate-300 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl transition-all duration-300 hover:scale-102 active:scale-98"
            >
              Explore Hirevium Case Study
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-auto flex justify-center">
          <TerminalView />
        </div>
      </section>

      {/* Skills Grid */}
      <section className="flex flex-col gap-8" aria-labelledby="skills-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 id="skills-heading" className="text-2xl md:text-3xl font-bold text-slate-100">
              Technical Skillsets
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select a category to see specific areas of specialization.
            </p>
          </div>
          <div className="flex bg-slate-950 border border-slate-850 p-1.5 rounded-xl self-start">
            <button
              type="button"
              onClick={() => setActiveTab('frontend')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                activeTab === 'frontend'
                  ? 'bg-indigo-600 text-slate-100'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Frontend Engineering
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ai-backend')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                activeTab === 'ai-backend'
                  ? 'bg-indigo-600 text-slate-100'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              AI & Backend Proxying
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(activeTab === 'frontend' ? frontendSkills : aiBackendSkills).map((skill, index) => (
            <div
              key={index}
              className="p-5 rounded-xl border border-slate-900 bg-slate-950/20 backdrop-blur-md hover:border-slate-800/80 transition-all duration-200 group"
            >
              <h3 className="text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                {skill.name}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Hackathons & Open Source Timeline */}
      <section className="flex flex-col gap-8" aria-labelledby="timeline-heading">
        <div>
          <h2 id="timeline-heading" className="text-2xl md:text-3xl font-bold text-slate-100">
            AI Hackathons & Contributions
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Proven track record of building and collaborating in technical tracks.
          </p>
        </div>

        <div className="relative border-l border-slate-900 ml-4 pl-6 space-y-8 max-w-3xl">
          {/* Milestone 1 */}
          <div className="relative">
            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-indigo-500 bg-slate-950" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">Spring 2026</span>
            <h3 className="text-base font-bold text-slate-200 mt-1">AI Hackathon Finalist</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Successfully qualified for final assessment rounds by developing custom embedding-based ranking pipelines in team formats, bridging prompt layout configurations and model predictions.
            </p>
          </div>
          {/* Milestone 2 */}
          <div className="relative">
            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-indigo-500 bg-slate-950" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">Ongoing</span>
            <h3 className="text-base font-bold text-slate-200 mt-1">Open-Source Developer</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Consistently contributing to public web repositories, fixing state synchronization bugs, improving responsive styling, and ensuring correct TypeScript interface declarations.
            </p>
          </div>
        </div>
      </section>

      {/* Lighthouse Scoreboard */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-12 bg-slate-950/40 border border-slate-900 rounded-2xl p-8" aria-labelledby="lighthouse-heading">
        <div className="flex flex-col gap-4 max-w-md">
          <h2 id="lighthouse-heading" className="text-2xl font-bold text-slate-100">
            Lighthouse Performance Audit
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Unlike standard dynamic websites that suffer from layout shifts or script bloating, this portfolio is optimized for speed, SEO metadata, and screen-reader accessibility. Compiled to run efficiently in React 19 strict environments.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 shrink-0">
          {lighthouseMetrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className={`w-16 h-16 rounded-full border flex items-center justify-center font-bold text-lg ${metric.color}`}>
                {metric.score}
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
