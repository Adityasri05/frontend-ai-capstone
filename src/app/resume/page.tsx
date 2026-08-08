'use client';

import React from 'react';

export default function Resume() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 print:py-0 print:px-0">
      
      {/* Action Buttons (Hidden on Print) */}
      <div className="flex justify-end gap-3 mb-8 print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg shadow transition-all duration-200 cursor-pointer"
        >
          Print / Save as PDF
        </button>
        <a
          href="https://www.linkedin.com/in/adityasri05/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-xs font-semibold text-slate-100 bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow transition-all duration-200"
        >
          LinkedIn Profile
        </a>
      </div>

      {/* Main Resume Sheet */}
      <article className="bg-slate-950/20 border border-slate-900 rounded-2xl p-6 sm:p-10 shadow-xl print:border-none print:bg-transparent print:p-0 print:shadow-none">
        
        {/* Header Block */}
        <div className="border-b border-slate-900 pb-6 print:border-slate-300">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 print:text-black">Aditya Srivastav</h1>
              <p className="text-sm font-semibold text-indigo-400 mt-1 print:text-indigo-600">Frontend AI Engineer Intern</p>
            </div>
            <div className="flex flex-col sm:items-end text-xs text-slate-400 print:text-slate-600 gap-1 font-mono">
              <span>Email: aditya.srivastav@example.com</span>
              <span>GitHub: github.com/Adityasri05</span>
              <span>LinkedIn: linkedin.com/in/adityasri05</span>
            </div>
          </div>
        </div>

        {/* Resume Content Sections */}
        <div className="mt-8 space-y-8">
          
          {/* Summary / Positioning */}
          <section aria-labelledby="resume-summary-title">
            <h2 id="resume-summary-title" className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 border-b border-slate-900 pb-1 print:text-slate-800 print:border-slate-200">
              Professional Profile
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed print:text-slate-700">
              B.Tech Computer Science student specializing in building responsive React and Next.js user interfaces that integrate securely with Gemini AI agents. Experienced in routing client-side requests through asynchronous FastAPI backend proxies to keep API keys hidden. Active contributor to open-source developer tooling and finalist in AI engineering hackathons.
            </p>
          </section>

          {/* Education Block */}
          <section aria-labelledby="resume-education-title">
            <h2 id="resume-education-title" className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 border-b border-slate-900 pb-1 print:text-slate-800 print:border-slate-200">
              Education
            </h2>
            <div className="flex justify-between items-baseline text-xs">
              <div>
                <h3 className="font-bold text-slate-200 print:text-black">B.Tech in Computer Science & Engineering (5th Semester)</h3>
                <p className="text-slate-400 print:text-slate-600">Specialization: Machine Learning and Web Technology</p>
              </div>
              <span className="text-slate-500 font-mono text-[10px] print:text-slate-600">Aug 2024 - May 2028</span>
            </div>
          </section>

          {/* Experience Block */}
          <section aria-labelledby="resume-experience-title">
            <h2 id="resume-experience-title" className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 border-b border-slate-900 pb-1 print:text-slate-800 print:border-slate-200">
              Experience
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline text-xs">
                  <h3 className="font-bold text-slate-200 print:text-black">FlyRank AI Frontend Engineering Intern</h3>
                  <span className="text-slate-500 font-mono text-[10px] print:text-slate-600">Aug 2026 - Present</span>
                </div>
                <p className="text-[11px] text-indigo-400 mt-0.5 print:text-indigo-600 font-medium">FlyRank AI Vetting Platform</p>
                <ul className="list-disc ml-4 mt-2 text-slate-400 print:text-slate-700 text-[11px] space-y-1">
                  <li>Designed and built custom recruiter dashboards and candidate vetting drawer panels using React 19 and Next.js 15.</li>
                  <li>Configured secure FastAPI route proxies to proxy Google GenAI SDK calls, hiding the corporate GOOGLE_API_KEY from browser inspections.</li>
                  <li>Collaborated on prompt configurations for Gemini 2.5 Flash Lite agents, enforcing type-safe JSON schema outputs.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Projects Block */}
          <section aria-labelledby="resume-projects-title">
            <h2 id="resume-projects-title" className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 border-b border-slate-900 pb-1 print:text-slate-800 print:border-slate-200">
              Core Projects
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-200 print:text-black">Hirevium (AI Hiring Operating System)</h3>
                <p className="text-slate-400 print:text-slate-600 text-[11px] mt-0.5">Vetting simulator workspace featuring adaptive interviewer prompt chains.</p>
                <ul className="list-disc ml-4 mt-1.5 text-slate-400 print:text-slate-700 text-[11px] space-y-1">
                  <li>Built responsive filtering widgets and candidate ranking boards using Tailwind CSS.</li>
                  <li>Integrated PyTorch classification scores to display embedding vector matching similarity in real time.</li>
                  <li>Leveraged React 19 transitions (useTransition) to animate candidate synchronizations and hide database loading delays.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xs font-bold text-slate-200 print:text-black">Indra AI (Enterprise Search Agent)</h3>
                <p className="text-slate-400 print:text-slate-600 text-[11px] mt-0.5">Search assistant displaying grounded RAG answers with clickable citation overlays.</p>
                <ul className="list-disc ml-4 mt-1.5 text-slate-400 print:text-slate-700 text-[11px] space-y-1">
                  <li>Developed sliding drawer panels with strict keyboard focus trapping and aria overlays.</li>
                  <li>Communicated parameters between layouts and data layers using tRPC API systems to guarantee compile-time safety.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Skills Block */}
          <section aria-labelledby="resume-skills-title">
            <h2 id="resume-skills-title" className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 border-b border-slate-900 pb-1 print:text-slate-800 print:border-slate-200">
              Technical Skillsets
            </h2>
            <div className="grid grid-cols-2 gap-4 text-[11px] text-slate-400 print:text-slate-700">
              <div>
                <span className="font-bold text-slate-300 print:text-slate-850">Frontend Engineering:</span>
                <p className="mt-1">React 19, Next.js 15, TypeScript, Tailwind CSS, Web Accessibility (a11y), Focus Trapping</p>
              </div>
              <div>
                <span className="font-bold text-slate-300 print:text-slate-850">AI & Backend Integrations:</span>
                <p className="mt-1">Python, PyTorch (Embeddings matching), FastAPI, Node.js, Gemini API SDK, API Proxy Security</p>
              </div>
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
