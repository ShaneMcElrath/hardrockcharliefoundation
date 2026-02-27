# Build Checklist

> **How this works:** Every item below goes through the Build → Review → Fix cycle.
> **Do not move to the next item until the current one is APPROVED by the Opus reviewer.**
> The review-fix loop repeats as many times as needed — there is no limit.
> **Keep going until it is perfect. No exceptions. No "good enough."**

---

## Status Key

| Status | Meaning |
|--------|---------|
| `—` | Not started |
| `Building` | Code is being written |
| `Review #1` | First Opus review in progress |
| `Fixing #1` | Fixing issues from first review |
| `Review #N` | Nth review round |
| `Fixing #N` | Fixing issues from Nth review |
| `APPROVED` | Opus reviewer returned zero issues — done |

---

## Phase 0: Prerequisites

| # | Item | Status | Notes |
|---|------|--------|-------|
| 0.1 | All screenshots in `assets/` | — | Verify every page folder has its images |
| 0.2 | All content images saved to `static/images/` per `images.md` | — | Logo, hero, headshots, gallery, partner logos |
| 0.3 | `fonts.md` filled in | — | Font names, weights, sources |
| 0.4 | All `<!-- ✏️ USER EDIT -->` questions answered in `pages.md` | — | Routes confirmed, ambiguities resolved |
| 0.5 | `npm run dev` starts successfully | — | Baseline before any changes |

---

## Phase 1: Shared Components

> Build these first — every page depends on them.

| # | Component | File | Status | Review Rounds | Notes |
|---|-----------|------|--------|---------------|-------|
| 1.1 | Brand tokens (colors, fonts, spacing) | `src/app.css` | — | | Tailwind config + CSS variables |
| 1.2 | HeroBanner | `src/lib/components/HeroBanner.svelte` | — | | Paratrooper banner + logo |
| 1.3 | HeaderNav | `src/lib/components/HeaderNav.svelte` | — | | Full nav with dropdowns |
| 1.4 | Footer | `src/lib/components/Footer.svelte` | — | | Links, copyright, dark bg |
| 1.5 | Root layout | `src/routes/+layout.svelte` | — | | Assembles Hero + Nav + slot + Footer |
| 1.6 | PageTitle | `src/lib/components/PageTitle.svelte` | — | | Centered title below nav |
| 1.7 | FormInput | `src/lib/components/FormInput.svelte` | — | | Label + text input |
| 1.8 | FormTextarea | `src/lib/components/FormTextarea.svelte` | — | | Label + textarea + char count |
| 1.9 | FormSelect | `src/lib/components/FormSelect.svelte` | — | | Label + dropdown |
| 1.10 | FormRadioGroup | `src/lib/components/FormRadioGroup.svelte` | — | | Label + radio options |
| 1.11 | FormCheckboxGroup | `src/lib/components/FormCheckboxGroup.svelte` | — | | Label + checkbox options |
| 1.12 | SubmitButton | `src/lib/components/SubmitButton.svelte` | — | | Green + PayPal variants |
| 1.13 | PersonCard | `src/lib/components/PersonCard.svelte` | — | | Photo + name + bio |
| 1.14 | ProgramCard | `src/lib/components/ProgramCard.svelte` | — | | Image + title + desc + button |
| 1.15 | NewsArticleCard | `src/lib/components/NewsArticleCard.svelte` | — | | Title + meta + excerpt + button |
| 1.16 | NewsArticleLayout | `src/lib/components/NewsArticleLayout.svelte` | — | | Full article page wrapper |
| 1.17 | NewsSidebar | `src/lib/components/NewsSidebar.svelte` | — | | Archive links sidebar |
| 1.18 | ImageGallery | `src/lib/components/ImageGallery.svelte` | — | | Carousel with L/R buttons |
| 1.19 | PartnerLogoGrid | `src/lib/components/PartnerLogoGrid.svelte` | — | | Grid of logo images |

**Phase 1 complete when:** All 19 components are APPROVED. Run `npm run check` — must pass.

---

## Phase 2: Simple Info Pages

> Pages with mostly text content — easiest to build and verify.

