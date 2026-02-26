---
description: Promote a future plan from docs/future-plans/ to docs/plans/ for implementation
argument-hint: <feature-name>
---

# Promote Future Plan to Active Plan

You are promoting a future plan to an active implementation plan. This moves it from `docs/future-plans/` to `docs/plans/` and creates a proper `PLAN.md`.

## Step 1: Find the Future Plan

Look for `$ARGUMENTS` in `docs/future-plans/`:
- Check if `docs/future-plans/$ARGUMENTS/` exists (exact match)
- If not, list available future plans and ask the user which one

If no future plan is found, tell the user and suggest `/iw-future-plan <name>` to create one first.

## Step 2: Read Existing Content

Read all files in the future plan directory:
- `DRAFT.md` (if it exists) — requirements, goals, business context
- `DISCOVERY.md` (if it exists) — technical research, architecture ideas
- Any files in `assets/`

Summarize what exists to the user.

## Step 3: Assess Readiness

Before promoting, check if the future plan has enough substance for a real plan. Look for:
- [ ] Clear understanding of what the feature does
- [ ] At least some technical exploration or architecture thinking
- [ ] No critical unanswered questions that would block planning

If the future plan feels too thin, tell the user what's missing and suggest they flesh it out with `/iw-future-plan <name>` first. Don't block them — if they want to promote anyway, proceed.

## Step 4: Create the Active Plan

1. Move the directory: `docs/future-plans/<name>/` → `docs/plans/<name>/`
2. If DRAFT.md and/or DISCOVERY.md exist, move them to `docs/plans/<name>/research/` as reference material
3. Create `docs/plans/<name>/PLAN.md` using the template from `docs/guides/feature-template.md`
4. Populate the PLAN.md using content from the DRAFT and DISCOVERY files:
   - **Overview** ← from DRAFT overview / DISCOVERY problem statement
   - **Business Context** ← from DRAFT business context
   - **System Mapping** ← from DISCOVERY technical exploration (relevant codebase findings)
   - **Open Questions** ← merge open questions from both files
   - **Data Model** ← from DISCOVERY if it explored data models
   - **Proposed Approaches** ← from DISCOVERY architecture options
   - **Phases** ← from DISCOVERY rough phasing ideas (formalized with status indicators)
   - **Design Decisions** ← from DISCOVERY concerns and architectural decisions

## Step 5: Run Discovery (if needed)

If the future plan was mostly a DRAFT with little technical exploration:
1. Offer to run the standard discovery workflow (code-explorer agents) from `/iw-plan-feature`
2. If the user agrees, launch 2-3 explorer agents to map relevant architecture
3. Update the PLAN.md System Mapping section with findings

## Step 6: Present the Plan

1. Show the user the completed PLAN.md
2. Highlight any sections that are thin and might need more detail
3. Remind them that the plan-maintenance skill will now apply to this plan
4. Ask if they'd like to refine anything before starting implementation

## Important Rules

- **Use `git mv`** to move the directory so git tracks the rename
- **Preserve original files** in `research/` — don't delete the DRAFT or DISCOVERY
- **Always use the standard template** from `docs/guides/feature-template.md` for the new PLAN.md
- **Don't start implementation** — promoting creates the plan, it doesn't start coding
- **All standard plan rules apply** once promoted (plan-maintenance skill, phase tracking, frozen completed phases)
