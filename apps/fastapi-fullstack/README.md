# VAPR Ballistics - FastAPI Fullstack

Full-stack ballistics calculator with Python FastAPI backend and React frontend.

## Features

- ✅ FastAPI backend with ballistics calculations
- ✅ React frontend with modern UI
- ✅ RESTful API
- ✅ Docker support (dev & prod)
- ✅ Nginx reverse proxy (production)

## Tech Stack

### Backend

- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Ballistics**: Custom Python implementation
- **API**: RESTful with OpenAPI docs

### Frontend

- **Framework**: Next.js 15 with React 19
- **UI Library**: Shadcn/ui with Tailwind CSS v4
- **Charts**: Recharts
- **API Client**: Fetch API

## Development

### Local Development (without Docker)

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements-dev.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

### Docker Development

```bash
# From the docker directory
cd docker
docker-compose -f docker-compose.dev.yml up --build
```

**Access:**

- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Frontend: http://localhost:3000

## Production

```bash
cd docker
docker-compose -f docker-compose.prod.yml up -d --build
```

**Note**: Update environment variables in `docker-compose.prod.yml` for your domain.

## Project Structure

```
fastapi-fullstack/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── main.py      # FastAPI app
│   │   ├── models/      # Data models
│   │   ├── routers/     # API routes
│   │   └── services/    # Business logic
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/            # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
└── docker/              # Docker orchestration
    ├── docker-compose.yml
    ├── docker-compose.dev.yml
    ├── docker-compose.prod.yml
    └── nginx.conf
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/ballistics/calculate` - Calculate trajectory
- `GET /docs` - OpenAPI documentation

## Environment Variables

### Backend

- `ENVIRONMENT` - development/production
- `DEBUG` - true/false
- `ALLOWED_ORIGINS` - CORS allowed origins
- `SECRET_KEY` - API secret key (production)

### Frontend

- `NEXT_PUBLIC_API_URL` - Backend API URL (defaults to http://localhost:8000 in dev)

---

**Note**: This is the traditional fullstack version. For a pure client-side version, see `apps/js-client/`.
