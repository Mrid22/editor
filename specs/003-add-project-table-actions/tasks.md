# Tasks: Add Project Table Actions Column

**Input**: Design documents from `/specs/003-add-project-table-actions/`
**Prerequisites**: [plan.md](plan.md) (required), [spec.md](spec.md) (required), [research.md](research.md), [data-model.md](data-model.md), [contracts/project-table-actions-contract.md](contracts/project-table-actions-contract.md), [quickstart.md](quickstart.md)

**Tests**: Tests are REQUIRED for this UI feature. Include unit tests for ActionCell component (render, click, keyboard), dropdown interaction tests (open/close), keyboard navigation tests (Arrow keys, Enter, Escape), and integration tests verifying the actions column is present in the full homepage layout.

**Organization**: Tasks are grouped by user story so the feature remains independently implementable and testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on incomplete tasks)
- **[Story]**: User story label for story-specific tasks (US1)
- All task descriptions include exact file paths

## Path Conventions

- Single project paths under `src/` and `tests/`
- Feature specs under `specs/003-add-project-table-actions/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare test and validation scaffolding for actions column feature

- [x] T001 Verify test infrastructure is ready in `vitest.config.ts` and `tests/setup.ts` for component/table dropdown tests
- [x] T002 [P] Create ActionCell component test fixtures in `tests/fixtures/project-table-dummy-data.ts` (add action test data if needed)
- [x] T003 [P] Create manual UX checklist for dropdown and keyboard accessibility in `specs/003-add-project-table-actions/checklists/ux-validation.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared types and contracts required before user story implementation

- [x] T004 Add `ProjectAction` type and `ActionCellProps` interface to `src/lib/project-table-types.ts`
- [x] T005 [P] Create UI/interaction contract document confirming dropdown behavior in `specs/003-add-project-table-actions/contracts/project-table-actions-contract.md` (already exists, verify completeness)

**Checkpoint**: Foundation complete; user story work can begin

---

## Phase 3: User Story 1 - Access Project Actions via Dropdown (Priority: P1) 🎯 MVP

**Goal**: Add a fourth "Actions" column to the project table with an ellipsis button that opens a dropdown menu showing three action options (Open In, Delete, Share). Dropdown supports keyboard navigation (Arrow Up/Down), Enter key selection, and Escape to close.

**Independent Test**: Render the project table with the actions column present, click the ellipsis button to open the dropdown, verify three menu items are visible, test keyboard navigation (Arrow keys move focus between items), and verify dropdown closes on Escape or outside click.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T006 [P] [US1] Add unit tests for ActionCell component rendering in `tests/unit/project-table-actions.test.tsx` (render ellipsis button, verify icon visible, aria-label present)
- [x] T007 [P] [US1] Add unit tests for ActionCell dropdown interaction in `tests/unit/project-table-actions.test.tsx` (click to open, click menu item, onAction callback invoked)
- [x] T008 [P] [US1] Add unit tests for dropdown keyboard navigation in `tests/unit/project-table-actions.test.tsx` (Arrow Down/Up move focus, Enter selects action, Escape closes)
- [x] T009 [US1] Add integration test for actions column visibility in project table in `tests/integration/homepage-project-table.test.tsx` (verify "Actions" header visible, ellipsis buttons in all rows)
- [x] T010 [US1] Add integration test for dropdown closes on outside click in `tests/integration/homepage-project-table.test.tsx`
- [x] T011 [US1] Document manual UX checks for dropdown positioning, keyboard focus indicators, and mobile responsiveness in `specs/003-add-project-table-actions/checklists/ux-validation.md`

### Implementation for User Story 1

- [x] T012 [P] [US1] Create ActionCell sub-component with DropdownMenu logic in `src/components/project-table.tsx` (useState for isOpen, handleAction callback, DropdownMenu/MenuContent/MenuItem from shadcn)
- [x] T013 [US1] Add Actions column header and cell rendering to ProjectTable in `src/components/project-table.tsx` (add TableHead for "Actions", TableCell with ActionCell component in each row)
- [x] T014 [US1] Import and configure DropdownMenu, DropdownMenuContent, DropdownMenuItem from shadcn UI in `src/components/project-table.tsx`
- [x] T015 [US1] Import MoreHorizontal icon from lucide-react and use in ellipsis trigger button in `src/components/project-table.tsx`
- [x] T016 [US1] Implement dropdown state management with `useState(false)` for isOpen in ActionCell component in `src/components/project-table.tsx`
- [x] T017 [US1] Wire onAction callback invocation with (action, projectId) payload in ActionCell in `src/components/project-table.tsx`
- [x] T018 [US1] Add aria-label="Open project actions" to ellipsis button for accessibility in `src/components/project-table.tsx`
- [x] T019 [US1] Verify keyboard navigation (Arrow keys, Enter, Escape) works via shadcn DropdownMenu default behavior in `src/components/project-table.tsx`
- [x] T020 [US1] Add concise explanatory comments for dropdown state and action handler logic in `src/components/project-table.tsx`
- [x] T021 [US1] Run type validation and resolve any issues in `src/components/project-table.tsx` and `src/lib/project-table-types.ts` via `pnpm typecheck`
- [x] T022 [US1] Run lint validation and resolve any issues in `src/components/project-table.tsx` via `pnpm lint`
- [x] T023 [US1] Run build validation and resolve any issues in `src/components/project-table.tsx` via `pnpm build`

