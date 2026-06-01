# 0005 — Auth with better-auth

- **Status:** Draft
- **Phase:** 4
- **Owner:** TBD
- **Depends on:** 0004

## Problem / why

Optional accounts are needed so users can sync data across devices. We use better-auth,
self-hosted, with users stored in our own Turso DB.

## Goal / outcome

Users can sign up, sign in, and sign out. A session is available on server and client. The
calculator remains fully usable **without** an account.

## In scope

- better-auth server config (`lib/auth/auth.ts`) with `tanstackStartCookies()` and the
  Drizzle adapter (`provider: "sqlite"`); react client (`lib/auth/client.ts`).
- `routes/api/auth/$.ts` handler; better-auth schema generated + migrated.
- Session helpers via `createServerFn`; a user menu (signed-in/out states).
- Email/password to start (social providers optional later).

## Out of scope

- Syncing data (0006), share links (0007).
- Gating the calculator behind auth (never do this).

## Acceptance criteria

- [ ] Sign up / sign in / sign out work; session persists across reloads.
- [ ] Anonymous users retain full calculator functionality.
- [ ] Auth tables are migrated into Turso.
- [ ] Secrets (`BETTER_AUTH_SECRET`) are server-only.
- [ ] Definition of Done passes.

## Verification

Create an account, sign out, sign back in. Confirm session via a protected server function.
