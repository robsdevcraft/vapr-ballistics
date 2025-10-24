# VAPR Ballistics - Landing Page

Marketing landing page for [vaprballistics.com](https://vaprballistics.com).

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **UI**: shadcn/ui with Tailwind CSS v4
- **Theme**: Dark mode by default with toggle
- **Deployment**: Static export for CDN hosting

## Development

```bash
pnpm dev      # Start dev server on port 3002
pnpm build    # Build for production
pnpm start    # Start production server
```

## Deployment

```bash
pnpm build    # Generates static export in ./out
```

Deploy the `out/` directory to any static hosting provider (Vercel, Netlify, Cloudflare Pages, etc.).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
