# Development Workflow Guide

Your quick reference for working on VAPR Ballistics.

---

## 📋 Table of Contents

1. [Branch Workflow](#branch-workflow)
2. [Commit Messages](#commit-messages)
3. [Release Process](#release-process)
4. [Code Quality](#code-quality)
5. [CI/CD Pipeline](#cicd-pipeline)
6. [Publishing (Future)](#publishing-future)

---

## 🌿 Branch Workflow

### GitHub Flow (What We Use)

```
main (protected)
  ↓
  feature/csv-export (you create)
  ↓
  PR to main (CI runs)
  ↓
  Merge to main (release when ready)
```

### Creating a Feature Branch

```bash
# 1. Make sure you're on main and up to date
git checkout main
git pull origin main

# 2. Create feature branch (use conventional type prefix)
git checkout -b feat/windage-chart-improvements

# 3. Work on your feature (make commits)
# ... code changes ...

# 4. Push to GitHub when ready for CI/review
git push origin feat/windage-chart-improvements

# 5. Create PR on GitHub
# - Go to repo → Pull Requests → New
# - Select your branch → main
# - Fill out PR template
```

### Branch Naming Convention

**Format**: `<type>/<description>`

**Types:**

- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code restructuring
- `perf/` - Performance improvements
- `test/` - Adding tests
- `chore/` - Maintenance tasks

**Examples:**

```bash
feat/csv-export-trajectory-data
fix/tooltip-visibility-dark-mode
docs/update-contributing-guide
refactor/extract-ballistics-calculations
perf/optimize-chart-rendering
test/add-trajectory-validation-tests
chore/upgrade-dependencies
```

---

## 💬 Commit Messages

### Conventional Commits Format

We use [Conventional Commits](https://www.conventionalcommits.org/) for automated changelogs.

**Format:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Example:**

```
feat(js-client): add CSV export to trajectory table

- Implemented exportToCSV function
- Added download button with Lucide icon
- Includes L/R windage notation in export
- Generates filename with current date

Closes #42
```

### Commit Types

| Type       | Description            | Bump Version?         |
| ---------- | ---------------------- | --------------------- |
| `feat`     | New feature            | MINOR (1.1.0 → 1.2.0) |
| `fix`      | Bug fix                | PATCH (1.1.0 → 1.1.1) |
| `docs`     | Documentation only     | NO                    |
| `style`    | Code formatting        | NO                    |
| `refactor` | Code restructure       | NO                    |
| `perf`     | Performance            | PATCH                 |
| `test`     | Add tests              | NO                    |
| `chore`    | Maintenance            | NO                    |
| `ci`       | CI/CD changes          | NO                    |
| `revert`   | Revert previous commit | Depends               |

### Breaking Changes

If you make a breaking change (API change, removed feature, etc.):

```
feat(js-client)!: remove legacy ballistics API

BREAKING CHANGE: The old calculateTrajectory function has been removed.
Use the new calculate() method instead.

Before:
calculateTrajectory(params)

After:
calculate({ ...params })
```

The `!` and `BREAKING CHANGE:` will bump MAJOR version (1.2.0 → 2.0.0).

### Scopes

**Monorepo Scopes:**

- `js-client` - Client-only app
- `fastapi` - FastAPI fullstack app
- `ui` - Shared UI components
- `docs` - Documentation
- `repo` - Repository-level changes
- `ci` - CI/CD workflows

**Examples:**

```bash
feat(js-client): add dark mode toggle
fix(fastapi): correct trajectory calculation
docs(repo): update contributing guidelines
chore(ui): upgrade Recharts to v3.3.0
ci(repo): add automated release workflow
```

### Git Commands

```bash
# Stage changes
git add .

# Commit with message (commitlint will validate)
git commit -m "feat(js-client): add CSV export"

# Push to your branch
git push origin feat/csv-export

# Amend last commit (if you made a mistake)
git commit --amend

# View commit history
git log --oneline --graph
```

---

## 🚀 Release Process

### Using Changesets (Hybrid Approach)

We use [changesets](https://github.com/changesets/changesets) for controlled releases.

### Step 1: Accumulate Changes

As you work, conventional commits automatically prepare for release. No action needed during development.

### Step 2: When Ready to Release

```bash
# 1. Make sure main is up to date
git checkout main
git pull origin main

# 2. Create a changeset (describes the changes for this release)
pnpm changeset

# You'll be prompted:
# - Which packages to release? (Select js-client or fastapi-fullstack)
# - Bump type? (patch, minor, major)
# - Summary of changes? (Describe for users)

# 3. Commit the changeset
git add .changeset/*.md
git commit -m "chore: add changeset for v1.2.0"
git push origin main

# 4. Run version bump (updates package.json, CHANGELOG.md)
pnpm changeset version

# 5. Commit version bump
git add .
git commit -m "chore(js-client): release v1.2.0"
git push origin main

# 6. Create Git tag
git tag js-client@1.2.0
git push origin js-client@1.2.0

# 7. GitHub Release auto-created from tag! 🎉
```

### Version Numbering (SemVer)

```
1.2.3
│ │ └─ PATCH: Bug fixes, minor tweaks
│ └─── MINOR: New features (backwards compatible)
└───── MAJOR: Breaking changes
```

**Examples:**

- `1.0.0` → `1.0.1` - Fixed a bug
- `1.0.1` → `1.1.0` - Added CSV export feature
- `1.1.0` → `2.0.0` - Changed API (breaking)

### Independent Versioning

Each app versions independently:

- `js-client@1.2.0`
- `fastapi-fullstack@1.5.3`

They don't need to match!

---

## 🎨 Code Quality

### Prettier (Auto-formatting)

**Configured in `.prettierrc`**

Your editor should auto-format on save. If not:

```bash
# Format all files
pnpm format

# Check if files need formatting (CI uses this)
pnpm format:check
```

**Settings:**

- 2-space indentation
- Double quotes for strings
- Semicolons at end of statements
- 100 character line width
- Trailing commas in objects

### ESLint (Bug Catching)

**Configured in `.eslintrc.json`**

Catches bugs and bad patterns, not style issues (Prettier handles that).

```bash
# Lint all files
pnpm lint

# Lint and auto-fix
pnpm lint:fix
```

**What ESLint Checks:**

- Unused variables
- Missing dependencies in React hooks
- Accessibility issues in JSX
- TypeScript type errors
- Potential runtime errors

### EditorConfig

**Configured in `.editorconfig`**

Ensures consistent editor behavior:

- 2-space indentation
- LF line endings (Unix-style)
- Trim trailing whitespace
- Insert final newline

Most editors support this automatically.

---

## 🔄 CI/CD Pipeline

### When CI Runs

**Triggers:**

```yaml
✅ Pull Request to main (opened, updated)
✅ Push to main branch
❌ Push to feature branches (saves Actions budget)
```

**Manual Trigger:**

- Go to Actions tab → Select workflow → Run workflow

### CI Jobs

**1. Lint**

- Runs Prettier check
- Runs ESLint
- Fails if code isn't formatted or has lint errors

**2. Type Check**

- Runs TypeScript compiler
- Ensures no type errors

**3. Build**

- Builds all apps in monorepo
- Ensures no build errors

**4. Test** (when we add tests)

- Runs unit tests
- Runs integration tests
- Checks code coverage

### If CI Fails

```bash
# Run locally to debug
pnpm lint
pnpm type-check
pnpm build

# Fix issues, commit
git add .
git commit -m "fix: resolve linting errors"
git push
```

---

## 📦 Publishing (Future)

### Docker Images (GHCR)

**⚠️ CURRENTLY DISABLED** - Workflow exists but commented out.

When ready to publish:

```bash
# 1. Uncomment workflow: .github/workflows/publish-docker.yml
# 2. Set up GitHub secrets:
#    - GHCR_TOKEN (Personal Access Token with write:packages)
# 3. Push tag (triggers publish):
git tag fastapi@1.0.0
git push origin fastapi@1.0.0

# Images published to:
# ghcr.io/robsdevcraft/vapr-ballistics-fastapi:latest
# ghcr.io/robsdevcraft/vapr-ballistics-fastapi:1.0.0
```

### NPM Package

**⚠️ CURRENTLY DISABLED** - Workflow exists but commented out.

When ready to publish:

```bash
# 1. Uncomment workflow: .github/workflows/publish-npm.yml
# 2. Set up GitHub secrets:
#    - NPM_TOKEN (from npmjs.com)
# 3. Push tag (triggers publish):
git tag js-client@1.0.0
git push origin js-client@1.0.0

# Package published to:
# @robsdevcraft/vapr-ballistics-client
```

---

## 🆘 Quick Commands Reference

### Daily Development

```bash
# Start fresh
git checkout main
git pull origin main
git checkout -b feat/my-feature

# Make changes, commit
git add .
git commit -m "feat(scope): description"

# Push when ready
git push origin feat/my-feature

# Create PR on GitHub
```

### Before Committing

```bash
# Format code
pnpm format

# Check for errors
pnpm lint
pnpm type-check
pnpm build
```

### Release Time

```bash
# Update main
git checkout main
git pull origin main

# Create changeset
pnpm changeset

# Version bump
pnpm changeset version

# Commit & tag
git add .
git commit -m "chore: release v1.2.0"
git push origin main
git tag js-client@1.2.0
git push --tags
```

---

## 📚 Learn More

- [Conventional Commits](https://www.conventionalcommits.org/)
- [SemVer](https://semver.org/)
- [Changesets](https://github.com/changesets/changesets)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

---

**Questions?** Ask in [Discussions](https://github.com/robsdevcraft/vapr-ballistics/discussions) or open an issue!
