'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../features/auth/AuthContext';
import { useFavorites } from '../../features/favourites/FavoritesContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const pathname = usePathname();

  const isLinkActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className="w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl" aria-hidden="true">🎬</span>
              <span className="text-lg font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 group-hover:from-blue-300 group-hover:to-indigo-200 transition-all duration-300 uppercase">
                CineTrack
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            <Link
              href="/"
              className={`text-xs font-bold tracking-wide transition-colors duration-300 ${
                isLinkActive('/') 
                  ? 'text-indigo-400' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Browse
            </Link>
            
            <Link
              href="/favourites"
              className={`text-xs font-bold tracking-wide transition-colors duration-300 flex items-center gap-2 ${
                isLinkActive('/favourites') 
                  ? 'text-indigo-400' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Watchlist</span>
              {favorites.length > 0 && (
                <span className="px-2 py-0.5 bg-indigo-600 text-slate-100 text-[10px] font-black rounded-full font-mono animate-pulse">
                  {favorites.length}
                </span>
              )}
            </Link>
          </nav>

          {/* User Profile / Auth links (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-mono font-medium max-w-[150px] truncate" title={user.email || ''}>
                  👤 {user.email}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 border border-slate-850 hover:border-slate-700 bg-slate-950/60 hover:bg-slate-900 text-slate-400 hover:text-slate-200 text-xs font-bold rounded-xl transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-slate-100 text-xs font-bold rounded-xl transition-all duration-300 active:scale-95 shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 focus:outline-none cursor-pointer"
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
        <div className="md:hidden bg-slate-950 border-b border-slate-900 py-4 px-4 space-y-4">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-bold p-2 rounded-lg transition-colors ${
                isLinkActive('/') 
                  ? 'bg-slate-900 text-indigo-400' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              Browse
            </Link>
            
            <Link
              href="/favourites"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-bold p-2 rounded-lg transition-colors flex items-center justify-between ${
                isLinkActive('/favourites') 
                  ? 'bg-slate-900 text-indigo-400' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <span>Watchlist</span>
              {favorites.length > 0 && (
                <span className="px-2.5 py-0.5 bg-indigo-600 text-slate-100 text-xs font-black rounded-full font-mono">
                  {favorites.length}
                </span>
              )}
            </Link>
          </nav>

          <div className="border-t border-slate-900 pt-4 flex flex-col gap-3">
            {user ? (
              <div className="flex flex-col gap-2">
                <span className="text-xs text-slate-500 font-mono truncate px-2">
                  👤 {user.email}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 bg-slate-900 border border-slate-850 hover:bg-slate-850 text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold text-xs rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-indigo-600 hover:bg-indigo-500 text-slate-100 font-bold text-xs rounded-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
