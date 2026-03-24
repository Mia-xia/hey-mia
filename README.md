# hey-mia

Personal website of Mia Xia.

Built with Next.js, React, TypeScript, and Tailwind CSS v4. Supports light/dark mode.

## Sections

- **Hero** — intro, CTAs, and collapsible bio
- **Projects** — selected projects (including Apple News Agent)
- **Experience** — interactive accordion timeline
- **Blog** — concise writing cards
- **Contact** — links to email, LinkedIn, and Twitter/X

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [next-themes](https://github.com/pacocoursey/next-themes) for dark mode
- TypeScript

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

## Production Checklist

- `metadataBase`, canonical, Open Graph, and Twitter metadata configured.
- Dynamic `robots.txt` and `sitemap.xml` configured.
- Open Graph share image routes configured:
  - `/opengraph-image`
  - `/twitter-image`
- Basic security headers configured in `next.config.ts`.

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
