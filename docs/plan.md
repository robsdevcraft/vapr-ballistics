# VAPR Ballistics — Agentic Workflow & js-client Roadmap

> A plan to (1) make this repo easy to drive with coding agents one small task at a
> time, and (2) rebuild `apps/js-client` on **TanStack Start** as a
> **hybrid offline-first app with optional accounts** (Turso + better-auth).

## 1. Goal

Turn this repo into a place where you can hand an agent **one small, well-described
task at a time** and trust it to execute and self-verify — while migrating `js-client`
to a vendor-neutral, deploy-anywhere stack and growing it to save loadouts,
calculations, settings, and share links.

Two parallel tracks:

- **Track A — Workflow foundation** (do first): give agents persistent context, a
  requirements system, and a verification loop.
- **Track B — Features**: migrate to TanStack Start, then ship Turso, auth, and the four
  data features in small phases.

## 2. Decisions locked in

| Decision        | Choice                                                                       |
| --------------- | ---------------------------------------------------------------------------- |
| Framework       | **TanStack Start** (Vite + Nitro + TanStack Router) — pin pre-1.0 deps exactly |
| Architecture    | Hybrid: calculations stay client-side/offline; login is optional + syncs     |
| Auth            | better-auth (`tanstackStartCookies`, Drizzle `sqlite` adapter)               |
| Database        | Turso (libSQL) via Drizzle ORM                                               |
| Deploy          | Nitro `node-server` -> Docker, **deferred to final phase (Phase 7)**          |
| Persist         | Loadout profiles, saved calculations/DOPE, settings sync, share links        |
| Workflow depth  | Full: AGENTS.md + `docs/specs/` + Vitest tests + typecheck + CI               |
| Scope           | `js-client` only; `fastapi-fullstack` and `landing-page` are frozen          |

> Why Start over Next: the "Next only deploys to Vercel" reputation is overstated (Next
> self-hosts via standalone/Docker), but Start's Nitro engine is genuinely adapter-less
> ("build once, deploy anywhere": node-server, bun, Docker, Cloudflare, Netlify, Railway,
> Vercel). The whole intended stack (better-auth, Drizzle+Turso, shadcn, Tailwind v4,
> Vitest) is first-class on Start, and migrating **now** — before any DB/auth code — is
> the cheapest it will ever be.

## 3. Target architecture (js-client)

TanStack Start is full-stack: the same app serves the client and a thin server layer
(server functions + `routes/api/*`), so no separate backend is needed.

```
Browser (offline-capable)                 Start server layer              Turso (libSQL)
- js-ballistics calc (unchanged)   <-->   createServerFn() functions  <-->  Drizzle ORM
- IndexedDB local store (Dexie)           routes/api/auth/$ (better-auth)   users + app data
- TanStack Query (sync/cache)             Nitro (H3) runtime
```

Rules that preserve the privacy-first story:

- Calculations **never** require the network. Anonymous users get full functionality,
  stored locally (IndexedDB).
- Turso/auth only engage **when a user opts to sign in**. Local-first writes, then sync.

## 4. The agentic workflow system (the core of this plan)

This is what fixes "hard to keep track and provide context step by step."

### 4a. `AGENTS.md` files (opencode reads these automatically)

- **`/AGENTS.md`** (root): monorepo map, the rule _"work only in `apps/js-client` unless
  told otherwise; treat the other two apps as frozen"_, package manager (pnpm), core
  commands, the Windows-primary + cross-platform-scripts convention, and the
  "Definition of Done."
- **`/apps/js-client/AGENTS.md`**: app architecture, where things live, how to add a
  feature, the local-first + sync rules, env vars, exact lint/typecheck/test/build
  commands, **a TanStack Start grounding block** (see 4e), and a note that the Docker
  files are non-functional boilerplate until Phase 7.
