# API

Future backend NestJS for menu, orders, customers, stock, admin auth, and payments.

This folder is intentionally empty for now. The next step will scaffold NestJS here.

## Local database

The root `docker-compose.yml` provides PostgreSQL for the future API.

```bash
npm run db:up
```

Copy `apps/api/.env.example` to `apps/api/.env` when the NestJS app is created.
