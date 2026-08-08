# CineTrack — Movie Search & Catalog Application

CineTrack is an interactive movie discovery and cataloging platform built for the **FlyRank AI Frontend Engineering Capstone Assignment**. By integrating the real-world OMDb API and Firebase Auth & Realtime Database services, the application delivers a premium, highly responsive user interface to search, filter, inspect, and synchronize personal watchlist titles.

---

## 1. Features
- **Cinematic Search Panel**: Real-time lookup with validation guards (minimum 2 characters required).
- **Type Filtering**: Instantly isolate searches by Movies, Series, or Episodes using custom pill controls.
- **Popular Quick Search Tags**: Start queries with one-click popular keyword tags.
- **High-Fidelity Detail View**: High-fidelity detail page highlighting director and cast lists, full plots, box office earnings, and critic scores (Metacritic, Rotten Tomatoes, IMDb).
- **Favorites Watchlist**: Save titles locally or to the cloud, featuring instant counter badges in the navbar and clean watchlist grids.
- **Firebase Auth & Database Cloud Sync**: Create an account to synchronize favorites lists to Firebase Realtime Database.
- **Robust Local Fallback Layer**: If Firebase keys are not set, the app automatically enables Local Mode using `localStorage` and simulated auth profiles, allowing evaluation out-of-the-box.

---

## 2. Tech Stack
- **Runtime**: Node.js (LTS)
- **Framework**: Next.js 15 (App Router)
- **Core Library**: React 19 (Concurrent features, Strict Mode)
- **Language**: TypeScript (strict compilation settings)
- **Styling**: Tailwind CSS v4 (responsive design, glassmorphism layouts)
- **Services**: OMDb Movie API, Firebase Auth & Realtime Database

---

## 3. Application Structure (MVVM Pattern)

The codebase is organized according to strict MVVM (Model-View-ViewModel) guidelines:

```text
src/
├── app/                        # App Router Pages (Next.js 15)
│   ├── page.tsx                # Home Search Page Page Link
│   ├── movies/[id]/page.tsx    # Movie Detail Page Link
│   ├── favourites/page.tsx     # Favourites Page Link
│   ├── login/page.tsx          # Login Page Link
│   ├── register/page.tsx       # Register Page Link
│   ├── globals.css            # Tailwind Imports & Colors
│   └── layout.tsx             # Root layout with Header Navigation
├── components/
│   └── common/
│       └── Header.tsx          # Responsive navbar with user profile & watchlist counters
├── features/                   # Feature Folders (MVVM)
│   ├── home/
│   │   ├── HomeModel.ts        # Input validation logic
│   │   ├── useHomeViewModel.ts # State, pagination, and filter actions hook
│   │   └── HomeView.tsx        # Search interface view
│   ├── details/
│   │   ├── MovieDetailModel.ts # IMDb ID validation logic
│   │   ├── useMovieDetailViewModel.ts # Details query loader hook
│   │   └── MovieDetailView.tsx # Movie profile detail panel view
│   ├── favourites/
│   │   ├── FavoritesContext.tsx # Context Provider sharing favorites state
│   │   └── FavouritesView.tsx  # Watchlist grid view
│   └── auth/
│       ├── AuthModel.ts        # Credentials check logic
│       ├── useAuthViewModel.ts # Inputs and routing actions hook
│       └── AuthView.tsx        # Login & Register forms view
├── services/                   # Service Classes
│   ├── omdbMovieService.ts     # Communicates with OMDb API
│   └── firebaseService.ts      # Auth & Realtime Database communication
└── types/
    └── movie.ts                # TypeScript Interfaces
```

---

## 4. AI-Assisted Development & Manual Improvements

This application was developed using a closed-loop **PLAN → IMPLEMENT → REVIEW → TEST → IMPROVE** AI-assisted developer lifecycle. 

AI-generated code was critically reviewed and corrected manually to resolve bugs and compile warnings:
1. **Next.js 15 Async Params**: Resolved Next.js compile errors by refactoring dynamic route parameters in `movies/[id]/page.tsx` from synchronous `params.id` lookups to asynchronous Promise resolutions.
2. **Next.js API Prefixing**: Changed the OMDb API key prefix from Vite-centric `VITE_` to `NEXT_PUBLIC_` to satisfy Next.js client-side injection rules.
3. **Unconditional Firebase Boot Crashes**: Guarded `initializeApp()` inside `firebaseService.ts` to prevent runtime crashes if configuration environment keys are missing, routing operations to `localStorage` fallbacks automatically.
4. **Default OMDb Fallback Key**: Configured a default API key in the service file to allow search features to work out-of-the-box for anyone reviewing the repository.

For complete development details, view:
* [PROJECT_SPEC.md](PROJECT_SPEC.md)
* [AI_DEVELOPMENT_LOG.md](AI_DEVELOPMENT_LOG.md)
* [AI_MISTAKES.md](AI_MISTAKES.md)
* [TESTING.md](TESTING.md)
* [SUBMISSION.md](SUBMISSION.md)

---

## 5. Running Locally

### Installation
Clone the repository and install the dependencies:
```bash
# Clone the repository
git clone https://github.com/your-username/frontend-ai-capstone.git

# Navigate to the workspace
cd frontend-ai-capstone

# Install packages
npm install
```

### Running the Project
Launch the local development server:
```bash
# Run local dev server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

---

## 6. Build
Verify the production build:
```bash
# Build production bundle
npm run build
```