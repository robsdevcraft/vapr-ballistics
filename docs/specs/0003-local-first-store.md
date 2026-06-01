# 0003 — Local-first store (offline)

- **Status:** Draft
- **Phase:** 2
- **Owner:** TBD
- **Depends on:** 0002

## Problem / why

Today nothing is saved between sessions — not even locally. Users re-enter their setup
every time. We want persistence that works **offline and without an account**.

## Goal / outcome

Anonymous users can save, name, load, and delete **loadout profiles** (weapon + ammo +
atmosphere) and have their **settings** (theme, units, defaults) persist locally via
IndexedDB. Everything works offline; no network required.

## In scope

- Dexie (IndexedDB) store with a typed schema for `loadoutProfile` and `userSettings`.
- A storage abstraction (`lib/storage/local.ts`, `types.ts`) that later gets a remote
  counterpart for sync.
- UI to save/load/delete loadouts and persist settings.
- IDs via `crypto.randomUUID()`; records carry `createdAt`/`updatedAt`.

## Out of scope

- Accounts, Turso, or sync (Phases 3-5). No remote calls.
- Saved calculations / DOPE cards (kept simple here; can extend later).

## Acceptance criteria

- [ ] User can save the current configuration as a named loadout and reload it later.
- [ ] Settings persist across reloads.
- [ ] Data survives a full offline session (DevTools offline mode).
- [ ] Storage layer is structured so a remote sync backend can be added without UI rewrites.
- [ ] Definition of Done passes.

## Verification

Save a loadout, reload the page (offline), confirm it loads. Inspect IndexedDB in DevTools.
