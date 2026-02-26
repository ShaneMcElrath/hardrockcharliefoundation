# Hard Rock Charlie Foundation

## Project Overview

SvelteKit + TypeScript web application for the Hard Rock Charlie Foundation. Informational site with events, Stripe donations, user accounts, and an admin dashboard.

## Tech Stack

- **Framework:** SvelteKit (Svelte 5) with TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL (raw SQL via `pg`)
- **Payments:** Stripe Checkout
- **Auth:** Email/password with bcrypt + session cookies
- **Deployment:** Single Docker container (Node + Postgres via supervisord)
- **Build:** Vite 6, `@sveltejs/adapter-node`

## Documentation

All project documentation lives in the `docs/` directory:

- **`docs/guides/`** — Reference guides and standards:
  - **`database-standards.md`** — Database naming conventions, required columns, and coding rules.
  - **`feature-template.md`** — How plans are created, managed, and structured. Contains the plan template.
  - **`future-plans.md`** — How future plans (pre-implementation ideas) work, including DRAFT.md and DISCOVERY.md templates.
- **`docs/plans/`** — Active feature plans. Each plan is a directory (e.g., `plans/my-feature/`) containing a `PLAN.md` and optional supporting files (screenshots, diagrams, etc.). Plans follow the template in `docs/guides/feature-template.md`.
- **`docs/future-plans/`** — Feature ideas not yet ready for implementation. Each is a directory containing `DRAFT.md` and/or `DISCOVERY.md`. Promote to `docs/plans/` when ready.

Before building a new feature, create a plan directory in `docs/plans/` using the template.

### When to Read Documentation

**`docs/guides/database-standards.md`** — Read this file before:
- Creating or modifying any database table, column, or index
- Writing SQL queries (to use correct table/column names)
- Writing any `db/` migration or schema file
- Reviewing or debugging database-related code

**`docs/guides/feature-template.md`** — Read this file before:
- Creating a new plan directory (to use the correct template and structure)
- The user asks how plans work or how to structure one

**`docs/guides/future-plans.md`** — Read this file before:
- Creating or updating a future plan in `docs/future-plans/`
- The user asks how future plans work or how to structure one

**`docs/plans/`** — Read the relevant plan's `PLAN.md`:
- When the user says to execute, start, or continue a plan
- When the user references a specific phase or feature by name
- When updating progress on a feature (to log completed work)
- When you need context on what was already built or discovered

**General rule:** Only read docs when relevant to the current task. Do not read all docs at the start of every conversation.

## Project Structure

```
├── CLAUDE.md                 # This file — project overview for AI
├── docs/
│   ├── guides/               # Reference guides and standards
│   │   ├── database-standards.md   # DB naming, required columns, rules
│   │   ├── feature-template.md     # Plan template + rules
│   │   └── future-plans.md         # Future plan guide (DRAFT/DISCOVERY templates)
│   ├── plans/                # Active feature plans (each is a directory)
│   │   └── <feature-name>/   #   PLAN.md + optional assets, research, transcripts
│   └── future-plans/         # Pre-implementation feature ideas
│       └── <feature-name>/   #   DRAFT.md and/or DISCOVERY.md + optional assets
├── src/
│   ├── app.html              # HTML shell
│   ├── app.css               # Tailwind imports + global styles
│   ├── app.d.ts              # TypeScript type declarations
│   ├── lib/
│   │   ├── server/           # Server-only code (db, auth, stripe)
│   │   └── components/       # Reusable Svelte components
│   └── routes/
│       ├── +layout.svelte    # Root layout
│       ├── +page.svelte      # Home page
│       ├── about/            # About page
│       ├── events/           # Events listing + detail
│       ├── donate/           # Stripe donation flow
│       ├── auth/             # Login, signup, logout
│       ├── dashboard/        # User dashboard (events, donations)
│       ├── admin/            # Admin panel (events, donations, users)
│       └── api/              # API endpoints (health, webhooks)
└── static/                   # Static assets (favicon, images)
```

## Commands

```bash
npm run dev        # Start dev server (port 5173)
npm run build      # Build for production
npm run preview    # Preview production build
npm run check      # Run svelte-check type checking
```

## Environment Variables

See `.env.example` for all required variables. Copy to `.env` and fill in values.

## Conventions

- **Raw SQL** — No ORM. Use `pg` Pool with parameterized queries (`$1, $2` placeholders) to prevent SQL injection.
- **Server-only code** — Database and auth logic goes in `src/lib/server/`. SvelteKit prevents this from being sent to the client.
- **Form actions** — Use SvelteKit form actions for mutations (login, signup, event signup, etc).
- **Route groups** — Protected routes use `+layout.server.ts` for auth guards.
- **Styling** — Tailwind utility classes. Minimal custom CSS.
