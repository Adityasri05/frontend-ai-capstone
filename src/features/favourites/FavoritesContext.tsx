'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Movie } from '../../types/movie';
import { subscribeToAuthChanges, fetchFavoritesFromCloud, syncFavoritesToCloud } from '../../services/firebaseService';

interface FavoritesContextType {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (imdbID: string) => boolean;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Subscribe to Auth changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (user) => {
      setCurrentUser(user);
      setLoading(true);
      if (user) {
        // Logged in: fetch from Firebase Realtime Database
        try {
          const cloudFavorites = await fetchFavoritesFromCloud(user.uid);
          setFavorites(cloudFavorites);
        } catch (error) {
          console.error('Error fetching favorites from cloud:', error);
          // Fallback to local
          loadLocalFavorites();
        }
      } else {
        // Logged out: fetch from localStorage
        loadLocalFavorites();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadLocalFavorites = () => {
    const local = localStorage.getItem('cineTrack_favorites_anonymous');
    setFavorites(local ? JSON.parse(local) : []);
  };

  const toggleFavorite = async (movie: Movie) => {
    let updatedFavorites: Movie[];
    const exists = favorites.some((fav) => fav.imdbID === movie.imdbID);

    if (exists) {
      updatedFavorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    setFavorites(updatedFavorites);

    // Save
    if (currentUser) {
      try {
        await syncFavoritesToCloud(currentUser.uid, updatedFavorites);
      } catch (error) {
        console.error('Error syncing favorites to cloud:', error);
      }
    } else {
      localStorage.setItem('cineTrack_favorites_anonymous', JSON.stringify(updatedFavorites));
    }
  };

  const isFavorite = (imdbID: string): boolean => {
    return favorites.some((fav) => fav.imdbID === imdbID);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
