import React from 'react';
import Link from 'next/link';
import { DesktopNav, MobileNav, NavLink } from './NavbarClient';

export default function Navbar() {
  const navLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Hirevium Case Study', href: '/projects/hirevium' },
    { name: 'Resume', href: '/resume' },
    { name: 'System Health', href: '/health' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo (Server-Side Rendered) */}
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

        {/* Desktop Navigation (Client-Side Link Highlighting) */}
        <DesktopNav navLinks={navLinks} />

        {/* CTA Button (Server-Side Rendered) */}
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

        {/* Mobile Navigation Drawer & Toggles (Client-Side Menu State) */}
        <MobileNav navLinks={navLinks} />
        
      </div>
    </header>
  );
}
