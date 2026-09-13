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
    <header className="w-full bg-brand-bg/80 backdrop-blur-md border-b border-brand-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portfolio Mark */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg border-2 border-brand-primary flex items-center justify-center font-display font-bold text-sm text-brand-text group-hover:border-brand-primary/80 transition-colors">
                AS
              </div>
              <span className="text-sm font-bold tracking-wider text-brand-text group-hover:text-brand-primary transition-colors uppercase">
                Aditya Srivastav
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            <Link
              href="/"
              className={`text-xs font-bold tracking-wide transition-colors duration-300 ${
                isLinkActive('/') 
                  ? 'text-brand-primary' 
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              Browse
            </Link>
            
            <Link
              href="/favourites"
              className={`text-xs font-bold tracking-wide transition-colors duration-300 flex items-center gap-2 ${
                isLinkActive('/favourites') 
                  ? 'text-brand-primary' 
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              <span>Watchlist</span>
              {favorites.length > 0 && (
                <span className="px-2 py-0.5 bg-brand-primary text-slate-100 text-[10px] font-black rounded-full font-mono">
                  {favorites.length}
                </span>
              )}
            </Link>
            
            <Link
              href="/interview"
              className={`text-xs font-bold tracking-wide transition-colors duration-300 flex items-center gap-1.5 ${
                isLinkActive('/interview') 
                  ? 'text-brand-primary' 
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              <span>AI Interview</span>
              <span className="px-1.5 py-0.2 bg-brand-primary/10 text-brand-primary text-[9px] font-mono font-bold rounded-md border border-brand-primary/20">
                LIVE
              </span>
            </Link>

            <Link
              href="/workspace"
              className={`text-xs font-bold tracking-wide transition-colors duration-300 flex items-center gap-1.5 ${
                isLinkActive('/workspace') 
                  ? 'text-brand-primary' 
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              <span>3D Workspace</span>
              <span className="px-1.5 py-0.2 bg-purple-500/10 text-purple-600 text-[9px] font-mono font-bold rounded-md border border-purple-500/20">
                3D
              </span>
            </Link>

            <Link
              href="/health"
              className={`text-xs font-bold tracking-wide transition-colors duration-300 ${
                isLinkActive('/health') 
                  ? 'text-brand-primary' 
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              Diagnostics
            </Link>
          </nav>

          {/* User Profile / Auth links (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-brand-muted font-mono font-medium max-w-[150px] truncate" title={user.email || ''}>
                  👤 {user.email}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 border border-brand-border bg-brand-card hover:bg-brand-border text-brand-muted hover:text-brand-text text-xs font-bold rounded-xl transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-bold text-brand-muted hover:text-brand-text transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-brand-primary hover:bg-brand-primary-hover text-slate-100 text-xs font-bold rounded-xl transition-all duration-300 active:scale-95 shadow-md"
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
        <div className="md:hidden bg-brand-bg border-b border-brand-border py-4 px-4 space-y-4">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-bold p-2 rounded-lg transition-colors ${
                isLinkActive('/') 
                  ? 'bg-brand-card text-brand-primary' 
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-card/60'
              }`}
            >
              Browse
            </Link>
            
            <Link
              href="/favourites"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-bold p-2 rounded-lg transition-colors flex items-center justify-between ${
                isLinkActive('/favourites') 
                  ? 'bg-brand-card text-brand-primary' 
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-card/60'
              }`}
            >
              <span>Watchlist</span>
              {favorites.length > 0 && (
                <span className="px-2.5 py-0.5 bg-brand-primary text-slate-100 text-xs font-black rounded-full font-mono">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link
              href="/interview"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-bold p-2 rounded-lg transition-colors flex items-center justify-between ${
                isLinkActive('/interview') 
                  ? 'bg-brand-card text-brand-primary' 
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-card/60'
              }`}
            >
              <span>AI Interview</span>
              <span className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-md border border-brand-primary/20">
                LIVE
              </span>
            </Link>

            <Link
              href="/workspace"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-bold p-2 rounded-lg transition-colors flex items-center justify-between ${
                isLinkActive('/workspace') 
                  ? 'bg-brand-card text-brand-primary' 
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-card/60'
              }`}
            >
              <span>3D Workspace</span>
              <span className="px-2 py-0.5 bg-purple-500/10 text-purple-600 text-xs font-bold rounded-md border border-purple-500/20">
                3D
              </span>
            </Link>

            <Link
              href="/health"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-bold p-2 rounded-lg transition-colors ${
                isLinkActive('/health') 
                  ? 'bg-brand-card text-brand-primary' 
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-card/60'
              }`}
            >
              Diagnostics
            </Link>
          </nav>

          <div className="border-t border-brand-border pt-4 flex flex-col gap-3">
            {user ? (
              <div className="flex flex-col gap-2">
                <span className="text-xs text-brand-muted font-mono truncate px-2">
                  👤 {user.email}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 bg-brand-card border border-brand-border hover:bg-brand-border text-brand-muted font-bold text-xs rounded-xl cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-brand-card hover:bg-brand-border text-brand-muted font-bold text-xs rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-slate-100 font-bold text-xs rounded-xl"
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
