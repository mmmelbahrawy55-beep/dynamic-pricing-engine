# Dynamic Pricing Engine

A production-grade pricing engine that scrapes Amazon product prices and automatically calculates optimal selling prices based on configurable margin targets. Built with **Next.js 14**, **BullMQ**, **Supabase**, and **TypeScript**.

## Architecture

```
┌─────────────┐     ┌──────────┐     ┌───────────┐
│  Vercel     │     │  BullMQ  │     │  Worker   │
│  Cron Job   │────▶│  Queue   │────▶│ (separate │
│  (/api/cron)│     │  (Redis) │     │  process) │
└─────────────┘     └──────────┘     └─────┬─────┘
                                           │
           ┌───────────────────────────────┤
           │                               │
           ▼                               ▼
     ┌───────────┐                  ┌───────────┐
     │  Amazon   │                  │ Supabase  │
     │  (HTTP)   │                  │ (Postgres)│
     └───────────┘                  └───────────┘
```

## Features

- **Amazon Scraping** — Multi-selector fallback, user-agent rotation, captcha detection
- **Background Queue** — BullMQ with Redis for reliable async processing with automatic retries
- **Price Calculation** — Configurable margin percentage with floating-point safety
- **Sync Audit** — Every operation logged in `sync_logs` table for full traceability
- **Health Checks** — `/api/health` endpoint with Supabase connectivity checks
- **Type-Safe** — Full TypeScript strict mode with Zod request validation
- **Dockerized** — One-command startup with `docker compose up`

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Database | Supabase (PostgreSQL) |
| Queue | BullMQ + Redis |
| Scraping | Axios + Cheerio |
| Validation | Zod |
| Logging | Pino |
| Testing | Vitest |
| CI | GitHub Actions |
| Container | Docker + Compose |

## Getting Started

### Prerequisites

- Node.js 20+
- Redis 7+ (or `docker compose up`)
- Supabase project (or `schema.sql`)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.local.example .env.local
# Fill in SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, REDIS_URL

# 3. Start Redis (if not already running)
docker compose up redis -d

# 4. Run database migrations
# Paste schema.sql into Supabase SQL Editor

# 5. Start development server
npm run dev
```

### Running the Worker

The worker processes queued scrape jobs. Run it in a separate terminal:

```bash
npm run worker
```

### Docker (Production)

```bash
docker compose up --build
```

## API Reference

### `POST /api/scrape`

Scrape a single Amazon product synchronously.

```json
{ "url": "https://www.amazon.com/dp/B08N5WRWNW" }
```

### `POST /api/queue/scrape`

Enqueue a product for background scraping.

```json
{ "productId": "uuid", "amazonUrl": "https://...", "margin": 25 }
```

### `GET /api/cron/sync`

Enqueue all pending products for sync (called by Vercel Cron).

### `GET /api/queue/status`

View queue depth and job counts.

### `GET /api/health`

Health check with dependency status.

## Project Structure

```
src/
├── app/api/               # Next.js API routes
│   ├── cron/sync/         # Cron job endpoint
│   ├── health/            # Health check
│   ├── queue/             # Queue management
│   └── scrape/            # Synchronous scrape
├── lib/
│   ├── queue/             # BullMQ config, producers, worker
│   ├── scrapers/          # Amazon scraper
│   ├── services/          # Business logic
│   ├── pricing.ts         # Price calculation utility
│   ├── validation.ts      # Zod schemas
│   ├── errors.ts          # Standard error responses
│   ├── logger.ts          # Pino logger
│   ├── supabase.ts        # Supabase client
│   ├── types.ts           # Shared interfaces
│   └── user-agents.ts     # UA rotation
├── worker/                # Standalone worker process
└── __tests__/             # Unit tests
```

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch
```

## Deployment

### Vercel

1. Connect your GitHub repository
2. Set environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `REDIS_URL` (Upstash Redis)
   - `CRON_SECRET`
3. Deploy — the cron job is configured in `vercel.json`

### Worker

Deploy the worker separately to Railway / Render:

```bash
npm run worker
```

## CI/CD

GitHub Actions runs on every push:
- `typecheck` — TypeScript compilation
- `lint` — ESLint
- `test` — Vitest
- `build` — Next.js production build

## License

MIT
