# Feature: Public Pages Replication

## Overview

Replicate the existing Hard Rock Charlie Foundation WordPress website into SvelteKit + Tailwind CSS. This is a **front-end only** effort — no database, no backend logic, no payment processing. Forms should look correct but do not submit. The goal is a pixel-faithful reproduction of every page from the current WordPress site.

## Business Context

- **Who uses it:** Foundation visitors, potential donors, event attendees, members
- **Problem it solves:** Migrate the existing WordPress site to a modern SvelteKit stack that the team controls
- **Modules likely affected:** All public-facing routes — every page listed in `pages.md`
- **Compliance/audit notes:** None

## Requirements (Confirmed by User)

- Replicate the current WordPress design exactly — this is NOT a redesign
- Desktop only — **do NOT make mobile responsive** (separate future effort)
- Forms should look like forms but **do not submit anything** (future effort)
- Nav, footer, and hero banner image are **shared across all pages**
- "Individual and Corporate Donations" page is the **same as the Donate page** (one page, not two)
- Gallery page has **38 images** with left/right scroll buttons
- Build **reusable components** for repeated patterns (news articles, form fields, person cards, etc.)
- All content is static — info pages and forms, nothing data-heavy

## Scope

- **In scope:** All pages documented in `pages.md`, all content images documented in `images.md`
- **Out of scope:** Mobile responsiveness, form submissions, payment processing, database, backend logic, admin pages, user authentication flow

## Supporting Files

| File | Purpose |
|------|---------|
| [pages.md](pages.md) | Complete page inventory — routes, types, screenshots, questions |
| [images.md](images.md) | Every content image needed — filenames, locations, descriptions |
| [fonts.md](fonts.md) | Font specifications (user fills in) |
| [components.md](components.md) | Reusable components to build |
| [checklist.md](checklist.md) | **Build tracker** — 66 items across 6 phases, tracks status of every component and page |
| [review-prompt.md](review-prompt.md) | **QA prompt template** — exact prompt fed to Opus review agents, ensures consistent reviews |
| `assets/` | Design screenshots organized by page |

## Quality Assurance Strategy

**Core rule: Keep going until it is perfect. No "good enough." No exceptions.**

The execution plan uses a **Build → Review → Fix** cycle for every single item in
[checklist.md](checklist.md). The review-fix loop repeats as many times as needed.
An item is only marked APPROVED when the Opus reviewer returns **zero issues**.

### Build Phase
- Read the design screenshots for the page/component
- Read existing components to maintain consistency
- Write the SvelteKit + Tailwind code to match the screenshots

### Review Phase (Opus agent)
- Launch an Opus review agent using the standardized prompt from [review-prompt.md](review-prompt.md)
- The agent reads the screenshots AND the built code
- Outputs a numbered list of every deviation, or "APPROVED — Zero issues found"

### Fix Phase
- Fix every issue from the review — no skipping
- Re-launch the Opus review agent with the same prompt
- **Repeat until APPROVED.** If review #2 finds new issues, fix and review #3. If review #3 still finds issues, fix and review #4. There is no limit. Keep going.

### Final Verification (Phase 6)
- Cross-page consistency review using the cross-page prompt from [review-prompt.md](review-prompt.md)
- `npm run check` — TypeScript/Svelte type checking passes
- `npm run build` — Production build succeeds
- Visual walkthrough of every page by user

### Execution Order (6 Phases, 66 Items)

See [checklist.md](checklist.md) for the full tracked list. Summary:

1. **Phase 0:** Prerequisites — images saved, fonts filled in, questions answered
2. **Phase 1:** 19 shared components (nav, footer, hero, form fields, cards, etc.)
3. **Phase 2:** 4 simple info pages (resources, events, partners, our history)
4. **Phase 3:** 10 complex info pages (home, board, programs, gallery)
5. **Phase 4:** 19 news pages (listing, categories, articles)
6. **Phase 5:** 3 form pages (contact, donate, membership)
7. **Phase 6:** Final cross-page reviews and build verification

### How Conversations Work
- At the start of each conversation, read [checklist.md](checklist.md)
- Find the first item that is not APPROVED
- Build it, review it, fix it until APPROVED
- Update the checklist
- Move to the next item

## Open Questions

<!-- ✏️ USER: Review these questions and answer or delete as you refine the plan -->

- [ ] Do you have access to the WordPress admin to export content (text), or should all text be transcribed from the screenshots?
- [ ] For the news articles — should we hardcode all the existing articles as static content, or build the template and include just 2-3 example articles?
- [ ] The gallery has 38 images — are these photos you already have saved somewhere, or do they need to be downloaded from the WordPress site?
- [ ] Are there any pages on the current WordPress site that are NOT captured in the screenshots?
- [ ] The partner logos page shows ~18 partner logos — do you have these as separate image files, or do they need to be extracted?

## Rough Scope Estimate

**Large** — ~35 unique pages/routes, 38 gallery images, ~20+ content images, 10+ reusable components. The page count is high but many pages share the same layout templates (news articles, program sub-pages), so reusable components reduce the actual unique work significantly.
