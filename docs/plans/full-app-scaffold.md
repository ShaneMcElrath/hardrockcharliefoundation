# Feature: Full Application Scaffold

## Overview

Build the complete Hard Rock Charlie Foundation web application from scratch. This is an informational site with rich text/image pages, event management, Stripe donations, user accounts, and an admin dashboard. Everything runs in a single Docker container (SvelteKit + Postgres) for simple AWS deployment.

## Business Context

- **Modules affected:** All — this is the initial build of the entire application
- **Compliance/audit considerations:** Stripe PCI compliance handled via Stripe Checkout (hosted payment page). Passwords hashed with bcrypt. Session tokens stored httpOnly.
- **Key stakeholders:** Foundation administrators, donors, event attendees, general public
- **Core workflow:** Public visitors browse info pages and events → sign up for an account → register for events and donate via Stripe → view their history in a dashboard. Admins manage events, view donations, and manage users.

## Open Questions

### For Developer / Stakeholder

- What specific informational pages are needed beyond Home and About? (e.g., Mission, Contact, Gallery)
- What branding assets exist? (logo, colors, fonts)
- What Stripe account will be used? (test keys needed for development)
- Should donations support recurring/monthly, or one-time only?
- What information should event listings include? (date, location, description, capacity, price?)

### For AI to Investigate

- N/A — greenfield project, no existing codebase to investigate

### Resolved Questions

- "What database approach?" — Raw SQL via `pg` driver, no ORM. (answered 2025-02-10)
- "What auth method?" — Email + password with bcrypt + session cookies. (answered 2025-02-10)
- "What payment processor?" — Stripe Checkout (hosted payment page). (answered 2025-02-10)
- "Docker approach?" — Single container with Postgres + Node via supervisord. (answered 2025-02-10)
- "What Node version?" — Upgraded from v16 to v24.13.0 LTS during setup. (answered 2025-02-10)

## Data Model

- **New tables:** `users`, `sessions`, `events`, `event_signups`, `donations`
- **Modified tables:** N/A — all new
- **Key relationships:**
  - `sessions.user_id` → `users.id` (CASCADE delete)
  - `event_signups.user_id` → `users.id` (CASCADE delete)
  - `event_signups.event_id` → `events.id` (CASCADE delete)
  - `donations.user_id` → `users.id` (SET NULL on delete — preserve donation records)
  - `event_signups` has UNIQUE constraint on `(user_id, event_id)`
- **Migration notes:** Initial schema via `db/init.sql`, run by Docker entrypoint on first boot

### Schema

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user',  -- 'user' | 'admin'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date TIMESTAMPTZ,
    location VARCHAR(255),
    image_url VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE event_signups (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    signed_up_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, event_id)
);

CREATE TABLE donations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    amount_cents INTEGER NOT NULL,
    stripe_payment_id VARCHAR(255),
    donor_email VARCHAR(255),
    donor_name VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Phases

### Phase 1: Project Scaffold & Tooling

> Initialize the repository, scaffold SvelteKit with TypeScript and Tailwind, install all dependencies, and verify the dev server runs.

- Initialize git repository
- Create `.gitignore` for Node, SvelteKit, Docker, Postgres, .env
- Scaffold SvelteKit project (skeleton template, TypeScript, Svelte 5)
- Configure `@sveltejs/adapter-node` for Docker deployment
- Set up Tailwind CSS v4 via `@tailwindcss/vite` plugin
- Install dependencies: `pg`, `bcrypt`, `stripe`, and their type packages
- Create `src/app.html`, `src/app.css`, `src/app.d.ts`
- Create root layout (`+layout.svelte`) and placeholder home page (`+page.svelte`)
- Create `.env.example` with all required environment variables
- Create `static/favicon.svg` and `static/favicon.png`
- Upgrade Node.js from v16 to v24.13.0 LTS (required by Vite 6 / SvelteKit)
- Install GitHub CLI (`gh`) and authenticate
- Create GitHub repo and push initial code
- Create `CLAUDE.md`, `docs/feature-template.md`, `docs/plans/`
- Verify `npm run dev` starts successfully on port 5173
- **Status:** ✅ Complete

### Phase 2: Docker Setup

> Create a single-container Docker setup that runs both PostgreSQL and the SvelteKit Node server via supervisord.

