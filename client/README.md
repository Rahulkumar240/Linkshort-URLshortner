# Linkly URL Shortener — React frontend

A responsive React + Vite frontend starter for your URL shortener.

## Included
- Landing page with URL creation form
- Login and registration pages (demo auth flow)
- Protected app routes
- Dashboard, links manager, analytics, settings, and 404 pages
- Reusable sidebar, topbar, URL form, link table, stat cards, copy button
- Local demo data persisted in localStorage
- CSV export for the links page
- Responsive CSS and chart visualizations

## Run it
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

If you extracted this package elsewhere, run commands from this folder's root (the folder containing `package.json`).

## Important: demo mode
Authentication and link creation currently use browser localStorage so you can build and test the UI before connecting your backend. Do not treat this as production authentication or persistence.

## Backend integration
Set:
```env
VITE_API_URL=http://localhost:5000/api
VITE_PUBLIC_URL=http://localhost:5000
```
Update `src/context/AuthContext.jsx`, `src/context/LinksContext.jsx`, and `src/services/api.js` to call your actual Express routes. The current frontend does not assume your backend route names because the server code has not been inspected.

## Suggested API contract
- `POST /api/auth/register` — `{ name, email, password }`
- `POST /api/auth/login` — `{ email, password }`
- `POST /api/url` — `{ originalUrl, customAlias? }`
- `GET /api/url/my-links` — current user's links
- `GET /api/url/analytics` — analytics summary
- `DELETE /api/url/:id` — delete link
- `PATCH /api/url/:id/status` — pause/activate link
- `GET /:shortCode` — redirect endpoint (usually outside `/api`)

Adjust the frontend service calls to match your real backend.

## Notes
- Analytics currently includes clearly illustrative sample chart data.
- The demo URL preview uses `VITE_PUBLIC_URL` or the current site origin. Configure it to your actual backend host.
- A short link created in demo mode will not redirect until the backend route is connected.
