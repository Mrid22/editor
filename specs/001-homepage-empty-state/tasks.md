# Tasks: Homepage Empty State

**Input**: Design documents from `specs/001-homepage-empty-state/`
**Prerequisites**: [plan.md](plan.md) ✅, [spec.md](spec.md) ✅, [research.md](research.md) ✅, [data-model.md](data-model.md) ✅, [quickstart.md](quickstart.md) ✅

**Tests**: Tests are REQUIRED. This feature includes unit tests for component isolation and integration tests for parent conditional rendering, plus manual UX validation for the user-facing empty state display.

**Organization**: Single user story (P1) provides the complete feature. Tasks are ordered for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (e.g., US1)
- File paths are exact

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Feature files: `src/components/empty-state.tsx`
- Test files: `tests/unit/empty-state.test.tsx`, `tests/integration/homepage.test.tsx`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare project structure for feature implementation

- [X] T001 Ensure `tests/unit/` and `tests/integration/` directories exist; create if missing

---

## Phase 2: Foundational (Blocking Prerequisites)

**Status**: NONE REQUIRED

This is a UI-only feature with no blocking prerequisites. The EmptyState component is self-contained
and does not require infrastructure work. Parent component integration uses existing React state
patterns and shadcn Button component. Proceed directly to Phase 3.

---

## Phase 3: User Story 1 - View Empty Project List (Priority: P1) 🎯 MVP

**Goal**: Display a centered, responsive empty state component when the projects list is empty,
with message text and two placeholder buttons (Create Project as primary, Import Project as secondary)
using shadcn Button component variants.

**Independent Test**: Can be fully tested by rendering the homepage with zero projects and verifying
the empty state UI displays correctly with proper messaging, button labels, and styling. When projects
exist, DataTable should render instead of empty state.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T002 [P] [US1] Unit test: EmptyState component renders with default props in `tests/unit/empty-state.test.tsx`
- [X] T003 [P] [US1] Unit test: EmptyState component accepts and applies custom props in `tests/unit/empty-state.test.tsx`
- [X] T004 [P] [US1] Unit test: Verify Button variants (default and secondary) are applied correctly in `tests/unit/empty-state.test.tsx`
- [X] T005 [US1] Integration test: Homepage/parent component shows EmptyState when projects.length === 0 in `tests/integration/homepage.test.tsx`
- [X] T006 [US1] Integration test: Homepage/parent component shows DataTable when projects.length > 0 in `tests/integration/homepage.test.tsx`
- [X] T007 [US1] Document manual UX validation checklist in `specs/001-homepage-empty-state/checklists/ux-validation.md`

### Implementation for User Story 1

- [X] T008 [P] [US1] Create EmptyState component with Props interface in `src/components/empty-state.tsx`
- [X] T009 [P] [US1] Implement EmptyState JSX layout (centered container, title, description, buttons) in `src/components/empty-state.tsx`
- [X] T010 [P] [US1] Apply Tailwind CSS classes for spacing and typography (no custom CSS) in `src/components/empty-state.tsx`
- [X] T011 [US1] Integrate EmptyState into parent component (App.tsx or dashboard page) with conditional rendering logic
- [X] T012 [US1] Add concise explanatory comments for conditional rendering pattern in parent component
- [X] T013 [US1] Verify TypeScript compilation: run `pnpm typecheck` with no errors
- [X] T014 [US1] Verify linting: run `pnpm lint` with no errors
- [X] T015 [US1] Verify build: run `pnpm build` produces no errors

### Validation for User Story 1


**Checkpoint**: User Story 1 complete and independently tested. Feature is ready for integration into main branch.


## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, documentation, and code quality

- [X] T026 Commit feature with detailed message: `feat: add homepage empty state with placeholder buttons`
- [X] T022 [P] Run all tests: `pnpm test` (or applicable test command) with 100% pass rate
- [X] T023 [P] Code review checklist: Verify comments on non-obvious logic, no dead code, button variants correct (✅ verified above)
- [X] T024 Validate shared UX patterns: Verify button styling matches existing app buttons, spacing consistent with design tokens (✅ using shadcn variants)
- [ ] T025 Update project README or docs if EmptyState component is added to shared component library reference
---


### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Not applicable; no prerequisites needed for this UI-only feature
- Tests (T002-T007) MUST be written and FAIL before implementation
- Implementation (T008-T015) creates the feature
- Validation (T016-T021) confirms acceptance criteria
- Leave test files marked as red/failing until implementation is ready

### Parallel Opportunities

- **T002, T003, T004**: Unit tests can be written in parallel (same test file)
- **T005, T006**: Integration tests can be written in parallel (same test file)
- **T008, T009, T010**: Component implementation tasks can be batched (same file, sequential logic)
- **T022, T023**: Final tests and code review can run in parallel

### Critical Path

1. T001 (Setup directories)
2. T002-T007 (Write tests; they fail)
3. T008-T015 (Implementation; tests pass)
4. T016-T021 (Validation; confirm criteria met)
5. T022-T026 (Quality & cleanup)

---

## Implementation Notes

### EmptyState Component (T008-T010)

**File**: `src/components/empty-state.tsx`  
**Template**: See [quickstart.md](quickstart.md) for starter code

```typescript
// Key points:
// - Import Button from @/components/ui/button
// - Use variant="default" for primary button
// - Use variant="secondary" for secondary button
// - Use Tailwind classes: flex, items-center, justify-center, text-2xl, font-semibold, etc.
// - No custom CSS files
// - Buttons have optional onClick handlers (stubs)
```

### Parent Integration (T011-T012)

**File**: `src/App.tsx` or `src/app/dashboard/page.tsx` (depends on routing)  
**Pattern**: See [quickstart.md](quickstart.md)

```typescript
// Parent component pseudo-code:
// import { EmptyState } from "@/components/empty-state"
// import { DataTable } from "@/components/data-table"
//
// function HomePage() {
//   const [projects, setProjects] = useState([])
//   // Load projects here...
//   return projects.length === 0 ? <EmptyState /> : <DataTable data={projects} />
// }
```

### Testing Strategy

- **Unit Tests (T002-T004)**: Render EmptyState in isolation; verify props, variants, text
- **Integration Tests (T005-T006)**: Render parent with mocked project state; verify conditional switch
- **Manual UX (T007, T019, T020)**: Launch app; observe empty state on first load; toggle by adding projects

### Success Criteria Items (SC-001 through SC-006)

- SC-001 ↔ T019 (manual verification of empty state display)
- SC-002 ↔ T020 (manual verification of empty state hidden)
- SC-003 ↔ T004 (button clickability via unit test; buttons are interactive stubs)
- SC-004 ↔ T017 (responsive layout validation)
- SC-005 ↔ T006, T022 (test passing and regression coverage)
- SC-006 ↔ T016, T018 (performance <100ms p95; button interactions instant; accessibility)

---

## Execution Strategy

### MVP First (User Story 1 Only) ✅ RECOMMENDED

1. Complete Phase 1: Setup (T001) — Immediate
2. Skip Phase 2: Foundational (not needed)
3. Complete Phase 3: User Story 1 (T002-T021) — Write tests, implement, validate
4. **STOP and VALIDATE**: Run manual UX checks (T019, T020); confirm all SC pass
5. Proceed to Phase 4: Polish (T022-T026) if quality gates pass
6. **MERGE**: Feature complete and ready for main branch

**Estimated Time**: 2-3 hours for a single developer (component creation + testing + validation)

### Parallel Development (if team capacity)

Since this is a single feature with one user story, parallel work is limited. However, test writing
(T002-T007) can begin immediately while implementation (T008-T015) is drafted:

- Developer A: Write unit tests (T002-T004) — establishes expected component interface
- Developer B: Write integration tests (T005-T006) — establishes parent conditional pattern
- Developer A & B together: Implement component and parent integration (T008-T015)
- Developer A: Run validation (T016-T021)

---

## Notes

- [P] tasks = different files or independent test scenarios; can be parallelized
- [Story] = US1 only (single user story feature)
- Tests MUST be written and FAIL before implementation begins
- Add concise comments where conditional rendering logic might be non-obvious during review
- Verify all success criteria pass before marking feature complete
- Commit after Phase 3 checkpoint (US1 complete) before Polish phase
