# Implementation Plan (Execution-Level)

## Stream 1 — Core product surface
- [ ] Prompt Studio UI with templates and system prompts
- [ ] File graph viewer + diff panel
- [ ] Live preview pane with restart/rebuild controls
- [ ] Run timeline UI (planner -> generator -> tests -> deploy)

## Stream 2 — Backend domain model
- [ ] `workspaces` table (tenant root)
- [ ] `projects` table
- [ ] `files` table (path, content, checksum)
- [ ] `runs` table (status, model, cost, latency)
- [ ] `run_steps` table (tool trace)
- [ ] `credit_ledger` table (idempotent debits/credits)

## Stream 3 — Agent and orchestration
- [ ] Inngest events for run lifecycle
- [ ] Retry strategy with max attempts and poison queue
- [ ] Cost budget enforcement per run/workspace
- [ ] Human approval gate for risky actions (deploy/delete)

## Stream 4 — Security and governance
- [ ] Supabase RBAC + workspace isolation
- [ ] API rate limiting by user/workspace
- [ ] Secrets vault integration and masking
- [ ] Audit event schema and export endpoint

## Stream 5 — Deployability and operations
- [ ] Preview deploy adapter
- [ ] Production deploy adapter + rollback
- [ ] SLO dashboards and alerting
- [ ] On-call runbooks for generation and preview failures

## Definition of Done (for MVP)
1. Authenticated user can generate a project from prompt.
2. Generated app receives preview URL in under 30 seconds p95.
3. Credit ledger updates atomically for each run.
4. Failed run provides actionable trace and retry button.
5. CI passes lint/build and smoke test on every PR.
