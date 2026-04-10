# Tasks: Add Project Table Footer Actions

**Input**: Design documents from `/specs/004-add-table-footer-actions/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/table-footer-actions-contract.md`, `quickstart.md`

**Tests**: Tests are REQUIRED for this UI feature. Include unit coverage for shared action rendering and footer action behavior, plus integration coverage for non-empty table sticky footer parity and non-regression of row dropdown actions.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on unfinished tasks)
- **[Story]**: Present only for user story tasks (`[US1]`, `[US2]`)
- Every task includes an exact file path

## Path Conventions

- Source code in `src/`
- Tests in `tests/unit/` and `tests/integration/`
- Feature artifacts in `specs/004-add-table-footer-actions/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare feature-specific validation scaffolding and checkpoints

- [x] T001 Verify current test harness supports sticky footer and keyboard interactions in `tests/setup.ts`
- [x] T002 [P] Create feature UX checklist for sticky footer alignment and desktop >=1024px validation in `specs/004-add-table-footer-actions/checklists/ux-validation.md`
- [x] T003 [P] Add feature-specific test fixture notes for long-table footer behavior in `tests/fixtures/project-table-dummy-data.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create shared action model/renderer to prevent duplicated logic across homepage and table footer

- [x] T004 Add shared entry action types and IDs in `src/lib/project-entry-actions.ts`
- [x] T005 Add shared action list factory and ordered defaults (`Create Project`, `Import Project`) in `src/lib/project-entry-actions.ts`
- [x] T006 Create reusable centered action group renderer using shadcn `Button` in `src/components/project-entry-actions.tsx`
- [x] T007 Add unit tests for shared action renderer labels/order/variants in `tests/unit/project-entry-actions.test.tsx`
- [x] T008 Add unit tests for keyboard and pointer activation on shared action renderer in `tests/unit/project-entry-actions.test.tsx`

**Checkpoint**: Shared action source of truth exists and can be consumed by both user stories.

---

## Phase 3: User Story 1 - Use Footer Actions in Non-Empty Table (Priority: P1) 🎯 MVP

**Goal**: Add sticky footer actions (`Create Project`, `Import Project`) to non-empty project table with centered/aligned desktop layout and exact homepage handler parity.

**Independent Test**: Render non-empty table and verify sticky footer appears in table container with two actions in correct order, both keyboard-accessible and triggering expected callbacks.

### Tests for User Story 1 ⚠️

> **NOTE: Write tests first and confirm they fail before implementation**

- [x] T009 [P] [US1] Add integration test for non-empty table footer visibility and action labels in `tests/integration/homepage-project-table.test.tsx`
- [x] T010 [P] [US1] Add integration test for sticky footer behavior in long-list table container in `tests/integration/homepage-project-table.test.tsx`
- [x] T011 [P] [US1] Add unit test for footer keyboard activation (Tab + Enter/Space) in `tests/unit/project-table-footer-actions.test.tsx`
- [x] T012 [P] [US1] Add unit test verifying footer action callbacks are invoked in order/identity expectations in `tests/unit/project-table-footer-actions.test.tsx`
- [x] T013 [US1] Document manual sticky-footer UX checks (alignment and >=1024px behavior) in `specs/004-add-table-footer-actions/checklists/ux-validation.md`

### Implementation for User Story 1

- [x] T014 [US1] Extend table component props for shared footer actions and handlers in `src/components/project-table.tsx`
- [x] T015 [US1] Render sticky footer action area at table-container bottom in `src/components/project-table.tsx`
- [x] T016 [US1] Use shared action group renderer for footer actions in `src/components/project-table.tsx`
- [x] T017 [US1] Apply centered/aligned desktop layout classes for footer action group in `src/components/project-table.tsx`
- [x] T018 [US1] Preserve existing row dropdown actions behavior while adding footer action area in `src/components/project-table.tsx`
- [x] T019 [US1] Wire `Create Project` and `Import Project` handlers from app state into non-empty table footer path in `src/App.tsx`
- [x] T020 [US1] Add concise comment documenting sticky footer container rationale in `src/components/project-table.tsx`
- [x] T021 [US1] Run story-level type validation for footer integration via `pnpm typecheck` and record notes in `specs/004-add-table-footer-actions/checklists/ux-validation.md`
- [x] T022 [US1] Run story-level targeted tests for footer behavior via `pnpm test -- tests/unit/project-table-footer-actions.test.tsx tests/integration/homepage-project-table.test.tsx` and record notes in `specs/004-add-table-footer-actions/checklists/ux-validation.md`

**Checkpoint**: US1 delivers sticky footer actions in non-empty table and is independently testable.

---

## Phase 4: User Story 2 - Keep Actions Consistent Without Duplication (Priority: P2)

**Goal**: Ensure homepage empty-state actions and table footer actions share the same source of truth, rendering logic, and handler references.

