# Changesets

This folder contains changeset files for managing versioning and changelogs in the VAPR Ballistics monorepo.

## What are Changesets?

Changesets are a way to manage versions and changelogs with a focus on monorepos. They help you declare intent to release specific packages at specific semver bump types (patch, minor, major).

## How to Use

### 1. Create a Changeset

When you make changes that should result in a version bump:

```bash
pnpm changeset
```

This interactive CLI will:
1. Ask which packages changed (js-client, fastapi-fullstack, or both)
2. Ask what type of change (patch, minor, major)
3. Ask for a summary of the changes
4. Create a markdown file in `.changeset/` with your changes

### 2. Review Changesets

Check what changesets are pending:

```bash
pnpm changeset:status
```

### 3. Version Packages

When ready to release, consume all changesets and bump versions:

```bash
pnpm changeset:version
```

This will:
- Bump package versions according to changesets
- Update CHANGELOG.md files
- Delete consumed changeset files

### 4. Review and Commit

```bash
git add .
git commit -m "chore(release): version packages"
```

### 5. Tag and Push

```bash
git tag js-client@1.2.0  # or whatever version
git push --follow-tags
```

### 6. Publish (Optional - Currently Disabled)

```bash
pnpm changeset:publish
```

**Note:** Publishing to npm/Docker is currently disabled. See CI/CD workflows.

---

## When to Create a Changeset

### ✅ Create a changeset for:

- **feat:** New features (minor bump)
- **fix:** Bug fixes (patch bump)
- **perf:** Performance improvements (patch bump)
- **refactor:** Code changes that affect users (depends on scope)
- **BREAKING CHANGE:** Breaking changes (major bump)

### ❌ Don't create a changeset for:

- **docs:** Documentation only changes
- **chore:** Build tasks, package updates (no code change)
- **ci:** CI/CD configuration changes
- **test:** Adding or updating tests
- **style:** Formatting changes

---

## Changeset Types

### Patch (0.0.X)

Bug fixes and minor improvements that don't add features:

```bash
# Example: Fixing a calculation error
pnpm changeset
# Select: patch
```

### Minor (0.X.0)

New features that are backwards compatible:

```bash
# Example: Adding CSV export
pnpm changeset
# Select: minor
```

### Major (X.0.0)

Breaking changes that affect existing functionality:

```bash
# Example: Changing API response format
pnpm changeset
# Select: major
```

---

## Monorepo Strategy

### Independent Versioning

Each app versions independently:
- `js-client` can be at v2.1.0
- `fastapi-fullstack` can be at v1.5.3

When creating a changeset, you can select which apps are affected.

### Shared Dependencies

If you create shared packages in `/packages/`, changesets will handle dependency bumps automatically.

---

## Example Workflow

```bash
# 1. Make changes
git checkout -b feat/add-wind-drift
# ... make code changes ...

# 2. Commit changes
git commit -m "feat(js-client): add wind drift calculations"

# 3. Create changeset
pnpm changeset
# → Select: js-client
# → Type: minor (new feature)
# → Summary: "Add wind drift calculations with L/R indicators"

# 4. Commit the changeset
git add .changeset/
git commit -m "chore: add changeset for wind drift feature"

# 5. Push and create PR
git push origin feat/add-wind-drift

# 6. After PR merge, on main branch
pnpm changeset:version
# → js-client bumps from 1.0.0 → 1.1.0
# → CHANGELOG.md updated

# 7. Commit and tag
git add .
git commit -m "chore(release): bump js-client to v1.1.0"
git tag js-client@1.1.0
git push --follow-tags
```

---

## Tips

- **Batch changes:** Accumulate multiple changesets before releasing
- **Review before versioning:** Check `pnpm changeset:status` first
- **Write good summaries:** They appear in CHANGELOG.md
- **Skip for docs:** Documentation changes don't need changesets
- **Use conventional commits:** Helps determine bump type

---

## Configuration

See `.changeset/config.json` for configuration options.

**Current settings:**
- `commit: false` - Don't auto-commit after version bump
- `access: public` - Packages are public (if publishing)
- `baseBranch: main` - Base branch for comparison
- `changelog: @changesets/cli/changelog` - Default changelog format

---

## Learn More

- [Changesets Documentation](https://github.com/changesets/changesets)
- [VAPR Ballistics Workflow Guide](../docs/guides/workflow.md)
- [SemVer Specification](https://semver.org/)

---

**Remember:** Changesets give you control. You decide when to create them and when to release!

