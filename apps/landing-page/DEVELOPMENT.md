# 🚀 Landing Page Development Workflow

Complete guide for developing and deploying the VAPR Ballistics landing page.

---

## 🛠️ Local Development

### Start Development Server

```powershell
# Navigate to landing page directory
cd apps/landing-page

# Start dev server (runs on http://localhost:3002)
pnpm dev
```

**Development URL:** http://localhost:3002

The dev server includes:
- ⚡ Hot reload - Changes appear instantly
- 🎨 Tailwind CSS - Styles update in real-time
- 🌙 Dark mode - Toggle with theme button
- 📱 Responsive - Test on mobile/tablet/desktop

### Making Changes

#### Edit Content
- **Hero Section**: `app/page.tsx` (lines 13-28)
- **Features**: `app/page.tsx` (lines 30-98)
- **CTA Section**: `app/page.tsx` (lines 100-118)
- **Footer**: `app/page.tsx` (lines 120-137)

#### Edit Styles
- **Global Styles**: `app/globals.css`
- **Theme Colors**: Tailwind v4 uses CSS variables in `globals.css`
- **Component Styles**: Inline with `className` props

#### Edit Components
- **Theme Toggle**: `components/theme-toggle.tsx`
- **Theme Provider**: `components/theme-provider.tsx`
- **UI Components**: `components/ui/*`

### Build Locally

```powershell
# Test production build
pnpm build

# Preview production build
pnpm start
```

This generates static HTML in `out/` directory (same as Cloudflare will build).

### Type Checking

```powershell
# Run TypeScript type checking
pnpm type-check
```

### Linting

```powershell
# Run ESLint
pnpm lint
```

---

## 📦 Git Workflow

### 1. Create a Feature Branch

```powershell
# Create and switch to new branch
git checkout -b feat/update-landing-page

# Or for specific features
git checkout -b feat/add-pricing-section
git checkout -b fix/mobile-layout
git checkout -b docs/update-readme
```

### 2. Make Your Changes

Edit files, test locally, verify everything works.

### 3. Stage Changes

```powershell
# Stage specific files
git add apps/landing-page/app/page.tsx
git add apps/landing-page/components/new-component.tsx

# Or stage all changes in landing page
git add apps/landing-page/

# Check what's staged
git status
```

### 4. Commit Changes

Use **conventional commits** format:

```powershell
# Feature commit
git commit -m "feat(landing-page): add pricing section"

# Fix commit
git commit -m "fix(landing-page): mobile responsive layout"

# Style commit
git commit -m "style(landing-page): update hero gradient"

# Documentation
git commit -m "docs(landing-page): update README"

# Content update
git commit -m "content(landing-page): update feature descriptions"
```

**Commit Prefixes:**
- `feat`: New feature
- `fix`: Bug fix
- `style`: Visual/CSS changes
- `refactor`: Code restructuring
- `docs`: Documentation only
- `content`: Content/text changes
- `perf`: Performance improvement
- `test`: Adding tests

**Scope must be:** `landing-page` (for landing page changes)

### 5. Push to GitHub

```powershell
# Push feature branch
git push origin feat/update-landing-page

# First time pushing a new branch, use -u flag
git push -u origin feat/update-landing-page
```

---

## 🚀 Deployment Options

### Option A: Direct Push to Main (Solo Development)

**⚠️ Use only if you're the sole developer and want instant deploys**

```powershell
# Switch to main branch
git checkout main

# Pull latest changes (if any)
git pull origin main

# Merge your feature branch
git merge feat/update-landing-page

# Push to main - triggers auto-deploy on Cloudflare
git push origin main
```

**Result:** Cloudflare Pages automatically builds and deploys in ~2-3 minutes.

---

### Option B: Pull Request Workflow (Recommended)

**✅ Best for collaboration, review, and preview deployments**

#### 1. Push Feature Branch

```powershell
git push origin feat/update-landing-page
```

#### 2. Create Pull Request on GitHub

1. Go to: https://github.com/robsdevcraft/vapr-ballistics
2. Click **"Compare & pull request"** (appears after push)
3. Title: `feat(landing-page): add pricing section`
4. Description: Explain what changed and why
5. Click **"Create pull request"**

#### 3. Preview Deployment

**Cloudflare automatically creates a preview deployment for your PR!**

- Preview URL: `<commit-hash>.vapr-ballistics-landing.pages.dev`
- Check the PR for the Cloudflare Pages comment with link
- Test your changes in production-like environment

#### 4. Review and Merge

1. Review changes in GitHub
2. Check preview deployment
3. If good, click **"Merge pull request"**
4. Click **"Confirm merge"**
5. Delete branch: Click **"Delete branch"** button

#### 5. Production Deploy

