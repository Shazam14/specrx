# specrx (static site)

Vite wraps the existing `index.html` so you can use `npm run dev` like other projects.

## Commands

```bash
cd specrx
npm install
npm run dev      # local preview with hot reload
npm run build    # output in dist/
npm run preview  # serve production build locally
```

## Environment variables

**You do not need a `.env` file** for this site as it is today (plain HTML + client JS, no build-time secrets).

Add a `.env` later only if you introduce things like:

- Form endpoint URL or API key (Formspree, Web3Forms, custom API)
- Turnstile / reCAPTCHA site keys injected at build time
- Any other secret that must not be committed

Vite exposes only variables prefixed with `VITE_` to browser code. Never put private server secrets in `VITE_*`.

## Static files

`robots.txt` and `sitemap.xml` live in `public/` so they are copied to `dist/` on build.
