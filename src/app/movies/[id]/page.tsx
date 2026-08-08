import React from 'react';
import MovieDetailView from '../../../features/details/MovieDetailView';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailPage({ params }: MoviePageProps) {
  const resolvedParams = await params;
  return <MovieDetailView imdbID={resolvedParams.id} />;
}
