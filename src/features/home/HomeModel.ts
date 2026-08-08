import { searchMovies } from '../../services/omdbMovieService';
import { Movie } from '../../types/movie';

export async function getMovies(
  query: string,
  page: number = 1,
  type: string = 'all'
): Promise<{ movies: Movie[]; totalResults: number }> {
  const trimmedQuery = query.trim();

  // Validation boundary
  if (trimmedQuery.length < 2) {
    throw new Error('Search query must contain at least 2 characters.');
  }

  return await searchMovies(trimmedQuery, page, type);
}
