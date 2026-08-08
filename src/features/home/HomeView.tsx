'use client';

import React from 'react';
import Link from 'next/link';
import { useHomeViewModel } from './useHomeViewModel';
import { useFavorites } from '../favourites/FavoritesContext';

export default function HomeView() {
  const {
    query,
    setQuery,
    movies,
    loading,
    error,
    page,
    totalResults,
    type,
    setType,
    handleSearch,
    nextPage,
    prevPage,
    hasMore
  } = useHomeViewModel();

  const { toggleFavorite, isFavorite } = useFavorites();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(1);
  };

  // Run search when pressing genre pills
  const runQuickSearch = (keyword: string) => {
    setQuery(keyword);
    setTimeout(() => {
      handleSearch(1);
    }, 50);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-16 mb-8 bg-brand-card/40 backdrop-blur-md border border-brand-border rounded-3xl p-6 shadow-brand-shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent -z-10" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-text mb-4">
          Discover the World of Cinema
        </h1>
        <p className="text-brand-muted text-sm md:text-md max-w-2xl mx-auto mb-8 leading-relaxed">
          Search for your favorite movies, series, and episodes. View ratings, plots, casting details, and save them to your personal favorites catalog.
        </p>

        {/* Search Form */}
        <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto flex flex-col md:flex-row gap-3 items-stretch shadow-sm p-1.5 bg-brand-bg border border-brand-border rounded-2xl">
          <div className="flex-1 relative flex items-center">
            <span className="absolute left-4 text-brand-muted font-bold" aria-hidden="true">🔍</span>
            <input
              id="search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies (e.g., Inception, Avengers, Batman)..."
              required
              className="w-full pl-11 pr-4 py-3 bg-transparent text-brand-text placeholder-brand-muted focus:outline-none text-sm font-sans"
              aria-label="Search inputs for movies"
            />
          </div>

          <button
            type="submit"
            disabled={loading || query.trim().length < 2}
            className="px-6 py-3 bg-brand-primary hover:bg-brand-primary-hover disabled:bg-brand-card disabled:text-brand-muted text-slate-100 font-semibold text-sm rounded-xl transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Quick Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-6 items-center">
          <span className="text-xs text-brand-muted font-bold uppercase tracking-wider mr-2">Popular Searches:</span>
          {['Batman', 'Marvel', 'Star Wars', 'Interstellar', 'Matrix'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => runQuickSearch(tag)}
              className="px-3 py-1 bg-brand-card hover:bg-brand-primary/10 text-brand-text hover:text-brand-primary border border-brand-border rounded-full text-xs transition-all duration-200 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="mt-12">
        {/* Filters and Metadata */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-brand-border">
          {/* Type Filters */}
          <div className="flex gap-1 bg-brand-card p-1 border border-brand-border rounded-xl">
            {[
              { id: 'all', label: 'All Media' },
              { id: 'movie', label: 'Movies' },
              { id: 'series', label: 'Series' },
              { id: 'episode', label: 'Episodes' }
            ].map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setType(filter.id)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  type === filter.id
                    ? 'bg-brand-primary text-slate-100 shadow-md'
                    : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg/60'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Results Summary */}
          {totalResults > 0 && !loading && (
            <p className="text-xs text-brand-muted font-semibold tracking-wide">
              Found <span className="text-brand-primary font-bold">{totalResults}</span> results • Page {page} of {Math.ceil(totalResults / 10)}
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-600 p-4 rounded-xl mb-8 text-center text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6" role="status" aria-label="Loading movies">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <div key={n} className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden aspect-[2/3] animate-pulse">
                <div className="w-full h-[75%] bg-brand-border" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-brand-border rounded w-5/6" />
                  <div className="h-3 bg-brand-border rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Movies Grid */}
        {!loading && movies.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movies.map((movie) => {
                const isFav = isFavorite(movie.imdbID);
                return (
                  <article
                    key={movie.imdbID}
                    className="group bg-brand-card border border-brand-border hover:border-brand-primary/45 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-brand-shadow-lg flex flex-col relative"
                  >
                    {/* Favorite Trigger */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(movie)}
                      className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 active:scale-90 cursor-pointer shadow-md bg-brand-bg/85 hover:bg-brand-card text-brand-text border border-brand-border"
                      aria-label={isFav ? `Remove ${movie.Title} from favorites` : `Add ${movie.Title} to favorites`}
                    >
                      <span className={`text-md leading-none ${isFav ? 'text-yellow-500' : 'text-brand-muted group-hover:text-brand-text'}`}>
                        ★
                      </span>
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
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-6 mt-12 pt-6 border-t border-brand-border">
              <button
                type="button"
                onClick={prevPage}
                disabled={page === 1}
                className="px-4 py-2 border border-brand-border hover:border-brand-primary bg-brand-card hover:bg-brand-border disabled:opacity-40 text-brand-text rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 active:scale-95 disabled:pointer-events-none cursor-pointer"
              >
                ◀ Previous
              </button>

              <span className="text-xs text-brand-muted font-mono font-semibold">
                Page {page} of {Math.ceil(totalResults / 10)}
              </span>

              <button
                type="button"
                onClick={nextPage}
                disabled={!hasMore}
                className="px-4 py-2 border border-brand-border hover:border-brand-primary bg-brand-card hover:bg-brand-border disabled:opacity-40 text-brand-text rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 active:scale-95 disabled:pointer-events-none cursor-pointer"
              >
                Next ▶
              </button>
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && movies.length === 0 && !error && (
          <div className="text-center py-20 bg-brand-card/20 border border-brand-border rounded-3xl p-6">
            <span className="text-5xl block mb-4" role="img" aria-label="Popcorn bowl">🍿</span>
            <h3 className="text-lg font-bold text-brand-text">Ready to watch something?</h3>
            <p className="text-xs text-brand-muted mt-2 max-w-sm mx-auto">
              Type the title of a movie or series in the search bar above to fetch real-time metadata.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
