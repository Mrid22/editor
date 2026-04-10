# Implementation Plan: Add Project Table Actions Column

**Branch**: `003-add-project-table-actions` | **Date**: 2026-04-10 | **Spec**: [specs/003-add-project-table-actions/spec.md](spec.md)
**Input**: Feature specification from `/specs/003-add-project-table-actions/spec.md`

## Summary

Add a fourth "Actions" column to the existing non-empty project table displaying an ellipsis icon button that opens a dropdown menu with three action options: Open In, Delete, and Share. This is a UI-only enhancement that extends the existing ProjectTable component with keyboard-accessible dropdown interaction using base shadcn UI components. All three actions are presentation-only placeholders in this iteration with no backend functionality. The dropdown supports keyboard navigation (Arrow Up/Down keys to navigate options, Enter to select, Escape to close) and automatically positions itself to fit within viewport boundaries on all screen sizes.

## Technical Context

**Language/Version**: TypeScript 5.9.x, React 19.x  
**Primary Dependencies**: shadcn UI (base components), Tailwind CSS, class-variance-authority  
**Testing**: Vitest 4.1.4, @testing-library/react  
**Target Platform**: Desktop application (Tauri + React frontend)  
**Project Type**: desktop-app (React component enhancement + test coverage)  
**Performance Goals**: Dropdown opens and renders in <100ms on interaction; no layout shift on dropdown appearance  
**Constraints**: Must use only base shadcn components available via MCP server; no custom dropdown implementation; actions are fourth column in existing table  
**Scale/Scope**: Single React component enhancement affecting ProjectTable; no data model changes; extends existing test files

### Key Technical Decisions (User-Provided)

- **Component Library**: Use only base shadcn UI components with the MCP server provided (DropdownMenu, Button, TableCell); no custom dropdown implementation
- **Table Layout**: Actions column added as fourth and rightmost column (after Project Name, Path, Date Created)
- **Interaction Pattern**: Ellipsis icon button triggers dropdown; keyboard and mouse fully supported per clarified specs

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✓ **Code quality scope is explicit**: The feature modifies only `src/components/project-table.tsx` (adding Actions column and dropdown logic) and extends existing test files in `tests/unit/` and `tests/integration/`. No dead code or duplication introduced; all keyboard and dropdown state managed locally to the ActionCell component. New imports limited to base shadcn components (DropdownMenu, Button, MoreHorizontal icon). No custom dropdown implementation avoids fragility.

- ✓ **Readability is preserved**: New component logic uses clear naming (ActionCell, handleActionClick, isDropdownOpen) and straightforward conditional rendering. Dropdown trigger button labeled with `aria-label="Open project actions"` for accessibility. Non-obvious event handling (Escape key, outside click) will be commented inline at implementation point as per code style guide.

- ✓ **Module boundaries are respected**: Actions column implementation isolated to ActionCell sub-component with explicit props interface (projectId: string, onAction: (action: string) => void). ProjectTable remains single-responsibility (render rows), ActionCell single-responsibility (manage dropdown state + render actions). Table structure layout unchanged; only new rightmost column added.

- ✓ **Test strategy is defined**: New tests mirror existing pattern: unit tests for ActionCell render (column visible, ellipsis button renders, dropdown opens), dropdown interaction tests (click closes, Escape closes, arrow key navigation), keyboard accessibility tests (Enter key selects action, Tab navigation reaches button). Integration tests verify actions column shows in full homepage layout. All existing ProjectTable tests remain unchanged.

- ✓ **UX consistency is defined**: Uses shadcn DropdownMenu component matching existing UI patterns in application (identical behavior, styling, icon usage to other action menus if present). Ellipsis icon from lucide-react (already a dependency) consistent with existing icon usage. Tailwind classes match existing spacing/padding in table rows (sm/md gaps, hover states). Keyboard behavior follows standard dropdown affordances (Arrow navigation, Escape close, Enter select).

- ✓ **Performance expectations are measurable**: Dropdown render cost negligible (single conditional + 3 menu items); measured via lighthouse profiling during integration test run. Interaction latency target: Escape/click-outside closes dropdown within 16ms (60fps frame). No layout shift on dropdown appearance (absolute positioning using shadcn DropdownMenu boundary handling). Memory cost: single state variable per row managed by React; no virtual scrolling needed (table is small, max ~50 projects in dummy data).

**Gate Status**: PASS - All principles satisfied. No violations or exceptions needed.

## Project Structure

### Documentation (this feature)

