# Data Model: Add Project Table Actions Column

**Phase**: 1 (Design)  
**Created**: 2026-04-10  
**Status**: Complete

## Overview

This feature introduces minimal new types and interfaces focused on the ActionCell component. The existing ProjectRow data structure from feature 002 remains unchanged.

## New Type Definitions

### ActionType

```typescript
type ProjectAction = "open-in" | "delete" | "share";
```

**Purpose**: Define valid action options for the dropdown menu  
**Why a union type**: Allows TypeScript to catch invalid action names at compile time; enables type-safe action routing in future handlers  
**Examples**: `"open-in"` maps to "Open In" label, `"delete"` maps to "Delete" label, `"share"` maps to "Share" label

**Location**: Add to `src/lib/project-table-types.ts` alongside existing ProjectRow type

---

## Component Interface

### ActionCellProps

```typescript
interface ActionCellProps {
  projectId: string;
  onAction: (action: ProjectAction, projectId: string) => void;
}
```

**Purpose**: Define props contract for ActionCell sub-component  
**Fields**:
- `projectId: string` - Identifier for the project in the row (passed to action handler)
- `onAction: (action, projectId) => void` - Callback invoked when user selects an action from dropdown

**Usage Contract**:
```tsx
<ActionCell projectId="project-1" onAction={(action, id) => {
  console.log(`User selected ${action} for project ${id}`);
}} />
```

**Rationale**: Explicit props interface allows ProjectTable to attach future action handlers without modifying ActionCell, enabling clean separation of concerns.

---

## Dropdown Menu State

### Open/Close State

```typescript
// Inside ActionCell component
const [isOpen, setIsOpen] = useState(false);
```

**Purpose**: Track whether dropdown is currently visible  
**Lifecycle**:
- Begins `false` (closed)
- Set to `true` when ellipsis button clicked
- Set to `false` when user selects action, presses Escape, or clicks outside

**Parent Responsibility**: None (state managed entirely by ActionCell)

---

## Action Menu Items

Three static action options, no data model changes:

| Action | Label | Icon | Keyboard | Handler |
|--------|-------|------|----------|---------|
| `"open-in"` | "Open In" | (Optional folder icon) | None yet | onAction callback |
| `"delete"` | "Delete" | (Optional trash icon) | None yet | onAction callback |
| `"share"` | "Share" | (Optional share icon) | None yet | onAction callback |

**Note**: Icons are optional for now. Labels only are sufficient. Icons can be added in future release if needed.

---

## Unchanged From Feature 002

**ProjectRow** (from `src/lib/project-table-types.ts`):
```typescript
interface ProjectRow {
  id: string;
  name: string;
  path: string;
  createdAt: string;
}
```

No changes. ProjectRow continues to represent a single project in the table.

---

## Type Safety

All new types use TypeScript strict mode best practices:

✓ ProjectAction uses union type (not string)  
✓ ActionCellProps explicitly typed  
✓ No implicit `any` types  
✓ Callback signature is explicit (ProjectAction, projectId: string)

## Summary

This is a minimal, focused data model addition:
- 1 new union type (ProjectAction)
- 1 new interface (ActionCellProps)
- 2 new state variables (isOpen in component; no shared state)
- Zero changes to existing data structures

The design maintains clean module boundaries: ProjectTable owns the table structure, ActionCell owns the dropdown state and rendering.
