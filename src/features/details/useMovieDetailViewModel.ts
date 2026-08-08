import { useState, useEffect } from 'react';
import { getMovie } from './MovieDetailModel';
import { MovieDetails } from '../../types/movie';

export function useMovieDetailViewModel(imdbID: string) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovieDetails = async () => {
    if (!imdbID) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getMovie(imdbID);
      setMovie(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while loading movie details.');
      setMovie(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovieDetails();
  }, [imdbID]);

  return {
    movie,
    loading,
    error,
    retry: loadMovieDetails
  };
}
