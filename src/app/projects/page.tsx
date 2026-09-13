import React from 'react';
import Link from 'next/link';

export default function ProjectsPage() {
  const projects = [
    {
      slug: 'hirevium',
      title: 'HIREVIUM',
      category: 'AI Hiring Intelligence Operating System',
      description: 'Dual-sided technical screening workspace with an Adaptive Difficulty Controller, live speech feedback, and recruiter evaluation telemetry.',
      tech: ['React 19', 'Next.js 15', 'FastAPI Proxy', 'Gemini 2.5 Flash Lite'],
      status: 'Case study in development'
    },
    {
      slug: 'indra-ai',
      title: 'INDRA AI',
      category: 'Institutional Knowledge Intelligence',
      description: 'Enterprise search dashboard built to make AI outputs transparent and verifiable through grounded RAG responses, numbered inline citations, and document drawers.',
      tech: ['Next.js 15', 'TypeScript', 'tRPC', 'Vector RAG'],
      status: 'Case study in development'
    },
    {
      slug: 'stackscout',
      title: 'StackScout',
      category: 'Autonomous Software Procurement Agent',
      description: 'Autonomous procurement agent interface with progressive status disclosure, scraper error resilience, and interactive vendor comparison matrices.',
      tech: ['React 19', 'Zustand', 'Autonomous Agents', 'SSE Telemetry'],
      status: 'Case study in development'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-12 pb-6 border-b border-brand-border">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-xs font-mono font-semibold text-brand-accent mb-4">
          <span>Portfolio Scaffold • Projects</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text mb-3">
          Selected Engineering Projects
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Practical AI product development, resilient frontend interfaces, and secure client-server routing. Full case studies and production proof currently being documented.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="p-6 sm:p-8 bg-brand-card border border-brand-border hover:border-brand-accent/40 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-brand-shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-xs font-mono text-brand-muted bg-brand-bg px-2.5 py-1 rounded-md border border-brand-border self-start sm:self-auto">
                ⏳ {project.status}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-brand-text mb-2">
              <Link href={`/projects/${project.slug}`} className="hover:text-brand-accent transition-colors">
                {project.title}
              </Link>
            </h2>

            <p className="text-sm text-brand-muted leading-relaxed mb-6 max-w-3xl">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-brand-border/60">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono font-medium text-brand-muted bg-brand-bg px-2 py-0.5 rounded border border-brand-border"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="text-xs font-bold text-brand-accent hover:underline flex items-center gap-1"
              >
                <span>View Placeholder Case Study</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