- **`/apps/fastapi-fullstack/AGENTS.md`** and **`/apps/landing-page/AGENTS.md`**: short
  "frozen / out of scope — do not modify unless explicitly asked" notes.

### 4b. `docs/specs/` — a requirements system you write to, agents read from

Kept under `docs/` to consolidate all documentation in one tree.

```
docs/specs/
  README.md        # how the workflow works
  TEMPLATE.md      # copy this for each new feature
  ROADMAP.md       # ordered backlog with status
  0001-...md       # one file per feature/task
```

Your loop becomes: **write/edit a spec -> tell the agent "implement docs/specs/0007-xyz.md"
-> agent codes + verifies -> you review.** Each spec is small enough to hand over whole,
which is exactly the "step by step context" missing today.

**`TEMPLATE.md` sections:** ID/Title/Status; Problem (why); Goal/Outcome; In scope /
Out of scope; Acceptance criteria (checklist); Technical notes & file pointers;
Dependencies (other specs); Verification (commands + manual steps).

### 4c. Definition of Done (in root AGENTS.md)

Every task must end with these passing, so agents self-verify:

```
pnpm --filter @vapr/js-client lint
pnpm --filter @vapr/js-client typecheck   # tsc --noEmit
pnpm --filter @vapr/js-client test        # Vitest
pnpm --filter @vapr/js-client build       # vite build (Nitro output)
```

### 4d. Verification loop (Full setup)

- **Vitest** is native to Vite/Start (zero-config) — a better agent feedback loop than
  Next. First tests cover the pure logic in `lib/ballistics.ts` (validate/calculate) and
  future `lib/storage` + `lib/db` helpers.
- Add a **`typecheck`** script (`tsc --noEmit`) + a Turbo `typecheck` task.
- **CI**: enable/fix `ci.yml` (lint + typecheck + test + build for js-client). Leave
  publish/release/docker workflows disabled until needed; delete the legacy
  `ci-cd.yml.disabled` (old layout).

### 4e. TanStack Start grounding block (mitigates pre-1.0 + agent-familiarity risk)

`apps/js-client/AGENTS.md` must tell agents:

- Start is **pre-1.0**: pin `@tanstack/react-start`, `@tanstack/react-router`, and
  `nitro` to exact versions; do not auto-upgrade.
- Prefer **official patterns**; reference docs:
  - Start hosting/deploy: https://tanstack.com/start/latest/docs/framework/react/guide/hosting
  - better-auth + Start: https://better-auth.com/docs/integrations/tanstack
  - Drizzle + Turso: https://orm.drizzle.team/docs/get-started/turso-new
  - shadcn + Start: https://ui.shadcn.com/docs/installation/tanstack
- Keep ballistics logic **framework-agnostic** (pure TS) so a future framework change
  stays cheap.

## 5. Repo cleanup checklist (so agents aren't confused by stale info)

- [ ] **Annotate** `apps/js-client/Dockerfile` + `Dockerfile.dev` as non-functional WIP
      boilerplate (header comment) and note in AGENTS.md — real Docker lands in Phase 7.
