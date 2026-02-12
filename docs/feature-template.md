# Feature Plan Template

> This is a template. When a user explicitly requests a plan file, copy this into `plans/` (relative to this file) and rename it to match the feature (e.g., `plans/provider-search-redesign.md`). Then fill in each section, replacing the placeholder text with actual feature details.

> **AI:** Do not create plan files unless the user asks for one. If a feature is large enough to warrant a plan, ask the user if they'd like one created.

> This is a living document. When a plan file exists, keep it updated throughout implementation. If new unknowns are discovered at any point, add new questions to "Open Questions" and insert a discovery phase into the plan before continuing. Always notify the user when the plan file is updated — explain what changed and why.

> Never use HTML comments in plan files. All text must be visible to the user when rendered in a markdown viewer. Use blockquotes (>) for guidance text instead.

## How to Use This Template

1. Copy this file to `plans/<your-feature-name>.md` (use kebab-case, e.g., `plans/provider-search-redesign.md`)
2. Replace all `[bracketed placeholders]` with real values
3. Adjust the phases to match your feature — the phase names and count below are examples only, not a fixed structure. Use whatever phases make sense for your feature.
4. Start with a discovery phase to identify unknowns before committing to implementation phases
5. Update status indicators and open questions as work progresses
6. Log completed work and discoveries at the bottom so future conversations have context

## Status Indicators

- 🔲 **Not Started** — work has not begun
- 🔄 **In Progress** — actively being worked on
- ✅ **Complete** — finished and verified
- ❓ **Blocked** — waiting on answers or discoveries

---

## Template Starts Here

> COPY EVERYTHING BELOW THIS LINE INTO YOUR NEW PLAN FILE

---

# Feature: [Feature Name]

## Overview

> What does this feature do? Why does it exist? How does it fit into the broader system?

[Describe the feature at a high level. A few sentences is fine.]

## Business Context

> Help AI and future developers understand the "why" and "where" of this feature.

- **Modules affected:** [e.g., Provider Network, AP/AR, Intake, Scheduling]
- **Compliance/audit considerations:** [e.g., HIPAA requirements, audit trail needs, or "None"]
- **Key stakeholders:** [e.g., Schedulers, Admins, Providers]
- **Core workflow:** [Brief description of the user workflow this enables]

## Open Questions

> Questions that need to be answered before or during implementation. Categorize them so it's clear who needs to answer — the developer or the AI. As questions are answered, move them to the "Resolved Questions" section below and update the relevant phases if the answers change the plan.

### For Developer / Stakeholder

> Questions only a human can answer — business rules, preferences, access, etc.

- [e.g., Should providers see their own availability or only admins?]
- [e.g., Do we need to support recurring availability patterns?]
- [e.g., What's the approval workflow for schedule changes?]

### For AI to Investigate

> Questions the AI can answer by exploring the codebase, DB schema, or existing patterns.

- [e.g., How does the existing appointment table handle time zones?]
- [e.g., Is there an existing pattern for bulk CSV imports?]
- [e.g., What permissions/roles currently exist for scheduling?]

### Resolved Questions

> Move answered questions here with their answers so there's a record.

- [e.g., "Should providers see availability?" — Yes, read-only view. (answered 2025-03-10)]

## Data Model

> New or modified database objects. Leave blank if no DB changes.

- **New tables:** [e.g., provider_availability, scheduling_rules]
- **Modified tables:** [e.g., added preferred_language column to provider]
- **Key relationships:** [e.g., scheduling_rules references provider via provider_id]
- **Migration notes:** [Anything special about the migration, or "Standard migration"]

## Phases

> The phases below are **EXAMPLES**. They are not a fixed structure. Rename, add, remove, or reorder phases to fit your feature. For example:
>
> - A backend-only feature might just have "Discovery", "Database", "API", "Tests"
> - A UI-heavy feature might have "Discovery", "Components", "Integration", "Polish"
> - A small bugfix might only need "Investigation" and "Fix"
>
> The point is to break the work into logical chunks that can be tracked.

> **Discovery phases:** Most features should start with at least one discovery phase where the AI explores the codebase, identifies existing patterns, and refines the plan before writing code. After discovery, update the later phases with what was learned.

> **Plan updates:** Phases are not set in stone. As discoveries are made or questions are answered, come back and revise the plan. Add notes about what changed and why.

> **Living document:** If new unknowns surface at ANY point during implementation — even mid-phase — insert a new discovery/question phase into the plan right where you are, add the new questions to the Open Questions section, and update the plan file before continuing. The plan file should always reflect current reality, not just the original plan.

> **Do not rewrite history.** Once a phase is marked ✅ Complete, its description, discoveries, and completed work log entries are frozen. Do not edit completed phase content, retroactively change their discoveries, or alter the Completed Work Log for past phases. Completed phases are a historical record of what actually happened. Only update future and in-progress phases based on new information.

### Phase 1: [e.g., Discovery & Codebase Analysis]

> Explore the codebase to answer open questions and understand existing patterns. This phase produces knowledge, not code. Update the plan after completing it.

- [e.g., Investigate existing scheduling patterns in appointment module]
- [e.g., Map out current DB schema for related tables]
- [e.g., Identify reusable components for the UI]
- [e.g., Review existing permissions/roles that apply]
- **Plan update:** After this phase, revise the Data Model and later phases based on findings
- **Status:** 🔲 Not Started

### Phase 2: [e.g., Database Layer]

> What gets built in this phase? Be specific enough that AI can execute.

- [e.g., Create provider_availability table with columns X, Y, Z]
- [e.g., Add indexes on provider_id and date_range]
- **Status:** 🔲 Not Started

### Phase 3: [e.g., API / Server Logic]

> What endpoints, services, or business logic?

- [e.g., CRUD endpoints for availability management]
- [e.g., Conflict detection logic]
- **Status:** 🔲 Not Started

### Phase 4: [e.g., UI Screens]

> What screens, components, or user-facing changes?

- [e.g., Admin availability calendar view]
- [e.g., Scheduler conflict warnings]
- **Status:** 🔲 Not Started

### Phase 5: [e.g., Testing & QA]

> What needs to be tested?

- [e.g., Unit tests for conflict detection]
- [e.g., E2E tests for the scheduling flow]
- **Status:** 🔲 Not Started

## Design Decisions & Constraints

> Things that aren't obvious from the code. This is especially useful for AI — explain patterns, restrictions, or "why we did it this way" notes. Update this section as discoveries are made during implementation.

- [e.g., "We use the existing ScheduleBlock pattern from appointment for consistency"]
- [e.g., "Provider availability is stored as time ranges, not individual slots, for performance"]
- [e.g., "Must support bulk import from CSV — see existing ImportCSV component pattern"]

## Completed Work Log

> As phases are completed, log what was done and when. Include discoveries that changed the plan — this gives future AI conversations context about what was learned, not just what was built.

- [e.g., Phase 1 completed 2025-03-10 — discovered appointment uses UTC storage, updated Data Model to match]
- [e.g., Phase 2 completed 2025-03-15 — created provider_availability table, migration in sql/v6.4.0/]
