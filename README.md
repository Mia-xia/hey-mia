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
