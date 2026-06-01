# 0007 — Shareable result links

- **Status:** Draft
- **Phase:** 6
- **Owner:** TBD
- **Depends on:** 0004

## Problem / why

Users want to share a calculation with others via a link, without the recipient needing an
account or the original user's local data.

## Goal / outcome

A user can generate a shareable link for a calculation. Opening `/s/<slug>` shows the
inputs and a recomputed trajectory (computed client-side from the stored inputs).

## In scope

- `share` table usage (slug, inputs snapshot, optional title, optional expiry).
- Server function to create a share; public route `routes/s/$slug.tsx` to view it.
- "Share" action in the UI that returns a copyable link.
- Recompute trajectory client-side from the shared inputs (don't trust stored results).

## Out of scope

- Editing a shared calculation; permissions beyond public/expiry.
- Sync (0006).

## Acceptance criteria

- [ ] Creating a share returns a working `/s/<slug>` URL.
- [ ] The public page renders inputs + recomputed trajectory without auth.
- [ ] Optional expiry is respected if set.
- [ ] Definition of Done passes.

## Verification

Create a share, open the link in a private window (logged out), confirm it renders.
