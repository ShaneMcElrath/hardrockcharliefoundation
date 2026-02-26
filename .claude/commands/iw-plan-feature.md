---
description: Start or resume a feature plan with guided discovery, codebase exploration, and architecture design
argument-hint: [feature-name or path to existing plan]
---

# Feature Planning Workflow

You are orchestrating a feature plan. This is a structured, multi-phase process that produces a living `PLAN.md` document in `docs/plans/`.

## Step 1: Determine Mode

Check if `$ARGUMENTS` points to an existing plan:

**If a plan already exists** (user provided a plan path, or a `docs/plans/*/PLAN.md` matches the feature name):
1. Read the existing PLAN.md
2. Identify the current phase (look for 🔄 In Progress or the first 🔲 Not Started phase)
3. Summarize the current state to the user: what's done, what's in progress, what's next, any open questions
4. Ask the user what they'd like to work on
5. Skip to the relevant phase below

**If no plan exists** (new feature):
1. Confirm the feature name with the user. Convert to kebab-case for the directory name.
2. Ask the user to describe the feature: what it does, why it's needed, who uses it
3. Proceed to Phase 1: Discovery

## Phase 1: Discovery

**Goal:** Understand the codebase before planning. This phase produces knowledge, not code.

1. Ask the user clarifying questions about the feature requirements, scope, and constraints
2. Launch **2-3 code-explorer agents in parallel** targeting different aspects:
   - One exploring similar existing features in the codebase
   - One mapping the relevant architecture (tables, APIs, UI components)
   - One finding patterns and conventions used in related areas
3. Read the key files identified by the explorer agents
4. Present findings to the user as a "System Mapping" summary:
   - Relevant tables and their relationships
   - Existing patterns that should be followed
   - Related code paths and entry points
   - Key files that will need modification

**Gate:** Do not proceed until the user has seen the findings and confirmed the direction.

## Phase 2: Post-Discovery Questions

**Goal:** Identify everything that's underspecified before committing to an approach.

1. Review what was discovered in Phase 1
2. Compile questions in two categories:
   - **For Developer/Stakeholder:** Business rules, preferences, access decisions — things only a human can answer
   - **For AI to Investigate:** Things that can be answered by further codebase exploration
3. Present ALL questions to the user. This is critical — surface unknowns now, not during implementation.
4. For "AI to Investigate" questions, explore the codebase to find answers
5. Wait for the user to answer stakeholder questions before proceeding

**Gate:** All critical questions must be answered. Non-critical questions can be deferred but must be logged in Open Questions.

## Phase 3: Architecture Design

**Goal:** Present multiple approaches so the user can choose.

1. Launch **2-3 code-architect agents** with different approaches:
   - **Approach A: Minimal changes** — smallest footprint, reuses existing patterns heavily
   - **Approach B: Clean architecture** — ideal design, may require more changes but produces better long-term code
   - **Approach C: Pragmatic balance** — middle ground between A and B
2. For each approach, document:
   - What tables/columns change
   - What API endpoints are needed
   - What UI components are created or modified
   - Trade-offs (effort, risk, maintainability)
3. Present the approaches to the user with a recommendation
4. Wait for the user to choose

**Gate:** User must explicitly approve an approach before implementation planning begins.

## Phase 4: Create the Plan

**Goal:** Produce the PLAN.md document.

1. Create the plan directory: `docs/plans/<feature-name>/`
2. Create `PLAN.md` using the template structure from `docs/guides/feature-template.md`
   - If a `docs/future-plans/<feature-name>/` exists, read it first and incorporate its content
3. Fill in all sections with real content from the discovery and architecture phases:
   - **Overview:** From user's description
   - **Business Context:** From discovery findings
   - **System Mapping:** From code-explorer agent findings (this section is added after the template's standard sections)
   - **Open Questions:** Any deferred questions from Phase 2
   - **Resolved Questions:** Questions answered during Phases 1-3
   - **Data Model:** From chosen architecture approach
   - **Proposed Approaches:** Document all approaches considered and which was chosen, with reasoning
   - **Phases:** Break the chosen approach into implementation phases. Always start with discovery (already done). Phase names and count should fit the feature — don't force a fixed structure.
   - **Design Decisions & Constraints:** From architecture discussion and discovery findings
4. Present the completed plan to the user for final review

## Phase 5: Implementation (if user wants to proceed)

Only if the user says to start implementing:

1. Mark the first implementation phase as 🔄 In Progress
2. Follow the plan phase by phase
3. The `plan-maintenance` skill will auto-load to enforce plan update rules
4. After completing each phase:
   - Mark it ✅ Complete
   - Add a dated entry to the Completed Work Log
   - Review the next phase — does it still make sense given what was learned?
   - If anything changed, update future phases and notify the user

## Phase 6: Quality Review (after implementation)

After all implementation phases are complete:

1. Launch **code-reviewer agents** to check:
   - Code quality and bug detection
   - CLAUDE.md convention compliance
   - Test coverage gaps
2. Present findings to the user
3. Address any critical issues
4. Update the plan's Completed Work Log with final status

## Important Rules

- **Never skip discovery.** Even if the feature seems simple, explore the codebase first.
- **Never start implementing without user approval** of the plan.
- **Always use the template structure** from `docs/guides/feature-template.md` for the PLAN.md skeleton.
- **The plan is a living document.** Update it throughout implementation. The `plan-maintenance` skill enforces the rules for how to update it correctly.
- **Completed phases are frozen.** Never edit a phase marked ✅ Complete.
- **Notify the user** whenever the plan is updated — explain what changed and why.
