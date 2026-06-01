# AGENTS.md — VAPR Ballistics (monorepo root)

Instructions for coding agents working in this repository. Read this first.

## What this is

VAPR Ballistics is an open-source ballistics calculator. This is a **Turborepo + pnpm
monorepo** containing three apps:

| App                          | Name                 | Purpose                                  | Status        |
| ---------------------------- | -------------------- | ---------------------------------------- | ------------- |
| `apps/js-client`             | `@vapr/js-client`    | Client-side calculator (active focus)    | **ACTIVE**    |
| `apps/fastapi-fullstack`     | `frontend` + backend | FastAPI + React full-stack variant       | **FROZEN**    |
| `apps/landing-page`          | `@vapr/landing-page` | Marketing site                           | **FROZEN**    |

## The #1 rule: stay in scope

> **Only work in `apps/js-client` unless the user explicitly tells you otherwise.**
> Treat `apps/fastapi-fullstack` and `apps/landing-page` as **frozen** — do not modify,
> refactor, or "improve" them. Each frozen app has its own `AGENTS.md` saying the same.

## How we work: spec-driven

Feature requirements live in **`docs/specs/`**. The workflow is:

1. The user writes or points you at a spec file (e.g. `docs/specs/0003-local-store.md`).
2. You implement **only** that spec, following its acceptance criteria.
3. You verify against the Definition of Done before reporting back.

- The overall roadmap and rationale: **`docs/plan.md`**.
- The spec backlog and statuses: **`docs/specs/ROADMAP.md`**.
- New specs are created from **`docs/specs/TEMPLATE.md`**.

If a request is bigger than one spec, ask the user to split it, or propose a spec first.

## Tooling

- **Package manager:** pnpm (10.x). Node 18+. Never use `npm` or `yarn`.
- **Monorepo runner:** Turborepo (`turbo`).
- **Formatting/linting:** Prettier + ESLint (flat config) + EditorConfig at the root.

## Core commands

```bash
pnpm install                 # install all workspaces

# Whole repo (Turbo)
pnpm dev                     # all apps (rarely what you want)
pnpm build
pnpm lint
pnpm format                  # prettier --write

# Just the active app (preferred day-to-day)
pnpm --filter @vapr/js-client dev
pnpm --filter @vapr/js-client build
pnpm --filter @vapr/js-client lint
pnpm --filter @vapr/js-client typecheck
pnpm --filter @vapr/js-client test
```

Convenience aliases also exist at the root: `pnpm dev:client`, `pnpm build:client`, etc.

## Definition of Done

Before reporting a task complete, ALL of these must pass for the app you touched
(usually `@vapr/js-client`):

```bash
pnpm --filter @vapr/js-client lint
pnpm --filter @vapr/js-client typecheck
pnpm --filter @vapr/js-client test
pnpm --filter @vapr/js-client build
```

Do not mark a task done based on intent — actually run them.

## Conventions

- **Windows is the primary dev environment** (Linux/macOS supported). When adding scripts,
  prefer **cross-platform Node scripts** over shell-specific ones. If you must add shell
  scripts, provide both a Windows (`.ps1`/`.bat`) and a Unix (`.sh`) variant — this mirrors
  the existing `apps/fastapi-fullstack/scripts/` layout.
- **Commits:** Conventional Commits are encouraged but optional (hobby mode). Keep commits
  focused. Do not commit, push, or open PRs unless explicitly asked.
- **Secrets:** never hardcode tokens/keys. Use env vars; see each app's `.env.example`.
- Keep changes minimal and scoped to the spec. Don't introduce unrequested dependencies.

## Pointers

- Roadmap / architecture: `docs/plan.md`
- Specs: `docs/specs/`
- Active app instructions: `apps/js-client/AGENTS.md`
