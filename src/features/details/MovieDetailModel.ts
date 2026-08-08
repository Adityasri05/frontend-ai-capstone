import { getMovieDetails } from '../../services/omdbMovieService';
import { MovieDetails } from '../../types/movie';

export async function getMovie(imdbID: string): Promise<MovieDetails> {
  const cleanID = imdbID.trim();

  // Basic validation of IMDb ID pattern (e.g., tt1234567)
  if (!cleanID.startsWith('tt') || cleanID.length < 5) {
    throw new Error('Invalid IMDb identifier format.');
  }

  return await getMovieDetails(cleanID);
}
