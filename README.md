![Image of VAPR Ballistics logo](/apps/fastapi-fullstack/frontend/public/vapr-ballistics.svg "VAPR logo")

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

---

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

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Docker Development

Run the entire application with Docker Compose:

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## API Endpoints

### Health & Information
- `GET /api/health` - Health check
- `GET /api/info` - System information

### Ballistics Calculations
- `POST /api/calculate` - Calculate trajectory
- `GET /api/drag-models` - Available drag models
- `POST /api/validate` - Validate parameters

### Example API Request

```json
{
  "weapon": {
    "sight_height": 2.0,
    "twist": 12.0
  },
  "ammo": {
    "bc": 0.5,
    "drag_model": "G1",
    "muzzle_velocity": 2800,
    "bullet_weight": 150
  },
  "atmosphere": {
    "temperature": 59,
    "pressure": 29.92,
    "humidity": 0.5,
    "altitude": 0
  },
  "wind": {
    "speed": 10,
    "direction": 3
  },
  "zero_distance": 100,
  "max_range": 1000,
  "step_size": 25
}
```

## Configuration

### Backend Environment Variables

```bash
# App Configuration
APP_NAME=Ballistics Calculator API
VERSION=1.0.0
ENVIRONMENT=development
DEBUG=true

# Security
SECRET_KEY=your-super-secret-key
ALLOWED_HOSTS=["*"]
ALLOWED_ORIGINS=["http://localhost:3000"]

# Calculation Limits
MAX_RANGE_YARDS=3000.0
MIN_RANGE_YARDS=25.0
MAX_STEP_SIZE=100.0
MIN_STEP_SIZE=1.0
```

### Frontend Environment Variables

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Testing

### Backend Tests

```bash
cd backend

# Run tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_api.py -v
```

### Frontend Tests

```bash
cd frontend

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

1. **Backend Development**
   - Make changes to FastAPI code
   - Add tests for new features
   - Run `pytest` to ensure tests pass
   - Update API documentation if needed

2. **Frontend Development**
   - Make changes to React components
   - Ensure TypeScript types are correct
   - Run `npm run lint` and `npm run build`
   - Test API integration

3. **Testing Changes**
   - Test locally with development servers
   - Test with Docker Compose
   - Verify API endpoints work correctly
   - Check responsive design

## Troubleshooting

### Common Issues

1. **Backend fails to start**
   - Check Python version (3.11+ required)
   - Verify virtual environment is activated
   - Ensure all dependencies are installed
   - Check environment variables

2. **Frontend build errors**
   - Check Node.js version (18+ required)
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Verify environment variables

3. **API connection issues**
   - Verify backend is running on port 8000
   - Check CORS configuration
   - Verify NEXT_PUBLIC_API_URL is correct

4. **Docker issues**
   - Ensure Docker is running
   - Check for port conflicts
   - Verify Docker Compose file syntax

### Performance Optimization in development

- Enable caching for API responses
- Optimize Docker images for production
- Use CDN for static assets
- Implement API rate limiting
- Add database for user sessions and saved calculations

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/robsdevcraft/vapr-ballistics/blob/main/LICENSE) file for details.

## Acknowledgments

- Huge thank you to [o-murphy](https://github.com/o-murphy) for building and maintaining both [py-ballisticcalc](https://github.com/o-murphy/py-ballisticcalc) and [js-ballistics](https://github.com/o-murphy/js-ballistics) - the open source ballistics calculation libraries used in this software.
- [shadcn/ui](https://ui.shadcn.com/) - The web standard for UI components
- [FastAPI](https://fastapi.tiangolo.com/) - Modern web API framework
- [Next.js](https://nextjs.org/) - React framework

## Help

For ideas, suggestions, or overall discussion for this repo please start create a post in [discussions](https://github.com/robsdevcraft/vapr-ballistics/discussions).


## Disclaimer

This application is for educational and recreational purposes ONLY. Verify incrementally at shorter ranges first and always verify calculations with additional sources for direct applications. You own every round that leaves your muzzle. 

## Maintainer

USMC OEF Infantry Veteran, PRS + IDPA Competitor, USCCA Certified Instructor, Hunter and IT Nerd [Robert Anderson](https://github.com/robsdevcraft). These tools should be free and most importantly easy to use. I am making the best version I can through VAPR Ballistics. I hope you get a chance to try it and provide feeback to make this the best tool it can possibly be.

VAPR - leave no trace...
