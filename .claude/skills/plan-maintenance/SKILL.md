---
name: plan-maintenance
description: Feature plan maintenance, PLAN.md updates, plan phases, open questions, completed work log, design decisions. Use when working on a feature that has an active plan in docs/plans/, or when any PLAN.md file is referenced or relevant to the current task.
user-invocable: false
---

# Plan Maintenance Rules

**PLAN.md is a living document.** It must be kept current throughout implementation — not just at the start. The plan should always reflect current reality: what's been learned, what's changed, what's blocked, and what's next. If the plan doesn't match what's actually happening, update it immediately.

When working on a feature that has a `docs/plans/*/PLAN.md` file, these rules are mandatory.

## Suggest /plan-feature When Appropriate

If the user asks to plan a new feature, start a feature plan, or begins describing a large feature that doesn't have a plan yet — suggest they use `/iw-plan-feature <feature-name>`. Explain that it runs a structured workflow with codebase exploration agents, architecture design, and creates the PLAN.md automatically. Don't force it — just recommend it once. If they decline, follow the template in `docs/guides/feature-template.md` manually.

If the user is already working on a feature that has an existing plan and starts a new session without referencing it, mention the plan exists and offer to read it before starting work.

## Before Starting Work

1. **Read the plan first.** Before writing any code for a planned feature, read its PLAN.md to understand current state, open questions, and design decisions.
2. **Check the current phase.** Only work on phases marked 🔄 In Progress or 🔲 Not Started. If the next logical phase is Not Started, mark it In Progress before beginning.
3. **Check open questions.** If there are unresolved questions in "For Developer / Stakeholder" that affect the current phase, ask the user before proceeding.

## Completed Phases Are Frozen

Once a phase is marked `✅ Complete`:
- **Never edit** its description, discoveries, or task list
- **Never modify** Completed Work Log entries for that phase
- **Never retroactively change** what was documented as discovered or built
- Completed phases are a **historical record** of what actually happened
- If a completed phase's outcome turns out to be wrong, add a correction note to the **current** phase — do not modify the completed phase

## Updating the Plan During Implementation

When new information surfaces during implementation:

1. **New unknowns discovered:** Add new questions to the Open Questions section under the appropriate category (Developer/Stakeholder or AI to Investigate). If the unknown blocks progress, insert a new discovery phase at the current position in the plan.

2. **Questions answered:** Move answered questions from Open Questions to Resolved Questions. Include the answer and the date. If the answer changes the plan, update future/in-progress phases accordingly.

3. **Phase scope changes:** If a phase needs more or fewer tasks than originally planned, update it — but only if it's not yet Complete.

4. **Design decisions made:** Add them to the Design Decisions & Constraints section with reasoning. This is critical for future sessions.

5. **Work completed:** Add a dated entry to the Completed Work Log when marking a phase done. Include what was built and any discoveries that changed the plan.

## Always Notify the User

When updating the plan, **always tell the user** what changed and why. Do not silently modify PLAN.md. Explain:
- Which section was updated
- What was added or changed
- Why the change was necessary

## Discovery Must Complete Before Implementation

Phase 1 (Discovery) must be marked ✅ Complete before any implementation phase begins. Discovery produces knowledge, not code. If the plan doesn't have a discovery phase, ask the user if one should be added before starting implementation.

## Status Indicators

Use these consistently:
- `🔲 Not Started` — work has not begun
- `🔄 In Progress` — actively being worked on
- `✅ Complete` — finished and verified
- `❓ Blocked` — waiting on answers or discoveries

## Plan Directory Structure

Plans live in `docs/plans/<feature-name>/` with this structure:
```
docs/plans/<feature-name>/
├── PLAN.md              # The plan document (required)
├── assets/              # Screenshots, diagrams, mockups
├── transcripts/         # Meeting notes, call transcripts
└── research/            # Technical findings, codebase analysis
```

Create subdirectories only as needed — don't create empty ones. Reference artifacts with relative paths from PLAN.md.

## Writing Quality

The plan must be **clean, organized, and readable enough that a 10-year-old could follow the structure** — while never sacrificing technical detail. Every section should be scannable at a glance but complete when read closely.

- **Use plain language.** Avoid jargon when a simpler word works. If a technical term is necessary, it's fine — but don't make sentences harder than they need to be.
- **Use tables, lists, and headers aggressively.** Walls of text are never acceptable. Break information into structured formats. If something can be a table, make it a table. If something can be a bullet list, make it a bullet list.
- **One idea per bullet.** Don't cram multiple concepts into a single bullet point.
- **Label everything.** Sections, phases, questions — everything gets a clear header. A reader should be able to jump to any section and understand it without reading the whole document.
- **Show, don't just tell.** Use code snippets, SQL examples, file paths with line references, and concrete values instead of vague descriptions. "Rate is $2.51/mile for FL" is better than "rate varies by state."
- **No detail left behind.** Readability does not mean leaving things out. Every discovery, every decision, every edge case gets documented — just in a clean, organized way.

## Never Use HTML Comments

All text in plan files must be visible when rendered in a markdown viewer. Use blockquotes (`>`) for guidance text, not HTML comments.
