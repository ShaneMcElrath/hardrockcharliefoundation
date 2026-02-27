# Plan Creation Status

> **What this is:** Tracks the progress of creating and refining this plan so it's
> ready for one-shot execution. This is NOT the build checklist — this is the
> checklist for getting the PLAN itself ready.

## Plan Creation Progress

### Done

- [x] **Screenshot collection** — All page screenshots saved and organized into asset folders
- [x] **Asset folder renaming** — All folders renamed from WordPress slugs to clean kebab-case (e.g., `aboutus-boardofdirectors` → `about-board-of-directors`)
- [x] **Asset file renaming** — All files renamed from `img.png`/`zoom_out.png` to `detail-01.png`/`full-page.png`
- [x] **DRAFT.md created** — Main plan document with overview, requirements, scope, QA strategy
- [x] **pages.md created** — All 36 pages inventoried with routes, types, screenshot locations, questions
- [x] **images.md created** — ~87 content images cataloged with filenames, save paths, descriptions
- [x] **fonts.md created** — Template for font specifications (user fills in)
- [x] **components.md created** — 19 reusable components identified with descriptions and build order
- [x] **checklist.md created** — 66-item build tracker across 6 phases
- [x] **review-prompt.md created** — Standardized Opus QA prompt template with variants
- [x] **Old plan removed** — Deleted stale `docs/plans/public-pages-redesign/` (replaced by this future plan)

### Needs Your Input

These items require you to review files, answer questions, and fill in blanks.
Look for `<!-- ✏️ USER EDIT -->` markers in each file.

- [ ] **Answer questions in pages.md** — Each page section has questions about content, routing, and behavior. Open the file and search for `✏️`. Key questions:
  - Are "Get Involved — Membership" and "New Membership" the same page?
  - What items are in each nav dropdown (About Us, Programs, News)?
  - How many board members and advisory board members?
  - Should all news articles be built or just templates + a few examples?
  - Are category filter pages needed or just the main news listing?
  - Should the reCAPTCHA on Contact Us be a visual placeholder or omitted?

- [ ] **Answer questions in DRAFT.md** — Open questions at the bottom:
  - Do you have WordPress admin access to export text content?
  - Are gallery images already saved or need downloading?
  - Do you have partner logos as separate files?

- [ ] **Fill in fonts.md** — Inspect the WordPress site in browser dev tools (right-click text → Inspect → look at `font-family` in Computed styles). Fill in:
  - Heading font
  - Body font
  - Nav font
  - Tagline font ("RECONNECTING OUR RANGER BROTHERS")
  - Button font

- [ ] **Fill in images.md** — This is the biggest task:
  - [ ] Fill in board member names (images #7–14)
  - [ ] Fill in advisory board member names (images #15–18)
  - [ ] Confirm/correct partner logo names (images #30–49)
  - [ ] Add or remove rows as needed for actual counts
  - [ ] Optionally add descriptions for the 38 gallery images (#50–87)

- [ ] **Save content images to `static/images/`** — Create the folder structure from images.md and save each image with the filename listed. Check off each one in images.md as you go.

### Not Started Yet

- [ ] **Content text extraction** — Decide how article/page text will be captured (WordPress export, manual copy from site, transcribe from screenshots). This affects how much work the build phase requires.
- [ ] **WordPress HTML/CSS reference** — You mentioned you could copy HTML from dev tools. If you do this for any pages, save the raw HTML into `docs/future-plans/public-pages-replication/research/` as reference files. This helps the build agents match exact styling.
- [ ] **Final plan review** — Once all questions are answered, images saved, and fonts filled in, do a final read-through of all files to make sure nothing is missing.
- [ ] **Promote to active plan** — When everything above is done, run `/iw-promote-plan public-pages-replication` to move this to `docs/plans/` and start building.

## File Inventory

| File | Purpose | Your action needed? |
|------|---------|-------------------|
| DRAFT.md | Main plan document | Answer open questions at bottom |
| pages.md | Page inventory (36 pages) | Answer `✏️` questions under each page |
| images.md | Content images catalog (~87 images) | Fill in names, save images, check off |
| fonts.md | Font specifications | Fill in all font names |
| components.md | Reusable components (19) | Review — any missing? |
| checklist.md | Build tracker (66 items) | No action yet — used during execution |
| review-prompt.md | QA review prompt template | No action yet — used during execution |
| PLAN-STATUS.md | This file | Check off items as you complete them |
| assets/ | Design screenshots (38 folders) | Already done |

## Quick Start

If you're picking this up fresh, here's the order:

1. Open **pages.md** — answer questions for each page (biggest impact on the plan)
2. Open **fonts.md** — fill in fonts from the WordPress site
3. Open **images.md** — fill in names, start saving images
4. Open **DRAFT.md** — answer the open questions
5. Review **components.md** — flag anything missing
6. Come back here and check off what's done