### Validation for User Story 1

- [x] T024 [US1] Validate actions column visibility and ellipsis triggers present in all rows against [spec.md](spec.md) FR-001, FR-002 in `specs/003-add-project-table-actions/checklists/ux-validation.md`
- [x] T025 [US1] Validate dropdown opens on click and shows three options against [spec.md](spec.md) FR-003, FR-004 in `tests/unit/project-table-actions.test.tsx`
- [x] T026 [US1] Validate dropdown closes on outside click and Escape key against [spec.md](spec.md) FR-005 in `tests/unit/project-table-actions.test.tsx`
- [x] T027 [US1] Validate ellipsis button keyboard accessibility and Enter key opens dropdown against [spec.md](spec.md) FR-007 in `tests/unit/project-table-actions.test.tsx`
- [x] T028 [US1] Validate Arrow Up/Down keyboard navigation within dropdown menu against [spec.md](spec.md) FR-008, FR-009 in `tests/unit/project-table-actions.test.tsx`
- [x] T029 [US1] Validate dropdown stays within viewport boundaries on all screen sizes against [spec.md](spec.md) FR-010 in `specs/003-add-project-table-actions/checklists/ux-validation.md`
- [x] T030 [US1] Verify all success criteria SC-001 through SC-007 in [spec.md](spec.md) against feature implementation
- [x] T031 [US1] Verify dropdown styling consistency (button size, hover states, menu appearance) matches existing UI patterns in `src/components/project-table.tsx`

**Checkpoint**: User Story 1 complete and independently testable; MVP ready.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final quality gates, documentation sync, and delivery readiness

- [x] T032 [P] Run the full automated suite for changed behavior in `tests/unit/project-table-actions.test.tsx` and `tests/integration/homepage-project-table.test.tsx` via `pnpm test`
- [x] T033 [P] Confirm quickstart instructions match implementation and validation commands in `specs/003-add-project-table-actions/quickstart.md`
- [x] T034 Validate shared UX consistency (button size, dropdown styling, focus indicators) in `src/components/project-table.tsx`
- [x] T035 Validate desktop and mobile responsiveness (dropdown positioning, button accessibility) in `specs/003-add-project-table-actions/checklists/ux-validation.md`
- [x] T036 Final review for dead code/unnecessary imports in `src/components/project-table.tsx` and `src/lib/project-table-types.ts`
- [ ] T037 Commit feature changes with summary referencing `specs/003-add-project-table-actions/spec.md` and `specs/003-add-project-table-actions/tasks.md`

---

## Dependencies & Execution Order

**Critical Path**:
1. **Phase 1** (Setup) must complete first → enables Phase 2
2. **Phase 2** (Foundation) must complete → enables Phase 3
3. **Phase 3** (User Story 1) can proceed in parallel for independent story implementation:
   - Tests (T006-T011) can write in parallel with each other
   - Implementation (T012-T023) depends on tests being written first (TDD pattern)
   - Validation (T024-T031) depends on implementation complete
4. **Phase 4** (Polish) depends on Phase 3 complete

**Parallelization Opportunities**:
- T001-T003 (Setup): All three can run in parallel
- T004-T005 (Foundation): Can run in parallel
- T006-T008 (Unit tests): All three can write in parallel
- T012-T020 (Implementation): T012 must complete first (create ActionCell), then T013-T020 can proceed with modifications to that component
- T032-T036 (Polish validation): Can run in parallel
- T024-T031 (Story validation): Can run in parallel once implementation complete

**Non-Parallelizable Dependencies**:
- T012 → T013, T014, T015, T016, T017, T018, T019, T020 (ActionCell must exist before wiring into ProjectTable)
- Phase 2 → Phase 3 (types must be defined before component can use them)
- Phase 3 Tests → Phase 3 Implementation (tests should fail first, then implementation makes them pass)

**MVP Scope**: 
Complete through Phase 3 (User Story 1) for minimum viable feature delivery. Phase 4 polish is recommended before production merge but can be deferred if needed.

