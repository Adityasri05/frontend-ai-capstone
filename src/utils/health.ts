import { searchMovies } from '../services/omdbMovieService';

export interface HealthStatus {
  status: 'Healthy' | 'Unhealthy';
  timestamp: string;
  application: string;
  version: string;
  environment: string;
  apiReachable: boolean;
  apiResponseTimeMs?: number;
}

export async function getHealthStatus(): Promise<HealthStatus> {
  const startTime = Date.now();
  let apiReachable = false;
  let apiResponseTimeMs = 0;

  try {
    // Perform a lightweight search test to verify OMDb API reachability
    // We search for a popular title "Inception" page 1
    await searchMovies('Inception', 1);
    apiReachable = true;
    apiResponseTimeMs = Date.now() - startTime;
  } catch (error) {
    console.error('[Health Check] OMDb API reachability check failed:', error);
  }

  return {
    status: apiReachable ? 'Healthy' : 'Unhealthy',
    timestamp: new Date().toISOString(),
    application: 'CineTrack Movie Watchlist',
    version: '0.1.0',
    environment: process.env.NODE_ENV || 'development',
    apiReachable,
    apiResponseTimeMs
  };
}
