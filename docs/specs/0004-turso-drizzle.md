# 0004 — Turso + Drizzle data layer

- **Status:** Draft
- **Phase:** 3
- **Owner:** TBD
- **Depends on:** 0002

## Problem / why

To support accounts and sync, we need a server-side database. Turso (libSQL) + Drizzle is
the chosen stack, accessed only through the server layer.

## Goal / outcome

The app has a working Drizzle + libSQL connection to Turso, an initial schema, and a
migration workflow. A simple server function proves connectivity. No user-facing feature
yet.

## In scope

- `@libsql/client` + `drizzle-orm/libsql`; `lib/db/index.ts` client, `lib/db/schema.ts`.
- `drizzle.config.ts` (dialect `turso`/`sqlite`) + `drizzle-kit` generate/migrate scripts.
- App tables: `loadout_profile`, `saved_calculation`, `user_settings`, `share`
  (see plan §7). better-auth tables come in 0005.
- Env wiring (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`) — server-only.
- A `createServerFn` health check that runs a trivial query.

## Out of scope

- Auth tables/flows (0005), sync (0006), share UI (0007).
- Any client-side DB access (forbidden — server only).

## Acceptance criteria

- [ ] `drizzle-kit` generates and applies migrations against a Turso DB.
- [ ] A server function performs a real round-trip query successfully.
- [ ] No `TURSO_*` secrets are referenced from client code.
- [ ] Definition of Done passes.

## Verification

Run migrations; call the health-check server function; confirm a row round-trips.
