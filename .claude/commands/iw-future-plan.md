---
description: Create or update a future plan — a feature idea not yet ready for implementation
argument-hint: <feature-name>
---

# Future Plan Workflow

You are creating or updating a **future plan** — a feature idea that is not yet ready for implementation. No code is written for future plans. They live in `docs/future-plans/`.

## Step 1: Determine Mode

Check if `$ARGUMENTS` matches an existing future plan:

**If a future plan already exists** (a `docs/future-plans/*/` directory matches the feature name):
1. Read the existing DRAFT.md and/or DISCOVERY.md
2. Summarize the current state to the user
3. Ask what they'd like to add or change
4. Proceed to editing

**If no future plan exists** (new idea):
1. Confirm the feature name with the user. Convert to kebab-case for the directory name.
2. Ask the user: **"Would you like to start with a Draft (what/why), a Discovery (how/technical), or both?"**
3. Proceed to the appropriate template

## Step 2: Choose File Type

### DRAFT.md — "What do we want to build?"

A structured requirements document. Use the template from `docs/guides/future-plans.md` (under the DRAFT.md section).

Create this when the user wants to capture:
- What the feature does and why it matters
- Who uses it and what problem it solves
- Requirements and scope
- Open questions that need answering

### DISCOVERY.md — "How would we build it?"

A free-form technical exploration. Use the template from `docs/guides/future-plans.md` (under the DISCOVERY.md section).

Create this when the user wants to explore:
- Architecture options and trade-offs
- Data models, APIs, infrastructure
- Technical risks and concerns
- Implementation phasing ideas

## Step 3: Create the Future Plan

1. Create the directory: `docs/future-plans/<feature-name>/`
2. Create the appropriate file(s) using the templates
3. Fill in sections based on what the user provides
4. Ask clarifying questions for anything unclear — but don't block on completeness. Future plans are allowed to be partial.

## Step 4: Summarize

After creating or updating, summarize what was written and highlight any open questions that might need answers before this could be promoted to a real plan.

If the future plan feels mature enough for implementation, mention that `/iw-promote-plan <feature-name>` can move it to `docs/plans/` when ready.

## Important Rules

- **No code.** Future plans are research and planning only.
- **Don't over-structure.** These are intentionally lighter than formal plans. Let the user write freely.
- **Both files can coexist.** The user can have a DRAFT and a DISCOVERY in the same future plan.
- **Update only when asked.** Don't enforce maintenance rules on future plans.
- **Create `assets/` only when needed.** Don't create empty directories.
