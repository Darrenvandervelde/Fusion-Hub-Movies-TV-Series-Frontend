# Fusion Hub — Movies & TV Series Frontend

A modern movie and TV series browsing platform inspired by popular streaming services. Built with **React + Vite**.

## Features (current)

- Clean dark theme UI
- Login screen (mock auth)
- Home page with Hero banner
- Horizontal scrolling rows (Trending, Popular Movies, Popular TV, Top Rated)
- Data driven by local **JSON** files (easy to develop and later replace with API)
- Settings stored in JSON

## Tech Stack

- React 19
- Vite 8
- React Router DOM 7
- CSS (no heavy UI library yet)

## Project Structure

```
src/
├── components/     # Reusable UI pieces (Navbar, Hero, MovieCard, MovieRow, Login)
├── pages/          # Route-level pages (Home)
├── data/           # JSON data + settings
│   ├── media.json
│   └── settings.json
├── App.jsx
├── App.css
└── main.jsx
```

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

- Go to `/` → Login (any username + password works for now)
- After login you land on `/home`

## Branch Workflow

We develop features on dedicated branches:

- `feature/setup-and-home` ← current work
- Future: `feature/auth-flow`, `feature/search`, `feature/detail-page`, etc.

Then open a Pull Request and merge into `main`.

## Next Steps

1. Search & filter
2. Detail page for each title
3. Watchlist / My List (localStorage or API)
4. Real authentication + backend connection
5. TMDB API integration (optional)

## License

See LICENSE.txt
