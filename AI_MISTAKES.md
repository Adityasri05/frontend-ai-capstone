# AI Mistakes Log — CineTrack

This document details the genuine technical errors and incorrect assumptions made by the AI development assistant during the building of CineTrack, along with the engineering corrections applied.

---

## 1. Mistake: Environment Variable Mismatch (`VITE_` vs `NEXT_PUBLIC_`)

### Mistake
The AI proposed reading the OMDb API key from `VITE_OMDB_API_KEY` inside `omdbMovieService.ts`.

### Why It Was Wrong
This project is built using **Next.js 15 (App Router)**, not Vite. Vite loads variables prefixed with `VITE_`, whereas Next.js requires environment variables visible on the client side to be prefixed with `NEXT_PUBLIC_`. As a result, the application was reading `undefined`, causing all movie searches to fail with authentication errors.

### My Fix
I manually modified the key retrieval function to look up `process.env.NEXT_PUBLIC_OMDB_API_KEY`. I also added a fallback parameter to use a demo key (`849d44e5`) so the application is functional immediately upon checkout.

### Lesson
AI models frequently default to generic or context-blind environment conventions. Always verify the hosting framework's prefix rules (e.g. `NEXT_PUBLIC_` for Next.js, `VITE_` for Vite, `REACT_APP_` for CRA).

---

## 2. Mistake: Unconditional Firebase Initialization

### Mistake
The AI generated code to initialize Firebase directly on file loading by calling `initializeApp(firebaseConfig)`.

### Why It Was Wrong
If the developer has not yet configured the Firebase env values (which is common during initial local setup or pipeline evaluation), calling `initializeApp()` with undefined parameters throws a blocking runtime exception. This crashed the entire application immediately on page load, even if the user only wanted to search movies locally.

### My Fix
I wrapped the initialization in a check `isFirebaseConfigured()`. If keys are missing, the service skips initialization and automatically routes database operations to a `localStorage` fallback layer, preserving application functionality.

### Lesson
Never assume external cloud configuration variables are present at runtime. Always code a graceful fallback strategy or validation gate to prevent boot crashes.

---

## 3. Mistake: Synchronous Next.js 15 Param Access

### Mistake
Inside the dynamic route `src/app/movies/[id]/page.tsx`, the AI accessed the route parameters directly as `params.id` synchronously.

### Why It Was Wrong
In **Next.js 15**, the `params` prop in page files is an asynchronous Promise. Accessing properties on it synchronously throws a compilation error: `Property 'id' does not exist on type 'Promise<{ id: string }>'.`

### My Fix
I modified the Page component signature to treat `params` as a Promise and resolved it asynchronously:
```typescript
export default async function MovieDetailPage({ params }: MoviePageProps) {
  const resolvedParams = await params;
  return <MovieDetailView imdbID={resolvedParams.id} />;
}
```

### Lesson
Next.js 15 introduced significant changes to parameters resolution. AI models trained on older Next.js 13/14 versions will consistently write synchronous params access that breaks compilation.
