import React from 'react';
import Link from 'next/link';
import ContactForm from '../components/contact/ContactForm';

export default function Home() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 sm:py-20 space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative text-center py-12 md:py-20 bg-brand-card/60 backdrop-blur-md border border-brand-border rounded-3xl p-6 sm:p-12 shadow-brand-shadow-lg overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/hero-texture.svg')] bg-repeat -z-10 opacity-70" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-accent/10 via-transparent to-transparent -z-10" />

        {/* Identity & Current Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/25 rounded-full text-xs font-mono font-semibold text-brand-accent mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          <span>Available for Frontend AI Roles • 2026</span>
        </div>

        {/* Name & Positioning */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-brand-text mb-4 font-display">
          Aditya Srivastav
        </h1>
        <p className="text-lg sm:text-2xl text-brand-text/90 max-w-3xl mx-auto mb-4 font-semibold leading-relaxed">
          Frontend engineer building AI-powered products with practical understanding of LLMs, prompt design, secure API routing, and AI-driven interfaces.
        </p>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl mx-auto mb-8 leading-normal font-sans">
          B.Tech Computer Science student focused on resilient client architectures, verifiable AI outputs (citations, confidence scores), and secure proxy boundaries between frontends and foundation models.
        </p>

        {/* Primary & Secondary CTAs */}
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

          <a
            href="#work"
            className="px-6 py-3 bg-brand-card hover:bg-brand-border text-brand-text border border-brand-border font-semibold text-sm rounded-xl transition-all duration-300 active:scale-95 flex items-center gap-1.5"
          >
            <span>View Selected Work</span>
            <span aria-hidden="true">↓</span>
          </a>

          <a
            href="#contact"
            className="px-6 py-3 bg-brand-bg hover:bg-brand-card text-brand-text border border-brand-border font-semibold text-sm rounded-xl transition-all duration-300 active:scale-95"
          >
            Send Message
          </a>

          <a
            href="#cv"
            className="px-6 py-3 bg-transparent hover:bg-brand-card text-brand-muted hover:text-brand-text border border-transparent hover:border-brand-border font-semibold text-sm rounded-xl transition-all duration-300"
          >
            CV / Resume
          </a>
        </div>
      </section>

      {/* 2. SELECTED WORK SECTION */}
      <section id="work" className="scroll-mt-24">
        <div className="mb-10 pb-4 border-b border-brand-border">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-accent uppercase tracking-wider mb-2">
            <span>Portfolio</span>
            <span>•</span>
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-text">Selected Work</h2>
          <p className="text-sm text-brand-muted mt-1 max-w-2xl">
            Real software interfaces and AI integrations built with focus on user trust, API key security, and progressive disclosure.
          </p>
        </div>

        <div className="space-y-8">
          {/* Project 1: HIREVIUM */}
          <article className="p-6 sm:p-8 bg-brand-card border border-brand-border hover:border-brand-accent/40 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-brand-shadow-lg flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[11px] uppercase font-mono font-bold text-brand-accent bg-brand-accent/10 px-2.5 py-1 rounded border border-brand-accent/20">
                  AI Hiring Intelligence OS
                </span>
              </div>
              <span className="text-xs font-mono text-brand-muted">HRTech / Candidate Evaluation</span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-text mb-2">
                HIREVIUM — Dual-Sided AI Technical Interview Workspace
              </h3>
              <p className="text-sm font-semibold text-brand-text/90 mb-3">
                <strong>What is it?</strong> A dual-sided candidate screening and recruiter scoring workspace simulating real-time technical interviews.
              </p>
              <p className="text-sm text-brand-muted leading-relaxed mb-4">
                <strong>What problem does it solve?</strong> Early-stage developer screening is slow and static. Resumes often exaggerate technical depth, while traditional coding tests do not test how candidates reason through hints or handle technical dialogue.
              </p>
              <div className="p-4 bg-brand-bg/60 rounded-xl border border-brand-border/60 mb-4">
                <h4 className="text-xs font-bold font-mono text-brand-text uppercase mb-1.5">What I Actually Built &amp; Contributed:</h4>
                <ul className="text-xs sm:text-sm text-brand-muted space-y-1.5 list-disc list-inside">
                  <li>Engineered the React candidate interview workspace and recruiter scoring dashboard.</li>
                  <li>Integrated an Adaptive Difficulty Controller that scales question complexity dynamically based on candidate response scores.</li>
                  <li>Implemented secure backend API proxying in FastAPI to route Gemini 2.5 Flash Lite calls without exposing Google credentials in the client bundle.</li>
                  <li>Built local interview timers, loading skeletons, and validation guards to handle network timeouts gracefully.</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-brand-border/50">
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['React 19', 'TypeScript', 'FastAPI', 'Gemini 2.5 Flash Lite', 'Tailwind CSS', 'REST Proxy'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-brand-bg rounded-lg border border-brand-border text-brand-text">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/projects/hirevium"
                  className="text-xs font-bold text-brand-accent hover:underline flex items-center gap-1"
                >
                  <span>View Case Study</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <a
                  href="https://github.com/Adityasri05/frontend-ai-capstone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-brand-muted hover:text-brand-text flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>

          {/* Project 2: INDRA AI */}
          <article className="p-6 sm:p-8 bg-brand-card border border-brand-border hover:border-brand-accent/40 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-brand-shadow-lg flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[11px] uppercase font-mono font-bold text-brand-accent bg-brand-accent/10 px-2.5 py-1 rounded border border-brand-accent/20">
                  Enterprise Knowledge Intelligence
                </span>
              </div>
              <span className="text-xs font-mono text-brand-muted">Enterprise Search / Vector RAG</span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-text mb-2">
                INDRA AI — Verifiable Knowledge Retrieval with Citation Drawers
              </h3>
              <p className="text-sm font-semibold text-brand-text/90 mb-3">
                <strong>What is it?</strong> An institutional knowledge intelligence platform enabling employees to query internal documentation with grounded citations.
              </p>
              <p className="text-sm text-brand-muted leading-relaxed mb-4">
                <strong>What problem does it solve?</strong> Enterprise documentation gets scattered across PDFs and wikis, while generic AI models hallucinate when answering company-specific questions without direct document verification.
              </p>
              <div className="p-4 bg-brand-bg/60 rounded-xl border border-brand-border/60 mb-4">
                <h4 className="text-xs font-bold font-mono text-brand-text uppercase mb-1.5">What I Actually Built &amp; Contributed:</h4>
                <ul className="text-xs sm:text-sm text-brand-muted space-y-1.5 list-disc list-inside">
                  <li>Built the Next.js search dashboard featuring grounded RAG responses with numbered inline citation badges [1], [2].</li>
                  <li>Engineered a sliding side drawer panel with accessible keyboard focus trapping to let users inspect source paragraphs side-by-side without losing search state.</li>
                  <li>Implemented color-coded trust score indicators to communicate model grounding confidence directly to users.</li>
                  <li>Integrated tRPC for end-to-end type safety between the retrieval backend and UI components.</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-brand-border/50">
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['Next.js 15', 'TypeScript', 'tRPC', 'Vector RAG', 'Tailwind CSS', 'Accessible Drawer'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-brand-bg rounded-lg border border-brand-border text-brand-text">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/projects/indra-ai"
                  className="text-xs font-bold text-brand-accent hover:underline flex items-center gap-1"
                >
                  <span>View Case Study</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <a
                  href="https://github.com/Adityasri05/frontend-ai-capstone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-brand-muted hover:text-brand-text flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>

          {/* Project 3: StackScout */}
          <article className="p-6 sm:p-8 bg-brand-card border border-brand-border hover:border-brand-accent/40 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-brand-shadow-lg flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[11px] uppercase font-mono font-bold text-brand-accent bg-brand-accent/10 px-2.5 py-1 rounded border border-brand-accent/20">
                  Autonomous Procurement Agent
                </span>
              </div>
              <span className="text-xs font-mono text-brand-muted">B2B SaaS / Agent Telemetry</span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-text mb-2">
                StackScout — Autonomous Software Procurement &amp; Decision Agent
              </h3>
              <p className="text-sm font-semibold text-brand-text/90 mb-3">
                <strong>What is it?</strong> An autonomous decision agent that researches software vendors, compares pricing tiers, and builds evaluation reports.
              </p>
              <p className="text-sm text-brand-muted leading-relaxed mb-4">
                <strong>What problem does it solve?</strong> Evaluating developer tools and SaaS platforms requires hours of manual browsing across conflicting pricing models, feature matrices, and API docs.
              </p>
              <div className="p-4 bg-brand-bg/60 rounded-xl border border-brand-border/60 mb-4">
                <h4 className="text-xs font-bold font-mono text-brand-text uppercase mb-1.5">What I Actually Built &amp; Contributed:</h4>
                <ul className="text-xs sm:text-sm text-brand-muted space-y-1.5 list-disc list-inside">
                  <li>Built the agent decision dashboard with a progressive disclosure pipeline: Planning → Crawling → Scoring → Report.</li>
                  <li>Created collapsible live scraper log panels so users can observe agent progress without getting overwhelmed by raw crawler dumps.</li>
                  <li>Implemented resilient HTTP polling hooks with error badge triggers (rate limits, timeouts) and one-click retry actions.</li>
                  <li>Designed structured vendor comparison matrices comparing pricing tiers and feature checkboxes side-by-side.</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-brand-border/50">
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['React 19', 'TypeScript', 'Zustand', 'Progressive Logs', 'Tailwind CSS', 'Agent Telemetry'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-brand-bg rounded-lg border border-brand-border text-brand-text">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/projects/stackscout"
                  className="text-xs font-bold text-brand-accent hover:underline flex items-center gap-1"
                >
                  <span>View Case Study</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <a
                  href="https://github.com/Adityasri05/frontend-ai-capstone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-brand-muted hover:text-brand-text flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>

          {/* Project 4: ResQra */}
          <article className="p-6 sm:p-8 bg-brand-card border border-brand-border hover:border-brand-accent/40 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-brand-shadow-lg flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[11px] uppercase font-mono font-bold text-brand-accent bg-brand-accent/10 px-2.5 py-1 rounded border border-brand-accent/20">
                  Emergency Intelligence Platform
                </span>
              </div>
              <span className="text-xs font-mono text-brand-muted">Real-time Telemetry / Triage</span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-text mb-2">
                ResQra — AI Emergency Intelligence &amp; Dispatch Triage
              </h3>
              <p className="text-sm font-semibold text-brand-text/90 mb-3">
                <strong>What is it?</strong> A real-time incident triage and dispatch interface combining AI classification with live telemetry feeds.
              </p>
              <p className="text-sm text-brand-muted leading-relaxed mb-4">
                <strong>What problem does it solve?</strong> First-response dispatchers experience heavy cognitive load during multi-incident emergencies when incoming reports need immediate severity ranking.
              </p>
              <div className="p-4 bg-brand-bg/60 rounded-xl border border-brand-border/60 mb-4">
                <h4 className="text-xs font-bold font-mono text-brand-text uppercase mb-1.5">What I Actually Built &amp; Contributed:</h4>
                <ul className="text-xs sm:text-sm text-brand-muted space-y-1.5 list-disc list-inside">
                  <li>Built the incident management dashboard with triage severity tags (Critical, High, Moderate).</li>
                  <li>Designed clear visual hierarchy to highlight urgent alerts, responder availability, and location coordinates.</li>
                  <li>Handled transient network conditions and latency with offline states and error boundaries.</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-brand-border/50">
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['Next.js', 'TypeScript', 'Telemetry Feed', 'Tailwind CSS', 'Triage Logic'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-brand-bg rounded-lg border border-brand-border text-brand-text">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Adityasri05/frontend-ai-capstone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-brand-muted hover:text-brand-text flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 3. ABOUT / APPROACH SECTION */}
      <section id="about" className="scroll-mt-24">
        <div className="p-8 sm:p-10 bg-brand-card/50 border border-brand-border rounded-3xl backdrop-blur-sm">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-accent uppercase tracking-wider mb-2">
            <span>Philosophy</span>
            <span>•</span>
            <span>How I Work</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-text mb-6">About &amp; Engineering Approach</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-brand-muted leading-relaxed">
            <div className="space-y-4">
              <p>
                I am a B.Tech Computer Science &amp; Engineering student who approaches AI from a frontend engineering perspective. Rather than treating LLMs as mystical black boxes, I focus on the concrete interfaces that make machine intelligence useful, transparent, and trustworthy.
              </p>
              <p>
                A great AI interface is defined by how it handles uncertainty. In my projects, that means surfacing inline source citations, confidence indicators, progress disclosure logs, and informative error states rather than raw, unchecked text.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                <strong>Security-First API Routing:</strong> I believe client-side AI apps must never expose raw model API keys. I route all Gemini/Claude calls through FastAPI or Node.js backend proxies with strict schema validation.
              </p>
              <p>
                <strong>Learning by Building:</strong> I learn by shipping end-to-end working systems—understanding latency, token pricing trade-offs, state management, and accessibility along the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AI & TECHNICAL FOCUS SECTION */}
      <section id="tech" className="scroll-mt-24">
        <div className="mb-10 pb-4 border-b border-brand-border">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-accent uppercase tracking-wider mb-2">
            <span>Capabilities</span>
            <span>•</span>
            <span>Core Stack</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-text">AI &amp; Technical Focus</h2>
          <p className="text-sm text-brand-muted mt-1">
            The intersection of Frontend Architecture × Generative AI × Product Engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Frontend */}
          <div className="p-6 bg-brand-card border border-brand-border rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-brand-accent uppercase mb-2">Frontend Engineering</div>
              <h3 className="text-lg font-bold text-brand-text mb-3">Client Architecture</h3>
              <ul className="text-xs text-brand-muted space-y-2">
                <li>• React 19 &amp; Next.js 15 (App Router)</li>
                <li>• TypeScript (strict type safety)</li>
                <li>• Tailwind CSS &amp; Vanilla CSS tokens</li>
                <li>• Semantic HTML5 &amp; WCAG Accessibility</li>
                <li>• Zustand &amp; React Hook State</li>
              </ul>
            </div>
          </div>

          {/* Backend & APIs */}
          <div className="p-6 bg-brand-card border border-brand-border rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-brand-accent uppercase mb-2">Backend &amp; Routing</div>
              <h3 className="text-lg font-bold text-brand-text mb-3">API Proxies &amp; Validation</h3>
              <ul className="text-xs text-brand-muted space-y-2">
                <li>• Python (FastAPI)</li>
                <li>• Node.js &amp; Express</li>
                <li>• RESTful API Design</li>
                <li>• Secure API Key Proxies</li>
                <li>• Structured JSON Validation (Pydantic)</li>
              </ul>
            </div>
          </div>

          {/* AI / GenAI */}
          <div className="p-6 bg-brand-card border border-brand-border rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-brand-accent uppercase mb-2">GenAI &amp; LLMs</div>
              <h3 className="text-lg font-bold text-brand-text mb-3">Model Integration</h3>
              <ul className="text-xs text-brand-muted space-y-2">
                <li>• Gemini 2.5 Flash / Pro &amp; Claude APIs</li>
                <li>• Structured Prompt Engineering</li>
                <li>• Vector RAG &amp; Citation Mapping</li>
                <li>• Agent Tools &amp; Model Context Protocol</li>
                <li>• Deterministic Output Evaluation</li>
              </ul>
            </div>
          </div>

          {/* Workflow & Tools */}
          <div className="p-6 bg-brand-card border border-brand-border rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-brand-accent uppercase mb-2">Workflow &amp; QA</div>
              <h3 className="text-lg font-bold text-brand-text mb-3">Testing &amp; Tooling</h3>
              <ul className="text-xs text-brand-muted space-y-2">
                <li>• Git &amp; GitHub Actions CI</li>
                <li>• Vitest &amp; React Testing Library</li>
                <li>• Playwright E2E Testing</li>
                <li>• Netlify &amp; Vercel Deployment</li>
                <li>• Postman API Testing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CV / RESUME & BOOKING SECTION */}
      <section id="cv" className="scroll-mt-24">
        <div className="p-8 sm:p-10 bg-brand-card border border-brand-border rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-accent uppercase tracking-wider mb-2">
                <span>Resume &amp; Background</span>
              </div>
              <h2 className="text-2xl font-bold text-brand-text mb-3">Curriculum Vitae</h2>
              <p className="text-sm text-brand-muted leading-relaxed mb-6">
                Inspect my verified academic background (B.Tech CSE), technical project history, frontend skills, and practical AI workflow experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/resume"
                  className="px-5 py-2.5 bg-brand-accent hover:bg-brand-primary-hover text-slate-100 font-semibold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <span>View Online Resume</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <span className="px-4 py-2.5 bg-brand-bg text-brand-muted border border-brand-border text-xs rounded-xl font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>PDF: Linked via Resume page</span>
                </span>
              </div>
            </div>

            {/* Booking Link / Meeting Placeholder */}
            <div className="p-6 bg-brand-bg/80 border border-dashed border-brand-border rounded-2xl">
              <div className="text-xs font-mono font-bold text-brand-accent uppercase mb-2">Meeting / Booking Link</div>
              <h3 className="text-base font-bold text-brand-text mb-2">Schedule a Technical Discussion</h3>
              <p className="text-xs text-brand-muted leading-relaxed mb-4">
                Let&apos;s schedule a 20-minute chat to discuss early-career Frontend AI engineering roles, internships, or web architecture.
              </p>
              <div className="p-3 bg-brand-card rounded-lg border border-brand-border text-xs font-mono text-brand-muted mb-3 flex items-center justify-between">
                <span>Booking Provider:</span>
                <span className="text-amber-400 font-semibold">[MANUAL SETUP REQUIRED]</span>
              </div>
              <p className="text-[11px] text-brand-muted/80">
                Preferred direct channel: Reach out via{' '}
                <a
                  href="https://www.linkedin.com/in/aditya-srivastav-64906927a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent underline"
                >
                  LinkedIn Direct Message
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FUTURE CONTENT / CAPSTONE AREA */}
      <section id="writing" className="scroll-mt-24">
        <div className="p-8 bg-brand-card/40 border border-brand-border rounded-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-accent uppercase tracking-wider mb-2">
            <span>Research &amp; Logs</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-brand-text mb-2">Writing &amp; Technical Experiments</h2>
          <p className="text-xs sm:text-sm text-brand-muted mb-6">
            Documenting architectural decisions, AI fluency benchmarks, and agent development notes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-brand-bg/70 border border-brand-border rounded-xl">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                Capstone MVP Built
              </span>
              <h3 className="text-sm font-bold text-brand-text mt-2 mb-1">HackScout AI</h3>
              <p className="text-xs text-brand-muted">
                Autonomous hackathon &amp; AI opportunity scout with deterministic rule evaluation (7/7 tests passed).
              </p>
            </div>

            <div className="p-4 bg-brand-bg/70 border border-brand-border rounded-xl">
              <span className="text-[10px] font-mono text-brand-accent uppercase font-bold bg-brand-accent/10 px-2 py-0.5 rounded border border-brand-accent/20">
                Architecture Notes
              </span>
              <h3 className="text-sm font-bold text-brand-text mt-2 mb-1">From Workflows to MCP</h3>
              <p className="text-xs text-brand-muted">
                Analysis of Model Context Protocol primitives (Tools, Resources, Prompts) and stateful agent upgrades.
              </p>
            </div>

            <div className="p-4 bg-brand-bg/70 border border-brand-border rounded-xl">
              <span className="text-[10px] font-mono text-brand-muted uppercase font-bold bg-brand-border/40 px-2 py-0.5 rounded border border-brand-border">
                Coming Soon
              </span>
              <h3 className="text-sm font-bold text-brand-text mt-2 mb-1">AI Prompt Ladders</h3>
              <p className="text-xs text-brand-muted">
                Practical prompt refinement patterns for generating schema-valid UI mockups and code artifacts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REAL CONTACT FORM & DIRECT CHANNELS SECTION */}
      <section id="contact" className="scroll-mt-24 py-12 px-4 sm:px-8 bg-gradient-to-b from-brand-card to-brand-card/40 border border-brand-border rounded-3xl shadow-brand-shadow-lg">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-accent uppercase tracking-wider">
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text font-display">
            Let&apos;s Build AI-Powered Interfaces Together
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed max-w-xl mx-auto">
            I am actively seeking junior Frontend AI Engineering roles, internships, and opportunities to build resilient, AI-integrated web applications.
          </p>
        </div>

        {/* Real Dynamic Contact Form */}
        <ContactForm />

        {/* Alternative Direct Channels */}
        <div className="mt-10 pt-8 border-t border-brand-border/60 text-center">
          <p className="text-xs font-mono text-brand-muted mb-4 uppercase tracking-wider">
            Or connect via direct social channels:
          </p>
          <div className="flex flex-wrap justify-center gap-4 items-center">
            <a
              href="https://www.linkedin.com/in/aditya-srivastav-64906927a/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-brand-accent hover:bg-brand-primary-hover text-slate-100 font-bold text-xs rounded-xl transition-all duration-300 active:scale-95 shadow-md flex items-center gap-2"
            >
              <span>LinkedIn Profile</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://github.com/Adityasri05"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-brand-bg hover:bg-brand-border text-brand-text border border-brand-border font-semibold text-xs rounded-xl transition-all duration-300 active:scale-95 flex items-center gap-2"
            >
              <span>GitHub Profile</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
