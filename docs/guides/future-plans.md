# Future Plans Guide

Future plans live in `docs/future-plans/<feature-name>/` and represent feature ideas that are **not yet ready for implementation**. No code is written for future plans — they exist for research, brainstorming, and pre-planning.

When a future plan is mature enough to implement, use `/iw-promote-plan <feature-name>` to move it into `docs/plans/` and convert it into a full PLAN.md.

## Commands

| Command | Purpose |
|---------|---------|
| `/iw-future-plan <feature-name>` | Create or update a future plan |
| `/iw-promote-plan <feature-name>` | Promote a future plan to `docs/plans/` for implementation |

## Directory Structure

### Small plans (most features)

```
docs/future-plans/<feature-name>/
├── DRAFT.md              # Structured requirements/goals (optional)
├── DISCOVERY.md          # Technical research/architecture exploration (optional)
└── assets/               # Supporting files — mockups, screenshots, reference docs
```

### Large plans (many pages, lots of assets, multi-phase execution)

Larger features may need additional supporting files to be fully specified before
promotion. These are all optional — only create what the plan actually needs.

```
docs/future-plans/<feature-name>/
├── DRAFT.md              # Main plan document (required — or DISCOVERY.md)
├── DISCOVERY.md          # Technical exploration (optional)
├── PLAN-STATUS.md        # Tracks plan creation progress — what's done, what's next
├── pages.md              # Page/screen inventory — routes, types, screenshots, questions
├── images.md             # Content images catalog — filenames, save paths, descriptions
├── fonts.md              # Font specifications — names, weights, sources
├── components.md         # Reusable components — descriptions, props, build order
├── checklist.md          # Build tracker — per-item status across execution phases
├── review-prompt.md      # QA review prompt template — standardized agent review criteria
├── assets/               # Screenshots, mockups, design files
│   ├── <page-name>/      #   Organized by page (for UI-heavy plans)
│   └── ...
└── research/             # Reference docs, HTML exports, competitor analysis
```

### When to use which

| Plan size | What to create | When |
|-----------|---------------|------|
| **Small** (1-3 pages, clear scope) | DRAFT.md only | Simple feature, few questions |
| **Medium** (several pages, some unknowns) | DRAFT.md + DISCOVERY.md + assets/ | Needs research or has design mockups |
| **Large** (many pages, lots of assets, complex execution) | DRAFT.md + any supporting files needed | Multi-page UI replication, complex features with many moving parts |

**Rule of thumb:** Start with just DRAFT.md. Add supporting files only when the plan is
complex enough that a single document can't capture everything clearly. Never create
empty files for the sake of structure.

Each future plan must contain at least one of `DRAFT.md` or `DISCOVERY.md` (or both). All other files are optional — create them when the plan needs them.

## File Types

### DRAFT.md — "What do we want to build?"

A structured requirements document focused on the **what** and **why**. Use this when the feature idea is clear enough to describe goals, users, and scope — but implementation details haven't been explored yet.

**Template:**

```markdown
# Feature: [Feature Name]

## Overview

[What does this feature do? Why does it matter?]

## Business Context

- **Who uses it:** [e.g., Schedulers, QA team, Admins]
- **Problem it solves:** [What pain point or gap does this address?]
- **Modules likely affected:** [e.g., Intake, Scheduling, Provider Network]
- **Compliance/audit notes:** [e.g., HIPAA considerations, or "None"]

## Requirements

- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

## Open Questions

- [ ] [Question that needs answering before this can move forward]
- [ ] [Another question]

## Rough Scope Estimate

[Small / Medium / Large — with a sentence explaining why]

## Supporting Artifacts

- [e.g., [Stakeholder email](assets/original-request.pdf)]
- [e.g., [UI sketch](assets/rough-mockup.png)]
```

### DISCOVERY.md — "How would we build it?"

A free-form technical exploration document focused on the **how**. Use this when you want to research architecture, evaluate approaches, identify risks, or brainstorm implementation strategies — without committing to a formal plan.

