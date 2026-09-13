import React from 'react';
import Link from 'next/link';
import FlyRankCredential from './FlyRankCredential';
import { FileText, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-brand-border bg-brand-card/60 backdrop-blur-md text-brand-muted transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 space-y-8">
        {/* Top Tier: Credential & Core Identity */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1.5 max-w-md">
            <h3 className="text-sm font-bold text-brand-text font-display">
              Aditya Srivastav
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Frontend AI Engineer • B.Tech CSE student building production-grade AI applications with verified state machines, resilient streaming, and WCAG accessibility.
            </p>
          </div>

          {/* Official FlyRank Verified Credential */}
          <div className="flex-shrink-0">
            <FlyRankCredential />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-brand-border/60" />

        {/* Bottom Tier: Quick Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 text-brand-text/80">
            <a
              href="https://www.linkedin.com/in/aditya-srivastav-64906927a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-accent transition-colors flex items-center gap-1.5 min-h-[44px] sm:min-h-0 py-2 sm:py-0"
              aria-label="Connect on LinkedIn (opens in a new tab)"
            >
              <svg className="w-4 h-4 text-[#0077b5] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/Adityasri05"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-accent transition-colors flex items-center gap-1.5 min-h-[44px] sm:min-h-0 py-2 sm:py-0"
              aria-label="View GitHub profile (opens in a new tab)"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>GitHub</span>
            </a>

            <Link
              href="/resume"
              className="hover:text-brand-accent transition-colors flex items-center gap-1.5 min-h-[44px] sm:min-h-0 py-2 sm:py-0"
            >
              <FileText className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              <span>Resume</span>
            </Link>

            <a
              href="/#contact"
              className="hover:text-brand-accent transition-colors flex items-center gap-1.5 min-h-[44px] sm:min-h-0 py-2 sm:py-0"
            >
              <Mail className="w-4 h-4 text-brand-accent" aria-hidden="true" />
              <span>Contact</span>
            </a>
          </div>

          <div className="font-mono text-[11px] text-brand-muted text-center sm:text-right">
            Aditya Srivastav © 2026 • All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
