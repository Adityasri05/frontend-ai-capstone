'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const isLinkActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="w-full bg-brand-bg/90 backdrop-blur-md border-b border-brand-border sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portfolio Mark */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-3 group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-lg"
              aria-label="Aditya Srivastav Home"
            >
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
              className={`text-xs font-bold tracking-wide transition-colors duration-200 py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded ${
                isLinkActive('/') 
                  ? 'text-brand-accent' 
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              Home
            </Link>
            
            <a
              href="/#work"
              className="text-xs font-bold tracking-wide text-brand-muted hover:text-brand-text transition-colors duration-200 py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded"
            >
              Work
            </a>

            <a
              href="/#about"
              className="text-xs font-bold tracking-wide text-brand-muted hover:text-brand-text transition-colors duration-200 py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded"
            >
              About
            </a>

            <a
              href="/#tech"
              className="text-xs font-bold tracking-wide text-brand-muted hover:text-brand-text transition-colors duration-200 py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded"
            >
              AI / Tech
            </a>

            <a
              href="/#contact"
              className="text-xs font-bold tracking-wide text-brand-muted hover:text-brand-text transition-colors duration-200 py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded"
            >
              Contact
            </a>
            
            <Link
              href="/projects"
              className={`text-xs font-bold tracking-wide transition-colors duration-200 py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded ${
                isLinkActive('/projects') 
                  ? 'text-brand-accent' 
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              Projects
            </Link>
            
            <Link
              href="/resume"
              className={`text-xs font-bold tracking-wide transition-colors duration-200 py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded ${
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
              className="min-h-[40px] px-4 py-2 bg-brand-accent hover:bg-brand-primary-hover text-slate-100 text-xs font-bold rounded-xl transition-all duration-300 active:scale-95 shadow-md flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              <span>Contact on LinkedIn</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Mobile Menu Trigger (Min 44x44px touch target) */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
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
        <div id="mobile-navigation-menu" className="md:hidden bg-brand-bg/95 backdrop-blur-md border-b border-brand-border py-4 px-4 space-y-3">
          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`min-h-[44px] flex items-center text-sm font-bold px-3 py-2.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
                isLinkActive('/') 
                  ? 'bg-brand-card text-brand-accent' 
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-card/60'
              }`}
            >
              Home
            </Link>
            
            <a
              href="/#work"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center text-sm font-bold px-3 py-2.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-card/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              Work
            </a>

            <a
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center text-sm font-bold px-3 py-2.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-card/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              About
            </a>

            <a
              href="/#tech"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center text-sm font-bold px-3 py-2.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-card/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              AI / Tech
            </a>

            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center text-sm font-bold px-3 py-2.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-card/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              Contact Form
            </a>

            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className={`min-h-[44px] flex items-center text-sm font-bold px-3 py-2.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
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
              className={`min-h-[44px] flex items-center text-sm font-bold px-3 py-2.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
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
              className="min-h-[44px] w-full text-center py-2.5 bg-brand-accent hover:bg-brand-primary-hover text-slate-100 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
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
