<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- Template Principle 1 -> I. Code Quality Is Mandatory
- Template Principle 2 -> II. Readability Over Cleverness
- Template Principle 3 -> III. Modular Boundaries First
- Template Principle 4 -> IV. Tests Prove Behavior
- Template Principle 5 -> V. UX Consistency Is a Feature
- Added principle -> VI. Performance Budgets Are Requirements
Added sections:
- Engineering Standards
- Delivery Workflow
Removed sections:
- None
Templates requiring updates:
- ✅ updated /home/mridula/Work/editor/.specify/templates/plan-template.md
- ✅ updated /home/mridula/Work/editor/.specify/templates/spec-template.md
- ✅ updated /home/mridula/Work/editor/.specify/templates/tasks-template.md
- ✅ no command templates present at /home/mridula/Work/editor/.specify/templates/commands/
Follow-up TODOs:
- None
-->

# Editor Constitution

## Core Principles

### I. Code Quality Is Mandatory
Every change MUST leave the touched code in a more correct, typed, and maintainable
state than before. New behavior MUST pass linting, type checking, and build validation
before review. Dead code, duplicated logic, and silent failure paths MUST be removed or
explicitly justified in the plan. Rationale: quality regressions compound quickly in a
desktop app that spans React, TypeScript, and Tauri runtime boundaries.

### II. Readability Over Cleverness
Code MUST optimize for fast comprehension by the next maintainer. Names MUST describe
domain intent, control flow MUST stay straightforward, and non-obvious logic MUST carry
succinct explanatory comments in the changed file. Comments MUST explain why a complex
decision exists, not restate obvious mechanics. Rationale: readable code shortens review
time and lowers the cost of future changes.

### III. Modular Boundaries First
Features MUST be implemented as cohesive modules with explicit interfaces between UI,
application logic, data access, and native integration layers. Components, hooks, and
utilities MUST have a single clear responsibility, and cross-module coupling MUST be
minimized. Shared behavior MUST be extracted instead of copied once a second consumer is
introduced. Rationale: modular boundaries keep the React and Tauri surfaces independently
evolvable and easier to test.

### IV. Tests Prove Behavior
Behavior changes MUST be accompanied by automated tests at the narrowest effective level:
unit tests for isolated logic, integration tests for component and boundary behavior, and
end-to-end or manual scripted checks for critical user journeys when automation is not yet
practical. Bug fixes MUST add a regression test or document why one cannot be added.
Rationale: unverified changes are indistinguishable from guesses.

### V. UX Consistency Is a Feature
User-facing changes MUST preserve shared interaction patterns, visual language, copy tone,
keyboard behavior, loading states, and error handling across the application. Existing UI
primitives and design tokens MUST be reused unless a deliberate exception is documented.
Accessibility states, empty states, and failure states MUST be designed with the same care
as the happy path. Rationale: consistency is part of product quality, not polish.

### VI. Performance Budgets Are Requirements
Changes MUST define and respect measurable performance expectations for the affected flow,
including render cost, interaction latency, data loading, or native bridge usage as
applicable. New work MUST avoid unnecessary rerenders, oversized payloads, blocking main
thread work, and repeated native calls. Any intentional tradeoff against performance MUST
be documented in the plan with a mitigation path. Rationale: perceived responsiveness is a
core quality attribute for an editor experience.

## Engineering Standards

- React, TypeScript, and Tauri code MUST keep type boundaries explicit and avoid leaking
	unvalidated data across layers.
- Shared UI work MUST build on the established component primitives in `src/components/ui/`
	and existing app-level patterns before introducing new abstractions.
- Complicated changes MUST include concise comments at the point of complexity so future
	maintainers can understand the constraint or tradeoff quickly.
- Feature plans MUST state the intended test coverage, UX impact, and performance budget
	before implementation starts.
- Exceptions to these standards MUST be recorded in the implementation plan's complexity
	tracking section and approved during review.

## Delivery Workflow

1. Specifications MUST describe user value, measurable success criteria, UX expectations,
	 test strategy, and relevant performance constraints before work begins.
2. Implementation plans MUST pass the Constitution Check before research ends and again
	 before task generation.
3. Task lists MUST include work for automated validation, user-facing verification, and any
	 performance measurement needed to prove acceptance criteria.
4. Before review, contributors MUST run the applicable validation commands for the touched
	 scope, which normally includes `pnpm lint`, `pnpm typecheck`, and `pnpm build` for the
	 web layer, plus the relevant Rust or Tauri checks when native code changes.
5. Reviews MUST reject changes that violate a core principle unless the plan documents an
	 approved exception and the migration cost is understood.

## Governance

This constitution overrides informal local practice for feature planning, implementation,
and review in this repository. Amendments MUST be captured in this file, MUST include a
brief rationale in the Sync Impact Report, and MUST update any affected templates before the
change is considered complete.

Versioning follows semantic versioning for governance changes: MAJOR for removing or
redefining a principle in a backward-incompatible way, MINOR for adding a principle or
materially expanding mandatory guidance, and PATCH for clarifications that do not change
expected behavior.

Compliance review is mandatory at plan time, at review time, and whenever a release-worthy
feature changes architecture, UX patterns, or performance characteristics. Any unresolved
violation MUST be tracked explicitly in planning artifacts until removed.

**Version**: 1.0.0 | **Ratified**: 2026-04-10 | **Last Amended**: 2026-04-10
