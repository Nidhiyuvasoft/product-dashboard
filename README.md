# Product Dashboard (React + Redux Toolkit + Tailwind + Vitest)

A responsive product dashboard that fetches data from the Fake Store API and supports search (debounced), category filter, price sorting, product details, and favorites. The app uses Redux Toolkit for state, React Router for navigation, Tailwind CSS v4 for styling, and Vitest + Testing Library for tests.

## Features
- Product listing grid with responsive layout
- Search by title (300ms debounce)
- Filter by category and sort by price (asc/desc)
- Product detail page with add-to-favorites
- Favorites page to review and remove items (persisted in `localStorage`)
- Unit tests (slices, thunk) and integration tests (UI flows)

## Tech Stack
- React 19, React Router
- Redux Toolkit (RTK) with async thunk
- Tailwind CSS v4 (`@tailwindcss/postcss` + `@import "tailwindcss"`)
- Vite 7, Vitest, Testing Library, jsdom

## Getting Started
1. Install dependencies
```bash
npm install
```
2. Run dev server
```bash
npm run dev
```
3. Build for production
```bash
npm run build && npm run preview
```

## Testing
Run the test suite:
```bash
npm run test
```
Run with UI:
```bash
npm run test:ui
```
Generate coverage report:
```bash
npm run coverage
```
Coverage output is written to `coverage/`.

## Deployment
The app is Vercel/Netlify friendly.
- Build command: `npm run build`
- Output directory: `dist`

## Notes
- API: `https://fakestoreapi.com`
- Styling: Tailwind v4. Global index uses `@import "tailwindcss"` and PostCSS plugin `@tailwindcss/postcss`.
- Favorites are persisted in `localStorage` by the favorites slice.
