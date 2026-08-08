import { Movie, MovieDetails, OmdbSearchResponse } from '../types/movie';

// We fallback to a public demo API key if process.env.NEXT_PUBLIC_OMDB_API_KEY is not configured
// OMDb API Key "849d44e5" or "4a3b711b" are common public/demo keys, or we can use custom keys.
// To ensure it works out of the box, we use a default key if none is set.
const DEFAULT_API_KEY = '849d44e5'; 

const getApiKey = (): string => {
  return process.env.NEXT_PUBLIC_OMDB_API_KEY || DEFAULT_API_KEY;
};

const BASE_URL = 'https://www.omdbapi.com/';

export async function searchMovies(
  query: string,
  page: number = 1,
  type: string = ''
): Promise<{ movies: Movie[]; totalResults: number }> {
  const apiKey = getApiKey();
  const encodedQuery = encodeURIComponent(query.trim());
  let url = `${BASE_URL}?apikey=${apiKey}&s=${encodedQuery}&page=${page}`;
  
  if (type && type !== 'all') {
    url += `&type=${type}`;
  }

  console.log(`[OMDb Service] Searching movies: query="${query}", page=${page}, type="${type}"`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP network error: status ${response.status}`);
  }

  const data: OmdbSearchResponse = await response.json();

  if (data.Response === 'False') {
    throw new Error(data.Error || 'Unknown error occurred while searching OMDb API.');
  }

  return {
    movies: data.Search || [],
    totalResults: parseInt(data.totalResults || '0', 10)
  };
}

export async function getMovieDetails(imdbID: string): Promise<MovieDetails> {
  const apiKey = getApiKey();
  const url = `${BASE_URL}?apikey=${apiKey}&i=${imdbID}&plot=full`;

  console.log(`[OMDb Service] Fetching movie details for: ${imdbID}`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP network error: status ${response.status}`);
  }

  const data: MovieDetails = await response.json();

  if (data.Response === 'False') {
    throw new Error(data.Error || 'Failed to fetch movie details from OMDb API.');
  }

  return data;
}