| # | Page | Route | File | Status | Review Rounds | Notes |
|---|------|-------|------|--------|---------------|-------|
| 2.1 | Resources | `/resources` | `src/routes/resources/+page.svelte` | — | | Text + Veterans Crisis Line image |
| 2.2 | Events | `/events` | `src/routes/events/+page.svelte` | — | | Text content |
| 2.3 | Partners | `/partners` | `src/routes/partners/+page.svelte` | — | | Uses PartnerLogoGrid |
| 2.4 | About — Our History | `/about-us/our-history` | `src/routes/about-us/our-history/+page.svelte` | — | | Text content |

**Phase 2 complete when:** All 4 pages are APPROVED.

---

## Phase 3: Complex Info Pages

> Pages with multiple sections, cards, or custom layouts.

| # | Page | Route | File | Status | Review Rounds | Notes |
|---|------|-------|------|--------|---------------|-------|
| 3.1 | Home | `/` | `src/routes/+page.svelte` | — | | Cards + Become Member + Stay Connected |
| 3.2 | About — Board of Directors | `/about-us/board-of-directors` | `src/routes/about-us/board-of-directors/+page.svelte` | — | | Uses PersonCard (multiple) |
| 3.3 | About — Advisory Board | `/about-us/advisory-board` | `src/routes/about-us/advisory-board/+page.svelte` | — | | Uses PersonCard (multiple) |
| 3.4 | Programs (listing) | `/programs` | `src/routes/programs/+page.svelte` | — | | Uses ProgramCard (multiple) |
| 3.5 | Programs — Arlington | `/programs/arlington-wreath-laying` | `src/routes/programs/arlington-wreath-laying/+page.svelte` | — | | Hero image + text sections |
| 3.6 | Programs — Antelope Island | `/programs/antelope-island-memorial` | `src/routes/programs/antelope-island-memorial/+page.svelte` | — | | |
| 3.7 | Programs — Summit & Water Jump | `/programs/summit-water-jump` | `src/routes/programs/summit-water-jump/+page.svelte` | — | | |
| 3.8 | Programs — Scholarship | `/programs/markwell-scholarship` | `src/routes/programs/markwell-scholarship/+page.svelte` | — | | |
| 3.9 | Get Involved — Membership | `/get-involved/membership` | `src/routes/get-involved/membership/+page.svelte` | — | | Info text about joining |
| 3.10 | Gallery | `/gallery` | `src/routes/gallery/+page.svelte` | — | | Uses ImageGallery (38 images) |

**Phase 3 complete when:** All 10 pages are APPROVED.

---

## Phase 4: News Pages

> News listing, category pages, and all individual articles.
> Build the listing page first, then one article of each type as a template,
> then replicate for all remaining articles.

| # | Page | Route | File | Status | Review Rounds | Notes |
|---|------|-------|------|--------|---------------|-------|
| 4.1 | News (listing) | `/news` | `src/routes/news/+page.svelte` | — | | Uses NewsArticleCard + NewsSidebar |
| 4.2 | News — Category: Command Post | `/news/command-post` | `src/routes/news/command-post/+page.svelte` | — | | Filtered listing |
| 4.3 | News — Category: Moral Compass | `/news/moral-compass` | `src/routes/news/moral-compass/+page.svelte` | — | | Filtered listing |
| 4.4 | CP Article template (2021-12) | `/news/cp-2021-12` | `src/routes/news/cp-2021-12/+page.svelte` | — | | First CP — build + review thoroughly |
| 4.5 | CP Article (2021-11) | `/news/cp-2021-11` | `src/routes/news/cp-2021-11/+page.svelte` | — | | Clone template, swap content |
| 4.6 | CP Article (2021-10) | `/news/cp-2021-10` | `src/routes/news/cp-2021-10/+page.svelte` | — | | Clone template, swap content |
| 4.7 | MC Article template (2021-12) | `/news/mc-2021-12` | `src/routes/news/mc-2021-12/+page.svelte` | — | | First MC — build + review thoroughly |
| 4.8 | MC Article (2021-10) | `/news/mc-2021-10` | `src/routes/news/mc-2021-10/+page.svelte` | — | | Clone template, swap content |
| 4.9 | MC Article (2021-11-01) | `/news/mc-2021-11-01` | `src/routes/news/mc-2021-11-01/+page.svelte` | — | | Clone template, swap content |
| 4.10 | MC Article (2021-11-23) | `/news/mc-2021-11-23` | `src/routes/news/mc-2021-11-23/+page.svelte` | — | | Clone template, swap content |
| 4.11 | MC Article (2022-01-29) | `/news/mc-2022-01-29` | `src/routes/news/mc-2022-01-29/+page.svelte` | — | | Clone template, swap content |
| 4.12 | MC Article (2022-05-28) | `/news/mc-2022-05-28` | `src/routes/news/mc-2022-05-28/+page.svelte` | — | | Clone template, swap content |
| 4.13 | Newsletter (2021-06) | `/news/newsletter-2021-06` | `src/routes/news/newsletter-2021-06/+page.svelte` | — | | |
| 4.14 | Newsletter (2021-10) | `/news/newsletter-2021-10` | `src/routes/news/newsletter-2021-10/+page.svelte` | — | | |
| 4.15 | Newsletter (2021-11) | `/news/newsletter-2021-11` | `src/routes/news/newsletter-2021-11/+page.svelte` | — | | |
| 4.16 | Newsletter (2021-12) | `/news/newsletter-2021-12` | `src/routes/news/newsletter-2021-12/+page.svelte` | — | | |
| 4.17 | Newsletter (2022-01) | `/news/newsletter-2022-01` | `src/routes/news/newsletter-2022-01/+page.svelte` | — | | |
| 4.18 | Newsletter (2022-05) | `/news/newsletter-2022-05` | `src/routes/news/newsletter-2022-05/+page.svelte` | — | | |
| 4.19 | Save the Date (2022-05) | `/news/save-the-date-2022-05` | `src/routes/news/save-the-date-2022-05/+page.svelte` | — | | |

