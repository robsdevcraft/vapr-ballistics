# Specs — how we drive work with agents

This folder is the **requirements system** for VAPR Ballistics. Instead of explaining a
feature to an agent from scratch every time, you write (or edit) one small **spec** file
and hand that single file to the agent. The spec carries all the context.

## The loop

1. **Pick the next item** in [`ROADMAP.md`](./ROADMAP.md).
2. **Write/refine its spec** by copying [`TEMPLATE.md`](./TEMPLATE.md) to
   `NNNN-short-title.md` (e.g. `0003-local-store.md`). Fill in the goal and acceptance
   criteria. You don't need to know how to code it — describe **what** "done" looks like.
3. **Hand it to an agent:** tell it _"Implement `docs/specs/0003-local-store.md`."_
4. The agent implements **only that spec** and runs the **Definition of Done**.
5. **You review**, then mark the spec `Done` in `ROADMAP.md`.

Keep each spec small enough to finish in one focused session. If it feels big, split it
into two specs.

## File naming

`NNNN-kebab-title.md` — zero-padded number for ordering (`0001`, `0002`, ...).

## Status values

`Draft` -> `Ready` -> `In Progress` -> `Done` (or `Blocked` / `Cancelled`).

- **Draft:** still being written; not ready for an agent.
- **Ready:** acceptance criteria are clear; an agent can start.
- **In Progress:** an agent is actively working it.
- **Done:** merged and verified.

## Definition of Done

Every spec must end with these passing for `@vapr/js-client`:

```bash
pnpm --filter @vapr/js-client lint
pnpm --filter @vapr/js-client typecheck
pnpm --filter @vapr/js-client test
pnpm --filter @vapr/js-client build
```

## Pointers

- Big-picture roadmap & rationale: [`../plan.md`](../plan.md)
- Repo-wide agent rules: [`/AGENTS.md`](../../AGENTS.md)
- Active app rules: [`/apps/js-client/AGENTS.md`](../../apps/js-client/AGENTS.md)
