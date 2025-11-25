# AI Chatbot (Chat SDK)

A full-featured, hackable Next.js AI chatbot built by Vercel. Powered by the AI SDK with support for multiple model providers through Vercel AI Gateway.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- AI SDK
- Vercel AI Gateway (xAI, OpenAI, Anthropic, etc.)
- Auth.js (Authentication)
- Drizzle ORM
- PostgreSQL (Neon)
- Vercel Blob (File Storage)
- Redis (Rate Limiting)
- Tailwind CSS
- shadcn/ui

---

# Skills

Skills are specialized instruction files that guide code agents through specific workflows. They are located in `.claude/skills/` directory.

## Available Skills

| Skill | Path | Description |
|-------|------|-------------|
| build-and-deploy | `.claude/skills/build-and-deploy/SKILL.md` | Build and deploy this AI Chatbot application. Use when building, deploying, setting up database, or preparing the project for production. |

## For Claude Code Users

Skills are automatically available in Claude Code. Simply describe what you want to do (e.g., "deploy this app") and Claude Code will use the appropriate skill.

## For Other Code Agents

If you're using a different code agent (Cursor, Windsurf, Cline, etc.), you can still benefit from skills:

1. **Read the skill file directly** - Open the SKILL.md file at the path listed above
2. **Follow the instructions** - The skill file contains step-by-step workflow instructions
3. **Use as context** - Copy the skill content into your agent's context when performing that task

Example: To deploy this app, read `.claude/skills/build-and-deploy/SKILL.md` and follow the workflow steps.
