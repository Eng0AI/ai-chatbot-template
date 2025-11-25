---
name: build-and-deploy
description: Build and deploy this AI Chatbot application. Use when building, deploying, setting up database, or preparing the project for production. Triggers on requests to build, deploy, setup database, or publish.
---

# Build and Deploy AI Chatbot

## Overview

Build and deploy the AI Chatbot (Chat SDK) application. This Next.js project provides a full-featured AI chatbot with authentication, file storage, and multiple model provider support.

## Workflow

### 1. Setup Environment Variables

**Read `.env.example` to see all required variables:**

```bash
cat .env.example
```

**Create `.env` by reading values from current environment:**

For each variable in `.env.example`, read the value from the current environment and write to `.env`. Example approach:

```bash
# Read .env.example and create .env with values from current environment
while IFS= read -r line || [[ -n "$line" ]]; do
  # Skip comments and empty lines
  [[ "$line" =~ ^#.*$ || -z "$line" ]] && continue
  # Extract variable name (before = sign)
  var_name=$(echo "$line" | cut -d'=' -f1)
  # Get value from environment
  var_value="${!var_name}"
  # Write to .env
  echo "${var_name}=${var_value}" >> .env
done < .env.example
```

Or manually inspect `.env.example` and create `.env` with the required values from environment variables.

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
- **Environment Variables:** All values come from current environment - inspect `.env.example` for required variables
- **No Dev Server:** Never run `pnpm dev` in VM environment

## Features

- Multi-model AI support (OpenAI, Anthropic, Google)
- User authentication with Auth.js
- Chat history persistence
- File upload with Vercel Blob
- Rate limiting with Redis
- Code highlighting and markdown rendering
- Streaming responses
