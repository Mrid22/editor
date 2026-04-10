# Tasks: Non-Empty Project Table

**Input**: Design documents from `/specs/002-add-project-table/`
**Prerequisites**: [plan.md](plan.md) (required), [spec.md](spec.md) (required), [research.md](research.md), [data-model.md](data-model.md), [contracts/project-table-view-contract.md](contracts/project-table-view-contract.md), [quickstart.md](quickstart.md)

**Tests**: Tests are REQUIRED for this user-facing table state change. Include unit tests for formatters and table rendering, integration tests for homepage state branching, and manual UX checks for readability and non-interactive rows.

**Organization**: Tasks are grouped by user story so the feature remains independently implementable and testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on incomplete tasks)
- **[Story]**: User story label for story-specific tasks (US1)
- All task descriptions include exact file paths

## Path Conventions

- Single project paths under `src/` and `tests/`
- Feature specs under `specs/002-add-project-table/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare test and validation scaffolding for table-state work

- [X] T001 Verify test infrastructure is ready in `vitest.config.ts` and `tests/setup.ts` for homepage/table tests
- [X] T002 [P] Create dummy project fixtures for tests in `tests/fixtures/project-table-dummy-data.ts`
- [X] T003 [P] Create manual UX checklist for this feature in `specs/002-add-project-table/checklists/ux-validation.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared formatting and data modules required before user story implementation

- [X] T004 Create shared formatter helpers for date and end-biased path truncation in `src/lib/project-table-formatters.ts`
- [X] T005 [P] Create typed dummy project dataset module in `src/app/dashboard/project-dummy-data.ts`
- [X] T006 [P] Define project row types used by table and app state in `src/lib/project-table-types.ts`

**Checkpoint**: Foundation complete; user story work can begin

---

## Phase 3: User Story 1 - View Existing Projects Table (Priority: P1) 🎯 MVP

**Goal**: Display a non-empty, read-only homepage table using dummy project data with columns for name, end-biased truncated path, and `YYYY-MM-DD` created date.

**Independent Test**: Populate homepage state with dummy records and confirm table renders one row per project with required columns, while empty-state still appears when dataset is zero.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T007 [P] [US1] Add unit tests for path/date formatter behavior in `tests/unit/project-table-formatters.test.ts`
- [X] T008 [P] [US1] Add component tests for column headers and row rendering in `tests/unit/project-table.test.tsx`
- [X] T009 [US1] Add integration test for homepage non-empty table branch in `tests/integration/homepage-project-table.test.tsx`
- [X] T010 [US1] Add integration test for empty fallback when project list is zero in `tests/integration/homepage-project-table.test.tsx`
- [X] T011 [US1] Document manual UX checks for readability and row non-interactivity in `specs/002-add-project-table/checklists/ux-validation.md`

### Implementation for User Story 1

- [X] T012 [P] [US1] Implement `ProjectTable` component with shadcn table primitives in `src/components/project-table.tsx`
- [X] T013 [US1] Render required headers and row cells (name, path, date created) in `src/components/project-table.tsx`
- [X] T014 [US1] Apply end-biased path suffix formatting in `src/components/project-table.tsx` using `src/lib/project-table-formatters.ts`
- [X] T015 [US1] Apply `YYYY-MM-DD` created-date formatting with malformed-value fallback in `src/lib/project-table-formatters.ts`
- [X] T016 [US1] Wire homepage conditional rendering to use dummy non-empty data and `ProjectTable` in `src/App.tsx` with source data from `src/app/dashboard/project-dummy-data.ts`
- [X] T017 [US1] Keep table rows read-only (no row click/open handlers) in `src/components/project-table.tsx`
- [X] T018 [US1] Add concise explanatory comments for non-obvious state branching and truncation logic in `src/App.tsx` and `src/lib/project-table-formatters.ts`
- [X] T019 [US1] Run type validation and resolve any issues in `src/App.tsx` and `src/components/project-table.tsx` via `pnpm typecheck`
- [X] T020 [US1] Run lint validation and resolve any issues in `src/components/project-table.tsx` and `src/lib/project-table-formatters.ts` via `pnpm lint`
- [X] T021 [US1] Run build validation and resolve any issues in `src/App.tsx` and `src/components/project-table.tsx` via `pnpm build`

