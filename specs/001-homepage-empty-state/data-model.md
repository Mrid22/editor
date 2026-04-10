# Data Model: Homepage Empty State Component

**Feature**: 001-homepage-empty-state  
**Date**: 2026-04-10  
**Phase**: Phase 1 - Design

## Component: EmptyState

### Purpose
Render a visually structured empty state when the projects/documents list is empty. Displays
a message and two placeholder buttons for future create/import flows.

### Location
`src/components/empty-state.tsx`

### Props Interface

```typescript
interface EmptyStateProps {
  // Optional: Title message for the empty state (customizable for reuse)
  title?: string
  // Optional: Description message (customizable for reuse)
  description?: string
  // Optional: Primary button label (default: "Create Project")
  primaryButtonLabel?: string
  // Optional: Secondary button label (default: "Import Project")
  secondaryButtonLabel?: string
  // Optional: Callback when primary button is clicked (stub for now)
  onPrimaryClick?: () => void
  // Optional: Callback when secondary button is clicked (stub for now)
  onSecondaryClick?: () => void
}
```

### Default Values (Specific to Homepage)

```
title: "No projects yet"
description: "You have no existing projects. Create a new one to get started."
primaryButtonLabel: "Create Project"
secondaryButtonLabel: "Import Project"
onPrimaryClick: () => {} // Stub: no-op
onSecondaryClick: () => {} // Stub: no-op
```

### Layout Structure

```
┌─────────────────────────────────────┐
│    [Center Vertically & Horizontally] │
│                                       │
│     🔷 Title Message                  │
│     Description message text...       │
│                                       │
│     ┌─────────────┐ ┌──────────────┐ │
│     | Primary     | | Secondary    | │
│     | Create Proj | | Import Proj  | │
│     └─────────────┘ └──────────────┘ │
│                                       │
└─────────────────────────────────────┘
```

### Styling Requirements

- **Container**: Flexbox centered, full width/height of parent
- **Typography**:
  - Title: `text-2xl font-semibold` (or existing heading class)
  - Description: `text-muted-foreground` (existing token for secondary text)
- **Spacing**: `gap-6` between title/description and buttons; `gap-3` between buttons
- **Buttons**:
  - Primary button: `<Button variant="default">Create Project</Button>`
  - Secondary button: `<Button variant="secondary">Import Project</Button>`
  - Layout: Row on desktop (justify-center), maintain wrap/stack on mobile if needed

### Dependencies

- React (already imported)
- `@/components/ui/button` - shadcn Button component
- Tailwind CSS classes (already configured)

### State

None. This is a presentational component. Click handlers are optional callbacks (stubs in MVP).

### Accessibility

- Buttons must be keyboard focusable (shadcn Button handles this by default)
- Ensure sufficient color contrast for title/description text (Tailwind + shadcn design tokens
  ensure this)
- ARIA labels on buttons are inherited from button text; add `aria-label` if needed for clarity
  (e.g., secondary button: `aria-label="Import an existing project"`)

### Testing Surface

- **Props**: Component should accept all optional props and use defaults if not provided
- **Render**: Component renders title, description, and two buttons
- **Styling**: Buttons have correct variant classes applied
- **Interaction**: Click handlers are called when buttons are clicked (even if they're no-ops)

---

## Parent Integration: Homepage/Dashboard

### Parent Responsibility

The parent component (App.tsx, dashboard page, or equivalent) must:

1. **Manage project data state**: Fetch or load projects into a data array
2. **Conditionally render**:
   ```typescript
   {projects.length === 0 ? (
     <EmptyState />
   ) : (
     <DataTable data={projects} />
   )}
   ```
3. **Handle the toggle**: When projects are added/removed, the condition automatically
   switches between EmptyState and populated DataTable

### Future Integration Points (Out of Scope for This Feature)

When create/import flows are implemented in future features:
1. Pass callback to EmptyState: `onPrimaryClick={() => openCreateDialog()}`
2. Pass callback to EmptyState: `onSecondaryClick={() => openImportDialog()}`
3. Update buttons from no-op stubs to actual handlers
