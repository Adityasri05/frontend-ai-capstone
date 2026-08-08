import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-900 bg-slate-950/40 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-900">
          
          {/* Brand/Positioning */}
          <div className="flex flex-col gap-3">
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              Aditya Srivastav
            </span>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              I build responsive React and Next.js user interfaces that integrate securely with Gemini AI agents, routing interactions through server-side proxies for robust security.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Navigation</span>
            <nav className="flex flex-col gap-2 text-xs" aria-label="Footer Navigation">
              <Link href="/" className="hover:text-indigo-400 transition-colors duration-200">
                Home
              </Link>
              <Link href="/projects/hirevium" className="hover:text-indigo-400 transition-colors duration-200">
                Hirevium Case Study
              </Link>
              <Link href="/resume" className="hover:text-indigo-400 transition-colors duration-200">
                Interactive Resume
              </Link>
            </nav>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Let's Connect</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Seeking junior Frontend AI Engineering or Web Development internships. Let's discuss collaboration opportunities.
            </p>
            <div>
              <a
                href="https://www.linkedin.com/in/adityasri05/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
              >
                LinkedIn Profile &rarr;
              </a>
            </div>
          </div>
          
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Aditya Srivastav. All rights reserved.</p>
          <p className="font-mono">Built for FlyRank AI Frontend Engineering Internship</p>
        </div>
      </div>
    </footer>
  );
}
