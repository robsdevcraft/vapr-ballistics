# 0008 — Deploy hardening / Docker

- **Status:** Draft
- **Phase:** 7
- **Owner:** TBD
- **Depends on:** 0002

## Problem / why

Docker was deferred so it wouldn't block feature work. Now that the app is on TanStack
Start (Nitro), we want a real, working container + deploy docs for platform
interoperability. The current Dockerfiles are non-functional boilerplate.

## Goal / outcome

A working production container built from the Nitro `node-server` output, plus
cross-platform dev/prod compose and deployment docs. Replaces the placeholder Dockerfiles.

## In scope

- Real `Dockerfile` (multi-stage, pnpm, Nitro `node-server` output) + `.dockerignore`.
- `docker-compose.dev.yml` / `docker-compose.prod.yml` mirroring the fastapi-fullstack
  pattern; cross-platform start scripts (Windows + Unix).
- Runtime env via compose (`TURSO_*`, `BETTER_AUTH_*`); migrations run as a deploy step.
- Deployment docs (Docker + Turso) and update root README/DEPLOYMENT.md.

## Out of scope

- New product features.

## Acceptance criteria

- [ ] `docker build` produces an image that runs the app and serves the calculator.
- [ ] Runtime secrets are injected via env, never baked into the image.
- [ ] DB migrations have a documented deploy step.
- [ ] The old placeholder Dockerfile annotations are removed/replaced.
- [ ] Definition of Done passes.

## Verification

Build and run the container locally; load the app; confirm a signed-in flow against Turso.