This is where Claude or the developer can explore ideas, document AWS architecture options, sketch data models, list concerns, and outline phasing ideas. It's intentionally less structured than a PLAN.md.

**Template:**

```markdown
# Discovery: [Feature Name]

## Problem Statement

[What are we trying to solve? Frame it from a technical perspective.]

## Goals

[What specifically should the solution achieve? Be concrete.]

## Technical Exploration

[Free-form research, architecture options, data flow diagrams, API design,
infrastructure considerations. This is the main body of the document.]

## Concerns & Risks

[Privacy, performance, cost, complexity, dependencies, security —
anything that could derail implementation.]

## Rough Phasing Ideas

[If you've thought about how to break this into phases, sketch it here.
This is informal — it becomes the real phase plan when promoted.]

## Open Questions

- [ ] [Technical question that needs investigation]
- [ ] [Architecture decision that hasn't been made]

## References

- [Links, docs, prior art, competitor examples, relevant codebase paths]
```

## Optional Supporting Files (for larger plans)

These files are **never required**. Only create them when the plan is complex enough to
warrant it. A small feature should never have these — just DRAFT.md is enough.

### PLAN-STATUS.md — "Where are we in plan creation?"

Tracks the progress of building the plan itself (not the feature). Use when plan creation
spans multiple conversations and you need to remember what's done and what's next.

Contains:
- Checklist of plan creation tasks (done / needs input / not started)
- File inventory with what action is needed per file
- Quick-start instructions for picking up in a new conversation

### pages.md — "What pages/screens do we need?"

Use for UI-heavy features with many pages or screens. Lists every page with its route,
type (info/form), screenshot location, and open questions.

### images.md — "What images need to be collected?"

Catalog of every content image (photos, logos, icons) the feature needs. Each entry has a
descriptive filename, save path, and description. The user saves images using these names
and checks them off.

### fonts.md — "What fonts does the design use?"

Template for the user to fill in font names, weights, and sources. Useful when replicating
an existing design.

### components.md — "What reusable components should we build?"

Lists shared components with descriptions, props, and build order. Useful when many pages
share the same patterns (cards, form fields, layouts).

### checklist.md — "What gets built and in what order?"

Per-item build tracker with status columns. Organizes work into phases with dependencies.
Each item tracks its build status and review rounds. Used during execution, not during
plan creation.

### review-prompt.md — "How do we verify quality?"

Standardized prompt template for QA review agents. Ensures consistent, thorough reviews
across all items. Includes the exact checklist of things to verify and the expected output
format.

---

## Promoting a Future Plan

When a future plan is ready for implementation, run `/iw-promote-plan <feature-name>`.

This will:

1. Move the directory from `docs/future-plans/<name>/` to `docs/plans/<name>/`
2. Create a `PLAN.md` from the DRAFT and/or DISCOVERY content, using the standard feature plan template from `docs/guides/feature-template.md`
3. Preserve the original DRAFT.md and DISCOVERY.md in a `research/` subdirectory for reference
4. The promoted plan then follows all standard plan rules (plan-maintenance skill, phase tracking, etc.)

## Rules

- **No code for future plans.** These are research and planning only.
- **Update only when asked.** Unlike active plans, future plans don't have auto-maintenance rules.
- **Either file is optional** — but at least one of DRAFT.md or DISCOVERY.md must exist in each future plan directory.
- **Both files can coexist.** A DRAFT describes the what/why while a DISCOVERY explores the how.
- **Assets are optional.** Only create the `assets/` folder when you have files to put in it.
- **Supporting files are optional.** Only create pages.md, images.md, fonts.md, components.md, checklist.md, review-prompt.md, or PLAN-STATUS.md when the plan is large enough to need them. Most plans won't.
- **Don't over-structure small plans.** A simple feature should be a single DRAFT.md with a few paragraphs. Only scale up the structure when the complexity demands it.
