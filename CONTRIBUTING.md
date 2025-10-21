# Contributing to VAPR Ballistics

Thank you for your interest in contributing! This document outlines our process and expectations.

---

## 🎯 Before You Start

### Required: Discussion First

**All contributions require a discussion or issue BEFORE submitting a PR.**

1. 🔍 Search [existing issues](https://github.com/robsdevcraft/vapr-ballistics/issues) and [discussions](https://github.com/robsdevcraft/vapr-ballistics/discussions)
2. 💬 If not found, create a discussion or issue describing your proposed change
3. ⏳ Wait for maintainer feedback and approval
4. ✅ Once approved, you can submit a PR

**Why?** This prevents wasted effort on changes that won't be accepted.

---

## 🚫 What We Don't Accept

Pull requests for the following will be **closed without review**:

- ❌ Typo fixes in README or documentation (unless major errors)
- ❌ Formatting changes (we use automated formatting)
- ❌ Dependency updates without discussion
- ❌ Large refactors without prior discussion
- ❌ Features that don't align with project goals

**Exceptions:** Critical security fixes can be submitted directly via PR.

---

## ✅ What We Do Accept

After discussion approval:

- 🐛 **Bug Fixes** - With test coverage if possible
- ✨ **New Features** - That align with project roadmap
- 📚 **Documentation** - Significant improvements or additions
- 🧪 **Tests** - Increasing coverage or testing edge cases
- ♿ **Accessibility** - Improvements to keyboard navigation, ARIA, contrast
- 🌐 **Internationalization** - Translation support

---

## 📋 Contribution Process

### 1. Fork & Clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/vapr-ballistics.git
cd vapr-ballistics
git remote add upstream https://github.com/robsdevcraft/vapr-ballistics.git
```

### 2. Set Up Development Environment

```bash
# Install dependencies
pnpm install

# For js-client development
cd apps/js-client
pnpm dev

# For fastapi-fullstack development (Docker recommended)
cd apps/fastapi-fullstack/docker
docker-compose -f docker-compose.dev.yml up --build
```

### 3. Create Feature Branch

```bash
git checkout -b feat/your-feature-name
```

**Branch naming:**
- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `test/` - Tests
- `refactor/` - Code restructuring

### 4. Make Your Changes

Follow our coding standards:

- ✅ Use **TypeScript** for type safety
- ✅ Write **meaningful commit messages** (conventional commits)
- ✅ Add **tests** for new features
- ✅ Update **documentation** if needed
- ✅ Follow **existing code style** (Prettier auto-formats)

### 5. Test Your Changes

```bash
# Format code
pnpm format

# Lint
pnpm lint

# Type check
pnpm type-check

# Build
pnpm build

# Run tests (when available)
pnpm test
```

### 6. Commit with Conventional Format

```bash
git add .
git commit -m "feat(js-client): add CSV export functionality

- Implemented exportToCSV function
- Added download button with icon
- Includes timestamp in filename

Closes #42"
```

**Commit format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`

**Scopes:** `js-client`, `fastapi`, `ui`, `docs`, `repo`, `ci`

### 7. Push & Create PR

```bash
git push origin feat/your-feature-name
```

Then create a PR on GitHub:
1. Go to your fork
2. Click "Compare & pull request"
3. Fill out the PR template (link to discussion/issue)
4. Submit for review

---

## 📝 Pull Request Guidelines

### PR Must Include:

- ✅ Link to approved discussion or issue
- ✅ Clear description of changes
- ✅ Tests for new features (if applicable)
- ✅ Updated documentation (if applicable)
- ✅ Conventional commit messages
- ✅ All CI checks passing

### PR Template Checklist:

When you open a PR, the template will ask:

- [ ] I have discussed this change in an issue or discussion
- [ ] My code follows the project's code style
- [ ] I have tested my changes locally
- [ ] I have updated relevant documentation
- [ ] My commits follow conventional commit format
- [ ] All CI checks pass

### Review Process:

1. **Automated checks** run (lint, type-check, build)
2. **Maintainer review** (may request changes)
3. **Approval** - Maintainer approves
4. **Merge** - Maintainer merges (squash merge)

**Timeline:** Reviews typically within 1-3 days. Be patient!

---

## 🎨 Code Style

### Automatic Formatting

We use Prettier. Your editor should auto-format on save.

**Manual formatting:**
```bash
pnpm format
```

**Our Prettier config:**
- 2-space indentation
- Double quotes
- Semicolons
- 100 character line width
- Trailing commas

### Linting

We use ESLint to catch bugs, not enforce style (Prettier does that).

```bash
pnpm lint
pnpm lint:fix
```

### TypeScript

- ✅ Use explicit types for function parameters and returns
- ✅ Avoid `any` unless absolutely necessary
- ✅ Use type inference where obvious
- ✅ Export types for shared interfaces

**Example:**
```typescript
// ✅ Good
export function calculateTrajectory(params: TrajectoryParams): TrajectoryResult {
  // ...
}

// ❌ Bad
export function calculateTrajectory(params: any): any {
  // ...
}
```

---

## 🧪 Testing

### Test Requirements

- ✅ New features **should** include tests
- ✅ Bug fixes **must** include regression tests
- ✅ Tests should be readable and maintainable

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run coverage report
pnpm test:coverage
```

### Test Structure

```typescript
import { describe, it, expect } from 'vitest';
import { calculateTrajectory } from './ballistics';

describe('calculateTrajectory', () => {
  it('should calculate correct drop at 100 yards', () => {
    const result = calculateTrajectory({ distance: 100 });
    expect(result.drop).toBeCloseTo(-2.5, 1);
  });

  it('should throw error for invalid distance', () => {
    expect(() => calculateTrajectory({ distance: -10 })).toThrow();
  });
});
```

---

## 📚 Documentation

### When to Update Docs

Update documentation if you:
- ✅ Add new features
- ✅ Change existing APIs
- ✅ Add new configuration options
- ✅ Change setup/installation process

### Documentation Locations

- **README.md** - Project overview, quick start
- **apps/*/README.md** - App-specific documentation
- **docs/guides/** - Detailed guides and tutorials
- **Code comments** - Complex logic, edge cases
- **JSDoc** - Public API functions

### Writing Good Documentation

- ✅ Be clear and concise
- ✅ Include code examples
- ✅ Explain **why**, not just **how**
- ✅ Update examples if APIs change
- ✅ Use proper markdown formatting

---

## 🐛 Reporting Bugs

### Before Filing a Bug

1. Search [existing issues](https://github.com/robsdevcraft/vapr-ballistics/issues)
2. Check if it's already fixed in `main` branch
3. Try reproducing in a clean environment

### Bug Report Should Include

- ✅ Clear description of the issue
- ✅ Steps to reproduce
- ✅ Expected behavior
- ✅ Actual behavior
- ✅ Environment (OS, browser, Node version, etc.)
- ✅ Screenshots/videos if relevant
- ✅ Error messages or logs

Use our **Bug Report template** when creating an issue.

---

## 💡 Feature Requests

### Before Requesting a Feature

1. Search [discussions](https://github.com/robsdevcraft/vapr-ballistics/discussions)
2. Check if it aligns with project goals
3. Consider if it benefits most users

### Feature Request Should Include

- ✅ Clear description of the feature
- ✅ Use case / problem it solves
- ✅ Proposed solution (if you have one)
- ✅ Alternative solutions considered
- ✅ Willingness to contribute implementation

Use our **Feature Request template** when creating an issue.

---

## 💬 Discussions

Use [GitHub Discussions](https://github.com/robsdevcraft/vapr-ballistics/discussions) for:

- ❓ Questions about usage
- 💡 Ideas and brainstorming
- 🗣️ General project discussion
- 📣 Announcements from maintainers

**Don't use issues for questions** - they'll be moved to Discussions.

---

## 📜 Code of Conduct

### Our Standards

We are committed to providing a welcoming and inclusive environment.

**Expected behavior:**
- ✅ Be respectful and considerate
- ✅ Accept constructive criticism gracefully
- ✅ Focus on what's best for the community
- ✅ Show empathy towards others

**Unacceptable behavior:**
- ❌ Harassment, trolling, or insulting comments
- ❌ Personal or political attacks
- ❌ Publishing private information
- ❌ Inappropriate sexual attention or advances

### Enforcement

Violations will result in:
1. **Warning** - First offense
2. **Temporary ban** - Repeated violations
3. **Permanent ban** - Severe or persistent violations

Report violations to: [rob@devcrafted.io](mailto:rob@devcrafted.io)

---

## 🔐 Security

### Reporting Security Issues

**DO NOT** open public issues for security vulnerabilities.

Instead:
1. Email: [rob@devcrafted.io](mailto:rob@devcrafted.io)
2. Include: Description, reproduction steps, potential impact
3. We'll respond within 48 hours

See [SECURITY.md](../SECURITY.md) for our full security policy.

---

## 📞 Getting Help

- 💬 [Discussions](https://github.com/robsdevcraft/vapr-ballistics/discussions) - Questions and ideas
- 🐛 [Issues](https://github.com/robsdevcraft/vapr-ballistics/issues) - Bug reports and features
- 📖 [Documentation](../README.md) - Guides and references
- 📧 [Email](mailto:rob@devcrafted.io) - Security or private concerns

---

## 🙏 Thank You!

Your contributions help make VAPR Ballistics better for everyone. We appreciate:

- 🐛 Bug reports
- 💡 Feature ideas
- 📚 Documentation improvements
- 🧪 Test coverage
- 💬 Community support

**Every contribution matters!**

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.
