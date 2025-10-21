# VAPR Ballistics - JS Client

Pure client-side ballistics calculator using [js-ballistics](https://www.npmjs.com/package/js-ballistics). **No backend required!**

## ✨ Features

- ✅ **Client-Side Only**: Runs entirely in the browser, no server needed
- ✅ **Offline Capable**: Works without internet connection
- ✅ **Interactive Charts**: Drop chart, windage chart, and velocity chart
- ✅ **Windage Indicators**: L/R directional indicators for top-down view
- ✅ **CSV Export**: Export trajectory data to CSV
- ✅ **Theme Support**: Light and dark mode
- ✅ **Responsive Design**: Works on desktop and mobile

## 🚀 Tech Stack

- **Framework**: Next.js 15 with React 19
- **Ballistics Engine**: js-ballistics v2.2.0-beta.1
- **UI Library**: Shadcn/ui with Tailwind CSS v4
- **Charts**: Recharts v3.1.2
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

## 📦 Installation

```bash
# From the monorepo root
pnpm install

# Or directly in this directory
cd apps/js-client
pnpm install
```

## 🛠️ Development

```bash
# Run dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

**Dev server runs on:** http://localhost:3000

## 🏗️ Build Output

This app is configured for the monorepo and uses:

- `outputFileTracingRoot` pointing to monorepo root
- Standalone output disabled (to avoid Windows symlink issues)

## 📊 Ballistics Features

- **Drop Chart**: Bullet drop trajectory visualization
- **Windage Chart**: Wind drift with L/R indicators (top-down view)
- **Velocity Chart**: Velocity over distance
- **Data Table**: Complete trajectory data with CSV export
- **Input Validation**: Comprehensive form validation with Zod

## 🎨 UI Components

Built with shadcn/ui components:

- Tabs for chart navigation
- Cards for data display
- Forms with validation
- Theme toggle (light/dark mode)
- Responsive tables
- Toast notifications

## 📱 Deployment

Since this is a pure client-side app, you can deploy it anywhere static files are served:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Any CDN or static host**

```bash
# Build for static export (if configured)
pnpm build
```

## 🔧 Configuration

The app uses js-ballistics for calculations. No backend configuration needed!

For monorepo-specific settings, see `next.config.ts`:

- outputFileTracingRoot for proper file tracing
- Optimized package imports for lucide-react

## 📄 License

MIT License - See root LICENSE file

---

**Part of the VAPR Ballistics monorepo** - See root README for more information.
