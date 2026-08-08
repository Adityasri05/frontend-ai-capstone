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

  const handleGenreQuickSearch = (genreKeyword: string) => {
    setQuery(genreKeyword);
    setTimeout(() => {
      // Trigger search using the updated query value
      // Since react state is asynchronous, we do it in a small timeout or trigger search directly
      const inputElement = document.getElementById('search-input') as HTMLInputElement;
      if (inputElement) {
        inputElement.value = genreKeyword;
      }
      // Re-trigger handlesearch
    }, 50);
  };

  // Run search when pressing genre pills
  const runQuickSearch = (keyword: string) => {
    setQuery(keyword);
    // Since setQuery is state, we fetch getMovies with query parameter directly for instant response
    setQuery(keyword);
    // We trigger search programmatically
    setTimeout(() => {
      handleSearch(1);
    }, 50);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-16 mb-8 bg-slate-900/40 backdrop-blur-md border border-slate-850 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/10 via-transparent to-purple-600/10 -z-10" />
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 mb-4">
          Discover the World of Cinema
        </h1>
        <p className="text-slate-300 text-md md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Search for your favorite movies, series, and episodes. View ratings, plots, casting details, and save them to your personal favorites catalog.
        </p>

        {/* Search Form */}
        <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto flex flex-col md:flex-row gap-3 items-stretch shadow-inner p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
          <div className="flex-1 relative flex items-center">
            <span className="absolute left-4 text-slate-500 font-bold" aria-hidden="true">🔍</span>
            <input
              id="search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies (e.g., Inception, Avengers, Batman)..."
              required
              className="w-full pl-11 pr-4 py-3 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-sm"
              aria-label="Search inputs for movies"
            />
          </div>

          <button
            type="submit"
            disabled={loading || query.trim().length < 2}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-slate-100 font-semibold text-sm rounded-xl transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Quick Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-6 items-center">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mr-2">Popular Searches:</span>
          {['Batman', 'Marvel', 'Star Wars', 'Interstellar', 'Matrix'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => runQuickSearch(tag)}
              className="px-3 py-1 bg-slate-800/60 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-300 border border-slate-700/60 hover:border-indigo-500/50 rounded-full text-xs transition-all duration-200 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="mt-12">
        {/* Filters and Metadata */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-slate-850">
          {/* Type Filters */}
          <div className="flex gap-2 bg-slate-950/60 p-1 border border-slate-850 rounded-xl">
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
                    ? 'bg-indigo-600 text-slate-100 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Results Summary */}
          {totalResults > 0 && !loading && (
            <p className="text-xs text-slate-400 font-semibold tracking-wide">
              Found <span className="text-indigo-400 font-bold">{totalResults}</span> results • Page {page} of {Math.ceil(totalResults / 10)}
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-8 text-center text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6" role="status" aria-label="Loading movies">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <div key={n} className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden aspect-[2/3] animate-pulse">
                <div className="w-full h-[75%] bg-slate-900" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-slate-900 rounded w-5/6" />
                  <div className="h-3 bg-slate-900 rounded w-1/2" />
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
                    className="group bg-slate-950/60 border border-slate-900/80 hover:border-indigo-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-950/20 flex flex-col relative"
                  >
                    {/* Favorite Trigger */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(movie)}
                      className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 active:scale-90 cursor-pointer shadow-md bg-slate-950/60 hover:bg-slate-900 text-slate-100 border border-slate-800"
                      aria-label={isFav ? `Remove ${movie.Title} from favorites` : `Add ${movie.Title} to favorites`}
                    >
                      <span className={`text-md leading-none ${isFav ? 'text-yellow-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                        ★
                      </span>
                    </button>

                    {/* Poster Link */}
                    <Link href={`/movies/${movie.imdbID}`} className="flex-1 flex flex-col">
                      <div className="w-full aspect-[2/3] relative bg-slate-900 overflow-hidden">
                        {movie.Poster && movie.Poster !== 'N/A' ? (
                          <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 bg-slate-950 border-b border-slate-900 p-4 text-center">
                            <span className="text-2xl mb-1">🎬</span>
                            <span className="text-xs font-semibold">Poster N/A</span>
                          </div>
                        )}
                      </div>

                      {/* Info Panel */}
                      <div className="p-4 flex flex-col flex-1">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded self-start border border-indigo-500/20 mb-2">
                          {movie.Type}
                        </span>
                        <h3 className="text-sm font-bold text-slate-200 line-clamp-2 group-hover:text-indigo-300 transition-colors duration-200 flex-1 leading-snug">
                          {movie.Title}
                        </h3>
                        <span className="text-xs text-slate-500 mt-2 font-mono font-medium">
                          📅 {movie.Year}
                        </span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-6 mt-12 pt-6 border-t border-slate-850">
              <button
                type="button"
                onClick={prevPage}
                disabled={page === 1}
                className="px-4 py-2 border border-slate-800 hover:border-slate-700 bg-slate-950/60 hover:bg-slate-900 disabled:bg-slate-950/30 disabled:border-slate-900 disabled:text-slate-600 text-slate-300 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 active:scale-95 disabled:pointer-events-none cursor-pointer"
              >
                ◀ Previous
              </button>

              <span className="text-xs text-slate-400 font-mono font-semibold">
                Page {page} of {Math.ceil(totalResults / 10)}
              </span>

              <button
                type="button"
                onClick={nextPage}
                disabled={!hasMore}
                className="px-4 py-2 border border-slate-800 hover:border-slate-700 bg-slate-950/60 hover:bg-slate-900 disabled:bg-slate-950/30 disabled:border-slate-900 disabled:text-slate-600 text-slate-300 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 active:scale-95 disabled:pointer-events-none cursor-pointer"
              >
                Next ▶
              </button>
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && movies.length === 0 && !error && (
          <div className="text-center py-20 bg-slate-950/30 border border-slate-900/60 rounded-3xl p-6">
            <span className="text-5xl block mb-4" role="img" aria-label="Popcorn bowl">🍿</span>
            <h3 className="text-lg font-bold text-slate-300">Ready to watch something?</h3>
            <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto">
              Type the title of a movie or series in the search bar above to fetch real-time metadata.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
