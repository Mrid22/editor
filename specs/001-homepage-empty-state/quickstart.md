# Quickstart: Homepage Empty State

**Feature**: 001-homepage-empty-state  
**Date**: 2026-04-10  
**Branch**: `001-homepage-empty-state`

## Overview

Implement a reusable EmptyState component that displays when the projects/documents list is empty.
Uses shadcn Button variants (default and secondary) for placeholder buttons. No event handlers are
wired; buttons are interactive stubs.

## Setup

### Prerequisites
- Node.js 18+ (check with `node --version`)
- pnpm 8+ (check with `pnpm --version`)
- Vite 7.3+ (bundled in dependencies)

### Install Dependencies (if needed)
```bash
pnpm install
```

### Verify shadcn Button Component Exists
```bash
ls -la src/components/ui/button.tsx
```
Expected: File exists and is importable.

## Development

### 1. Create the EmptyState Component

**File**: `src/components/empty-state.tsx`

**Template** (starter code):
```typescript
import { Button } from "@/components/ui/button"

export interface EmptyStateProps {
  title?: string
  description?: string
  primaryButtonLabel?: string
  secondaryButtonLabel?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

export function EmptyState({
  title = "No projects yet",
  description = "You have no existing projects. Create a new one to get started.",
  primaryButtonLabel = "Create Project",
  secondaryButtonLabel = "Import Project",
  onPrimaryClick,
  onSecondaryClick,
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="default" 
            onClick={onPrimaryClick}
          >
            {primaryButtonLabel}
          </Button>
          <Button 
            variant="secondary" 
            onClick={onSecondaryClick}
          >
            {secondaryButtonLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
```

**Key Points**:
- Uses `variant="default"` (primary) and `variant="secondary"` shadcn presets
- No custom CSS; all styling via Tailwind classes from shadcn defaults
- Click handlers are optional props; no-op by default (as per spec)
- Responsive: flex-col on mobile (sm breakpoint switches to flex-row)

### 2. Integrate Into Homepage

**File**: `src/App.tsx` or `src/app/dashboard/page.tsx` (depends on routing structure)

**Pattern**:
```typescript
import { EmptyState } from "@/components/empty-state"
import { DataTable } from "@/components/data-table"

export default function HomePage() {
  const [projects, setProjects] = useState([])

  // TODO: Fetch projects from backend or local storage
  // For MVP testing: setProjects([]) to show EmptyState

  return (
    <div>
      {projects.length === 0 ? (
        <EmptyState />
      ) : (
        <DataTable data={projects} />
      )}
    </div>
  )
}
```

**To test empty state**: Ensure `projects` array is empty (`[]`).  
**To test populated state**: Add mock projects to the array.

## Testing

### Manual Testing

1. **Launch dev server**:
   ```bash
   pnpm dev
   ```
   Expected: App runs on `http://localhost:1420` (or configured port).

2. **View empty state**:
   - Verify projects array is empty
   - Should see: Title, description, and two buttons (Create Project as primary, Import Project as secondary)
   - Buttons should be clickable (stubs, no action yet)

3. **View populated state**:
   - Add mock projects to array (use `src/app/dashboard/data.json` sample)
   - Should see: DataTable rendered instead of EmptyState

4. **Responsive check**:
   - Resize browser window or use dev tools to check mobile width
   - Buttons should stack vertically on narrow viewports (controlled by `sm:` breakpoint)

### Unit Test (Optional for MVP)

**File**: `tests/unit/empty-state.test.tsx` (if test runner is configured)

```typescript
import { render, screen } from "@testing-library/react"
import { EmptyState } from "@/components/empty-state"

describe("EmptyState", () => {
  it("renders with default props", () => {
    render(<EmptyState />)
    expect(screen.getByText("No projects yet")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /create project/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /import project/i })).toBeInTheDocument()
  })

  it("renders with custom props", () => {
    render(
      <EmptyState
        title="Custom Title"
        primaryButtonLabel="New"
        secondaryButtonLabel="Load"
      />
    )
    expect(screen.getByText("Custom Title")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /new/i })).toBeInTheDocument()
  })
})
```

### Build & Type Check

```bash
# Type check (ensures TypeScript compiles)
pnpm typecheck

# Build (ensures Vite bundling works)
pnpm build

# Lint (ensures code quality)
pnpm lint
```

## Acceptance Criteria Verification

- ✅ **SC-001**: Empty state is visible and renders correctly when zero projects exist.  
  → Manual test: See empty state on launch with no projects.

- ✅ **SC-002**: Empty state is not shown when one or more projects exist.  
  → Manual test: Add mock project; see DataTable instead.

- ✅ **SC-003**: Both buttons are clickable.  
  → Manual test: Click each button; no JS errors (stubs).

- ✅ **SC-004**: Layout is responsive and readable on desktop and narrow viewports.  
  → Manual test: Resize; verify buttons stack on mobile, stay in row on desktop.

- ✅ **SC-005**: Tests pass and new regression coverage exists.  
  → Unit test renders component; integration test verifies conditional rendering.

- ✅ **SC-006**: Interactions complete within 100 ms p95.  
  → No event handlers firing real logic; render/toggle is instant React state update.

## Common Issues

### Button Styling Not Applying
- **Cause**: Tailwind CSS not configured or `@/components/ui/button.tsx` has different variant names.
- **Fix**: Verify Button imports from correct path; check `src/components/ui/button.tsx` for available
  variants. Fallback: Use `className="..."` to override if needed (not recommended; use shadcn API).

### EmptyState Component Not Found
- **Cause**: File path mismatch or TypeScript import error.
- **Fix**: Verify file created at `src/components/empty-state.tsx` and import path is `@/components/empty-state`.

### Conditional Rendering Not Toggling
- **Cause**: Parent component not re-rendering when projects list changes.
- **Fix**: Ensure `projects` is a React state variable with `useState`, not a const. Use `setProjects()`
  to update state; component will re-render and toggle EmptyState ↔ DataTable.

## Next Steps (Out of Scope)

1. **Wire Create/Import Flows** (future feature):
   - Pass `onPrimaryClick` and `onSecondaryClick` callbacks to EmptyState
   - Implement actual dialog/form components for create and import
   - Update EmptyState buttons to trigger these flows

2. **Add Visual Decoration** (future polish):
   - Import Lucide icon from project (e.g., Folder, Upload)
   - Add icon above title in EmptyState
   - Example: `<Folder className="mx-auto h-12 w-12 text-muted-foreground" />`

3. **Persist Projects to Storage** (data layer):
   - Move projects from mock state to local storage or backend API
   - Implement fetch/update logic in parent component
