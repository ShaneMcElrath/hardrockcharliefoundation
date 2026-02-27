# Feature: Public Pages Redesign

## Overview

Rebuild all public-facing pages to match provided design mockups. Each page has one or more reference images (screenshots/mockups) that define exactly how it should look. The goal is pixel-faithful reproduction of every design image into working SvelteKit pages with Tailwind CSS.

## Business Context

- **Modules affected:** All public-facing routes — home, about, events, donate, auth pages, and the shared layout (nav/footer)
- **Compliance/audit considerations:** None
- **Key stakeholders:** Foundation visitors, potential donors, event attendees
- **Core workflow:** Visitor lands on the site → browses pages → donates or signs up for events

## Supporting Artifacts

All design images live in the `assets/` directory of this plan.

### How to Add Design Images

Drop your mockup/screenshot files into:
```
docs/plans/public-pages-redesign/assets/
```

**Naming convention:** `<page>-<section>.png` (or `.jpg`, `.webp`, etc.)

| Filename pattern | Meaning |
|---|---|
| `home-hero.png` | Home page — hero/top section |
| `home-features.png` | Home page — scrolled down to features section |
| `home-footer.png` | Home page — scrolled to footer area |
| `about-top.png` | About page — top section |
| `about-team.png` | About page — scrolled to team section |
| `events-listing.png` | Events page — event listing |
| `events-detail.png` | Events page — single event detail view |
| `donate-top.png` | Donate page — top of donation page |
| `login.png` | Login page |
| `signup.png` | Signup page |
| `nav.png` | Navigation bar / header |
| `footer.png` | Footer |

You can use any names — just prefix with the page name so they group together. If a page has multiple scroll positions, number them or use descriptive suffixes (e.g., `home-1-hero.png`, `home-2-mission.png`, `home-3-cta.png`).

## Image-to-Page Mapping

> **Update this table** after adding images to `assets/`. Each row maps an image to the page/section it represents and tracks whether it's been implemented.

| # | Image File | Page | Section | Route | Status |
|---|---|---|---|---|---|
| | _Add rows as images are added_ | | | | 🔲 Not Started |

### Example (delete after populating):

| # | Image File | Page | Section | Route | Status |
|---|---|---|---|---|---|
| 1 | [home-hero.png](assets/home-hero.png) | Home | Hero / above fold | `/` | 🔲 Not Started |
| 2 | [home-mission.png](assets/home-mission.png) | Home | Mission statement | `/` | 🔲 Not Started |
| 3 | [home-cta.png](assets/home-cta.png) | Home | Call to action / bottom | `/` | 🔲 Not Started |
| 4 | [about-top.png](assets/about-top.png) | About | Top section | `/about` | 🔲 Not Started |
| 5 | [about-team.png](assets/about-team.png) | About | Team section | `/about` | 🔲 Not Started |
| 6 | [events-listing.png](assets/events-listing.png) | Events | Listing | `/events` | 🔲 Not Started |
| 7 | [donate-top.png](assets/donate-top.png) | Donate | Main | `/donate` | 🔲 Not Started |
| 8 | [nav.png](assets/nav.png) | Layout | Navigation bar | (layout) | 🔲 Not Started |
| 9 | [footer.png](assets/footer.png) | Layout | Footer | (layout) | 🔲 Not Started |
| 10 | [login.png](assets/login.png) | Login | Full page | `/auth/login` | 🔲 Not Started |
| 11 | [signup.png](assets/signup.png) | Signup | Full page | `/auth/signup` | 🔲 Not Started |

## Open Questions

### For Developer / Stakeholder

- [ ] Which pages do you have design images for? (home, about, events, donate, auth, all?)
- [ ] Are there any interactive behaviors shown in the designs that need clarification? (animations, hover states, modals)
- [ ] Are there brand assets (logo, fonts, color palette) to use, or should they be extracted from the images?

### For AI to Investigate

- (None yet — will investigate as images are provided)

### Resolved Questions

