---
name: build-and-deploy
description: Build and deploy this AI Chatbot application. Use when building, deploying, setting up database, or preparing the project for production. Triggers on requests to build, deploy, setup database, or publish.
---

# Build and Deploy AI Chatbot

## Overview

Build and deploy the AI Chatbot (Chat SDK) application. This Next.js project provides a full-featured AI chatbot with authentication, file storage, and multiple model provider support.

## Environment Variables

Required environment variables:
- `AUTH_SECRET` - Random secret for authentication (generate with `openssl rand -base64 32`)
- `POSTGRES_URL` - PostgreSQL database connection URL
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token
- `REDIS_URL` - Redis connection URL for rate limiting

Optional (for non-Vercel deployments):
- `AI_GATEWAY_API_KEY` - Vercel AI Gateway API key

## Workflow

### 1. Setup Environment Variables

```bash
cp .env.example .env
```

Then populate `.env` with values from environment:

```bash
cat > .env << EOF
AUTH_SECRET="${AUTH_SECRET}"
POSTGRES_URL="${POSTGRES_URL}"
BLOB_READ_WRITE_TOKEN="${BLOB_READ_WRITE_TOKEN}"
REDIS_URL="${REDIS_URL}"
AI_GATEWAY_API_KEY="${AI_GATEWAY_API_KEY}"
EOF
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run Database Migrations

```bash
pnpm db:migrate
```

### 4. Build

```bash
pnpm build
```

Or run build without migration (if already migrated):
```bash
next build
```

### 5. Deploy

**Vercel (Recommended):**
```bash
vercel deploy --prod --yes
```

**Netlify:**
```bash
# First deployment
netlify deploy --prod --create-site

# Subsequent deployments
netlify deploy --prod
```

## Critical Notes

- **Database Required:** Must have PostgreSQL database set up before building
- **Migration Required:** Run `pnpm db:migrate` before first build
- **Auth Secret:** Generate a secure random secret for AUTH_SECRET
- **AI Gateway:** For Vercel deployments, OIDC tokens are used automatically
- **No Dev Server:** Never run `pnpm dev` in VM environment

## Features

- Multi-model AI support via Vercel AI Gateway
- User authentication with Auth.js
- Chat history persistence
- File upload with Vercel Blob
- Rate limiting with Redis
- Code highlighting and markdown rendering
- Streaming responses
