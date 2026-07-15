# Changelog

## 1.0.0 (2026-07-11)

### Features
- Amazon product scraper with multi-selector fallback and captcha detection
- BullMQ background job queue with Redis for reliable async scraping
- Configurable margin-based price calculation
- Supabase integration for product storage and sync audit logging
- Rate limiting on all API endpoints
- Circuit breaker pattern for Amazon scraper resilience
- Sentry error monitoring integration

### Infrastructure
- Docker Compose setup (Next.js API + Redis + Worker)
- GitHub Actions CI (typecheck, lint, test, build)
- Husky pre-commit hooks with lint-staged
- Database migration script (`npm run db:migrate`)
- Zod request validation on all API routes
- Pino structured logging

### Dashboard
- Server-rendered admin dashboard at `/` with real-time product table
- Health check endpoint at `/api/health`
- Queue status monitoring at `/api/queue/status`
- Postman API collection included