- Create multi-stage `Dockerfile` (build stage + runtime stage)
  - Stage 1: `node:20-bookworm-slim` — install deps, run `npm run build`
  - Stage 2: `node:20-bookworm-slim` — install `postgresql-16` + `supervisor`, copy build output
- Create `supervisord.conf` with two processes: `postgres` and `node build/index.js`
- Create `docker-entrypoint.sh`:
  - Initialize Postgres data directory if first run (`initdb`)
  - Start Postgres and create database
  - Run `db/init.sql` to create tables
  - Hand off to supervisord
- Expose port 3000 (app only — Postgres stays internal)
- Verify: `docker build -t hardrockcharlie .` succeeds
- Verify: `docker run -p 3000:3000 hardrockcharlie` starts and serves the app
- Document volume mount for persistent data: `-v pgdata:/var/lib/postgresql/data`
- Create `.dockerignore` to keep image clean
- **Status:** ✅ Complete

### Phase 3: Database & Connection Pool

> Create the database schema and server-side connection pool.

- Create `db/init.sql` with full schema (users, sessions, events, event_signups, donations)
- Create `src/lib/server/db.ts` — Postgres `Pool` using `DATABASE_URL` env var
- Export a `query()` helper for parameterized SQL
- Create `src/routes/api/health/+server.ts` — GET endpoint that pings the database
- Verify health check returns `{"status":"ok"}` when database is connected
- **Status:** 🔲 Not Started

### Phase 4: Authentication System

> Implement email/password signup, login, logout with session cookies and route guards.

- Create `src/lib/server/auth.ts`:
  - `hashPassword(password)` — bcrypt with 12 salt rounds
  - `verifyPassword(password, hash)` — bcrypt compare
  - `createSession(userId)` — generate random token, insert into sessions table, return token
  - `deleteSession(sessionId)` — remove from sessions table
  - `getUserFromSession(sessionId)` — look up session, join with users table
- Create `src/routes/+layout.server.ts` — load session/user from cookie for all pages
- Create auth routes:
  - `src/routes/auth/signup/` — form + server action (hash password, create user, create session, set cookie)
  - `src/routes/auth/login/` — form + server action (verify password, create session, set cookie)
  - `src/routes/auth/logout/+page.server.ts` — delete session, clear cookie, redirect
- Create route guards:
  - `src/routes/dashboard/+layout.server.ts` — redirect to `/auth/login` if not logged in
  - `src/routes/admin/+layout.server.ts` — redirect if not logged in or `role !== 'admin'`
- **Status:** 🔲 Not Started

### Phase 5: Public Pages & Layout

> Build the styled public-facing pages with navigation and footer.

- Create `src/lib/components/Nav.svelte` — navigation bar with links (Home, About, Events, Donate, Login/Dashboard)
- Create `src/lib/components/Footer.svelte` — site footer
- Create `src/lib/components/Hero.svelte` — reusable hero section component
- Update `src/routes/+layout.svelte` — integrate Nav and Footer into global layout
- Build `src/routes/+page.svelte` — Home page with hero, upcoming events preview, donate CTA
- Build `src/routes/about/+page.svelte` — About page with clean typography and image placeholders
- Style everything with Tailwind — clean, modern, professional look
- **Status:** 🔲 Not Started

### Phase 6: Events System

> Events listing page, individual event detail pages, and event signup for logged-in users.

- Create `src/routes/events/+page.server.ts` — load all events from DB
- Create `src/routes/events/+page.svelte` — grid of event cards
- Create `src/routes/events/[id]/+page.server.ts` — load single event, handle signup form action
- Create `src/routes/events/[id]/+page.svelte` — event detail with signup button (for logged-in users)
- Signup inserts into `event_signups` table with unique constraint
- Show "Already signed up" state if user has already registered
- **Status:** 🔲 Not Started

### Phase 7: Stripe Donation Integration

> Accept online donations via Stripe Checkout with webhook handling.

- Create `src/lib/server/stripe.ts` — initialize Stripe client with secret key
- Create `src/routes/donate/+page.svelte` — donation form with preset amounts ($25, $50, $100, custom)
- Create `src/routes/donate/+page.server.ts` — form action creates Stripe Checkout Session, redirects to Stripe
- Create `src/routes/api/webhooks/stripe/+server.ts` — handle `checkout.session.completed` webhook
  - Verify webhook signature
  - Insert donation record into DB with amount, stripe payment ID, donor info, status
