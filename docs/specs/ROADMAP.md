# Spec roadmap

Ordered backlog for `@vapr/js-client`. See [`../plan.md`](../plan.md) for the full
rationale. Work top-to-bottom; each spec ships independently and leaves the app working.

| Spec                                    | Phase | Title                                   | Status      | Depends on |
| --------------------------------------- | ----- | --------------------------------------- | ----------- | ---------- |
| [0001](./0001-agentic-foundation.md)    | 0     | Agentic foundation                      | In Progress | —          |
| [0002](./0002-migrate-tanstack-start.md)| 1     | Migrate js-client to TanStack Start     | Ready       | 0001       |
| [0003](./0003-local-first-store.md)     | 2     | Local-first store (offline)             | Draft       | 0002       |
| [0004](./0004-turso-drizzle.md)         | 3     | Turso + Drizzle data layer              | Draft       | 0002       |
| [0005](./0005-auth-better-auth.md)      | 4     | Auth with better-auth                   | Draft       | 0004       |
| [0006](./0006-sync.md)                  | 5     | Sync local <-> Turso                    | Draft       | 0003, 0005 |
| [0007](./0007-share-links.md)           | 6     | Shareable result links                  | Draft       | 0004       |
| [0008](./0008-deploy-docker.md)         | 7     | Deploy hardening / Docker               | Draft       | 0002       |

## Status legend

`Draft` (being written) · `Ready` (agent can start) · `In Progress` · `Done` ·
`Blocked` · `Cancelled`

## Notes

- `0003` and `0004` both depend only on the migration (`0002`) and can be done in either
  order. `0006` (sync) needs both the local store and auth.
- Items marked `Draft` are stubs derived from the plan — refine their acceptance criteria
  before handing them to an agent.
