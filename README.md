# Vibe Coding Platform Starter (Vercel + Supabase Ready)

This repository is a starter for building an **enterprise-ready AI software creation platform** (Lovable/Replit category) with **Supabase** as the backend and **Vercel** as the fastest deployment path.

## Yes — Vercel + Supabase works with this project

This app is a Vite frontend that reads Supabase client env vars:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Those are supported in Vercel Project Environment Variables and will be injected at build time.

## Current state

- Working React/Vite frontend
- Supabase environment validation + healthcheck utility
- CI pipeline for lint/build
- Vercel production deploy workflow
- Vercel preview deploy workflow for pull requests
- Dockerfile for containerized runtime

## Deployment setup (recommended: Vercel)

### 1) Create/connect Vercel project
- Import this GitHub repo into Vercel once.
- Confirm framework is detected as **Vite**.

### 2) Add GitHub repository secrets
Required for GitHub Actions workflows:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### 3) Add Vercel environment variables
In Vercel Project Settings -> Environment Variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

> Never expose `SUPABASE_SERVICE_ROLE_KEY` in client-side env vars.

### 4) Deployment behavior
- Pull request -> `.github/workflows/preview-vercel.yml` deploys preview.
- Push to `main` -> `.github/workflows/deploy-vercel.yml` runs quality checks and deploys production.

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run check
```

## CTO artifacts

- Enterprise strategy and architecture blueprint: `docs/ENTERPRISE_BLUEPRINT.md`
- Engineering execution plan and MVP Definition of Done: `docs/IMPLEMENTATION_PLAN.md`


## Agent swarm status (current MVP)

- Implemented local **5-agent swarm simulation** in the UI:
  - Planner
  - Architect
  - Builder
  - QA
  - Release
- It currently generates a scoped plan and starter file manifest in-browser.
- Next step is wiring this to persistent projects/runs in Supabase and background orchestration.
