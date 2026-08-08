# Final Submission: CineTrack Movie Search & Watchlist App

This document serves as the final submission for the **FlyRank AI Frontend Engineering Capstone Assignment**. It documents the application overview, technology stack, AI-assisted development loop, exact prompts, manual refactorings, and engineering learnings.

---

## 1. Project Overview
CineTrack is an interactive movie discovery and watchlisting application. It allows users to search for titles, filter results by media type, browse paginated records, read detailed casting profiles and critic scores, and synchronize a watchlist catalog to the cloud using Firebase services.

---

## 2. Technology Stack
- **Framework**: Next.js 15 (App Router, strict Server vs Client component separation)
- **Library**: React 19 (Strict Mode, `useEffect` hooks, `useContext` global state)
- **Language**: TypeScript (strict compilation, static type validations)
- **Styling**: Tailwind CSS v4 (responsive utility grids, glassmorphism UI structures)
- **Services**: OMDb Movie API, Firebase Auth, and Firebase Realtime Database.

---

## 3. AI-Assisted Development Process
I paired with an AI coding companion using the **PLAN → IMPLEMENT → REVIEW → TEST → IMPROVE** workflow loop. 
- **Plan**: Structured the folder layouts separating View, ViewModel, and Model concern layers (MVVM).
- **Implement**: Features were generated code-block by code-block, avoiding massive single-response dumps.
- **Review**: Carefully inspected imports, Next.js routing paradigms, and component boundaries.
- **Test**: Compiled the build using Next.js tools and manually vetted search, pagination, and favorites triggers.
- **Improve**: Refactored Vite-centric keys, async Next.js parameters, and unconditional Firebase initializations.

---

## 4. Prompts Used
The exact prompts used in the development cycle were:
1. **Types Setup**: *"Initialize the TypeScript interfaces for OMDb movie results, search responses, and detailed movie profiles in `src/types/movie.ts`..."*
2. **OMDb Service**: *"Create a services file `src/services/omdbMovieService.ts` to communicate with the OMDb movie API..."*
3. **Firebase & Local Sync**: *"Create `src/services/firebaseService.ts` to handle user Auth and Realtime Database sync for favorites..."*
4. **Home MVVM Layout**: *"Implement the Home search feature using the MVVM pattern. Create HomeModel.ts, useHomeViewModel.ts, and HomeView.tsx..."*
5. **Details Component**: *"Implement the Movie Details feature under `src/features/details/`. Create MovieDetailModel.ts, useMovieDetailViewModel.ts, and MovieDetailView.tsx..."*
6. **Watchlist Card**: *"Implement the Favourites list view in `src/features/favourites/FavouritesView.tsx` using the global FavoritesContext..."*
7. **Header & Context Providers**: *"Wire up the Next.js pages and wrap them in AuthProvider and FavoritesProvider. Create a global Header.tsx..."*

---

## 5. Manual Improvements Made
To maintain portfolio-grade standards, the following adjustments were made after reviewing the AI outputs:
- **Next.js 15 Promise Params**: Refactored the dynamic parameter lookup in `src/app/movies/[id]/page.tsx` from synchronous `params.id` to an asynchronous `await params` resolution.
- **Next.js API Prefixing**: Changed `VITE_OMDB_API_KEY` to `NEXT_PUBLIC_OMDB_API_KEY` to follow Next.js client-side injection rules.
- **Default OMDb Fallback Key**: Configured a default API key in the service file to allow CineTrack to run immediately without requiring manual configuration of `.env` files.
- **Firebase Initialization Protection Check**: Guarded `initializeApp()` inside `firebaseService.ts` using `isFirebaseConfigured()`. If environment keys are missing, the application automatically triggers local storage fallbacks instead of crashing at boot.
- **Visual Missing-Poster Placeholders**: Designed modern inline SVG placeholders in `HomeView.tsx` and `MovieDetailView.tsx` to handle titles missing poster images.

---

## 6. AI Mistakes Documented
Three major errors were caught and corrected:
1. **OMDb Environment Variable Prefix Mismatch**: The AI model assumed a Vite environment and used `VITE_` instead of Next.js's `NEXT_PUBLIC_` convention.
2. **Unconditional Firebase Boot Crashes**: The AI attempted to initialize Firebase without checking if the configuration environment keys were defined.
3. **Synchronous Next.js 15 Parameter Access**: The AI accessed route params synchronously, causing a compilation error under Next.js 15.

---

## 7. Testing & Verification
- Checked dependency installation and audits (`npm install`).
- Compiled optimized production bundles using `npm run build` to confirm zero static rendering or lint warnings.
- Manually verified search tags, filter changes, and favorites synchronization in Local Mode.

---

## 8. Key Learnings
- **Framework Compatibility is Critical**: AI models frequently generate code based on older framework versions (e.g. Next.js 13/14 or React 18). As developers, we must verify changes against the target framework's active standards (such as Next.js 15 Promise Params and React 19 concurrent features).
- **Graceful Fallbacks Improve UX**: Implementing fallbacks (like localStorage when Firebase is unconfigured, or default OMDb API keys) ensures that applications remain fully functional in sandbox environments.
- **MVVM Clarifies Frontend Logic**: Splitting files into Views (presentation), ViewModels (reactive state and actions), and Models (data fetching and validation) yields a clean, highly testable codebase.

---

## 9. Final Result
The CineTrack Movie Search and Watchlist Application is complete, fully responsive, accessible, and structured according to strict MVVM engineering principles. It is ready for portfolio demonstration.
