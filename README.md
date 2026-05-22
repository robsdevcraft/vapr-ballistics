![Image of VAPR Ballistics logo](/apps/fastapi-fullstack/frontend/public/vapr-ballistics.svg "VAPR logo")

# VAPR Ballistics

**Open-source Ballistics Calculator.** Privacy-first, ongoing development, always free.

## 📦 Monorepo Structure

This repository contains three applications:

```
vapr-ballistics/
├── apps/
│   ├── landing-page/        # Marketing site (vaprballistics.com)
│   ├── js-client/           # Pure client-side calculator
│   └── fastapi-fullstack/   # Full-stack calculator (FastAPI + React)
├── packages/                # Shared packages (future)
└── docs/                    # Documentation
```

---

## 🎯 Applications

### 1. Landing Page (`apps/landing-page/`)

**Marketing website** for vaprballistics.com

- **Framework**: Next.js 16 with React 19
- **UI**: shadcn/ui with Tailwind CSS v4
- **Deployment**: Static export, CDN-ready
- **Port**: 3002

**Quick Start:**

```bash
cd apps/landing-page
pnpm install
pnpm dev
```

---

### 2. JS Client (`apps/js-client/`)

**Pure client-side ballistics calculator** - No backend required!

- **Framework**: Next.js 15 with React 19
- **Ballistics Engine**: [js-ballistics](https://www.npmjs.com/package/js-ballistics) v2.2.0-beta.2
- **UI**: Shadcn/ui with Tailwind CSS v4
- **Charts**: Recharts for trajectory visualization
- **Deployment**: Static export, CDN-ready

---

### 2. JS Client (`apps/js-client/`)

**Pure client-side ballistics calculator** - No backend required!

- **Framework**: Next.js 15 with React 19
- **Ballistics Engine**: [js-ballistics](https://www.npmjs.com/package/js-ballistics) v2.2.0-beta.2
- **UI**: Shadcn/ui with Tailwind CSS v4
- **Charts**: Recharts for trajectory visualization
- **Deployment**: Static export, CDN-ready
- **Port**: 3000

**Use Cases:**

- Offline ballistics calculations
- Privacy-first (no data leaves your device)
- Fast, lightweight deployments
- No server costs

**Quick Start:**

```bash
cd apps/js-client
pnpm install
pnpm dev
```

---

### 3. FastAPI Fullstack (`apps/fastapi-fullstack/`)

**Traditional full-stack application** with Python backend and React frontend.

- **Backend**: FastAPI with [py-ballisticcalc](https://github.com/o-murphy/py-ballisticcalc)
- **Frontend**: Next.js 15 with React 19
- **API**: RESTful with OpenAPI docs
- **Deployment**: Docker Compose, multi-container

**Use Cases:**

- Advanced server-side calculations
- API for mobile apps
- Enterprise deployments
- Complex ballistics modeling

**Quick Start (Docker):**

```bash
cd apps/fastapi-fullstack/docker
docker compose -f docker-compose.dev.yml up --build
```

**Access:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

**Quick Start (Manual):**

```bash
# Backend
cd apps/fastapi-fullstack/backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements-dev.txt
uvicorn app.main:app --reload --port 8000

# Frontend (new terminal)
cd apps/fastapi-fullstack/frontend
npm install
npm run dev
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **pnpm** 10+ (for both apps)
- **Python** 3.11+ (for FastAPI fullstack only)
- **Docker** (optional, for FastAPI fullstack)

### Installation

```bash
# Clone the repository
git clone https://github.com/robsdevcraft/vapr-ballistics.git
cd vapr-ballistics

# Install root dependencies (Turborepo)
pnpm install
```

### Development

**Run JS Client:**

```bash
pnpm --filter @vapr/js-client dev
```

**Run FastAPI Fullstack (Docker):**

```bash
cd apps/fastapi-fullstack/docker
docker compose -f docker-compose.dev.yml up --build
```

**Build All Apps:**

```bash
pnpm build
```

---

## 📊 Feature Comparison

| Feature                   | JS Client           | FastAPI Fullstack       |
| ------------------------- | ------------------- | ----------------------- |
| **Backend Required**      | ❌ No               | ✅ Yes                  |
| **Ballistics Engine**     | js-ballistics       | py-ballisticcalc        |
| **Offline Capable**       | ✅ Yes              | ❌ No                   |
| **API Available**         | ❌ No               | ✅ Yes                  |
| **Deployment Complexity** | Low (CDN)           | Medium (Docker)         |
| **Server Costs**          | None                | Required                |
| **Best For**              | Static sites, demos | Enterprise, mobile APIs |

---

## 🛠️ Tech Stack

### Shared

- **Monorepo**: Turborepo v2.5.8
- **Package Manager**: pnpm v10.18.1
- **Frontend Framework**: Next.js 15 with React 19
- **UI Library**: Shadcn/ui with Tailwind CSS v4
- **Charts**: Recharts v3.1.2
- **Forms**: React Hook Form + Zod validation
- **TypeScript**: Full type safety

### JS Client Specific

- **Ballistics**: js-ballistics v2.2.0-beta.2
- **Deployment**: Static export

### FastAPI Fullstack Specific

- **Backend**: FastAPI with Python 3.11+
- **Ballistics**: py-ballisticcalc v2.2.6.post1+
- **API Docs**: OpenAPI/Swagger
- **Container**: Docker + Docker Compose
- **Reverse Proxy**: Nginx (production)

---

## 📁 Project Structure

```
vapr-ballistics/
├── apps/
│   ├── js-client/                    # Client-only app
│   │   ├── src/
│   │   │   ├── app/                  # Next.js app router
│   │   │   ├── components/           # React components
│   │   │   ├── hooks/                # Custom hooks
│   │   │   └── lib/                  # Utilities & ballistics
│   │   ├── package.json
│   │   └── next.config.ts
│   │
│   └── fastapi-fullstack/            # Fullstack app
│       ├── backend/                  # FastAPI backend
│       │   ├── app/
│       │   │   ├── main.py
│       │   │   ├── routers/
│       │   │   ├── services/
│       │   │   └── models/
│       │   └── requirements.txt
│       │
│       ├── frontend/                 # Next.js frontend
│       │   ├── src/
│       │   │   ├── app/
│       │   │   └── components/
│       │   └── package.json
│       │
│       ├── docker/                   # Docker orchestration
│       │   ├── docker-compose.yml
│       │   ├── docker-compose.dev.yml
│       │   ├── docker-compose.prod.yml
│       │   └── nginx.conf
│       │
│       ├── scripts/                  # Development scripts
│       │   ├── dev/
│       │   ├── prod/
│       │   └── deploy/
│       │
│       └── README.md
│
├── docs/                             # Documentation
├── packages/                         # Shared packages (future)
├── package.json                      # Root workspace config
├── pnpm-workspace.yaml              # pnpm workspace definition
└── turbo.json                        # Turborepo config
```

---

## 🔧 Development Workflow

### Working on JS Client

```bash
# Run dev server
pnpm --filter @vapr/js-client dev

# Build for production
pnpm --filter @vapr/js-client build

# Lint code
pnpm --filter @vapr/js-client lint
```

### Working on FastAPI Fullstack

**Using Docker (Recommended):**

```bash
cd apps/fastapi-fullstack/scripts/dev/windows
start.bat  # Windows

# Or Unix
cd apps/fastapi-fullstack/scripts/dev/unix
./start.sh
```

**Manual Development:**

```bash
# Backend
cd apps/fastapi-fullstack/backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements-dev.txt
uvicorn app.main:app --reload --port 8000

# Frontend (new terminal)
cd apps/fastapi-fullstack/frontend
npm install
npm run dev
```

### Turborepo Commands

```bash
# Build all apps
pnpm build

# Run all dev servers
pnpm dev

# Lint all apps
pnpm lint

# Clean all builds
pnpm clean
```

---

## 📚 Documentation

- **JS Client**: See `apps/js-client/README.md`
- **FastAPI Fullstack**: See `apps/fastapi-fullstack/README.md`
- **Scripts Guide**: See `apps/fastapi-fullstack/scripts/README.md`

---

## 🐛 Troubleshooting

### JS Client Issues

**Port 3000 already in use:**

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Unix
lsof -ti:3000 | xargs kill -9
```

**Build errors:**

```bash
cd apps/js-client
rm -rf .next node_modules
pnpm install
pnpm build
```

### FastAPI Fullstack Issues

**Docker build slow:**

- The `.dockerignore` files should exclude `__pycache__`, `node_modules`, etc.
- If build context is large, verify `.dockerignore` exists in `backend/` and `frontend/`

**Backend won't start:**

```bash
cd apps/fastapi-fullstack/backend
python --version  # Verify 3.11+
pip install -r requirements.txt
```

**Frontend API connection:**

- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check backend is running on port 8000
- Review CORS settings in backend

---

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[js-ballistics](https://www.npmjs.com/package/js-ballistics)** - Client-side ballistics library
- **[py-ballisticcalc](https://github.com/o-murphy/py-ballisticcalc)** - Python ballistics library
- Huge thank you to [o-murphy](https://github.com/o-murphy) for building and maintaining both libraries
- **[shadcn/ui](https://ui.shadcn.com/)** - The web standard for UI components
- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern Python web framework
- **[Next.js](https://nextjs.org/)** - React framework
- **[Turborepo](https://turbo.build/)** - High-performance monorepo build system

---

## 📧 Support

For ideas, suggestions, or overall discussion for this repo please create a post in [discussions](https://github.com/robsdevcraft/vapr-ballistics/discussions).

---

## ⚠️ Disclaimer

This application is for educational and recreational purposes ONLY. Verify incrementally at shorter ranges first and always verify calculations with additional sources for direct applications. You own every round that leaves your muzzle.

---

## 👨‍💻 Maintainer

USMC OEF Infantry Veteran, PRS + IDPA Competitor, USCCA Certified Instructor, Hunter and IT Nerd [Robert Anderson](https://github.com/robsdevcraft). These tools should be free and most importantly easy to use. I am making the best version I can through VAPR Ballistics. I hope you get a chance to try it and provide feedback to make this the best tool it can possibly be.

**VAPR - leave no trace...**