- [ ] Give `js-client` its **own non-Next ESLint config** (the shared `eslint.base.mjs`
      extends `next/*` and won't fit a Start app). The other two apps keep using the base.
- [ ] Fix root `README.md`: describe js-client as TanStack Start; remove the **duplicated
      "JS Client" section** (lines ~44-80); drop stale Next/static-export claims.
- [ ] Fix `apps/js-client/README.md`: TanStack Start stack, dev/build commands, env, and
      DB/auth once added.
- [ ] `SECURITY.md`: two different contact emails — pick one.
- [ ] `docs/guides/workflow.md`: references deleted `.eslintrc.json` (repo uses flat
      config); reconcile the landing-page mention in `DEPLOYMENT.md`.
- [ ] Add root convenience scripts (`dev:client`, `build:client`, etc.) filtered to
      `@vapr/js-client`.
- [ ] Add `.env.example` to `js-client` (`.gitignore` already covers `.env*`).

## 6. js-client target structure (TanStack Start; added incrementally by specs)

```
apps/js-client/
  vite.config.ts                 # tanstackStart() + nitro() + viteReact() + tailwindcss() + tsConfigPaths()
  drizzle.config.ts
  drizzle/                       # generated migrations
  components.json                # shadcn (rsc: false)
  .env.example
  Dockerfile / Dockerfile.dev    # ANNOTATED inert boilerplate until Phase 7
  src/
    router.tsx                   # router instance
    routes/
      __root.tsx                 # root layout: head/meta, theme, Toaster, portal-root
      index.tsx                  # home -> calculator
      api/auth/$.ts              # better-auth handler
      s/$slug.tsx                # public share view
    lib/
      ballistics.ts              # ported verbatim (pure TS)
      auth/{auth.ts,client.ts}   # better-auth server + react client
      db/{index.ts,schema.ts}    # drizzle + libsql client + tables
      storage/{local.ts,sync.ts,types.ts}  # IndexedDB (Dexie) + sync
      server/                    # createServerFn fns: profiles, calculations, settings, shares
    components/
      ui/                        # shadcn primitives (ported)
      calculator/                # decomposed from the 895-line monolith
      auth/                      # sign-in, user menu
      profiles/                  # save/load UI
      theme-provider.tsx         # replaces next-themes
    hooks/
      useBallisticsCalculator.ts # ported
      useProfiles.ts useCalculations.ts useSettings.ts
    styles/
      app.css                    # Tailwind v4 entry: @import "tailwindcss"
```

> Enabling cleanup: `BallisticsCalculator.tsx` is ~895 lines in one file. We split it into
> smaller `components/calculator/*` pieces **as we port** during Phase 1 — smaller blast
> radius makes every later feature safer for an agent to edit.

## 7. Data model sketch (Drizzle / SQLite, refined per spec)

- **better-auth tables** — `user`, `session`, `account`, `verification` (generated by the
  better-auth CLI; Drizzle adapter `provider: "sqlite"`).
- **`loadout_profile`** — `id`, `userId`, `name`, `data` (json: weapon/ammo/atmo),
  `createdAt`, `updatedAt`.
- **`saved_calculation`** — `id`, `userId`, `name`, `inputs` (json), `results` (json,
  optional), `createdAt`, `updatedAt`.
- **`user_settings`** — `userId` (pk), `units`, `theme`, `defaults` (json), `updatedAt`.
- **`share`** — `id`, `slug` (unique), `userId` (nullable), `title`, `inputs` (json),
  `createdAt`, `expiresAt` (nullable).

IDs generated client-side with `crypto.randomUUID()` so local and remote rows match;
sync uses last-write-wins on `updatedAt` (simple, good enough to start).

## 8. Dependencies (js-client)

**Remove:** `next`, `next-themes`, `eslint-config-next`.

**Add (framework):** `@tanstack/react-start`, `@tanstack/react-router`, `vite`,
`@vitejs/plugin-react`, `nitro`, `@tailwindcss/vite`, `vite-tsconfig-paths`.

**Add (tests):** `vitest`, `@testing-library/react`, `jsdom`.

**Keep (portable):** `react`, `react-dom`, `recharts`, `react-hook-form`,
`@hookform/resolvers`, `zod`, `sonner`, `lucide-react`, `class-variance-authority`,
`clsx`, `tailwind-merge`, the Radix packages used by shadcn, `tailwindcss` (v4),
`js-ballistics`.

**Add later (features):** `@libsql/client`, `drizzle-orm`, `drizzle-kit`, `better-auth`,
`dexie`, `@tanstack/react-query`.

## 9. Environment variables (`.env.example`)

```
# Server-only (never exposed to client)
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# Public (Vite exposes only VITE_-prefixed vars to the browser)
VITE_APP_URL=http://localhost:3000
```

> Vite uses `VITE_` (not `NEXT_PUBLIC_`) for client-exposed vars. Secrets stay unprefixed
> and are only read in server functions / `routes/api/*`.

## 10. Phased roadmap (each = one spec file)

- **Phase 0 — Foundation** (`0001`, framework-agnostic): AGENTS.md files, `docs/specs/`
  scaffold + templates, repo cleanup, annotate Docker boilerplate. _No app code._
- **Phase 1 — Migrate js-client to TanStack Start** (`0002`): scaffold (Vite/Nitro/Router/
  Tailwind v4/shadcn/Vitest); port `lib/ballistics.ts` + `useBallisticsCalculator.ts`
  verbatim; port UI primitives; replace theme/fonts (drop next-themes/next-font);
  decompose the monolith; wire lint/typecheck/test/CI; **pin Start deps**. End: feature-
  parity calculator, fully client-side, runs via `node .output/server/index.mjs`.
- **Phase 2 — Local-first store** (`0003`): IndexedDB (Dexie); anonymous users save/load
  **loadout profiles** + **settings**, fully offline.
- **Phase 3 — Turso + Drizzle** (`0004`): libsql client, schema, migrations, env wiring,
  health check. No user data yet.
- **Phase 4 — Auth** (`0005`): better-auth (`tanstackStartCookies`, sqlite adapter),
  `routes/api/auth/$`, session helpers, sign up/in/out + user menu. Anonymous still works.
- **Phase 5 — Sync** (`0006`): logged-in users sync profiles + calculations + settings
  local<->Turso via server functions + TanStack Query (last-write-wins).
- **Phase 6 — Share links** (`0007`): server-stored snapshot + public `/s/$slug` route
  (recomputes client-side).
- **Phase 7 — Deploy hardening / Docker** (`0008`): Nitro `node-server` preset + real
  Dockerfile + compose (cross-platform scripts) + deploy docs.

Each spec ships independently and leaves the app working.

## 11. Risks / notes

- **TanStack Start is pre-1.0 (RC/beta)** and agents have less training data on it than
  Next — top risk. _Mitigations:_ pin exact versions; put official doc links + known-good
  patterns in `apps/js-client/AGENTS.md`; lean on official starters/skills; keep
  ballistics logic framework-agnostic so any future change stays cheap.
- **Offline + sync merge** is the trickiest feature; Phase 5 starts with simple
  last-write-wins and can grow later.
- **Privacy positioning**: update README/marketing copy to "private by default; optional
  account to sync."
- **Secrets**: never expose `TURSO_AUTH_TOKEN`/`BETTER_AUTH_SECRET` to the client; all DB
  access goes through server functions / `routes/api/*`.
- **shadcn portals**: add a `portal-root` div in `__root.tsx` so Dialog/Sheet animations
  work with TanStack Router.

## 12. Resolved decisions

- **Framework:** TanStack Start (was Next.js). Migrate now, before any feature code.
- **Spec folder:** `docs/specs/` (consolidate under `docs/`).
- **Docker:** keep for platform interoperability, but **defer to Phase 7**; annotate the
  current broken Dockerfiles as non-functional WIP boilerplate in the meantime.
- **plan.md location:** `docs/plan.md`.

## 13. Monorepo / Turbo notes

- The monorepo becomes **mixed-framework** (Next x2 frozen + Start x1 active). Turborepo
  is framework-agnostic, so this is fine.
- `turbo.json` `build` outputs should include Nitro/Vite outputs (`.output/**`, `dist/**`)
  alongside the existing `.next/**`.
- Add a `typecheck` task to `turbo.json`.

## 14. Immediate next steps

1. Rewrite this `plan.md` (done).
2. Implement **Phase 0** (foundation) so the agentic loop exists before any code.
3. Implement **Phase 1** (TanStack Start migration) to feature parity.
4. Then work features one spec at a time (Phases 2-7).
