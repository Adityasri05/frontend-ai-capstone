'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  subscribeToAuthChanges, 
  isFirebaseConfigured, 
  auth 
} from '../../services/firebaseService';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  User as FirebaseUser
} from 'firebase/auth';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isDemoUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoUser, setIsDemoUser] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setIsDemoUser(!!currentUser && currentUser.isAnonymous);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    if (isFirebaseConfigured() && auth) {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      // Local demo login fallback
      const mockUser = {
        uid: 'demo_user_123',
        email,
        displayName: 'Demo User',
        isAnonymous: false,
        emailVerified: true
      };
      localStorage.setItem('cineTrack_mock_user', JSON.stringify(mockUser));
      setUser(mockUser as any);
      setIsDemoUser(true);
    }
    setLoading(false);
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    if (isFirebaseConfigured() && auth) {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      // Local demo register fallback
      const mockUser = {
        uid: 'demo_user_123',
        email,
        displayName: 'Demo User',
        isAnonymous: false,
        emailVerified: true
      };
      localStorage.setItem('cineTrack_mock_user', JSON.stringify(mockUser));
      setUser(mockUser as any);
      setIsDemoUser(true);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    if (isFirebaseConfigured() && auth) {
      await firebaseSignOut(auth);
    } else {
      localStorage.removeItem('cineTrack_mock_user');
      setUser(null);
      setIsDemoUser(false);
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isDemoUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
