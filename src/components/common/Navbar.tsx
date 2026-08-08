'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Hirevium Case Study', href: '/projects/hirevium' },
    { name: 'Resume', href: '/resume' }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-indigo-500 rounded-lg p-1"
        >
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:from-indigo-400 group-hover:to-violet-400 transition-all duration-300">
            Aditya Srivastav
          </span>
          <span className="text-[10px] uppercase tracking-wider bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
            AI Intern
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Desktop Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-indigo-500 rounded-md px-2 py-1 ${
                isActive(link.href)
                  ? 'text-indigo-400 hover:text-indigo-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <a
            href="https://www.linkedin.com/in/adityasri05/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-slate-100 bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md shadow-indigo-600/10 transition-all duration-300 hover:scale-102 active:scale-95 focus-visible:outline-2 focus-visible:outline-indigo-500"
          >
            Connect on LinkedIn
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle main menu"
          className="flex md:hidden p-2 text-slate-400 hover:text-slate-200 focus-visible:outline-2 focus-visible:outline-indigo-500 rounded-lg"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-900 bg-slate-950 px-4 py-4 space-y-3" id="mobile-menu">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? 'bg-indigo-950/40 text-indigo-400 border-l-2 border-indigo-500'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-900">
            <a
              href="https://www.linkedin.com/in/adityasri05/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex w-full items-center justify-center px-4 py-2.5 text-xs font-semibold text-slate-100 bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md transition-all duration-300"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
