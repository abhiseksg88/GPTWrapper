# Enterprise Blueprint: Build a Lovable/Replit-Class Vibe Coding Platform

## 1) Executive Product Thesis

### Vision
Build a secure, multi-tenant, AI-native software creation platform where users can:
- describe what they want in natural language,
- receive working full-stack apps,
- preview and iterate in real time,
- collaborate with teammates,
- deploy safely to production.

### Differentiation strategy (how we beat Lovable/Replit)
1. **Enterprise trust by default**
   - SSO/SAML, SCIM, private networking, audit logs, policy controls.
2. **Reliable agentic workflows**
   - deterministic job orchestration, replayable events, human-in-the-loop approvals.
3. **Governed sandbox execution**
   - strong egress controls, cost ceilings, image allow-lists, signed build provenance.
4. **Model routing intelligence**
   - provider fallback, latency/cost-aware routing, quality scoring by task type.
5. **Production handoff excellence**
   - generated code is maintainable with tests, CI templates, security checks, and infra manifests.

---

## 2) Market Positioning & Packaging

### ICP (ideal customer profile)
- Mid-market and enterprise product teams (50–3000 engineers)
- Innovation teams building internal tools quickly
- Agencies shipping client MVPs with strict deadlines

### Product tiers
- **Starter**: single-user, limited credits, community support.
- **Team**: shared workspaces, role-based access, collaboration.
- **Enterprise**: SSO/SAML, SCIM, SOC2 controls, private runners, advanced governance.

### Core business model
- Seat subscription + usage metering (tokens, sandbox minutes, storage, deployments).

---

## 3) Platform Architecture (Target)

## 3.1 Frontend Control Plane
- Next.js app router (or current Vite app as transitional shell)
- Prompt studio, file tree, code editor, preview pane
- Agent timeline (steps, tools, costs, outcomes)
- Admin settings for auth, billing, policy, and observability

## 3.2 API & Domain Layer
- tRPC (or typed REST) with strict auth context
- Domain modules:
  - Workspaces/Projects
  - Files/Version graph
  - Prompt runs & tool traces
  - Credits/Billing
  - Deployments
  - Secrets/Integrations

## 3.3 Data Layer
- Supabase Auth + Postgres (or Postgres + auth abstraction)
- Prisma for schema evolution and portability
- Redis for queue state, caching, and rate limiting
- Object storage for artifacts, snapshots, and logs

## 3.4 Async/Agent Orchestration
- Inngest as event backbone
- Workflow categories:
  - generate app
  - refactor/fix
  - test and validate
  - deploy and rollback
- Idempotency keys + dead-letter queue + replay controls

## 3.5 Execution Plane
- E2B/Docker sandbox workers
- Per-run network policy and spend budget
- Warm pool for lower p95 startup latency
- Workspace snapshots for fast resume

## 3.6 AI Gateway
- Provider adapters: OpenAI, Anthropic, Gemini, Grok
- Dynamic model routing by task (planning, coding, debugging, tests)
- Guardrails:
  - output schema validation
  - unsafe content and secret leak checks
  - retry/fallback strategy

## 3.7 Deployment Plane
- One-click deploy templates (Vercel, Fly, Railway, AWS)
- Environment promotion (dev -> staging -> prod)
- Provenance: commit SHA, artifact hash, deployment logs, rollback handle

---

## 4) Enterprise Controls & Security Baseline

1. **Identity & access**
   - SSO (SAML/OIDC), SCIM provisioning
   - RBAC (Owner/Admin/Developer/Viewer)
   - Service accounts with scoped API keys
2. **Data protection**
   - encryption at rest + TLS in transit
   - row-level isolation and tenant-bound query guards
   - customer-managed retention policies
3. **AppSec**
   - dependency scanning, SAST, secret scanning, DAST on preview URLs
   - signed containers and SBOM generation
4. **Auditability**
   - immutable audit logs for auth/admin/deploy actions
   - export APIs for SIEM
5. **Compliance roadmap**
   - SOC2 Type I -> Type II
   - GDPR/CCPA controls
   - HIPAA pathway as optional vertical track

---

## 5) Reliability SLOs

- API availability: **99.9%** monthly
- Job success rate (non-user-error): **>= 98.5%**
- Preview startup p95: **< 20s**
- Mean time to restore (MTTR): **< 30 min**

Operational requirements:
- multi-region database failover runbook
- auto rollback for failed deployments
- error budgets by subsystem

---

## 6) Product Capabilities Roadmap

### Phase A (0-60 days): Foundation
- Workspace, project, file schema
- Prompt -> file generation -> preview URL
- Supabase auth with RBAC basics
- Metering primitive (token + runtime minutes)

### Phase B (60-120 days): Team readiness
- Branching/version timeline
- Collaboration and sharing
- Policy controls and rate limits
- Billing + subscriptions + invoices

### Phase C (120-180 days): Enterprise launch
- SSO/SAML + SCIM
- Audit logs and compliance exports
- Private runners and network controls
- SLA-backed deployment and support ops

---

## 7) KPI Framework

- Activation: time to first successful preview
- Retention: weekly active builders and workspace stickiness
- Quality: generated code acceptance rate (without manual rewrite)
- Efficiency: cost per successful project generation
- Revenue: net dollar retention and expansion by workspace

---

## 8) Immediate build priorities for this repository

1. Add domain schema and migrations (workspace, project, file, run, credit_ledger).
2. Implement authenticated API surface (project CRUD + run kickoff).
3. Add queue-backed generation workflow with structured tool trace.
4. Add deterministic preview orchestration with health probes.
5. Add enterprise telemetry (run cost, latency, failure taxonomy).

This doc is the strategic north star for converting the current starter into a competitive enterprise platform.
