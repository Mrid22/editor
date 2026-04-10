# Implementation Plan: Non-Empty Project Table

**Branch**: `002-add-project-table` | **Date**: 2026-04-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-add-project-table/spec.md`

## Summary

Replace homepage empty-state rendering with a non-empty, read-only table when dummy project
data exists. The table will use shadcn table primitives and display three fields per row:
project name, end-biased truncated path suffix, and created date formatted as `YYYY-MM-DD`.
No add/open/navigation behavior is included in this phase.

## Technical Context

**Language/Version**: TypeScript 5.9.x + React 19.x  
**Primary Dependencies**: Vite 7.x, shadcn UI table primitives, Tailwind CSS, class-variance-authority  
**Storage**: N/A (in-memory dummy data only for this phase)  
**Testing**: Vitest 4.x, @testing-library/react, @testing-library/jest-dom  
**Target Platform**: Tauri desktop shell + modern browser runtime (Vite dev/build)  
**Project Type**: Desktop web UI application (React frontend in Tauri)  
**Performance Goals**: Initial non-empty table visible within 1s for dummy datasets up to 10 rows  
**Constraints**: Read-only rows, no navigation action, date shown as `YYYY-MM-DD`, preserve empty-state fallback  
**Scale/Scope**: One homepage state branch, one table view, dummy dataset up to 10 rows, single user story

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Code quality scope is explicit: affects `src/App.tsx` conditional branch and new/updated
  table presentation component; no dead paths should remain once non-empty branch is wired.
- Readability is preserved: include concise comments around path-suffix truncation helper and
  state-based rendering so intent is clear in review.
- Module boundaries are respected: `App` owns state selection (empty vs non-empty), table UI
  remains a presentational component using shared shadcn primitives.
- Test strategy is defined: update/add unit tests for rendering and formatting helpers; add
  integration tests for non-empty branch visibility and empty-state fallback behavior.
- UX consistency is defined: use existing shadcn table styling, preserve app spacing/typography,
  and keep row behavior read-only with no accidental clickable affordance.
- Performance expectations are measurable: validate render responsiveness on 10-row dummy data
  and ensure no heavy transforms occur per render beyond lightweight string/date formatting.

**Post-Design Re-check**: PASS. Phase 1 artifacts (research, data model, quickstart, UI contract)
preserve module boundaries, testability, UX consistency, and measurable performance constraints.

## Project Structure

### Documentation (this feature)

```text
specs/002-add-project-table/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── project-table-view-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── App.tsx
├── components/
│   ├── data-table.tsx
│   └── ui/
│       └── table.tsx
└── app/
    └── dashboard/
        └── data.json

tests/
├── integration/
│   └── homepage.test.tsx
└── unit/
    └── empty-state.test.tsx
```

**Structure Decision**: Keep a single-project React/Tauri structure. Reuse existing
`data-table.tsx` and shadcn table primitives; update `App.tsx` dummy-state branching and
test files under `tests/unit` + `tests/integration`.

## Complexity Tracking

No constitution violations or justified complexity exceptions at planning time.
