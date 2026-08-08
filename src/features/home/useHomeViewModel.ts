import { useState, useEffect } from 'react';
import { getMovies } from './HomeModel';
import { Movie } from '../../types/movie';

export function useHomeViewModel() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [type, setType] = useState('all');

  // Trigger search on query submit
  const handleSearch = async (targetPage: number = 1) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const { movies: results, totalResults: total } = await getMovies(query, targetPage, type);
      setMovies(results);
      setTotalResults(total);
      setPage(targetPage);
    } catch (err: any) {
      setError(err.message || 'An error occurred during search.');
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  // Re-run search if type filter changes
  useEffect(() => {
    if (query.trim()) {
      handleSearch(1);
    }
  }, [type]);

  const nextPage = () => {
    if (page * 10 < totalResults) {
      handleSearch(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      handleSearch(page - 1);
    }
  };

  return {
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
    hasMore: page * 10 < totalResults
  };
}
