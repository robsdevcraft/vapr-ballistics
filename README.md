# VAPR Ballistics

Advanced ballistics calculator implementations in a Turborepo monorepo.

## 📦 Monorepo Structure

This repository contains two separate ballistics calculator implementations:

```
vapr-ballistics/
├── apps/
│   ├── js-client/           # Pure client-side calculator (js-ballistics)
│   └── fastapi-fullstack/   # Full-stack calculator (FastAPI + React)
├── packages/                # Shared packages (future)
└── docs/                    # Documentation
```

## 🎯 Applications

### 1. JS Client (`apps/js-client/`)

**Pure client-side ballistics calculator** - No backend required!

- **Framework**: Next.js 15 with React 19
- **Ballistics Engine**: [js-ballistics](https://www.npmjs.com/package/js-ballistics) v2.2.0-beta.1
- **UI**: Shadcn/ui with Tailwind CSS v4
- **Charts**: Recharts for trajectory visualization
- **Deployment**: Static export, CDN-ready

**Use Cases:**
- Offline ballistics calculations
- Embedded in static sites
- Fast, lightweight deployments
- No server costs

**Quick Start:**
```bash
cd apps/js-client
pnpm install
pnpm dev
```

**Production Build:**
```bash
cd apps/js-client
pnpm build
pnpm start
```

---

### 2. FastAPI Fullstack (`apps/fastapi-fullstack/`)

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
docker-compose -f docker-compose.dev.yml up --build
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

# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

## Production Deployment

### Docker Production

1. **Update environment variables**
   ```bash
   # Update docker-compose.prod.yml with your domains
   # Set SECRET_KEY environment variable
   export SECRET_KEY="your-production-secret-key"
   ```

2. **Deploy with Docker Compose**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Manual Deployment

#### Backend Production

```bash
cd backend

# Install production dependencies
pip install -r requirements.txt

# Set environment variables
export ENVIRONMENT=production
export DEBUG=false
export SECRET_KEY="your-production-secret-key"

# Run with Gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
```

#### Frontend Production

```bash
cd frontend

# Build for production
npm run build

# Start production server
npm start
```

## Security Considerations

- ✅ Input validation with Pydantic and Zod
- ✅ CORS configuration
- ✅ Rate limiting ready
- ✅ Environment-based configuration
- ✅ Docker security best practices
- ✅ Dependency vulnerability scanning
- ✅ Production/development environment separation

## Project Structure

```
ballistic-calculator/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── core/           # Core configuration and utilities
│   │   ├── models/         # Pydantic models
│   │   ├── routers/        # API route handlers
│   │   ├── services/       # Business logic
│   │   └── main.py         # FastAPI application
│   ├── tests/              # Backend tests
│   ├── requirements.txt    # Production dependencies
│   ├── requirements-dev.txt # Development dependencies
│   └── Dockerfile
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js 15 App Router
│   │   ├── components/    # React components
│   │   └── lib/           # Utilities
│   ├── public/            # Static assets
│   ├── package.json
│   └── Dockerfile
├── .github/workflows/     # CI/CD pipelines
├── docker-compose.yml     # Development environment
├── docker-compose.prod.yml # Production environment
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Workflow
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
docker-compose -f docker-compose.dev.yml up --build
```

**Build All Apps:**
```bash
pnpm build
```

---

## 📊 Feature Comparison

| Feature | JS Client | FastAPI Fullstack |
|---------|-----------|-------------------|
| **Backend Required** | ❌ No | ✅ Yes |
| **Ballistics Engine** | js-ballistics | py-ballisticcalc |
| **Offline Capable** | ✅ Yes | ❌ No |
| **API Available** | ❌ No | ✅ Yes |
| **Deployment Complexity** | Low (CDN) | Medium (Docker) |
| **Server Costs** | None | Required |
| **Best For** | Static sites, demos | Enterprise, mobile APIs |

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
- **Ballistics**: js-ballistics v2.2.0-beta.1
- **Deployment**: Static export

### FastAPI Fullstack Specific
- **Backend**: FastAPI with Python 3.11+
- **Ballistics**: py-ballisticcalc v2.2.1+
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
- **Migration Guide**: See `docs/js-ballistics-migration.md`
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
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components
- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern Python web framework
- **[Next.js](https://nextjs.org/)** - React framework
- **[Turborepo](https://turbo.build/)** - High-performance monorepo build system

---

## 📧 Support

For issues, questions, or contributions:
- **GitHub Issues**: [vapr-ballistics/issues](https://github.com/robsdevcraft/vapr-ballistics/issues)
- **Repository**: [github.com/robsdevcraft/vapr-ballistics](https://github.com/robsdevcraft/vapr-ballistics)

---

**⚠️ Disclaimer**: This application is for educational and recreational purposes. Always verify ballistics calculations with additional sources for critical applications.
