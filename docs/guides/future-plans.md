# Future Plans Guide

Future plans live in `docs/future-plans/<feature-name>/` and represent feature ideas that are **not yet ready for implementation**. No code is written for future plans — they exist for research, brainstorming, and pre-planning.

When a future plan is mature enough to implement, use `/iw-promote-plan <feature-name>` to move it into `docs/plans/` and convert it into a full PLAN.md.

## Commands

| Command | Purpose |
|---------|---------|
| `/iw-future-plan <feature-name>` | Create or update a future plan |
| `/iw-promote-plan <feature-name>` | Promote a future plan to `docs/plans/` for implementation |

## Directory Structure

```
docs/future-plans/<feature-name>/
├── DRAFT.md              # Structured requirements/goals (optional)
├── DISCOVERY.md           # Technical research/architecture exploration (optional)
└── assets/                # Supporting files — mockups, screenshots, reference docs
```

Each future plan must contain at least one of `DRAFT.md` or `DISCOVERY.md` (or both). Create `assets/` only when needed.

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
- **Either file is optional** — but at least one must exist in each future plan directory.
- **Both files can coexist.** A DRAFT describes the what/why while a DISCOVERY explores the how.
- **Assets are optional.** Only create the `assets/` folder when you have files to put in it.
