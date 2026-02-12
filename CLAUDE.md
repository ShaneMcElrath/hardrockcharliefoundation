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

- **`docs/database-standards.md`** — Database naming conventions, required columns, and coding rules.
- **`docs/feature-template.md`** — How plans are created, managed, and structured. Contains the plan template.
- **`docs/plans/`** — Individual feature plans. Each plan follows the template in `feature-template.md`.

Before building a new feature, create a plan in `docs/plans/` using the template.

## Project Structure

```
├── CLAUDE.md                 # This file — project overview for AI
├── docs/
│   ├── database-standards.md # DB naming, required columns, rules
│   ├── feature-template.md   # Plan template + rules
│   └── plans/                # Individual feature plans
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
