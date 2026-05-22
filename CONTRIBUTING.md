# Contributing to VAPR Ballistics

This project is currently maintained in hobby-mode.

The goal is simple: keep contributions practical, readable, and easy to maintain.

## What Helps Most

- Bug fixes with clear reproduction steps
- Small features that fit existing app direction
- Documentation improvements that unblock setup or usage
- Tests for behavior changes

## Quick Workflow

```bash
git clone https://github.com/robsdevcraft/vapr-ballistics.git
cd vapr-ballistics
pnpm install
```

Create a branch:

```bash
git checkout -b feat/your-change
```

## Run Before Opening a PR

```bash
pnpm format
pnpm lint
pnpm build
pnpm test
```

If a command is not relevant to your change, note that in your PR description.

## Platform Notes

Windows is the primary active environment right now.

Linux/macOS scripts remain in the repo as dormant support for future use.

For Docker commands, prefer:

```bash
docker compose ...
```

## Pull Request Expectations

- Keep PRs focused (one concern per PR when possible)
- Explain what changed and why
- Include screenshots for UI changes
- Mention any trade-offs or follow-up work

## Commit Messages

Use clear, plain commit messages.

Conventional commit format is optional in hobby-mode.

Examples:

- `fix: correct drag model calculation`
- `docs: simplify local setup notes`
- `chore: clean up unused tooling`

## Reporting Bugs

When filing an issue, include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, browser, Node version)

## Security

Please do not open public issues for sensitive vulnerabilities.

Use the process documented in `SECURITY.md`.
