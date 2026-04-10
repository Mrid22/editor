# Quick Start: Add Project Table Actions Column

**Goal**: Implement Actions dropdown column in ProjectTable with full keyboard and mouse support  
**Est. Time**: 2-3 hours (includes tests)  
**Branch**: `003-add-project-table-actions`  
**Location**: `src/components/project-table.tsx` (modify existing) + tests

---

## Overview

Add a fourth column to the project table that displays an ellipsis button. Clicking the button opens a dropdown menu with three action options: Open In, Delete, Share. All interactions are keyboard-accessible and work on all screen sizes.

## Step-by-Step Implementation

### Phase 1: Type Definitions & Setup

**Step 1.1**: Add ActionType to `src/lib/project-table-types.ts`

```typescript
// Add to the file:
export type ProjectAction = "open-in" | "delete" | "share";

export interface ActionCellProps {
  projectId: string;
  onAction: (action: ProjectAction, projectId: string) => void;
}
```

**Validation**: `pnpm typecheck` should pass with no errors

### Phase 2: Component Implementation

**Step 2.1**: Create ActionCell sub-component in `src/components/project-table.tsx`

```typescript
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function ActionCell({ projectId, onAction }: ActionCellProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleAction = (action: ProjectAction) => {
    onAction(action, projectId);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" aria-label="Open project actions">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleAction("open-in")}>
          Open In
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction("delete")}>
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction("share")}>
          Share
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

**Validation**: Component syntax correct (no TS errors yet, will verify after table integration)

**Step 2.2**: Add Actions column header and cells to ProjectTable

```typescript
// In ProjectTable component, find the table header row:
<TableHead>Name</TableHead>
<TableHead>Path</TableHead>
<TableHead>Created</TableHead>
// ADD THIS:
<TableHead>Actions</TableHead>

// In tbody, for each project row:
<TableCell>{project.name}</TableCell>
<TableCell>{formatPathSuffix(project.path)}</TableCell>
<TableCell>{formatDateYYYYMMDD(project.createdAt)}</TableCell>
// ADD THIS:
<TableCell>
  <ActionCell projectId={project.id} onAction={(action) => {
    console.log(`Action ${action} selected for project ${project.id}`);
  }} />
</TableCell>
```

**Validation**: `pnpm typecheck` should pass (ActionCellProps properly typed)

### Phase 3: Testing

**Step 3.1**: Add unit test for ActionCell to `tests/unit/project-table.test.tsx`

```typescript
// New test suite:
describe("ActionCell", () => {
  it("renders ellipsis button", () => {
    const { getByRole } = render(
      <ActionCell projectId="test-1" onAction={() => {}} />
    );
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("opens dropdown on button click", async () => {
    const { getByRole, getByText } = render(
      <ActionCell projectId="test-1" onAction={() => {}} />
    );
    const button = getByRole("button");
    await userEvent.click(button);
    expect(getByText("Open In")).toBeVisible();
  });

  it("calls onAction when action is selected", async () => {
    const onAction = vi.fn();
    const { getByRole, getByText } = render(
      <ActionCell projectId="test-1" onAction={onAction} />
    );
    await userEvent.click(getByRole("button"));
    await userEvent.click(getByText("Delete"));
    expect(onAction).toHaveBeenCalledWith("delete", "test-1");
  });

  it("closes dropdown on Escape key", async () => {
    const { getByRole, getByText, queryByText } = render(
      <ActionCell projectId="test-1" onAction={() => {}} />
    );
    await userEvent.click(getByRole("button"));
    expect(getByText("Open In")).toBeVisible();
    await userEvent.keyboard("{Escape}");
    expect(queryByText("Open In")).not.toBeInTheDocument();
  });
});
```

**Step 3.2**: Verify integration test includes Actions column visibility

Update `tests/integration/homepage-project-table.test.tsx`:

```typescript
it("displays project table with all columns including Actions", () => {
  const { getByText } = render(<App />);
  expect(getByText("Name")).toBeInTheDocument();
  expect(getByText("Path")).toBeInTheDocument();
  expect(getByText("Created")).toBeInTheDocument();
  // ADD THIS:
  expect(getByText("Actions")).toBeInTheDocument();
});
```

**Validation Command**: `pnpm test` should run all tests and show 100% pass rate

### Phase 4: Validation & Quality Gates

**Step 4.1**: Type checking
```bash
pnpm typecheck
```
**Expected**: Exit code 0, no TypeScript errors

**Step 4.2**: Linting
```bash
pnpm lint
```
**Expected**: Exit code 0, no ESLint errors on modified files (pre-existing errors in other files acceptable)

**Step 4.3**: Build
```bash
pnpm build
```
**Expected**: Exit code 0, successful dist output

**Step 4.4**: Visual verification (browser)
1. Run `pnpm dev`
2. Navigate to homepage
3. Verify Actions column appears as fourth column (rightmost)
4. Click ellipsis button → dropdown opens with three items
5. Click action item → dropdown closes
6. Click ellipsis button to reopen → press Escape → dropdown closes
7. Tab to ellipsis button → press Enter → dropdown opens
8. Press Arrow Down → focus moves to next item
9. Press Arrow Up → focus moves to previous item
10. Resize browser to mobile width → dropdown still visible and accessible

---

## Acceptance Criteria (from spec.md)

✓ **SC-001**: Actions column visible as rightmost column with ellipsis triggers in all rows  
✓ **SC-002**: Ellipsis button click opens dropdown with three options (Open In, Delete, Share)  
✓ **SC-003**: Dropdown closes on outside click and Escape  
✓ **SC-004**: Ellipsis button keyboard accessible via Tab + Enter  
✓ **SC-005**: All automated tests pass  
✓ **SC-006**: Dropdown fits within viewport on all screen sizes  
✓ **SC-007**: Actions column styling consistent on desktop and mobile  

---

## Files Modified/Created

| File | Type | Change |
|------|------|--------|
| `src/lib/project-table-types.ts` | Modify | Add ProjectAction type, ActionCellProps |
| `src/components/project-table.tsx` | Modify | Add ActionCell sub-component, add 4th column to table |
| `tests/unit/project-table.test.tsx` | Modify | Add 4 ActionCell tests |
| `tests/integration/homepage-project-table.test.tsx` | Modify | Verify Actions column visible |

---

## No Breaking Changes

- ProjectRow type unchanged
- Existing ProjectTable tests remain valid
- No changes to App.tsx wiring
- No changes to public API or imports

---

## Future Enhancements (Out of Scope)

- Connect "Open In" action to project directory
- Connect "Delete" action to remove project (with confirmation)
- Connect "Share" action to copy project path
- Add icons for menu items
- Add tooltips to explain actions
- Add keyboard shortcuts (e.g., Ctrl+O for Open In)

These can be implemented as follow-up features without changing the current design.

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| DropdownMenu not found | Missing import or wrong component path | Verify `@/components/ui/dropdown-menu` import |
| MoreHorizontal icon not found | lucide-react not imported | Add `import { MoreHorizontal } from "lucide-react"` |
| Tests fail: "getByRole not found" | Missing imports in test file | Add `import { render } from "@testing-library/react"` |
| Types not recognized | TypeScript not refreshed | Run `pnpm typecheck` to verify |

