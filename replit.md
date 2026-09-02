# StatusSeller

StatusSeller is a product-led landing page showing how social posts become shoppable conversations, payments, and managed orders.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/statusseller-site run dev` — run the landing page (workflow supplies `PORT` and `BASE_PATH`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Landing page: React + Vite + Tailwind CSS + Framer Motion

## Where things live

- `artifacts/statusseller-site/src/App.tsx` — single-page StatusSeller marketing experience
- `artifacts/statusseller-site/src/index.css` — site theme, responsive styles, motion, and visual tokens
- `artifacts/statusseller-site/src/assets/` — copied brand and commerce imagery
- `render.yaml` / `RENDER.md` — Render Static Site configuration and Base URL guidance

## Architecture decisions

- The first version is frontend-only; the API server remains available for future product flows but is not required by the landing page.
- Render deployment uses a Static Site with the Vite output directory, so there is no runtime server to configure.
- The hero demonstrates the full product promise in place: social post, shop popup, chat, payment, and order tracking.

## Product

The page explains StatusSeller's social-commerce workflow across Facebook, Instagram, TikTok, and X, shows an interactive shopping demo, presents seller-side dashboard concepts, includes seller imagery and the 14-day Trial/Seller/Pro Seller pricing journey with included AI credits and KES/USD/NGN/ZAR switching, opens a demo modal, and captures waitlist/CTA intent with inline feedback. The pricing model is SaaS plus metered AI credits; sellers keep 100% of their sales. Trial messaging makes the card-required anti-spam safeguard explicit.

The landing page intentionally uses compact responsive spacing so the hero, product journey, and conversion story are easier to scan without excessive scrolling.

## User preferences

The user wants the landing page to feel fancy, product-led, and easy to deploy on Render.

## Gotchas

- Vite's config requires `PORT` and `BASE_PATH`; Render's build command sets both explicitly.
- The production Base URL is the deployed Render hostname (for example `https://statusseller-site.onrender.com`), not the Replit preview URL or `/api`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