- Add success/cancel return URL pages
- **Status:** 🔲 Not Started

### Phase 8: User Dashboard

> Logged-in users can view events they signed up for and their donation history.

- Create `src/routes/dashboard/+page.server.ts` — load user stats (event count, donation total)
- Create `src/routes/dashboard/+page.svelte` — overview with quick stats and nav to sub-pages
- Create `src/routes/dashboard/events/+page.server.ts` — query event_signups joined with events for current user
- Create `src/routes/dashboard/events/+page.svelte` — list of signed-up events
- Create `src/routes/dashboard/donations/+page.server.ts` — query donations for current user
- Create `src/routes/dashboard/donations/+page.svelte` — donation history with amounts, dates, status
- **Status:** 🔲 Not Started

### Phase 9: Admin Dashboard

> Admin panel to manage events, view donations, and manage users.

- Create `src/routes/admin/+page.server.ts` — load overview stats (total users, events, donations sum)
- Create `src/routes/admin/+page.svelte` — admin overview with stat cards
- Events management:
  - `src/routes/admin/events/+page.svelte` + `+page.server.ts` — list all events with edit/delete actions
  - `src/routes/admin/events/new/+page.svelte` + `+page.server.ts` — create event form
- Donations view:
  - `src/routes/admin/donations/+page.svelte` + `+page.server.ts` — list all donations with filters
- Users management:
  - `src/routes/admin/users/+page.svelte` + `+page.server.ts` — list users, toggle admin role
- **Status:** 🔲 Not Started

### Phase 10: Final Polish & Deployment Prep

> Final commit, verify Docker build, prepare for AWS deployment.

- Run `npm run check` — fix any TypeScript errors
- Verify full Docker build and container startup
- Test complete user flow: signup → login → browse events → sign up for event → donate → view dashboard
- Test admin flow: login as admin → manage events → view donations → manage users
- Final git commit and push
- **Status:** 🔲 Not Started

## Design Decisions & Constraints

- **Single Docker container** — Postgres and Node run together via supervisord for simple deployment. Trade-off: not independently scalable, but fine for a small foundation site.
- **Raw SQL over ORM** — Full control, no abstraction layer. Use parameterized queries (`$1, $2`) to prevent SQL injection. All DB code in `src/lib/server/`.
- **Stripe Checkout (hosted)** — Simplest integration, fully PCI compliant. User is redirected to Stripe's page. Donation recorded via webhook on success.
- **Session-based auth** — Random token in `sessions` table + httpOnly cookie. Simpler than JWT for a server-rendered SvelteKit app.
- **adapter-node** — Produces a standalone Node server. Required for Docker deployment (vs. adapter-auto which targets serverless).
- **Tailwind CSS v4** — Using `@tailwindcss/vite` plugin (not PostCSS). Import via `@import 'tailwindcss'` in `app.css`.
- **Svelte 5 runes** — Using `$props()`, `$state()`, `$derived()` syntax. No legacy `export let` props.

## Completed Work Log

- Phase 1 completed 2025-02-10 — Initialized git repo, scaffolded SvelteKit with TypeScript + Tailwind CSS v4, installed all dependencies (pg, bcrypt, stripe, adapter-node). Had to upgrade Node from v16 to v24.13.0 LTS because Vite 6 requires Node 18+. Fixed `@sveltejs/vite-plugin-svelte` version conflict (v4 needed vite 5, bumped to v5 for vite 6 support). Created SVG and PNG favicons. Installed GitHub CLI, created repo at `github.com/ShaneMcElrath/hardrockcharliefoundation`, pushed to remote. Created CLAUDE.md, docs/feature-template.md, and docs/plans/ structure. Dev server verified working on port 5173.
- Phase 2 completed 2025-02-11 — Created multi-stage Dockerfile (node:20-bookworm-slim, Postgres 16, supervisord), docker-entrypoint.sh, supervisord.conf, db/init.sql with full schema (5 tables, 7 indexes), .dockerignore. Docker image builds successfully, container starts both Postgres and Node via supervisord, app serves on port 3000.
