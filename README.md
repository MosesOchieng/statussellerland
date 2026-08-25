# StatusSeller

StatusSeller is a polished, product-led landing page for a social-commerce
platform that turns everyday status posts into shoppable conversations,
payments, and trackable orders.

## What is included

- Responsive React + Vite landing page
- Interactive product journey: product popup, chat and negotiation, payment,
  and order tracking
- App walkthrough using the supplied product screenshots
- Seller dashboard preview and conversion-focused messaging
- Starter, Growth, and Pro pricing comparison
- Monthly/annual billing toggle
- Currency switcher for KES, USD, NGN, and ZAR
- Google Forms waitlist CTAs
- Render Static Site configuration

## Run locally

From the repository root:

```bash
pnpm install
PORT=22755 BASE_PATH=/ pnpm --filter @workspace/statusseller-site run dev
```

The normal Replit workflow supplies `PORT` and `BASE_PATH` automatically:

```bash
pnpm --filter @workspace/statusseller-site run dev
```

## Verify a production build

```bash
pnpm --filter @workspace/statusseller-site run typecheck
PORT=10000 BASE_PATH=/ pnpm --filter @workspace/statusseller-site run build
```

The generated static files are written to:

```text
artifacts/statusseller-site/dist/public
```

## Deploy to Render

This is a frontend-only static site. Use the included `render.yaml` as a
Blueprint, or create a Render Static Site with:

- Build command:
  `pnpm install --frozen-lockfile && BASE_PATH=/ PORT=10000 pnpm --filter @workspace/statusseller-site run build`
- Publish directory: `artifacts/statusseller-site/dist/public`

See [RENDER.md](./RENDER.md) for the Base URL guidance and manual setup steps.

## Project structure

- `artifacts/statusseller-site/src/App.tsx` — landing page and interactions
- `artifacts/statusseller-site/src/index.css` — visual system and responsive layout
- `artifacts/statusseller-site/src/assets/` — brand and commerce imagery
- `render.yaml` — Render Static Site definition