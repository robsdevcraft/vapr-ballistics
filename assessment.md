# Tooling Assessment (Hobby-Project Mode)

Date: 2026-05-22
Repo: vapr-ballistics

## Executive Summary

For a solo hobby workflow, this repository is currently over-instrumented for release/process governance and under-optimized for low-friction coding.

The biggest sources of unnecessary complexity right now are:

1. Changesets (release/versioning workflow)
2. Commitlint + Husky commit-message enforcement
3. Strict contributor process docs designed for external teams

The monorepo foundation itself (pnpm workspace + Turborepo) is not overkill for this repo size because you have multiple apps and shared operational scripts.

## Windows and Linux Overlap Review

You asked whether Linux-oriented capability can remain dormant without interfering with Windows.

Short answer: yes, mostly.

Most Linux-specific artifacts in this repo are passive unless explicitly executed. The main issues are a few command-level inconsistencies that create Windows friction.

### Confirmed Inconsistencies

1. Windows-incompatible clean scripts
- `apps/js-client/package.json` uses `rm -rf .next node_modules`
- `apps/landing-page/package.json` uses `rm -rf .next out`
- These fail in plain PowerShell/CMD unless running through a Unix-like shell.

2. Husky hook is shell-centric
- `.husky/commit-msg` is a shell script with path fallback logic for Node.
- This can be brittle across Windows Git environments and is maintenance-heavy for hobby usage.

3. Docs use `docker-compose` command style everywhere
- Many docs call `docker-compose ...` instead of `docker compose ...`.
- Modern Docker Desktop on Windows commonly expects the plugin form (`docker compose`).
- This is mostly a docs ergonomics issue, but it can create setup confusion.

### Overlap That Is Safe To Keep Dormant

1. Split scripts by platform in `apps/fastapi-fullstack/scripts/`
- `windows/*.bat` and `unix/*.sh` are clearly separated.
- Unix scripts do not interfere with Windows unless manually run.

2. Mixed activation examples in docs
- Patterns like `source venv/bin/activate  # Windows: venv\\Scripts\\activate` are acceptable and low risk.

### Recommendation For Your Current Direction (Windows-first hobby mode)

1. Keep Linux directories/scripts in place as dormant capability.
2. Remove or disable only the parts that actively intercept local workflow on Windows (Husky/Commitlint).
3. Replace Unix-only `clean` commands with cross-platform commands when we do cleanup.
4. Update docs to prefer `docker compose` (or mention both forms) to reduce Windows friction.

This gives you a low-friction Windows flow now, while preserving easy return to Linux later.

## What Is Overkill Right Now

## 1) Changesets

Current evidence:
- Root scripts include `changeset`, `changeset:version`, `changeset:publish`, `changeset:status`
- `@changesets/cli` is installed in root dev dependencies
- `.changeset/config.json` is configured for release flow

Why this is overkill now:
- You are not actively publishing packages and workflow files for release are disabled.
- For a hobby project, manual version bumps or simple tags are usually enough.

Recommendation (now):
- Remove Changesets dependency/scripts and archive `.changeset/` if you are not doing package publishing soon.

Recommendation (later):
- Re-enable only if/when you resume regular versioned releases to npm or similar registries.

## 2) Husky + Commitlint (commit-msg gate)

Current evidence:
- Root `prepare` script installs Husky.
- `.husky/commit-msg` runs commitlint and includes extra Node-path fallback logic.
- `@commitlint/cli` and `@commitlint/config-conventional` are installed.

Why this is overkill now:
- This is process enforcement overhead for every commit.
- It adds platform-specific maintenance complexity (especially shell behavior on Windows/Git Bash).
- Value is highest on multi-contributor repos with strict PR policy.

Recommendation (now):
- Remove Husky `prepare` + commitlint dependencies/hooks, and use lightweight manual commit naming (or no strict convention).

Recommendation (later):
- Reintroduce if external contributions ramp up or automation depends on commit semantics.

## 3) CONTRIBUTING policy strictness

Current evidence:
- The contributing guide requires pre-discussion/approval and strict process checklists.

Why this is overkill now:
- For active solo development, this introduces cognitive friction without practical payoff.

Recommendation (now):
- Simplify contributor policy to a short note: coding standards + basic test/lint expectations.

Recommendation (later):
- Restore stricter governance once community contribution volume justifies it.

## Probably Not Overkill (Keep)

## 1) pnpm workspace

Why keep:
- You already have multiple apps and shared root scripts.
- Workspace dependency management is a real productivity win in this structure.

## 2) Turborepo

Why keep:
- Useful for orchestrating `dev/build/lint/test` across multiple apps.
- Adds speed and consistency in a monorepo with minimal day-to-day overhead once configured.

## 3) EditorConfig

Why keep:
- Very low maintenance, cross-editor consistency, almost zero friction.

## 4) Prettier

Why keep:
- Automatic formatting reduces context switching and code-style bikeshedding.

## 5) ESLint base config

Why keep:
- All frontend apps consume the shared root config.
- This is consolidation, not overhead.

## Borderline / Optional

## GitHub workflows (currently disabled)

Assessment:
- Not urgent to delete if disabled, but they add repository noise.

Recommendation:
- Keep disabled files if you expect to revive CI/CD soon.
- Otherwise move to a `docs/archive/` or remove and recreate later from templates.

## Suggested Minimal Stack (Now)

If your goal is "just code":

1. Keep: pnpm workspace, Turborepo, Prettier, ESLint, EditorConfig
2. Remove: Changesets, Husky, Commitlint (for now)
3. Simplify docs: trim CONTRIBUTING to lightweight guidance
4. Re-enable automation only when you hit scaling pain (more contributors, releases, CI needs)

## Decision Matrix

Use this rule:

- Keep a tool only if it saves time at least weekly.
- Remove or disable anything that exists mainly to enforce process for a team/release pipeline you are not currently running.

For the current project state, the process-enforcement toolchain is where most of the unnecessary complexity lives.