### Validation for User Story 1

- [X] T022 [US1] Validate non-empty table visibility and column completeness against [spec.md](spec.md) in `specs/002-add-project-table/checklists/ux-validation.md`
- [X] T023 [US1] Validate end-biased truncation behavior for long paths in `tests/unit/project-table-formatters.test.ts` and `specs/002-add-project-table/checklists/ux-validation.md`
- [X] T024 [US1] Validate `YYYY-MM-DD` date output and malformed-date fallback in `tests/unit/project-table-formatters.test.ts`
- [X] T025 [US1] Validate desktop and narrow layout readability in `specs/002-add-project-table/checklists/ux-validation.md`
- [X] T026 [US1] Validate row click inert behavior in `tests/unit/project-table.test.tsx` and `specs/002-add-project-table/checklists/ux-validation.md`
- [X] T027 [US1] Verify all success criteria SC-001 through SC-007 in `specs/002-add-project-table/spec.md`

**Checkpoint**: User Story 1 complete and independently testable; MVP ready.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final quality gates, documentation sync, and delivery readiness

- [X] T028 [P] Run the full automated suite for changed behavior in `tests/unit/project-table-formatters.test.ts`, `tests/unit/project-table.test.tsx`, and `tests/integration/homepage-project-table.test.tsx` via `pnpm test`
- [X] T029 [P] Confirm quickstart instructions match implementation and validation commands in `specs/002-add-project-table/quickstart.md`
- [X] T030 Validate shared UX consistency (table spacing, typography, empty-state fallback) in `src/components/project-table.tsx` and `src/App.tsx`
- [X] T031 Final review for dead code/unnecessary imports in `src/App.tsx`, `src/components/project-table.tsx`, and `src/lib/project-table-formatters.ts`
- [X] T032 Commit feature changes with summary referencing `specs/002-add-project-table/spec.md` and `specs/002-add-project-table/tasks.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Starts immediately
- **Foundational (Phase 2)**: Depends on setup; blocks story implementation
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion
- **Polish (Phase 4)**: Depends on Phase 3 completion

### User Story Dependencies

- **US1 (P1)**: No dependency on other stories; complete MVP after Phase 2

### Within User Story 1

- Tests (T007-T011) MUST be authored before implementation tasks
- Formatter/data foundations are consumed by table implementation
- Homepage wiring follows component completion
- Validation tasks (T022-T027) follow passing typecheck/lint/build

### Parallel Opportunities

- T002 and T003 can run in parallel in Phase 1
- T005 and T006 can run in parallel in Phase 2
- T007 and T008 can run in parallel in Phase 3 tests
- T028 and T029 can run in parallel in Phase 4

---

## Parallel Example: User Story 1

```bash
# Parallel test authoring
Task: T007 tests/unit/project-table-formatters.test.ts
Task: T008 tests/unit/project-table.test.tsx

# Parallel foundational prep
Task: T005 src/app/dashboard/project-dummy-data.ts
Task: T006 src/lib/project-table-types.ts
```

---

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Setup (T001-T003)
2. Complete Foundational tasks (T004-T006)
3. Complete US1 tests and implementation (T007-T021)
4. Validate US1 acceptance criteria (T022-T027)
5. Ship MVP with non-empty table state and preserved empty fallback

### Incremental Delivery

1. Foundation + tests for deterministic behavior
2. Component and homepage wiring
3. UX/manual validation and quality gates
4. Polish and finalize commit

### Team Parallelization

1. Developer A: formatters + formatter unit tests (T004, T007, T023, T024)
2. Developer B: table component + component tests (T012-T014, T008, T026)
3. Developer C: homepage integration + integration tests (T009, T010, T016, T022)

---

## Notes

- [P] tasks target independent files to avoid merge conflicts
- User story labeling is applied to all Phase 3 tasks
- Keep rows read-only per clarified scope
- Do not implement add/open flows in this feature
- Preserve existing empty-state behavior for zero projects
