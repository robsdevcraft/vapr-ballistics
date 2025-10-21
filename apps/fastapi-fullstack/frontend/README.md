# FastAPI Fullstack - Frontend

Next.js frontend for the VAPR Ballistics FastAPI fullstack application.

## Overview

This frontend connects to the FastAPI backend for server-side ballistics calculations using [py-ballisticcalc](https://github.com/o-murphy/py-ballisticcalc).

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **UI Library**: Shadcn/ui with Tailwind CSS v4
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **API Client**: Fetch API

## Development

**Standalone (requires backend running on port 8000):**
```bash
npm install
npm run dev
```

**With Docker (recommended):**
```bash
cd ../docker
docker-compose -f docker-compose.dev.yml up --build
```

## Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## API Integration

This frontend makes requests to the FastAPI backend at `/api/ballistics/calculate`.

See the parent README (`apps/fastapi-fullstack/README.md`) for full stack setup instructions.

---

**Part of the FastAPI Fullstack app** - See `apps/fastapi-fullstack/README.md` for complete documentation.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