**Independent Test**: Update shared action definition once and verify both empty-state and table footer reflect identical label/order/behavior without duplicate per-view updates.

### Tests for User Story 2 ⚠️

- [x] T023 [P] [US2] Add unit test proving empty-state consumes shared action renderer output in `tests/unit/empty-state.test.tsx`
- [x] T024 [P] [US2] Add integration test proving empty-state and table footer use same callback references supplied by `App` in `tests/integration/homepage.test.tsx`
- [x] T025 [P] [US2] Add regression test ensuring no row-dropdown breakage after shared action refactor in `tests/integration/homepage-project-table.test.tsx`
- [x] T026 [US2] Document manual parity checks between empty-state and footer actions in `specs/004-add-table-footer-actions/checklists/ux-validation.md`

### Implementation for User Story 2

- [x] T027 [US2] Refactor empty-state buttons to consume shared action renderer while preserving copy/layout in `src/components/empty-state.tsx`
- [x] T028 [US2] Move homepage action definitions to shared source-of-truth module and reuse in both views in `src/App.tsx`
- [x] T029 [US2] Remove duplicated local action label/variant definitions from empty-state after shared refactor in `src/components/empty-state.tsx`
- [x] T030 [US2] Ensure table footer and empty-state receive the same handler references from `App` in `src/App.tsx`
- [x] T031 [US2] Add concise comment documenting why shared action list is canonical in `src/lib/project-entry-actions.ts`
- [x] T032 [US2] Run story-level type/lint checks after de-duplication via `pnpm typecheck && pnpm lint` and record notes in `specs/004-add-table-footer-actions/checklists/ux-validation.md`

**Checkpoint**: US2 guarantees parity and non-duplication between homepage and table footer action paths.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, consistency review, and delivery readiness

- [x] T033 [P] Run full automated test suite for changed scope via `pnpm test` and record result in `specs/004-add-table-footer-actions/checklists/ux-validation.md`
- [x] T034 [P] Run full build validation for release readiness via `pnpm build` and record result in `specs/004-add-table-footer-actions/checklists/ux-validation.md`
- [x] T035 Validate desktop >=1024px sticky footer alignment manually against contract in `specs/004-add-table-footer-actions/checklists/ux-validation.md`
- [x] T036 Validate quickstart steps and update any drift in `specs/004-add-table-footer-actions/quickstart.md`
- [x] T037 Review for dead code/unnecessary imports after action sharing refactor in `src/components/empty-state.tsx`
- [x] T038 Review for dead code/unnecessary imports after footer integration in `src/components/project-table.tsx`
- [x] T039 Final consistency pass against spec FR-001..FR-007 and SC-001..SC-006 in `specs/004-add-table-footer-actions/spec.md`
- [ ] T040 Commit feature implementation and task completion summary referencing `specs/004-add-table-footer-actions/spec.md` and `specs/004-add-table-footer-actions/tasks.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Can start immediately.
- **Phase 2 (Foundational)**: Depends on Phase 1; blocks story work.
- **Phase 3 (US1)**: Depends on Phase 2 completion.
- **Phase 4 (US2)**: Depends on Phase 3 completion because it refactors/extends US1 paths.
- **Phase 5 (Polish)**: Depends on completion of Phase 3 and Phase 4.

### User Story Dependencies

- **US1 (P1)**: Independent MVP after foundational setup.
- **US2 (P2)**: Builds on US1 to enforce long-term consistency and deduplication.

### Parallel Opportunities

- **Setup**: T002 and T003 can run in parallel.
- **Foundational**: T007 and T008 can run in parallel after T004-T006.
- **US1 Tests**: T009-T012 can run in parallel.
- **US2 Tests**: T023-T025 can run in parallel.
- **Polish**: T033 and T034 can run in parallel.

---

## Parallel Execution Examples

### User Story 1

```bash
# Parallel test authoring for US1
Task: T009 in tests/integration/homepage-project-table.test.tsx
Task: T010 in tests/integration/homepage-project-table.test.tsx
Task: T011 in tests/unit/project-table-footer-actions.test.tsx
Task: T012 in tests/unit/project-table-footer-actions.test.tsx
```

### User Story 2

```bash
# Parallel validation tests for US2 parity and non-regression
Task: T023 in tests/unit/empty-state.test.tsx
Task: T024 in tests/integration/homepage.test.tsx
Task: T025 in tests/integration/homepage-project-table.test.tsx
```

---

## Implementation Strategy

### MVP First (US1)

1. Complete Setup + Foundational phases.
2. Complete US1 tests and implementation (T009-T022).
3. Validate US1 independently (sticky footer visible, centered/aligned, keyboard accessible, callbacks wired).

### Incremental Delivery

1. Deliver US1 for functional sticky footer entry actions.
2. Deliver US2 for strict non-duplication and long-term parity guarantees.
3. Finish with full polish and cross-cutting validations.
