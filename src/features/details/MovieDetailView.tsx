'use client';

import React from 'react';
import Link from 'next/link';
import { useMovieDetailViewModel } from './useMovieDetailViewModel';
import { useFavorites } from '../favourites/FavoritesContext';

interface MovieDetailViewProps {
  imdbID: string;
}

export default function MovieDetailView({ imdbID }: MovieDetailViewProps) {
  const { movie, loading, error, retry } = useMovieDetailViewModel(imdbID);
  const { toggleFavorite, isFavorite } = useFavorites();

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-16 animate-pulse" role="status" aria-label="Loading movie details">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 aspect-[2/3] bg-brand-card rounded-3xl" />
          <div className="flex-1 space-y-6">
            <div className="h-10 bg-brand-card rounded w-3/4" />
            <div className="h-6 bg-brand-card rounded w-1/4" />
            <div className="space-y-3">
              <div className="h-4 bg-brand-card rounded" />
              <div className="h-4 bg-brand-card rounded" />
              <div className="h-4 bg-brand-card rounded w-5/6" />
            </div>
            <div className="h-12 bg-brand-card rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="w-full max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-red-500/10 border border-red-500/30 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium">
          ⚠️ {error || 'Movie details not found.'}
        </div>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={retry}
            className="px-4 py-2 bg-brand-primary hover:bg-brand-primary-hover text-slate-100 text-xs font-semibold rounded-lg transition-all duration-300 cursor-pointer"
          >
            Retry Fetch
          </button>
          <Link
            href="/"
            className="px-4 py-2 border border-brand-border hover:border-brand-primary text-brand-text text-xs font-semibold rounded-lg transition-all duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const isFav = isFavorite(movie.imdbID);

  // Map icons for ratings sources
  const getRatingIcon = (source: string) => {
    if (source.includes('Internet Movie Database')) return '⭐';
    if (source.includes('Rotten Tomatoes')) return '🍅';
    if (source.includes('Metacritic')) return 'Ⓜ️';
    return '📊';
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-brand-muted hover:text-brand-primary transition-colors mb-8 cursor-pointer"
      >
        <span>◀</span> Back to Search
      </Link>

      {/* Main Card Wrapper */}
      <div className="bg-brand-card/65 border border-brand-border rounded-3xl overflow-hidden shadow-brand-shadow-lg p-6 md:p-10 backdrop-blur-md relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent -z-10" />

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Movie Poster */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="w-full aspect-[2/3] relative rounded-2xl overflow-hidden bg-brand-bg border border-brand-border shadow-md">
              {movie.Poster && movie.Poster !== 'N/A' ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-brand-muted bg-brand-card p-6 text-center">
                  <span className="text-4xl mb-2">🎬</span>
                  <span className="text-sm font-semibold">Poster Not Available</span>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Info */}
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-start gap-4 mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight leading-tight">
                  {movie.Title}
                </h1>
                <div className="flex flex-wrap gap-2 items-center text-xs text-brand-muted mt-2 font-medium">
                  <span className="px-2 py-0.5 bg-brand-bg border border-brand-border rounded font-bold uppercase">{movie.Rated}</span>
                  <span>•</span>
                  <span>{movie.Released}</span>
                  <span>•</span>
                  <span>{movie.Runtime}</span>
                  <span>•</span>
                  <span className="capitalize text-brand-primary font-semibold">{movie.Type}</span>
                </div>
              </div>

              {/* Toggle Favorite */}
              <button
                type="button"
                onClick={() => toggleFavorite({
                  Title: movie.Title,
                  Year: movie.Year,
                  imdbID: movie.imdbID,
                  Type: movie.Type,
                  Poster: movie.Poster
                })}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all duration-300 active:scale-95 cursor-pointer shadow-md ${
                  isFav
                    ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-600 hover:bg-yellow-500/20'
                    : 'bg-brand-bg border-brand-border hover:border-brand-primary text-brand-text'
                }`}
                aria-label={isFav ? `Remove ${movie.Title} from favorites` : `Add ${movie.Title} to favorites`}
              >
                <span className="text-sm">★</span>
                <span>{isFav ? 'Favourited' : 'Add to Watchlist'}</span>
              </button>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {movie.Genre.split(',').map((g) => (
                <span
                  key={g}
                  className="text-[10px] font-bold text-brand-primary bg-brand-primary/5 px-2.5 py-1 rounded-md border border-brand-primary/10 uppercase tracking-wide"
                >
                  {g.trim()}
                </span>
              ))}
            </div>

            {/* Ratings Grid */}
            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {movie.Ratings.map((rating) => (
                  <div
                    key={rating.Source}
                    className="bg-brand-bg border border-brand-border p-4 rounded-2xl flex flex-col justify-between"
                  >
                    <span className="text-[10px] text-brand-muted font-bold uppercase tracking-wider">
                      {rating.Source}
                    </span>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-md leading-none">{getRatingIcon(rating.Source)}</span>
                      <span className="text-md font-extrabold text-brand-text font-mono">
                        {rating.Value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Plot Summary */}
            <div className="mb-8">
              <h2 className="text-xs text-brand-muted font-bold uppercase tracking-wider mb-2">Plot Overview</h2>
              <p className="text-sm text-brand-text leading-relaxed font-light">
                {movie.Plot !== 'N/A' ? movie.Plot : 'No plot synopsis available for this title.'}
              </p>
            </div>

            {/* Director, Writers, Cast */}
            <div className="space-y-4 border-t border-brand-border pt-6 mt-auto">
              {movie.Director !== 'N/A' && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs">
                  <span className="text-brand-muted font-bold uppercase tracking-wide w-24">Director:</span>
                  <span className="text-brand-text font-medium">{movie.Director}</span>
                </div>
              )}
              {movie.Writer !== 'N/A' && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs">
                  <span className="text-brand-muted font-bold uppercase tracking-wide w-24">Writer:</span>
                  <span className="text-brand-text font-medium">{movie.Writer}</span>
                </div>
              )}
              {movie.Actors !== 'N/A' && (
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 text-xs">
                  <span className="text-brand-muted font-bold uppercase tracking-wide w-24 mt-0.5">Actors:</span>
                  <span className="text-brand-text font-medium flex-1">{movie.Actors}</span>
                </div>
              )}
              {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs">
                  <span className="text-brand-muted font-bold uppercase tracking-wide w-24">Box Office:</span>
                  <span className="text-brand-text font-semibold font-mono">{movie.BoxOffice}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