- Current home page is a placeholder ("Coming soon") — confirmed via codebase exploration
- No shared nav/footer exists yet — root layout is bare
- No `/about`, `/events`, or `/donate` routes exist yet — will be created from scratch
- Login and signup pages exist with basic styling — will be restyled to match designs
- No shared components exist in `src/lib/components/` — will create as needed

## Data Model

- **New tables:** None (this plan is UI-only)
- **Modified tables:** None
- **Key relationships:** N/A
- **Migration notes:** No database changes required

## Proposed Approaches

### Chosen: Image-Driven Page-by-Page Build

- **Approach:** Take each design image, read it visually, and build the corresponding page section to match. Work page-by-page, assembling all sections for a page before moving to the next. Start with the shared layout (nav/footer) since every page depends on it.
- **Trade-offs:** Straightforward, progress is visually verifiable against the source images. Each page is a self-contained deliverable.

## Phases

### Phase 1: Discovery & Image Collection ✅ Complete

- Explored existing codebase and documented current state of all public pages
- Identified what exists (placeholder home, basic auth pages) and what needs to be created
- Set up plan directory with `assets/` folder for design images
- Status: ✅ Complete

### Phase 2: Shared Layout (Nav + Footer)

- Read nav/footer design images from `assets/`
- Build responsive navigation bar in `+layout.svelte` (logo, links, mobile menu, auth state)
- Build footer in `+layout.svelte` (links, copyright, contact info)
- Extract and set up brand colors, fonts, and any shared design tokens in `app.css`
- Create reusable components in `src/lib/components/` as needed (e.g., `Button.svelte`)
- Status: 🔲 Not Started

### Phase 3: Home Page

- Read all home page design images (hero, scrolled sections, etc.)
- Build each section of the home page to match the designs
- Ensure responsive behavior (mobile/tablet/desktop)
- Update Image-to-Page Mapping table — mark all home images ✅
- Status: 🔲 Not Started

### Phase 4: About Page

- Read about page design images
- Create `/about` route
- Build all sections to match designs
- Update Image-to-Page Mapping table — mark all about images ✅
- Status: 🔲 Not Started

### Phase 5: Events Page

- Read events page design images
- Create `/events` route (listing view)
- Create `/events/[id]` route if detail view designs exist
- Build to match designs (static/mock data is fine for now)
- Update Image-to-Page Mapping table — mark all events images ✅
- Status: 🔲 Not Started

### Phase 6: Donate Page

- Read donate page design images
- Create `/donate` route
- Build to match designs (Stripe integration is separate — this phase is UI only)
- Update Image-to-Page Mapping table — mark all donate images ✅
- Status: 🔲 Not Started

### Phase 7: Auth Pages Restyle

- Read login/signup design images
- Restyle existing `/auth/login` and `/auth/signup` pages to match designs
- Preserve all existing form action logic — only change the UI
- Update Image-to-Page Mapping table — mark all auth images ✅
- Status: 🔲 Not Started

### Phase 8: Final Review & Polish

- Verify every image in `assets/` has been implemented (no row in the table is 🔲)
- Cross-page consistency check (spacing, colors, typography)
- Responsive check across breakpoints
- Status: 🔲 Not Started

## Design Decisions & Constraints

- **UI-only plan** — No database, API, or backend logic changes. Existing auth form actions are preserved as-is.
- **Image-faithful** — The designs are the source of truth. Match them as closely as possible.
- **Tailwind CSS** — All styling via utility classes, matching the project convention.
- **Svelte 5 runes** — Use `$props()`, `$state()`, `$derived()` etc. per project conventions.
- **Mobile-responsive** — All pages must work across screen sizes, even if designs only show desktop.
- **Shared components** — Extract reusable pieces (buttons, cards, section containers) into `src/lib/components/` when they appear across multiple pages.

## Completed Work Log

- 2026-02-26: Phase 1 completed — codebase explored, plan created, `assets/` directory ready for design images.
