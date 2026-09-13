'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="w-full bg-brand-bg/80 backdrop-blur-md border-b border-brand-border sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portfolio Mark */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg border-2 border-brand-accent flex items-center justify-center font-display font-bold text-sm text-brand-text group-hover:border-brand-primary-hover transition-colors">
                AS
              </div>
              <span className="text-sm font-bold tracking-wider text-brand-text group-hover:text-brand-accent transition-colors uppercase">
                Aditya Srivastav
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            <Link
              href="/"
              className={`text-xs font-bold tracking-wide transition-colors duration-200 ${
                isLinkActive('/') 
                  ? 'text-brand-accent' 
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              Home
            </Link>
            
            <Link
              href="/projects"
              className={`text-xs font-bold tracking-wide transition-colors duration-200 ${
                isLinkActive('/projects') 
                  ? 'text-brand-accent' 
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              Projects
            </Link>
            
            <Link
              href="/resume"
              className={`text-xs font-bold tracking-wide transition-colors duration-200 ${
                isLinkActive('/resume') 
                  ? 'text-brand-accent' 
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              Resume
            </Link>
          </nav>

          {/* Primary Action Button (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/aditya-srivastav-64906927a/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-brand-accent hover:bg-brand-primary-hover text-slate-100 text-xs font-bold rounded-xl transition-all duration-300 active:scale-95 shadow-md flex items-center gap-1.5"
            >
              <span>Contact on LinkedIn</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-card focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-bg border-b border-brand-border py-4 px-4 space-y-3">
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-bold p-2.5 rounded-lg transition-colors ${
                isLinkActive('/') 
                  ? 'bg-brand-card text-brand-accent' 
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-card/60'
              }`}
            >
              Home
            </Link>
            
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-bold p-2.5 rounded-lg transition-colors ${
                isLinkActive('/projects') 
                  ? 'bg-brand-card text-brand-accent' 
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-card/60'
              }`}
            >
              Projects
            </Link>

            <Link
              href="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-bold p-2.5 rounded-lg transition-colors ${
                isLinkActive('/resume') 
                  ? 'bg-brand-card text-brand-accent' 
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-card/60'
              }`}
            >
              Resume
            </Link>
          </nav>

          <div className="border-t border-brand-border pt-3">
            <a
              href="https://www.linkedin.com/in/aditya-srivastav-64906927a/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-brand-accent hover:bg-brand-primary-hover text-slate-100 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>Contact on LinkedIn</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
