# 0001 — Agentic foundation

- **Status:** In Progress
- **Phase:** 0
- **Owner:** agent
- **Depends on:** none

## Problem / why

Driving this repo with agents is hard because there's no persistent context, no
requirements system, and no agreed verification loop. Agents re-learn the project every
time and can wander into the frozen apps.

## Goal / outcome

A framework-agnostic foundation exists so that future work can be handed over one spec at
a time: AGENTS.md files give agents context and guardrails, `docs/specs/` is the place
requirements live, and stale/misleading repo info is cleaned up. No application code
changes in this spec.

## In scope

- Root `AGENTS.md` + per-app `AGENTS.md` (active app + two frozen apps).
- `docs/specs/` with `README.md`, `TEMPLATE.md`, `ROADMAP.md`, and stub specs `0001-0008`.
- Annotate `apps/js-client/Dockerfile` + `Dockerfile.dev` as non-functional boilerplate.
- Root convenience scripts (`dev:client`, `build:client`, `lint:client`,
  `typecheck:client`, `test:client`) filtered to `@vapr/js-client`.
- `turbo.json`: add a `typecheck` task; extend `build` outputs for Vite/Nitro
  (`.output/**`, `dist/**`).
- Remove the duplicated "JS Client" section in the root `README.md`.

## Out of scope

- Any TanStack Start migration or feature code (that's `0002`+).
- Rewriting README/app docs to describe the Start stack (do that in `0002`, once true).
- Choosing the canonical SECURITY.md contact email (needs a user decision — flagged).

## Acceptance criteria

- [ ] `/AGENTS.md` exists with the monorepo map, the "work only in js-client" rule, pnpm
      commands, and the Definition of Done.
- [ ] `apps/js-client/AGENTS.md` exists with the target stack, structure, local-first +
      sync rules, env vars, commands, and the TanStack Start grounding block.
- [ ] `apps/fastapi-fullstack/AGENTS.md` and `apps/landing-page/AGENTS.md` mark those apps
      frozen / out of scope.
- [ ] `docs/specs/{README,TEMPLATE,ROADMAP}.md` exist and specs `0001-0008` are present.
- [ ] js-client Dockerfiles carry a clear "WIP boilerplate, not functional until Phase 7"
      header.
- [ ] Root `package.json` has the `*:client` convenience scripts; `turbo.json` has a
      `typecheck` task and extended build outputs.
- [ ] Root `README.md` no longer contains the duplicated JS Client block.

## Verification

- Read each new `AGENTS.md` and the `docs/specs/` files; confirm links resolve.
- `pnpm dev:client` (or `pnpm --filter @vapr/js-client dev`) still starts the current app.
- `git status` shows only docs/config/markdown changes — no app source touched.
