# AI-Assisted React Development Log — CineTrack

This log documents the prompt iteration, AI code contributions, code reviews, problems identified, and manual improvements implemented during the development of CineTrack.

---

## 1. Feature: Project Setup & Types

### Prompt Used
> "Initialize the TypeScript interfaces for OMDb movie results, search responses, and detailed movie profiles in `src/types/movie.ts`. Make sure to cover properties like Title, Year, imdbID, Poster, Type (movie, series, episode), Ratings (source and value array), plot, runtime, boxoffice, and genres."

### AI Contribution
AI generated the base definitions inside `src/types/movie.ts` declaring clean, strongly-typed interfaces for `Movie`, `Rating`, `MovieDetails`, and `OmdbSearchResponse`.

### My Review
Verified that the OMDb API response attributes (which use PascalCase keys like `Title`, `Year`, `imdbID`) are typed correctly to avoid runtime object access errors.

### Problems Found
The initial AI types lacked optional `Error` fields on search responses and movie details, which OMDb API uses to return error payloads (e.g. `{"Response":"False","Error":"Movie not found!"}`).

### Manual Improvements
Manually added the `Error?: string` property to `OmdbSearchResponse` and `MovieDetails` to support robust error handling on the client side.

---

## 2. Feature: OMDb Movie API Service

### Prompt Used
> "Create a services file `src/services/omdbMovieService.ts` to communicate with the OMDb movie API. Implement searchMovies (takes query, page, type) and getMovieDetails (takes imdbID). Read the API key from VITE_OMDB_API_KEY. Handle HTTP network errors and API-returned errors."

### AI Contribution
Generated async fetch functions to perform OMDb API requests, encode query strings, and return JSON responses.

### My Review
Checked the API URL endpoint and query parameters mapping.

### Problems Found
The AI used `VITE_OMDB_API_KEY` for the API key environment variable, but since this project is built on Next.js 15, Vite environment variables are not loaded. Next.js requires client-visible environment variables to be prefixed with `NEXT_PUBLIC_`.

### Manual Improvements
- Changed the key lookup to `process.env.NEXT_PUBLIC_OMDB_API_KEY`.
- Added a fallback `DEFAULT_API_KEY = '849d44e5'` so the movie search works immediately out-of-the-box without requiring manual configuration of `.env` files during evaluation.

---

## 3. Feature: Firebase & Local Storage Sync Service

### Prompt Used
> "Create `src/services/firebaseService.ts` to handle user Auth and Realtime Database sync for favorites. Make sure that if Firebase configuration environment variables are missing, the service falls back to localStorage and mock authentication."

### AI Contribution
AI generated initialization blocks for Firebase App, Auth, and Database, along with database `set` and `get` functions to synchronize favorites array.

### My Review
Checked if the application would crash on load if Firebase credentials were not present in `.env`.

### Problems Found
The generated service called `initializeApp(firebaseConfig)` unconditionally, which throws a runtime exception if `apiKey` is undefined, breaking the entire application.

### Manual Improvements
- Wrapped initialization in a validation check `isFirebaseConfigured()`.
- Implemented robust `subscribeToAuthChanges`, `syncFavoritesToCloud`, and `fetchFavoritesFromCloud` fallbacks to localStorage. If Firebase is not configured, the app runs in **Local Mode** cleanly.

---

## 4. Feature: Home MVVM Search Dashboard

### Prompt Used
> "Implement the Home search feature using the MVVM pattern. Create HomeModel.ts to validate search length, useHomeViewModel.ts custom React hook to manage pagination, query state, filters, and HomeView.tsx to render search inputs and results grid."

### AI Contribution
Generated the complete MVVM structure under `src/features/home/` including form submission handlers, filter state triggers, and card listings.

### My Review
Checked responsiveness of the card layouts and pagination borders.

### Problems Found
The linter failed because the search view and VM didn't handle pagination boundaries correctly (e.g. attempting to request negative pages or going past total results). Also, the grid cards had layout shifting issues when images were missing.

### Manual Improvements
- Configured strict page boundary safeguards in `useHomeViewModel.ts` (`nextPage`/`prevPage` boundaries).
- Handled OMDb missing poster states (`Poster: "N/A"`) by designing a custom inline SVG placeholder card inside `HomeView.tsx` so the layout remains clean.

---

## 5. Feature: Movie Details View

### Prompt Used
> "Implement the Movie Details feature under `src/features/details/`. Create MovieDetailModel.ts, useMovieDetailViewModel.ts, and MovieDetailView.tsx. Make sure to render Rotten Tomatoes, Metacritic, and IMDb ratings with matching emoji icons."

### AI Contribution
Generated dynamic detail panels fetching movie plot summaries, cast list, and directors.

### My Review
Checked that all data attributes are displayed using readable tags.

### Problems Found
- No check was present to handle movie detail request errors (e.g. invalid IMDb IDs).
- Rating scores from different sources were displayed as a flat text list.

### Manual Improvements
- Configured error boundary check boxes inside `MovieDetailView.tsx` with a "Retry Fetch" and "Go Home" CTA.
- Created a visually striking ratings grid dividing IMDb, Rotten Tomatoes, and Metacritic cards with distinct emojis and custom styling.

---

## 6. Feature: Favourites & Watchlist View

### Prompt Used
> "Implement the Favourites list view in `src/features/favourites/FavouritesView.tsx` using the global FavoritesContext. Enable one-click watchlist removal."

### AI Contribution
Generated the watchlist dashboard displaying saved movies.

### My Review
Verified layout when the watchlist is empty.

### Problems Found
The empty state was a simple blank page with no guide text, creating a confusing user experience.

### Manual Improvements
Designed a beautiful popcorn-illustration empty state card with a "Start Browsing" redirect CTA button.

---

## 7. Feature: Global State Provider & Routing

### Prompt Used
> "Wire up the Next.js pages and wrap them in AuthProvider and FavoritesProvider. Create a global Header.tsx component with current auth status and dynamic watchlist badge counter."

### AI Contribution
Generated page wrappers and Navigation header links.

### My Review
Checked the Next.js App Router params handling.

### Problems Found
- In Next.js 15, route parameters are asynchronous Promises, but the AI accessed `params.id` synchronously inside `src/app/movies/[id]/page.tsx`, causing compile-time errors.
- Staged folder with space in path `src/app/movies/ [id]` by mistake.

### Manual Improvements
- Applied `await params` resolution inside `src/app/movies/[id]/page.tsx` to align with Next.js 15 standards.
- Used PowerShell to purge the typo folder and recreated it cleanly at `/movies/[id]/page.tsx`.