**Phase 4 complete when:** All 19 pages are APPROVED.

---

## Phase 5: Form Pages

> Forms are visual only — no submission logic. Build these last since they
> use the most form components.

| # | Page | Route | File | Status | Review Rounds | Notes |
|---|------|-------|------|--------|---------------|-------|
| 5.1 | Contact Us | `/contact-us` | `src/routes/contact-us/+page.svelte` | — | | Simple form — good first test |
| 5.2 | Donate | `/donate` | `src/routes/donate/+page.svelte` | — | | Complex form, Individual/Corporate toggle |
| 5.3 | New Membership | `/new-membership` | `src/routes/new-membership/+page.svelte` | — | | Most complex form |

**Phase 5 complete when:** All 3 pages are APPROVED.

---

## Phase 6: Final Reviews

> Cross-page consistency and build verification. These are site-wide checks,
> not individual page reviews.

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 6.1 | Cross-page consistency review (Opus) | — | Uses the cross-page prompt from `review-prompt.md` |
| 6.2 | Fix any inconsistencies found | — | |
| 6.3 | Re-run cross-page review | — | Repeat until APPROVED |
| 6.4 | `npm run check` passes | — | TypeScript/Svelte type checking |
| 6.5 | `npm run build` passes | — | Production build |
| 6.6 | Visual walkthrough of every page | — | Manual review by user |

**Phase 6 complete when:** All checks pass. Site is done.

---

## Progress Tracker

| Phase | Items | Approved | Remaining |
|-------|-------|----------|-----------|
| 0. Prerequisites | 5 | 0 | 5 |
| 1. Shared Components | 19 | 0 | 19 |
| 2. Simple Info Pages | 4 | 0 | 4 |
| 3. Complex Info Pages | 10 | 0 | 10 |
| 4. News Pages | 19 | 0 | 19 |
| 5. Form Pages | 3 | 0 | 3 |
| 6. Final Reviews | 6 | 0 | 6 |
| **Total** | **66** | **0** | **66** |

---

## Rules

1. **Never skip the review step.** Every single item gets an Opus review.
2. **Never mark APPROVED unless the Opus reviewer says zero issues.** No exceptions.
3. **Keep going until it is perfect.** There is no "close enough." If the review finds 1 issue, fix it and re-review. If the re-review finds a new issue, fix it and re-review again. Repeat forever until APPROVED.
4. **Review the template articles thoroughly.** CP 2021-12 and MC 2021-12 are the template articles — they get the most scrutiny. Once approved, the cloned articles need lighter reviews (just content accuracy).
5. **Update this checklist as you go.** Fill in the Status and Review Rounds columns so progress is tracked across conversations.
6. **Read this file at the start of every conversation.** It tells you what's done and what's next.
