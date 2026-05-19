# bilawalsami.vercel.app

Personal site for Bilawal Ullah Sami. Brutalist-cyberpunk dev energy, an
interactive Gemini-powered macro estimator, zero "AI personal site" clichés.

Full spec lives in [docs/PRD.md](docs/PRD.md).

## Two branches

This repo ships in two flavours so the deploy can go out today without
waiting on media.

| Branch | Purpose | What's different |
|---|---|---|
| `main` | **Ship now.** Recruiter-ready, no `ASSET PENDING` placeholders. Auto-deploys to Vercel. | Featured Work chapters render prose + stats + the working Tally demo + live links. No screenshot carousels, no demo reels, no pending-audio tags. |
| `feat/full-media` | **Make it better.** All the carousels, reels, audio toggle, AriseCode chip player. Currently shows `ASSET PENDING` placeholders for anything not yet in `/public`. | Everything from the PRD. Park here while you film reels and export screenshots. |

When the media in [`public/ASSETS.md`](public/ASSETS.md) lands, flip the
relevant `status` flags in [`lib/assets.ts`](lib/assets.ts) on
`feat/full-media`, then merge it into `main` to swap the deploy to the full
version.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript strict
- Tailwind CSS v4 with CSS-first `@theme` palette
- Motion v12 (formerly Framer Motion) + Lenis smooth scroll
- `@google/generative-ai` (Gemini Flash) for the Tally demo
- `@upstash/ratelimit` for the demo route
- `embla-carousel-react` (only on `feat/full-media`)

## Running it

```bash
pnpm install
pnpm dev        # http://localhost:3000 — slow, HMR overhead
pnpm build      # production build
pnpm start      # production server — what the deploy actually feels like
```

## Env (all server-side, all optional)

```
GEMINI_API_KEY=                  # gemini flash for /api/tally-demo
UPSTASH_REDIS_REST_URL=          # rate limit
UPSTASH_REDIS_REST_TOKEN=
GITHUB_TOKEN=                    # contributions strip (read scope)
NEXT_PUBLIC_HERO_MODE=ascii      # ascii | webgl (only ascii implemented)
```

Without keys: the Tally demo falls back to a keyword-aware stub estimator
and the GitHub strip renders a "pending token" caption — both fail
gracefully so the site still ships.

## Easter eggs

- ⌘K — command palette (jump, copy email, open CV, open GitHub)
- Type your name on the keyboard while the hero is visible — third line swaps
- ↑ ↑ ↓ ↓ ← → ← → B A — Konami sequence flips the hero accent for 8 seconds

## Built by

Bilawal Ullah Sami, in Manchester, with Next.js and a lot of Lenis.
No analytics. No cookies. No tracking.
