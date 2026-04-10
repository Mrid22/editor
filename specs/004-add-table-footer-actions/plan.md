# Implementation Plan: Add Project Table Footer Actions

**Branch**: `004-add-table-footer-actions` | **Date**: 2026-04-10 | **Spec**: [/home/mridula/Work/editor/specs/004-add-table-footer-actions/spec.md](spec.md)
**Input**: Feature specification from `/home/mridula/Work/editor/specs/004-add-table-footer-actions/spec.md`

## Summary

Add a sticky footer action area to the non-empty project table that exposes the same two homepage entry actions, **Create Project** and **Import Project**, while guaranteeing no repeated logic. The implementation will use existing shadcn UI primitives and extract/reuse a shared action definition plus shared action-rendering component so labels, order, and handlers remain identical between empty-state and table-footer contexts. This is a UI-only enhancement with desktop-only support for widths >=1024px, emphasizing centered and aligned layout consistency.

## Technical Context

**Language/Version**: TypeScript 5.9.x + React 19.x  
**Primary Dependencies**: shadcn UI components (`Button`, `Table` primitives), Tailwind CSS, lucide-react (existing)  
**Storage**: N/A (UI-only change; no persistence changes)  
**Testing**: Vitest 4.1.x, @testing-library/react, @testing-library/user-event  
**Target Platform**: Tauri desktop frontend (desktop widths >=1024px)  
**Project Type**: desktop-app frontend component enhancement  
**Performance Goals**: Footer renders with no noticeable delay; sticky behavior remains smooth while scrolling long tables; no additional expensive rerenders from duplicated handler creation  
**Constraints**: UI-only change, reuse exact shared handlers, no duplicated action logic, desktop-only (>=1024px), use shadcn components, centered/aligned visual composition  
**Scale/Scope**: Touches homepage/table action presentation path in `src/components/` and corresponding unit/integration tests in `tests/`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Code quality scope is explicit: change is confined to shared action definition/rendering and table footer integration; duplicated action-label/handler paths are explicitly removed.
- Readability is preserved: shared action API (labels/order/handlers) is defined in one location; plan calls for concise comments only where sticky layout or reuse wiring is non-obvious.
- Module boundaries are respected: homepage empty-state and table footer consume shared action definition via explicit props/interfaces; table row action dropdown remains independent.
- Test strategy is defined: unit tests for shared action renderer + table footer visibility/keyboard semantics, integration tests for parity between empty-state and footer handlers and no regression in existing table behavior.
- UX consistency is defined: reuse same shadcn button variants and action ordering as homepage; sticky footer remains centered/aligned and desktop-width behavior is explicit (>=1024px).
- Performance expectations are measurable: no extra data load, no repeated heavy calculations, and sticky footer interaction remains responsive during scroll and keyboard traversal.

**Gate Status (Pre-Research)**: PASS

## Project Structure

### Documentation (this feature)

```text
specs/004-add-table-footer-actions/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── table-footer-actions-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── App.tsx
├── components/
│   ├── empty-state.tsx
│   ├── project-table.tsx
│   └── [new shared action component file - planned]
└── lib/
    └── [new shared action definition file - planned]

tests/
├── integration/
│   └── homepage-project-table.test.tsx
└── unit/
    ├── empty-state.test.tsx
    └── [new footer/shared-action tests - planned]
```

**Structure Decision**: Keep all work inside existing frontend component/testing boundaries and introduce one shared source of truth for entry actions consumed by both `empty-state` and `project-table` to enforce consistency and avoid repeated code.

## Phase 0: Research

Research tasks resolve implementation choices while preserving UI-only scope:

1. Decide shared action-source pattern that guarantees exact handler reuse across empty-state and table footer.
2. Validate sticky footer approach using existing shadcn `Table` primitives without custom non-standard widgets.
3. Confirm centered/aligned layout strategy in desktop widths >=1024px while preserving current table readability.
4. Define test approach proving parity of labels/order/handlers between homepage and footer.

**Output**: `/home/mridula/Work/editor/specs/004-add-table-footer-actions/research.md`

## Phase 1: Design & Contracts

Design deliverables for this feature:

1. **Data model**: define shared entry action type/interface and footer props contract.
2. **Contracts**: define UI interaction contract for sticky footer behavior, handler parity, and keyboard accessibility.
3. **Quickstart**: provide implementation/validation flow for developers.
4. **Agent context update**: sync Copilot context for new planning artifacts.

**Outputs**:
- `/home/mridula/Work/editor/specs/004-add-table-footer-actions/data-model.md`
- `/home/mridula/Work/editor/specs/004-add-table-footer-actions/contracts/table-footer-actions-contract.md`
- `/home/mridula/Work/editor/specs/004-add-table-footer-actions/quickstart.md`

## Re-Check Constitution (Post-Design)

- Code quality: shared action source prevents drift and duplication.
- Readability: single source of truth for action labels/order/handlers reduces cognitive load.
- Modular boundaries: empty and non-empty views consume shared action module via explicit props.
- Tests: contract + unit + integration checks planned for parity and regression safety.
- UX consistency: same button variants/copy/order with centered alignment and sticky footer behavior.
- Performance: sticky footer adds negligible rendering overhead and avoids duplicate handler creation.

**Gate Status (Post-Design)**: PASS

## Complexity Tracking

No constitution violations or justified exceptions are required for this feature.
