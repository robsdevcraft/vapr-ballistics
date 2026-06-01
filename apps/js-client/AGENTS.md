# AGENTS.md — `@vapr/js-client`

The **active** app and your default place to work. A ballistics calculator that is
evolving into a **hybrid offline-first app with optional accounts**.

## Current status (read this)

> **Mid-migration.** This app is currently a **Next.js 16** app and is being migrated to
> **TanStack Start** in Phase 1 (`docs/specs/0002-*`). Until that spec is done, the live
> code is still Next.js. This file describes the **target** stack; when Phase 1 lands,
> update the "currently Next.js" caveats below.

## What it is

- A client-side ballistics calculator built on
  [`js-ballistics`](https://www.npmjs.com/package/js-ballistics). Calculations run **in the
  browser** and must keep working **offline**.
- Optional accounts (post Phase 4) let users sync saved data to Turso. Anonymous users
  always get full functionality, stored locally.

## Target tech stack

- **Framework:** TanStack Start (Vite + Nitro + TanStack Router), React 19
- **Styling/UI:** Tailwind CSS v4 (`@tailwindcss/vite`) + shadcn/ui
- **Forms/validation:** react-hook-form + zod
- **Charts:** Recharts · **Icons:** lucide-react · **Toasts:** sonner
- **Ballistics:** `js-ballistics` (pure TS — keep framework-agnostic)
- **DB/ORM:** Turso (libSQL) + Drizzle (`drizzle-orm/libsql`, `drizzle-kit`)
- **Auth:** better-auth (`tanstackStartCookies`, Drizzle `sqlite` adapter)
- **Local store:** Dexie (IndexedDB) · **Server state:** TanStack Query
- **Tests:** Vitest (+ @testing-library/react, jsdom)

## Architecture & where things live (target)

```
src/
  router.tsx                 # router instance
  routes/
    __root.tsx               # root layout: head/meta, theme, Toaster, portal-root
    index.tsx                # home -> calculator
    api/auth/$.ts            # better-auth handler
    s/$slug.tsx              # public share view
  lib/
    ballistics.ts            # core engine wrapper (PURE TS — do not couple to framework)
    auth/{auth.ts,client.ts} # better-auth server + react client
    db/{index.ts,schema.ts}  # drizzle + libsql client + tables
    storage/{local.ts,sync.ts,types.ts}  # IndexedDB (Dexie) + sync
    server/                  # createServerFn functions (profiles, calculations, settings, shares)
  components/
    ui/                      # shadcn primitives
    calculator/              # the calculator, split into small components
    auth/  profiles/         # feature UI
    theme-provider.tsx       # replaces next-themes
  hooks/                     # useBallisticsCalculator, useProfiles, useCalculations, useSettings
  styles/app.css             # Tailwind v4 entry: @import "tailwindcss"
```

## Local-first + sync rules (non-negotiable)

- Calculations **never** require the network. Never gate the calculator behind auth.
- Anonymous users persist to **IndexedDB** (Dexie). Logged-in users write locally first,
  then sync to Turso.
- IDs are generated client-side with `crypto.randomUUID()` so local and remote rows match.
- Sync is **last-write-wins** on `updatedAt` (keep it simple).
- **All DB access goes through server functions / `routes/api/*`.** Never import the db
  client or read `TURSO_*` / `BETTER_AUTH_SECRET` in client components.

## Environment

Copy `.env.example` to `.env`. Vite exposes **only `VITE_`-prefixed** vars to the browser;
everything else is server-only.

```
TURSO_DATABASE_URL=        # server-only
TURSO_AUTH_TOKEN=          # server-only
BETTER_AUTH_SECRET=        # server-only
BETTER_AUTH_URL=http://localhost:3000
VITE_APP_URL=http://localhost:3000   # public
```

## Commands

```bash
pnpm --filter @vapr/js-client dev
pnpm --filter @vapr/js-client build       # vite build -> Nitro output (.output/)
pnpm --filter @vapr/js-client lint
pnpm --filter @vapr/js-client typecheck
pnpm --filter @vapr/js-client test
```

## TanStack Start grounding (important — Start is pre-1.0)

- **Pin exact versions** of `@tanstack/react-start`, `@tanstack/react-router`, and
  `nitro`. Do **not** auto-upgrade; breaking changes happen between releases.
- Prefer **official patterns**. Reference docs:
  - Hosting/deploy: https://tanstack.com/start/latest/docs/framework/react/guide/hosting
  - better-auth + Start: https://better-auth.com/docs/integrations/tanstack
  - Drizzle + Turso: https://orm.drizzle.team/docs/get-started/turso-new
  - shadcn + Start: https://ui.shadcn.com/docs/installation/tanstack
- Keep `lib/ballistics.ts` pure/framework-agnostic so a future framework change is cheap.
- shadcn overlays (Dialog/Sheet) need a `portal-root` div in `__root.tsx` to animate
  correctly with TanStack Router.

## Docker

`Dockerfile` and `Dockerfile.dev` are **non-functional WIP boilerplate** — ignore them
until **Phase 7** (deploy hardening), where they'll be regenerated from a Nitro
`node-server` preset. Do not rely on them for builds.

## Definition of Done

```bash
pnpm --filter @vapr/js-client lint
pnpm --filter @vapr/js-client typecheck
pnpm --filter @vapr/js-client test
pnpm --filter @vapr/js-client build
```
