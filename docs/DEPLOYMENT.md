# Deployment Guide

## Overview

VAPR Ballistics consists of three applications with different deployment strategies:

1. **Landing Page** - Static site for vaprballistics.com
2. **JS Client** - Static ballistics calculator
3. **FastAPI Fullstack** - Full-stack application with Docker

---

## 🌐 Landing Page Deployment

**App**: `apps/landing-page`  
**Domain**: vaprballistics.com  
**Type**: Static export

### Recommended: Vercel (Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from landing-page directory
cd apps/landing-page
vercel --prod
```

**Configuration:**
- Framework Preset: Next.js
- Build Command: `pnpm build`
- Output Directory: `out`
- Install Command: `pnpm install`

### Alternative: Cloudflare Pages

1. Connect GitHub repo to Cloudflare Pages
2. Set build settings:
   - Build command: `cd apps/landing-page && pnpm build`
   - Build output: `apps/landing-page/out`
   - Root directory: `/`

### Alternative: Netlify

1. Connect GitHub repo to Netlify
2. Set build settings:
   - Build command: `cd apps/landing-page && pnpm build`
   - Publish directory: `apps/landing-page/out`

### Manual Static Hosting

```bash
cd apps/landing-page
pnpm build

# Upload the 'out' directory to any static host
# - AWS S3 + CloudFront
# - GitHub Pages
# - Any CDN provider
```

---

## 🖥️ JS Client Deployment

**App**: `apps/js-client`  
**Subdomain**: calc.vaprballistics.com (suggested)  
**Type**: Static export

### Option 1: Vercel

```bash
cd apps/js-client
vercel --prod
```

### Option 2: Same as Landing Page

Use the same deployment approach as landing page, but:
- Build output: `apps/js-client/.next` (or use static export)
- Consider deploying as a subdomain or subdirectory

### Static Export Option

Update `apps/js-client/next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

Then deploy the `out` directory like the landing page.

---

## 🐳 FastAPI Fullstack Deployment

**App**: `apps/fastapi-fullstack`  
**Type**: Docker Compose (backend + frontend)

### Production Deployment

**Prerequisites:**
- Docker and Docker Compose installed on server
- Domain configured (e.g., api.vaprballistics.com)
- SSL certificates (Let's Encrypt recommended)

**Deploy:**

```bash
cd apps/fastapi-fullstack/docker
docker-compose -f docker-compose.prod.yml up -d --build
```

**Environment Variables:**

Create `.env` file in `apps/fastapi-fullstack/docker/`:

```bash
# Backend
BACKEND_PORT=8000
PYTHON_ENV=production

# Frontend
FRONTEND_PORT=3001
NEXT_PUBLIC_API_URL=https://api.vaprballistics.com

# Nginx
NGINX_PORT=80
NGINX_SSL_PORT=443
```

### Cloud Deployment Options

#### AWS ECS/Fargate
1. Build and push Docker images to ECR
2. Create ECS task definitions for backend/frontend
3. Deploy with ALB for load balancing

#### Digital Ocean App Platform
1. Connect GitHub repo
2. Configure as Docker Compose app
3. Set environment variables

#### Railway / Render
1. Connect GitHub repo
2. Deploy as Docker Compose
3. Configure environment variables

### Kubernetes (Advanced)

See `docs/guides/kubernetes-deployment.md` (future)

---

## 🔧 CI/CD

Current GitHub Actions workflows:

### `.github/workflows/ci.yml`
- Runs on every push/PR
- Lints, builds, and tests all apps
- Ensures code quality

### `.github/workflows/release.yml`
- Runs on version tags
- Creates GitHub releases
- Publishes changelogs

### Future: Automated Deployments

**Landing Page:**
```yaml
# .github/workflows/deploy-landing.yml
on:
  push:
    branches: [main]
    paths:
      - 'apps/landing-page/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: cd apps/landing-page && pnpm build
      - uses: vercel/actions@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📊 Recommended Architecture

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  vaprballistics.com (Landing Page)              │
│  ├─ Static site on Vercel/Cloudflare           │
│  └─ CDN-distributed                             │
│                                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│                                                 │
│  calc.vaprballistics.com (JS Client)            │
│  ├─ Static calculator on Vercel                │
│  └─ Offline-capable PWA                         │
│                                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│                                                 │
│  api.vaprballistics.com (FastAPI Fullstack)     │
│  ├─ Docker on VPS/Cloud                         │
│  ├─ Backend: FastAPI (port 8000)               │
│  ├─ Frontend: Next.js (port 3001)              │
│  └─ Nginx reverse proxy (ports 80/443)         │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start Commands

**Build everything:**
```bash
pnpm build
```

**Deploy landing page:**
```bash
cd apps/landing-page
vercel --prod
```

**Deploy JS client:**
```bash
cd apps/js-client
vercel --prod
```

**Deploy FastAPI fullstack:**
```bash
cd apps/fastapi-fullstack/docker
docker-compose -f docker-compose.prod.yml up -d
```

---

## 📝 Post-Deployment Checklist

- [ ] Landing page accessible at vaprballistics.com
- [ ] SSL certificates configured
- [ ] DNS records configured
- [ ] Calculator functioning correctly
- [ ] API endpoints responding
- [ ] Monitoring configured (optional)
- [ ] Analytics configured (privacy-first, optional)
- [ ] Error tracking configured (optional)

---

## 🔐 Security Notes

- All apps support HTTPS
- No tracking by default (privacy-first)
- API rate limiting recommended for FastAPI
- CORS configured for frontend-backend communication
- No authentication required (public tools)

---

## 💰 Cost Estimates

**Landing Page (Vercel Free Tier):**
- Cost: $0/month
- Bandwidth: Generous free tier
- Custom domain: Free

**JS Client (Vercel Free Tier):**
- Cost: $0/month
- Static hosting, no server costs

**FastAPI Fullstack (VPS):**
- Digital Ocean Droplet: ~$6-12/month
- AWS EC2 t3.small: ~$15/month
- Render/Railway: ~$7-20/month

**Total Estimated Cost: $0-30/month** (depending on FastAPI deployment)