**Automatic!** Cloudflare deploys to `vaprballistics.com` when PR merges to `main`.

---

## 🔄 Typical Development Cycle

### Quick Change (Direct Push)

```powershell
# 1. Make changes
code apps/landing-page/app/page.tsx

# 2. Test locally
pnpm dev  # Verify at http://localhost:3002

# 3. Commit and push
git add apps/landing-page/
git commit -m "content(landing-page): update hero text"
git push origin main

# 4. Wait ~2-3 min for auto-deploy
# Check: https://vaprballistics.com
```

### Feature Development (PR Workflow)

```powershell
# 1. Create feature branch
git checkout -b feat/pricing-page

# 2. Make changes
code apps/landing-page/app/pricing/page.tsx

# 3. Test locally
pnpm dev
pnpm build  # Test production build

# 4. Commit
git add apps/landing-page/
git commit -m "feat(landing-page): add pricing page"

# 5. Push and create PR
git push -u origin feat/pricing-page
# Go to GitHub and create PR

# 6. Review preview deployment
# Click Cloudflare Pages link in PR

# 7. Merge PR on GitHub
# Auto-deploys to production

# 8. Clean up locally
git checkout main
git pull origin main
git branch -d feat/pricing-page
```

---

## 📍 Current Deployment Status

### Production
- **URL**: https://vaprballistics.com *(once custom domain added)*
- **Preview URL**: https://vapr-ballistics-landing.pages.dev
- **Branch**: `main`
- **Auto-deploy**: ✅ Enabled

### Cloudflare Pages Settings

**Build Configuration:**
```
Build command: cd apps/landing-page && pnpm build
Build output: apps/landing-page/out
Node version: 20
```

**Deploy Triggers:**
- ✅ Push to `main` → Production deploy
- ✅ Pull requests → Preview deploy
- ✅ Manual deploy → From dashboard

---

## 🎯 Quick Reference Commands

```powershell
# Development
pnpm dev                    # Start dev server (port 3002)
pnpm build                  # Build for production
pnpm start                  # Preview production build
pnpm lint                   # Lint code
pnpm type-check             # TypeScript type checking

# Git - Feature Branch
git checkout -b feat/my-feature
git add apps/landing-page/
git commit -m "feat(landing-page): description"
git push -u origin feat/my-feature

# Git - Direct to Main
git add apps/landing-page/
git commit -m "fix(landing-page): description"
git push origin main

# Git - Sync with Main
git checkout main
git pull origin main

# Git - Clean Up Branches
git branch -d feat/old-feature
git push origin --delete feat/old-feature
```

---

## 🐛 Troubleshooting

### TypeScript Errors in VS Code

If you see "Cannot find module" errors:

1. Press `Ctrl+Shift+P`
2. Type: `TypeScript: Restart TS Server`
3. Press Enter

Or restart VS Code.

### Build Fails on Cloudflare

Check build logs in Cloudflare Pages dashboard:
1. Go to **Pages** → **vapr-ballistics-landing**
2. Click on failed deployment
3. View **Build logs**

Common issues:
- Missing dependencies → Check `package.json`
- Build command wrong → Should be `cd apps/landing-page && pnpm build`
- Output directory wrong → Should be `apps/landing-page/out`

### Preview Not Working

Make sure `next.config.ts` has:
```typescript
output: 'export'  // Required for static export
```

### Dark Mode Issues

Theme persists via `localStorage`. Clear browser storage if needed:
```javascript
// In browser console
localStorage.removeItem('theme')
```

---

## 📚 Useful Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 🎨 Design System

### Colors
Defined in `app/globals.css` using CSS variables:
- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--primary`, `--primary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`

### Typography
- **Font**: Geist Sans (default), Geist Mono (code)
- **Headings**: `text-4xl`, `text-3xl`, `text-2xl`
- **Body**: `text-lg`, `text-base`, `text-sm`

### Components
All UI components are in `components/ui/`:
- `button.tsx` - Button variants
- `card.tsx` - Card containers
- `badge.tsx` - Small labels

---

## ✅ Pre-Deploy Checklist

Before pushing to production:

- [ ] Test locally with `pnpm dev`
- [ ] Build successfully with `pnpm build`
- [ ] Check responsive design (mobile/tablet/desktop)
- [ ] Verify dark mode works
- [ ] Test all links and buttons
- [ ] Run `pnpm lint` (no errors)
- [ ] Run `pnpm type-check` (no errors)
- [ ] Commit message follows conventional commits
- [ ] Push to feature branch first (if using PR workflow)

---

**Happy coding! 🚀**

Need help? Check the [Cloudflare Deployment Guide](../../docs/guides/CLOUDFLARE_DEPLOYMENT.MD)
