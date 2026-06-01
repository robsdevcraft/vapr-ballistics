# 0002 — Migrate js-client to TanStack Start

- **Status:** Ready
- **Phase:** 1
- **Owner:** agent
- **Depends on:** 0001

## Problem / why

The app is on Next.js, which couples deployment to a heavier model and a fiddly
self-host story. We want a vendor-neutral, deploy-anywhere stack (TanStack Start + Nitro)
before adding any DB/auth code, so we don't build those features twice.

## Goal / outcome

`@vapr/js-client` runs on **TanStack Start** with **feature parity** to today's
calculator: same inputs, same charts (drop/windage/velocity), same data table + CSV
export, light/dark theme. It is fully client-side, works offline, and builds to a Nitro
output runnable with `node .output/server/index.mjs`. The big calculator component is
split into smaller pieces along the way.

## In scope

- Scaffold TanStack Start: `vite.config.ts` with `tanstackStart()`, `nitro()`,
  `viteReact()`, `@tailwindcss/vite`, `vite-tsconfig-paths`.
- File-based routing: `src/routes/__root.tsx` (head/meta, theme, Toaster, `portal-root`)
  and `src/routes/index.tsx` (the calculator).
- **Port `lib/ballistics.ts` and `hooks/useBallisticsCalculator.ts` verbatim** (pure TS).
- Port shadcn/ui primitives; set `components.json` `rsc: false`.
- Replace `next-themes` with a small theme provider; replace `next/font` (Geist) with a
  CSS/Fontsource equivalent.
- Tailwind v4 entry at `src/styles/app.css` (`@import "tailwindcss"`).
- **Decompose** `BallisticsCalculator.tsx` into `components/calculator/*`.
- Add Vitest + first tests for `lib/ballistics.ts` (validate + a known calculation).
- Add `lint` (non-Next ESLint config), `typecheck` (`tsc --noEmit`), `test`, `build`,
  `dev` scripts. Wire CI for js-client.
- **Pin** `@tanstack/react-start`, `@tanstack/react-router`, `nitro` to exact versions.
- Update `apps/js-client/README.md` and `AGENTS.md` "current status" to reflect Start.
- Add `.env.example` (`VITE_APP_URL`, placeholders for Turso/better-auth — used later).

## Out of scope

- Persistence, DB, auth, sync, share links (Phases 2-6).
- Docker (Phase 7) — leave the annotated boilerplate as-is.

## Acceptance criteria

- [ ] `pnpm --filter @vapr/js-client dev` serves the calculator with full feature parity.
- [ ] Drop, windage, and velocity charts render; data table + CSV export work; theme
      toggle works.
- [ ] `lib/ballistics.ts` is unchanged in behavior; Vitest covers validate + one
      reference trajectory.
- [ ] `lint`, `typecheck`, `test`, `build` all pass; `build` produces a Nitro `.output/`.
- [ ] No `next`, `next-themes`, or `eslint-config-next` remain in the app's dependencies.
- [ ] Start/Router/Nitro versions are pinned (no `^`/`~`).
- [ ] `BallisticsCalculator.tsx` is split into multiple files under `components/calculator/`.

## Technical notes & file pointers

- Official guides (also in `apps/js-client/AGENTS.md`):
  - shadcn + Start: https://ui.shadcn.com/docs/installation/tanstack
  - Tailwind v4 + Start: https://tailwindcss.com/docs/installation/framework-guides/tanstack-start
  - Hosting/Nitro: https://tanstack.com/start/latest/docs/framework/react/guide/hosting
- Current logic to preserve: `src/lib/ballistics.ts`, `src/hooks/useBallisticsCalculator.ts`,
  `src/components/BallisticsCalculator.tsx`.
- Add a `portal-root` div in `__root.tsx` so Dialog/Sheet overlays animate correctly.

## Verification

```bash
pnpm --filter @vapr/js-client test
pnpm --filter @vapr/js-client build
node apps/js-client/.output/server/index.mjs   # smoke test the Nitro output
```

Manually: load `/`, run a calculation, switch tabs, export CSV, toggle theme.