```text
specs/003-add-project-table-actions/
├── spec.md              # Feature specification (clarified)
├── plan.md              # This file (implementation plan with design)
├── research.md          # Phase 0: No external research needed (shadcn DropdownMenu API verified via MCP)
├── data-model.md        # Phase 1: Action type definition and ActionCell interface
├── quickstart.md        # Phase 1: Implementation guide for Actions column
├── contracts/
│   └── project-table-actions-contract.md  # Dropdown behavior and keyboard contract
└── checklists/
    └── requirements.md  # Spec validation checklist
```

### Source Code (Single Project - Web Application)

```text
src/
├── components/
│   ├── project-table.tsx        # MODIFIED: Add 4th Actions column
│   └── ui/
│       ├── dropdown-menu.tsx    # Already exists (shadcn)
│       └── button.tsx           # Already exists (shadcn)
├── lib/
│   └── project-table-types.ts   # MODIFIED: Add ActionType enum

tests/
├── unit/
│   ├── project-table.test.tsx   # MODIFIED: Add Actions column tests
│   └── project-table-actions.test.tsx  # NEW: ActionCell component tests
├── integration/
│   └── homepage-project-table.test.tsx # MODIFIED: Verify actions column visible
└── fixtures/
    └── project-table-dummy-data.ts  # No change
```

**Structure Decision**: Modify existing ProjectTable component by extracting Actions rendering into a new ActionCell sub-component. No new top-level files; all changes localized to existing component and test files. This maintains the feature-cohesive module boundary while keeping the component tree shallow.


## Complexity Tracking

> No violations. Constitution Check passed with all principles satisfied. No exceptions or tradeoffs documented.

---

## Phase 0: Research

**Status**: Complete (no external research required)

All technical decisions are already clear from specification clarifications and project context:

- **shadcn DropdownMenu API**: Available via MCP server; provides viewport boundary handling, keyboard navigation (Arrow keys, Escape), focus management out-of-the-box.
- **Icon component**: `MoreHorizontal` from lucide-react (already imported for similar icons in the project) used for ellipsis trigger.
- **Keyboard behavior**: Arrow Up/Down navigate options, Enter selects, Escape closes—all supported by shadcn DropdownMenu.
- **Mobile/responsive**: Dropdown auto-positions via shadcn default behavior; no special responsive styling needed for Actions column itself.

**Outcome**: No NEEDS CLARIFICATION markers remain. Implementation can proceed directly to Phase 1 design.

---

## Phase 1: Design & Contracts

### Data Model

**File**: [data-model.md](data-model.md) (to be created)

New types introduced:

```typescript
type ProjectAction = "open-in" | "delete" | "share";

interface ActionCellProps {
  projectId: string;
  onAction: (action: ProjectAction, projectId: string) => void;
}
```

**Rationale**: Enum-style union type allows TypeScript to catch invalid action names. Props interface is explicit about the contract between ProjectTable and ActionCell, enabling future handler attachment without modifying the component.

### UI/Interaction Contract

**File**: `contracts/project-table-actions-contract.md` (to be created)

Dropdown behavior contract specifies:
- **Input**: Ellipsis button click, Arrow key presses, Escape key, outside click
- **Display**: Three menu items (Open In, Delete, Share) with focus indication
- **Interaction**: Click/Enter selects action and closes dropdown; Escape closes without selection
- **Fallback**: Dropdown should never overflow viewport (shadcn DropdownMenu handles this)
- **Accessibility**: Button has aria-label; menu items reachable via keyboard

### Implementation Quick Start

**File**: [quickstart.md](quickstart.md) (to be created)

High-level steps:
1. Create ActionCell sub-component wrapping DropdownMenu logic (state: isOpen)
2. Add Actions column header and cells to ProjectTable table body
3. Add test cases (render, click, keyboard, outside-click)
4. Verify no layout shift, dropdown in-bounds, all acceptance scenarios pass
5. Run pnpm typecheck, lint, build validation

---

## Re-Check Constitution (Post-Design)

*Before task generation*

- ✓ Code quality: ActionCell is isolated, uses only shadcn/lucide components, no custom logic beyond state management
- ✓ Readability: Clear prop interface, simple dropdown state pattern
- ✓ Boundaries: ActionCell owns dropdown state/render; ProjectTable owns table structure
- ✓ Tests: Defined (4 unit + 2 integration for actions, integrated into existing test suite)
- ✓ UX: Uses existing UI patterns (DropdownMenu, Button, Icons)
- ✓ Performance: No new complex logic, dropdown <100ms, no layout shift

**Gate Status**: PASS - Design satisfies all principles. Ready for task generation.
