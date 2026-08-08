import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getDatabase, 
  ref, 
  set, 
  get 
} from 'firebase/database';
import { Movie } from '../types/movie';

// Firebase configuration. We check if variables are set in environment.
// In Next.js App Router, these need to be prefixed with NEXT_PUBLIC_ for client access.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const isFirebaseConfigured = () => {
  return !!firebaseConfig.apiKey && !!firebaseConfig.databaseURL;
};

// Initialize Firebase App dynamically or fallback to null if unconfigured
let app;
let auth: any = null;
let database: any = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    database = getDatabase(app);
    console.log('[Firebase Service] Firebase initialized successfully.');
  } catch (error) {
    console.error('[Firebase Service] Initialization error:', error);
  }
} else {
  console.warn(
    '[Firebase Service] Firebase environment variables not fully configured. cineTrack will run in Local Mode using localStorage.'
  );
}

export { auth, database, isFirebaseConfigured };

// Mock auth interface in case Firebase is not configured
interface AuthStateListener {
  (user: FirebaseUser | null): void;
}

export function subscribeToAuthChanges(callback: AuthStateListener) {
  if (isFirebaseConfigured() && auth) {
    return onAuthStateChanged(auth, callback);
  } else {
    // Return mock unsubscribe
    const savedUser = typeof window !== 'undefined' ? localStorage.getItem('cineTrack_mock_user') : null;
    if (savedUser) {
      setTimeout(() => callback(JSON.parse(savedUser) as any), 100);
    } else {
      setTimeout(() => callback(null), 100);
    }
    return () => {};
  }
}

// Database Sync Operations
export async function syncFavoritesToCloud(userId: string, favorites: Movie[]): Promise<void> {
  if (isFirebaseConfigured() && database) {
    const favoritesRef = ref(database, `users/${userId}/favorites`);
    await set(favoritesRef, favorites);
    console.log(`[Firebase Service] Synced ${favorites.length} favorites to cloud.`);
  } else {
    console.log('[Firebase Service] Sync (Local): saved to localStorage.');
    if (typeof window !== 'undefined') {
      localStorage.setItem(`cineTrack_favorites_${userId}`, JSON.stringify(favorites));
    }
  }
}

export async function fetchFavoritesFromCloud(userId: string): Promise<Movie[]> {
  if (isFirebaseConfigured() && database) {
    const favoritesRef = ref(database, `users/${userId}/favorites`);
    const snapshot = await get(favoritesRef);
    if (snapshot.exists()) {
      return snapshot.val() as Movie[];
    }
    return [];
  } else {
    console.log('[Firebase Service] Fetch (Local): reading from localStorage.');
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(`cineTrack_favorites_${userId}`);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }
}
