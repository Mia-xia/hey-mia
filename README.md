# hey-mia

Personal website of Mia Xia: writing, photos, moments, and contact links.

Built with Next.js, React, TypeScript, and Tailwind CSS v4. Supports light/dark mode.

## Sections and Routes

- **Home (`/`)** — intro, latest notes, featured moments, and contact
- **Notes (`/notes`)** — MDX article index with cover media, likes, and read counts
- **Article (`/notes/[slug]`)** — MDX article pages with inline photos, videos, and Live Photo-style embeds
- **Moments (`/moments`)** — gallery for still photos and visual fragments
- **Contact** — links to email, LinkedIn, Twitter/X, and Jike

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [next-themes](https://github.com/pacocoursey/next-themes) for dark mode
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) and [gray-matter](https://github.com/jonschlinkert/gray-matter) for local MDX articles
- TypeScript

## Writing and Media

Articles live in `content/articles/*.mdx`. Each article has frontmatter:

```md
---
title: "Article title"
date: "2026-06-15"
excerpt: "Short summary"
tags:
  - Writing
cover: "/media/covers/example.svg"
coverAlt: "Cover description"
language: "mixed"
media:
  - quiet-window
---
```

Supported MDX media components:

- `<MediaImage src="/media/moments/photo.jpg" alt="..." caption="..." />`
- `<MediaVideo src="/media/videos/clip.mp4" poster="/media/moments/poster.jpg" caption="..." />`
- `<LivePhoto poster="/media/live/item.jpg" video="/media/live/item.mp4" alt="..." caption="..." />`

Static media should live under `public/media/`. For Live Photo-style media, export a still poster plus a short video and reference both paths.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

## Deploy (Vercel + heymiax.com)

1. Push code to `main`:

```bash
git add .
git commit -m "prepare production deploy"
git push origin main
```

2. Import this repo in [Vercel](https://vercel.com/new) and deploy.
3. Add domain `heymiax.com` in Project Settings -> Domains.
4. At your DNS provider, add the records Vercel shows for:
   - Apex/root domain: `heymiax.com`
   - Optional subdomain: `www.heymiax.com`
5. Wait for Vercel domain status to become `Valid`.

After this, every push to `main` auto-deploys.

## Analytics

GA4 is optional and controlled by an environment variable. Create a GA4 web data stream, copy the measurement ID, then set this in Vercel:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

If the variable is absent, no Google Analytics scripts are loaded. The implementation uses Google tag / `gtag.js` through Next.js `next/script`, and tracks page views across App Router navigations.

## Production Checklist

- `metadataBase`, canonical, Open Graph, and Twitter metadata configured.
- Dynamic `robots.txt` and `sitemap.xml` configured.
- Browser icons configured through `app/icon.png`, `app/apple-icon.png`, and explicit metadata.
- Basic security headers configured in `next.config.ts`.

## Article Stats API

Article likes and read counts use the same Vercel KV REST style as the email tracking API.

### Routes

- `GET /api/articles/<slug>/stats`
  - Returns `{ "likes": number, "views": number }`
- `POST /api/articles/<slug>/like`
  - Increments likes by 1 on every click
- `POST /api/articles/<slug>/view`
  - Increments views by 1 on every article page open

### Storage

- Preferred (persistent): Vercel KV REST API
  - `KV_REST_API_URL`
  - `KV_REST_API_TOKEN`
- Fallback (local/dev): `data/article-stats.json`

### Local Verification

```bash
curl -s "http://localhost:3000/api/articles/first-note/stats"
curl -s -X POST "http://localhost:3000/api/articles/first-note/like"
curl -s -X POST "http://localhost:3000/api/articles/first-note/view"
```

## Email Tracking API

This project includes a minimal tracking service for email marketing events.

### Routes

- `GET /track/open?id=<scholar_id>&ts=<timestamp>`
  - Stores an `opened` event
  - Returns a 1x1 transparent GIF
- `GET /track/click?id=<scholar_id>&target=<url>`
  - Stores a `clicked` event
  - Redirects (`302`) to `target`
- `POST /track/sent` (reserved for sender-side integration)
  - Stores a `sent` event
  - Body: `{ "id": "...", "sent_at": "...", "template_id": "..." }`

### Storage

- Preferred (persistent): Vercel KV REST API
  - `KV_REST_API_URL`
  - `KV_REST_API_TOKEN`
- Fallback (local/dev): `data/tracking-events.jsonl`

When KV is configured, events are written to:
- `tracking:events:all`
- `tracking:events:opened`
- `tracking:events:clicked`
- `tracking:events:sent`

### Optional Security Env

- `TRACKING_ALLOWED_HOSTS` (default: `www.bohrium.com`)
  - Comma-separated allowlist for `/track/click` target hostnames
- `TRACKING_ENFORCE_ALLOWED_HOSTS` (default: `true`)
  - Set `false` to disable hostname allowlist enforcement

### Local Verification

```bash
# Open event (returns GIF bytes)
curl -i "http://localhost:3000/track/open?id=2u3v734g&ts=1710000000"

# Click event (returns 302 redirect)
curl -i "http://localhost:3000/track/click?id=2u3v734g&target=https%3A%2F%2Fwww.bohrium.com%2Fscholar%2F2u3v734g"

# Sent event (optional sender hook)
curl -i -X POST "http://localhost:3000/track/sent" \
  -H "Content-Type: application/json" \
  -d '{"id":"2u3v734g","template_id":"bohrium-scholar-v1"}'
```

If KV is not configured, inspect local events:

```bash
cat data/tracking-events.jsonl
```
