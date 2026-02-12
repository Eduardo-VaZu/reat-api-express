# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

TypeScript Express REST API with Prisma ORM and PostgreSQL. Uses ESM modules (`"type": "module"`).

## Commands

### Development

```bash
npm run dev              # Start dev server with tsx watch (hot reload)
docker-compose up -d     # Start PostgreSQL database
```

### Database

```bash
npm run prisma:generate  # Regenerate Prisma client after schema changes
npm run prisma:migrate   # Create and apply migrations
npx prisma studio        # Visual database browser
npx prisma db push       # Sync schema without migrations (dev only)
```

### Testing

```bash
npm run test:vitest      # Run tests with Vitest (primary)
npm run test:jest        # Run tests with Jest
npx vitest path/to/file  # Run a single test file
```

### Build

```bash
npm run build            # Compile TypeScript to dist/
npm run start            # Run production build
```

## Architecture

### Module Structure (`src/modules/<feature>/`)

Each feature module follows this pattern:

- `*.router.ts` - Express routes with Swagger JSDoc annotations
- `*.controller.ts` - Request handlers (parse request, call service, format response)
- `*.service.ts` - Business logic and Prisma database operations
- `*.validator.ts` - express-validator rules for request validation
- `*.schema.ts` - Zod schemas (alternative validation)
- `__test__/*.test.ts` - Vitest/Jest tests using supertest

### Key Files

- `src/app.ts` - Express app setup (middleware, routes)
- `src/server.ts` - Server entry point (env config, Swagger UI, listen)
- `src/config/prisma.ts` - Prisma client singleton with pg adapter
- `src/middlewares/errorValidator.ts` - express-validator error handler middleware
- `prisma/schema.prisma` - Database schema (generates to `src/generated/prisma/`)

### Request Flow

`Router` → `Validator middleware` → `validate middleware` → `Controller` → `Service` → `Prisma`

## Conventions

- Import paths must include `.js` extension (ESM requirement)
- Prisma client is imported from `src/generated/prisma/client.js`
- Swagger docs are inline JSDoc comments in router files
- API responses follow `{ success, message, data }` structure
- Prisma errors are caught and mapped to HTTP status codes in controllers
