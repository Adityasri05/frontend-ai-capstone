'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavLink {
  name: string;
  href: string;
}

interface DesktopNavProps {
  navLinks: NavLink[];
}

export function DesktopNav({ navLinks }: DesktopNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
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
  );
}

interface MobileNavProps {
  navLinks: NavLink[];
}

export function MobileNav({ navLinks }: MobileNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
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
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </button>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 md:hidden border-t border-slate-900 bg-slate-950 px-4 py-4 space-y-3 shadow-xl" id="mobile-menu">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center px-4 py-2.5 text-xs font-semibold text-slate-100 bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md transition-all duration-300"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      )}
    </>
  );
}
