# Landing Page Deployment - Cloudflare Pages

Complete guide to deploy the VAPR Ballistics landing page to **vaprballistics.com** using Cloudflare Pages.

## Why Cloudflare Pages?

- ✅ **100% Free** - Unlimited bandwidth, unlimited requests
- ✅ **Lightning Fast** - Global CDN with 300+ data centers
- ✅ **Auto HTTPS** - Free SSL certificates
- ✅ **GitHub Integration** - Auto-deploys on push
- ✅ **Preview Deployments** - Every PR gets a preview URL
- ✅ **Edge Functions** - Run serverless at the edge (if needed later)

---

## Prerequisites

1. **GitHub Account** - Your repo is already on GitHub ✓
2. **Cloudflare Account** - Free account at [cloudflare.com](https://cloudflare.com)
3. **Domain** - vaprballistics.com (you have this!)

---

## Option 1: Cloudflare Dashboard (Recommended for First Deploy)

### Step 1: Connect to Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Pages** in the left sidebar
3. Click **Create a project**
4. Click **Connect to Git**
5. Select **GitHub** and authorize Cloudflare
6. Select your repository: `robsdevcraft/vapr-ballistics`

### Step 2: Configure Build Settings

```
Project name: vapr-ballistics-landing
Production branch: main

Build settings:
├── Framework preset: Next.js (Static HTML Export)
├── Build command: cd apps/landing-page && pnpm build
├── Build output directory: apps/landing-page/out
└── Root directory: (leave blank - we use cd in build command)

Environment variables:
└── NODE_VERSION: 20
```

**Important**: Use the exact build command above with `cd apps/landing-page &&` prefix since we're in a monorepo.

### Step 3: Deploy

1. Click **Save and Deploy**
2. Wait ~2-3 minutes for first build
3. You'll get a URL like: `vapr-ballistics-landing.pages.dev`

### Step 4: Add Custom Domain

1. In your Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `vaprballistics.com`
4. Cloudflare will auto-configure DNS if your domain is already on Cloudflare
5. Also add: `www.vaprballistics.com` (redirects to apex)

**DNS Records (if manual setup needed):**
```
CNAME  @    vapr-ballistics-landing.pages.dev
CNAME  www  vapr-ballistics-landing.pages.dev
```

---

## Option 2: Wrangler CLI (For Advanced Users)

### Step 1: Install Wrangler

```bash
# Install globally
npm install -g wrangler

# Or use with npx (no install needed)
npx wrangler --version
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

This opens a browser window to authenticate.

### Step 3: Build and Deploy

```bash
# From monorepo root
cd apps/landing-page

# Build the static site
pnpm build

# Deploy to Cloudflare Pages
wrangler pages deploy out --project-name=vapr-ballistics-landing
```

**First time?** Wrangler will ask:
- Project name: `vapr-ballistics-landing`
- Production branch: `main`

### Step 4: Configure CI/CD (Optional)

Create `.github/workflows/deploy-landing.yml`:

```yaml
name: Deploy Landing Page

on:
  push:
    branches: [main]
    paths:
      - 'apps/landing-page/**'
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build landing page
        run: |
          cd apps/landing-page
          pnpm build
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy apps/landing-page/out --project-name=vapr-ballistics-landing
```

**Get your secrets:**
1. API Token: Dashboard → My Profile → API Tokens → Create Token → "Edit Cloudflare Workers" template
2. Account ID: Dashboard → Pages → Any project → Right sidebar

Add to GitHub: Settings → Secrets and variables → Actions → New repository secret

---

## Best Practices & Configuration

### 1. Branch Preview Deployments

**Automatic!** Every PR gets a unique preview URL:
- Format: `<PR-number>.vapr-ballistics-landing.pages.dev`
- Perfect for testing before merging

**Configure in Dashboard:**
- Pages → Your project → Settings → Builds & deployments
- Enable "Enable preview deployments" ✓
- Set preview branch patterns: `*` (all branches)

### 2. Build Configuration

**Recommended `wrangler.toml`** (optional, for advanced config):

```toml
# apps/landing-page/wrangler.toml
name = "vapr-ballistics-landing"
compatibility_date = "2025-01-01"

[site]
bucket = "./out"

[build]
command = "pnpm build"
cwd = "."
watch_dirs = ["app", "components", "public"]

[[pages_build_output_dir]]
value = "out"
```

### 3. Headers & Redirects

Create `apps/landing-page/public/_headers`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Cache-Control: public, max-age=31536000, immutable

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/*.svg
  Cache-Control: public, max-age=31536000, immutable
```

Create `apps/landing-page/public/_redirects`:

```
# Redirect www to apex
https://www.vaprballistics.com/* https://vaprballistics.com/:splat 301!

# Redirect old paths (if any)
# /old-path /new-path 301
```

### 4. Environment Variables

If needed later, add in Dashboard:
- Pages → Your project → Settings → Environment variables

Example:
```
NEXT_PUBLIC_API_URL = https://api.vaprballistics.com
```

### 5. Analytics (Optional)

Enable free Cloudflare Web Analytics:
- Pages → Your project → Analytics
- Toggle "Web Analytics" on
- Zero performance impact, privacy-friendly

---

## Monorepo Considerations

Since you're in a monorepo with multiple apps:

### Build Command Options:

**Option A: Simple (Dashboard)**
```bash
cd apps/landing-page && pnpm build
```

**Option B: Root-level script (Recommended)**

Add to root `package.json`:
```json
{
  "scripts": {
    "build:landing": "turbo run build --filter=landing-page"
  }
}
```

Then use in Cloudflare:
```bash
pnpm build:landing
```

**Option C: Turborepo (Advanced)**
```bash
pnpm install && turbo run build --filter=landing-page
```

### Ignore Other Apps

Create `apps/landing-page/.cfignore`:
```
# Don't upload other apps
../../apps/js-client
../../apps/fastapi-fullstack

# Don't upload dev files
../../node_modules
../../.git
```

---

## Troubleshooting

### Build Fails: "pnpm: command not found"

**Fix**: Add environment variable in Cloudflare:
```
PNPM_VERSION = 8.15.0
```

Or use `npm` instead:
```bash
cd apps/landing-page && npm install && npm run build
```

### Build Fails: "Module not found"

**Fix**: Make sure all dependencies are in `apps/landing-page/package.json`, not just root.

Run locally first:
```bash
cd apps/landing-page
pnpm install
pnpm build
```

### Wrong Output Directory

**Fix**: Verify `apps/landing-page/next.config.ts` has:
```typescript
output: 'export',
distDir: 'out',
```

### Images Not Loading

**Fix**: Next.js Image Optimization is disabled for static export. Use:
```tsx
<Image unoptimized src="..." />
```

Or configure in `next.config.ts`:
```typescript
images: {
  unoptimized: true
}
```

---

## Post-Deployment Checklist

- [ ] Site loads at `vaprballistics.com`
- [ ] HTTPS working (green padlock)
- [ ] `www.vaprballistics.com` redirects to apex
- [ ] Theme toggle works
- [ ] All images load correctly
- [ ] Mobile responsive
- [ ] Preview deployments working on PRs

---

## Local Testing Before Deploy

Always test the static build locally first:

```bash
cd apps/landing-page

# Build
pnpm build

# Serve locally (install serve if needed)
npx serve out -p 3002

# Or use Python
python -m http.server 3002 --directory out
```

Visit `http://localhost:3002` - should look exactly like production.

---

## Useful Cloudflare CLI Commands

```bash
# Check Wrangler version
wrangler --version

# Login/logout
wrangler login
wrangler logout

# List projects
wrangler pages projects list

# Deploy specific project
wrangler pages deploy out --project-name=vapr-ballistics-landing

# Deploy to staging/production
wrangler pages deploy out --branch=staging
wrangler pages deploy out --branch=main

# View deployment logs
wrangler pages deployment tail

# Rollback to previous deployment
# (Do this in Cloudflare Dashboard → Pages → Deployments)
```

---

## Cost

**$0.00** - Everything is free:
- ✅ Unlimited bandwidth
- ✅ Unlimited requests
- ✅ Unlimited builds
- ✅ Free SSL
- ✅ Free preview deployments
- ✅ Free analytics

---

## Next Steps

1. Deploy using **Option 1** (Dashboard) first - it's easiest
2. Verify everything works at your preview URL
3. Add custom domain `vaprballistics.com`
4. Test thoroughly
5. Celebrate! 🎉

The other apps (js-client, fastapi-fullstack) stay in development for now.

---

## Support

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Community Discord](https://discord.gg/cloudflaredev)
