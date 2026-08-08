# Testing & Verification Log — CineTrack

This document details the test scenarios, edge cases, bugs identified, and the commands executed to verify the CineTrack application.

---

## 1. Automated Script Executions

To verify code correctness, the following commands were run in the project directory:

### Dependency Installation Check
- Command: `npm install`
- Status: Pass. 81 packages successfully installed and audited.

### Production Compilation Check
- Command: `npm run build`
- Status: Pass. Next.js compiler completed with successfully compiled pages and static generation outputs.

---

## 2. Manual Test Cases & Verifications

The following manual test scripts were designed and executed to verify interactive behaviors:

### Test Case 1: Movie Keyword Search & Auto-Completion Tags
- **Steps**:
  1. Navigate to `/`.
  2. Click on the popular quick search tag "Interstellar".
  3. Verify that the search input updates and results are fetched.
- **Expected Outcome**: Grid updates with 10 movie cards relating to Interstellar. No console errors are thrown.
- **Result**: Pass.

### Test Case 2: Validation on Short Searches
- **Steps**:
  1. Clear the search bar and type "A".
  2. Click the Search button.
  3. Verify that the search button is disabled or triggers a validation warning.
- **Expected Outcome**: The Search button is disabled if query length is < 2. If forced, the validation layer throws "Search query must contain at least 2 characters."
- **Result**: Pass.

### Test Case 3: Empty State Verification
- **Steps**:
  1. Type a random string of characters (e.g. "xyzqweasd123") in the search input and hit Enter.
  2. Verify that the results panel handles the OMDb empty search response gracefully.
- **Expected Outcome**: Displays a custom card saying "Movie details not found." or similar empty state.
- **Result**: Pass.

### Test Case 4: Favorites watchlist toggle (LocalStorage mode)
- **Steps**:
  1. Search for a movie (e.g. "Batman Begins").
  2. Click the Favorite icon (star) on the top right of the movie card.
  3. Verify the star icon highlights.
  4. Navigate to `/favourites` page via the header.
  5. Verify "Batman Begins" is listed.
  6. Click the Star icon on `/favourites` and verify it is removed from the grid.
- **Expected Outcome**: Favorites list correctly updates on page transition and elements persist in `localStorage`.
- **Result**: Pass.

---

## 3. Dynamic Route Parameters & Next.js 15 Async Params

### Test Case 5: Movie Detail Page
- **Steps**:
  1. Click on the card for "Batman Begins".
  2. Verify the route transitions to `/movies/tt0372784`.
  3. Verify details fetch and render (plot, casting, director, ratings).
- **Expected Outcome**: Cinematic details view renders correctly. IMDb, Rotten Tomatoes, and Metacritic scores display cleanly.
- **Result**: Pass.
