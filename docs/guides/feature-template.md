# Feature Plan Template

> **Usage:** Run `/iw-plan-feature <feature-name>` to start a new feature plan. The command
> handles discovery, codebase exploration, architecture design, and creates the PLAN.md
> automatically. To resume an existing plan, run `/iw-plan-feature <path-to-plan>`.
>
> **Plan rules** are enforced by the `plan-maintenance` skill, which auto-loads whenever
> Claude is working on a feature with an active PLAN.md.
>
> **Manual use:** If creating a plan without the command, copy the template below into
> `docs/plans/<feature-name>/PLAN.md` and fill in the sections.

---

## Plan Directory Structure

Each feature plan lives in its own directory under `docs/plans/`.

```
docs/plans/<feature-name>/
├── PLAN.md              # The plan document (required)
├── assets/              # Screenshots, diagrams, mockups, design files
├── transcripts/         # Meeting notes, call transcripts, chat logs
└── research/            # Reference docs, competitor analysis, technical findings
```

- **Directory name:** kebab-case matching the feature (e.g., `provider-search-redesign/`)
- **PLAN.md:** Always required — this is the main plan file
- **Subdirectories:** Create `assets/`, `transcripts/`, `research/` as needed — don't create empty ones
- **Referencing artifacts:** Link to files using relative paths from PLAN.md (e.g., `![mockup](assets/scheduling-mockup.png)`)
- **File naming:** Use descriptive kebab-case names with dates where relevant (e.g., `2025-03-10-kickoff-notes.md`)

| Directory      | Contents                                                                                    |
|----------------|---------------------------------------------------------------------------------------------|
| `assets/`      | Screenshots, UI mockups, diagrams, Figma exports, architecture drawings                     |
| `transcripts/` | Meeting transcripts, call recordings notes, stakeholder feedback, chat logs                  |
| `research/`    | Technical findings from codebase exploration, competitor analysis, API docs, spec references |
| Root           | `PLAN.md` and any other top-level docs that don't fit a subdirectory                        |

### Status Indicators

- `🔲 Not Started` — work has not begun
- `🔄 In Progress` — actively being worked on
- `✅ Complete` — finished and verified
- `❓ Blocked` — waiting on answers or discoveries

---

## Template Starts Here

> **COPY EVERYTHING BELOW THIS LINE INTO YOUR NEW `PLAN.md`**

# Feature: [Feature Name]

## Overview

[Describe the feature at a high level. What does it do? Why does it exist? How does it fit into the broader system?]

## Business Context

- **Modules affected:** [e.g., Provider Network, AP/AR, Intake, Scheduling]
- **Compliance/audit considerations:** [e.g., HIPAA requirements, audit trail needs, or "None"]
- **Key stakeholders:** [e.g., Schedulers, Admins, Providers]
- **Core workflow:** [Brief description of the user workflow this enables]

## Supporting Artifacts

- [e.g., [Kickoff meeting notes](transcripts/2025-03-10-kickoff-notes.md)]
- [e.g., [UI mockup](assets/calendar-mockup.png)]
- [e.g., [Codebase analysis](research/existing-patterns.md)]

## System Mapping

> Populated during discovery. Document the relevant architecture, tables, code paths,
> and patterns discovered by code-explorer agents.

[Discovery findings go here — relevant tables, existing patterns, related code paths, key files]

## Open Questions

### For Developer / Stakeholder

- [ ] [e.g., Should providers see their own availability or only admins?]

### For AI to Investigate

- [ ] [e.g., How does the existing `appointment` table handle time zones?]

### Resolved Questions

- [e.g., "Should providers see availability?" — Yes, read-only view. (answered 2025-03-10)]

## Data Model

- **New tables:** [e.g., `provider_availability`, `scheduling_rules`]
- **Modified tables:** [e.g., added `preferred_language` column to `provider`]
- **Key relationships:** [e.g., `scheduling_rules` references `provider` via `provider_id`]
- **Migration notes:** [Anything special about the migration, or "Standard migration"]

## Proposed Approaches

> Document the approaches considered during architecture design and which was chosen.

### Option A: [Name]

- **Approach:** [Description]
- **Trade-offs:** [Pros and cons]

### Option B: [Name]

- **Approach:** [Description]
- **Trade-offs:** [Pros and cons]

### Chosen: [A/B] — [Reason for choosing this approach]

## Phases

> Phase names and count should fit the feature. These are examples only.
> Always start with a discovery phase. Break work into logical, trackable chunks.

### Phase 1: [e.g., Discovery & Codebase Analysis]

- [e.g., Investigate existing scheduling patterns in `appointment` module]
- [e.g., Map out current DB schema for related tables]
- Status: 🔲 Not Started

### Phase 2: [e.g., Database Layer]

- [e.g., Create `provider_availability` table with columns X, Y, Z]
- [e.g., Add indexes on `provider_id` and `date_range`]
- Status: 🔲 Not Started

### Phase 3: [e.g., API / Server Logic]

- [e.g., CRUD endpoints for availability management]
- [e.g., Conflict detection logic]
- Status: 🔲 Not Started

### Phase 4: [e.g., UI Screens]

- [e.g., Admin availability calendar view]
- [e.g., Scheduler conflict warnings]
- Status: 🔲 Not Started

### Phase 5: [e.g., Testing & QA]

- [e.g., Unit tests for conflict detection]
- [e.g., E2E tests for the scheduling flow]
- Status: 🔲 Not Started

## Design Decisions & Constraints

- [e.g., "We use the existing `ScheduleBlock` pattern from `appointment` for consistency"]
- [e.g., "Provider availability is stored as time ranges, not individual slots, for performance"]

## Completed Work Log

- [e.g., Phase 1 completed 2025-03-10 — discovered `appointment` uses UTC storage, updated Data Model to match]
- [e.g., Phase 2 completed 2025-03-15 — created `provider_availability` table, migration in `sql/v6.4.0/`]
