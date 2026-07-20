# API

NestJS backend for menu, orders, customers, stock, admin auth, and payments.

## Commands

```bash
npm run dev:api
npm run build:api
npm run start:api
```

The API starts on `http://localhost:3000` by default.

Health check:

```bash
curl http://localhost:3000/api/health
```

## Local database

The root `docker-compose.yml` provides PostgreSQL for the future API.

```bash
npm run db:up
```

Copy `apps/api/.env.example` to `apps/api/.env` for local Node development if needed.

## Docker

The API can also run with Docker Compose:

```bash
docker compose up -d api
```
