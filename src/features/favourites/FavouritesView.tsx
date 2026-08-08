'use client';

import React from 'react';
import Link from 'next/link';
import { useFavorites } from './FavoritesContext';

export default function FavouritesView() {
  const { favorites, toggleFavorite, loading } = useFavorites();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-brand-border">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-brand-text">
            My Watchlist
          </h1>
          <p className="text-xs text-brand-muted mt-1">Titles you've saved for later</p>
        </div>

        <Link
          href="/"
          className="px-4 py-2 border border-brand-border bg-brand-card hover:bg-brand-border text-brand-text text-xs font-semibold rounded-xl transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
        >
          ➕ Search Titles
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6" role="status" aria-label="Loading favorites">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden aspect-[2/3] animate-pulse">
              <div className="w-full h-[75%] bg-brand-border" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-brand-border rounded w-5/6" />
                <div className="h-3 bg-brand-border rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-20 bg-brand-card/20 border border-brand-border rounded-3xl p-6">
          <span className="text-5xl block mb-4" role="img" aria-label="Inbox tray">📥</span>
          <h3 className="text-lg font-bold text-brand-text">Your watchlist is empty</h3>
          <p className="text-xs text-brand-muted mt-2 max-w-sm mx-auto mb-6">
            Explore movies, series, or episodes and click the star icon to save them to your personal catalog.
          </p>
          <Link
            href="/"
            className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-slate-100 font-semibold text-xs rounded-xl transition-all duration-300 active:scale-95 inline-block cursor-pointer shadow-md"
          >
            Start Browsing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <article
              key={movie.imdbID}
              className="group bg-brand-card border border-brand-border hover:border-brand-primary/45 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-brand-shadow-lg flex flex-col relative"
            >
              {/* Remove Favorite Button */}
              <button
                type="button"
                onClick={() => toggleFavorite(movie)}
                className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 active:scale-90 cursor-pointer shadow-md bg-brand-bg/85 hover:bg-red-50 text-yellow-600 hover:text-red-600 border border-brand-border hover:border-red-200"
                aria-label={`Remove ${movie.Title} from favorites`}
              >
                <span className="text-md leading-none">★</span>
              </button>

              {/* Poster Link */}
              <Link href={`/movies/${movie.imdbID}`} className="flex-1 flex flex-col">
                <div className="w-full aspect-[2/3] relative bg-brand-border overflow-hidden">
                  {movie.Poster && movie.Poster !== 'N/A' ? (
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-brand-muted bg-brand-card p-4 text-center">
                      <span className="text-2xl mb-1">🎬</span>
                      <span className="text-xs font-semibold">Poster N/A</span>
                    </div>
                  )}
                </div>

                {/* Info Panel */}
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded self-start border border-brand-primary/10 mb-2">
                    {movie.Type}
                  </span>
                  <h3 className="text-sm font-bold text-brand-text line-clamp-2 group-hover:text-brand-primary transition-colors duration-200 flex-1 leading-snug">
                    {movie.Title}
                  </h3>
                  <span className="text-xs text-brand-muted mt-2 font-mono font-medium">
                    📅 {movie.Year}
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
