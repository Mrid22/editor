# Implementation Plan: Homepage Empty State

**Branch**: `001-homepage-empty-state` | **Date**: 2026-04-10 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/001-homepage-empty-state/spec.md`

## Summary

Add an empty state UI component to the homepage that displays when zero projects exist. The
component shows a message ("You have no existing projects") and two placeholder buttons
(primary "Create Project", secondary "Import Project") styled using unstyled shadcn Button
components with built-in variant properties. Implementation uses React, TypeScript, and
Tailwind CSS with the existing shadcn/ui component primitives.

## Technical Context

**Language/Version**: TypeScript 5.9.3 / React 19.2.4
**Primary Dependencies**: Vite 7.3.1, React 19.2.4, shadcn/ui (Button), Tailwind CSS 4.2.1
**Storage**: N/A (UI-only, no new data persistence)
**Testing**: Vitest (implied from project setup, not yet explicitly configured)
**Target Platform**: Tauri desktop app (React frontend)
**Project Type**: Desktop application (Tauri + React)
**Performance Goals**: Empty state renders and conditionally hides in <16ms (60 fps threshold)
**Constraints**: <100ms p95 for visibility toggle; must match existing shared button/spacing patterns
**Scale/Scope**: Single homepage component; affects 1 UI surface

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✅ Code quality scope is explicit: new EmptyState component in `src/components/`, homepage
  conditional logic in App.tsx or dashboard page; no dead code or cleanup needed.
- ✅ Readability is preserved: component will use self-documenting shadcn Button variants
  (variant="default" for primary, variant="secondary" for secondary); conditional rendering
  is straightforward. Comments added only if conditional logic is non-obvious.
- ✅ Module boundaries are respected: UI component in components/, state (project count) read
  from existing app state structure. No new data layer introduced.
- ✅ Test strategy is defined: manual UX validation (render empty state when zero projects,
  render project list when count > 0). Component can be tested in isolation with mock project
  counts.
- ✅ UX consistency is defined: uses existing Button component from src/components/ui/button.tsx
  with built-in variants. Spacing, typography, and accessibility inherit from shadcn base styles
  and Tailwind configuration.
- ✅ Performance expectations are measurable: conditional rendering toggle measured via React
  DevTools Profiler; target <16ms render time. Button click performance is not yet a concern
  since clicks are no-ops in this feature.

## Project Structure

### Documentation (this feature)

```text
specs/001-homepage-empty-state/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 unknowns (minimal, see below)
├── data-model.md        # Phase 1 design
├── quickstart.md        # Phase 1 quick reference
├── contracts/           # Phase 1 (not applicable; UI-only)
└── checklists/
    └── requirements.md  # Spec validation
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── empty-state.tsx              # NEW: Empty state component
│   ├── ui/
│   │   └── button.tsx               # Existing shadcn Button
│   └── [other existing components]
├── app/
│   ├── dashboard/                   # Likely location of homepage
│   └── [other existing pages]
├── hooks/
├── lib/
│   └── utils.ts
├── App.tsx                          # May contain homepage routing/state
├── main.tsx
└── index.css

tests/
├── unit/
│   └── empty-state.test.tsx         # Component unit test
└── integration/
    └── homepage.test.tsx            # Homepage integration with empty state
```

**Structure Decision**: Single desktop application. New empty state component created at
`src/components/empty-state.tsx`. Integration point is the homepage (likely App.tsx or
dashboard page). Tests placed in `tests/unit/` and `tests/integration/` following Vite
conventions.

## Complexity Tracking

No Constitution Check violations. This is a straightforward UI-only feature with no complexity
justification needed.

---

## Phase 0: Research

### Unknowns

1. **Where is the project list state managed?** Is it in React Context, a state manager (Zustand,
   Redux), or local component state?
2. **What is the exact condition to show/hide the empty state?** Is it `projects.length === 0`
   or a derived computed flag?
3. **Should the empty state have an icon/illustration?** Spec shows message + buttons; visual
   decoration is optional.

### Research Findings & Decisions

All unknowns resolved. See [research.md](research.md) for details.

**Key Decisions**:
- EmptyState component created as reusable presentational component at `src/components/empty-state.tsx`
- Parent component manages conditional rendering: `{projects.length === 0 ? <EmptyState /> : <DataTable />}`
- Button variants use shadcn presets: `variant="default"` (primary) and `variant="secondary"`
- Icons are optional; skipped for MVP to focus on core empty state display
- Testing strategy: Unit test component isolation + integration test parent conditional rendering

---

## Phase 1: Design & Contracts

### Design Artifacts Generated

✅ **[research.md](research.md)** - Research findings and decision rationale  
✅ **[data-model.md](data-model.md)** - EmptyState component interface, props, layout, styling  
✅ **[quickstart.md](quickstart.md)** - Developer setup, implementation guide, testing instructions  
✅ **No contracts/** - UI-only feature; no external interfaces or API contracts needed

### Component Design Summary

**EmptyState Component** (`src/components/empty-state.tsx`)
- Props: Customizable title, description, button labels, optional click handlers
- Layout: Centered flexbox; responsive (buttons stack on mobile, row on desktop)
- Styling: Tailwind + shadcn Button variants (no custom CSS)
- Dependencies: React, shadcn Button, Tailwind CSS (all existing in project)
- State: None (presentational component)
- Accessibility: Keyboard focusable buttons, color contrast via shadcn design tokens

**Parent Integration Pattern**
- Parent passes projects array to conditional render logic
- When `projects.length === 0`: render `<EmptyState />`
- When `projects.length > 0`: render `<DataTable data={projects} />`
- Future: Wire button callbacks to create/import flows (deferred feature)

### Design Gate: Constitution Check ✅ PASSED

Re-validated after Phase 1 design:
- ✅ Code quality: New component isolated; no impact on existing code
- ✅ Readability: Component uses standard Tailwind + shadcn patterns; self-documenting
- ✅ Modular boundaries: UI-only component; parent manages state logic
- ✅ Test strategy: Unit test component; integration test parent toggle
- ✅ UX consistency: Uses existing shadcn Button variants and design tokens
- ✅ Performance: Conditional render toggle is instant React state update; no APIs

---

## Readiness Summary

**Status**: ✅ Ready for Phase 2 (Task Generation)

**Artifacts Delivered**:
- Implementation Plan (this file) ✅
- Research (with all unknowns resolved) ✅
- Data Model (component interface & design) ✅
- Quickstart (developer guide) ✅

**Next Command**: `/speckit.tasks` to generate the task list for implementation

