# Wuyah — Daily Mental Fitness

Landing page built with **Vite + React + Tailwind CSS**.

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (http://localhost:5173)
npm run dev

# 3. Production build → dist/
npm run build

# 4. Preview production build locally
npm run preview
```

## Project structure

```
wuyah/
├── public/
│   └── favicon.svg
├── src/
│   ├── index.css       # Tailwind directives + global styles
│   ├── main.jsx        # React root mount
│   └── Wuyah.jsx       # Full single-page component
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Tech stack

| Tool | Version | Purpose |
|------|---------|---------|
| Vite | 5.x | Dev server & bundler |
| React | 18.x | UI framework |
| Tailwind CSS | 3.x | Utility-first styling |
| PostCSS + Autoprefixer | 8.x / 10.x | CSS processing |

## Deployment

The `dist/` folder after `npm run build` is a fully static site — drop it into:

- **Vercel** → `vercel deploy`
- **Netlify** → drag & drop `dist/`
- **GitHub Pages** → push `dist/` to `gh-pages` branch
- **Any static host** (Cloudflare Pages, Render, S3, etc.)

## Fonts

Poppins (display/headings) and DM Sans (body) are loaded from Google Fonts via `index.html`. No local font files needed.

## Branding

- **Palette:** Sky `#5BB8D4` · Rose `#E07A96` · Orange `#E0733E` · Ink `#18182A`
- **Gradient:** Sunrise `172deg` — `#C2E8F6` → `#D98744`
- **Glass:** `rgba(255,255,255,0.56)` + `backdrop-filter: blur(20px)`
