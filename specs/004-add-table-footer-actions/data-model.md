# Data Model: Add Project Table Footer Actions

**Feature**: 004-add-table-footer-actions  
**Date**: 2026-04-10

## Overview

This is a UI-only feature. No persistence models or backend schemas change. The "data model" here defines shared UI action entities and props contracts required to keep homepage and table footer behavior identical.

## Entities

### ProjectEntryAction

Represents one shared entry action available from both homepage empty-state and non-empty table footer.

Proposed fields:
- `id`: stable identifier (`create-project` or `import-project`)
- `label`: display text (`Create Project`, `Import Project`)
- `variant`: shadcn button variant (`default` or `secondary`)
- `onTrigger`: handler reference invoked on activation

Validation rules:
- Exactly two actions are allowed in this feature.
- Ordering is fixed: Create Project first, Import Project second.
- `onTrigger` references must be the same handler references used by homepage actions.

### ProjectEntryActionsProps

Props contract for reusable action renderer used by homepage and footer.

Proposed fields:
- `actions`: ordered `ProjectEntryAction[]`
- `layout`: optional display mode (e.g., centered row) when needed for context-specific wrapper semantics
- `className`: optional additional styling hooks for container placement

Validation rules:
- `actions.length === 2`
- action IDs must be unique

### TableFooterActionArea

UI container entity representing sticky footer section in non-empty table view.

Proposed fields:
- `isSticky`: boolean (true for this feature)
- `minSupportedWidth`: numeric threshold (1024)
- `actions`: shared action list reference

Validation rules:
- Render only when projects length > 0
- Stick to table container bottom during scroll
- Preserve keyboard reachability for both actions

## State and Transitions

No new global state is required. Existing callbacks are reused:
- Initial: non-empty table visible, footer visible
- On action trigger: same callback pathway as homepage equivalent
- On handler unavailable/disabled: fallback mirrors homepage behavior

## Derived Constraints from Spec

- Desktop-only scope for widths >=1024px
- UI primitives should come from existing shadcn components
- Footer action group should stay centered and aligned
- Existing row-level dropdown actions remain unchanged
