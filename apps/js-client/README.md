# VAPR Ballistics - Client-Only (js-ballistics)This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



Pure client-side ballistics calculator using Next.js and the `js-ballistics` library.## Getting Started



## FeaturesFirst, run the development server:



- ✅ Client-side ballistics calculations (no backend required)```bash

- ✅ Modern Next.js 15 with React 19npm run dev

- ✅ Shadcn/ui components with dark mode# or

- ✅ Real-time trajectory calculationsyarn dev

- ✅ Interactive charts (Recharts)# or

- ✅ CSV export functionalitypnpm dev

# or

## Tech Stackbun dev

```

- **Framework**: Next.js 15

- **Ballistics**: js-ballistics v2.2.0Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **UI**: Shadcn/ui + Tailwind CSS v4

- **Charts**: RechartsYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- **Forms**: React Hook Form + Zod

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Development

## Learn More

```bash

# Install dependencies (from monorepo root)To learn more about Next.js, take a look at the following resources:

pnpm install

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

# Run dev server- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

pnpm --filter @vapr/js-client dev

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

# Build for production

pnpm --filter @vapr/js-client build## Deploy on Vercel



# Start production serverThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

pnpm --filter @vapr/js-client start

```Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Docker

```bash
# Build image
docker build -t vapr-js-client .

# Run container
docker run -p 3000:3000 vapr-js-client
```

## Environment Variables

No environment variables required - fully client-side!

## Deployment

Can be deployed to any static hosting platform:
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- Any static web server

---

**Note**: This is a standalone client-side application. For the FastAPI fullstack version, see `apps/fastapi-fullstack/`.
