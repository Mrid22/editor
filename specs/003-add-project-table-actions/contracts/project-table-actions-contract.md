# UI/Interaction Contract: Project Table Actions Column

**Purpose**: Define the boundary of expected behavior for the Actions dropdown menu  
**Scope**: ProjectTable Actions column and dropdown interactions  
**Created**: 2026-04-10

---

## Dropdown Behavior Contract

### Input Triggers

| Input | Action | Expected Behavior |
|-------|--------|-------------------|
| Click ellipsis button | Open | Dropdown menu becomes visible with three items in focus order |
| Click on action item ("Open In", "Delete", "Share") | Select | onAction callback invoked; dropdown closes |
| Press Arrow Down (dropdown open) | Navigate | Focus moves to next action item down; wraps to first if at end |
| Press Arrow Up (dropdown open) | Navigate | Focus moves to previous action item up; wraps to last if at start |
| Press Enter (while action focused) | Select | Same as clicking action item |
| Press Escape (dropdown open) | Close | Dropdown closes; focus returns to ellipsis button |
| Click outside dropdown | Close | Dropdown closes; focus may move (standard browser behavior) |
| Press Tab out of dropdown | Close | Dropdown closes and focus moves to next focusable element |

---

## Display Contract

### Initial State
- Ellipsis button is visible in Actions column (fourth column, rightmost)
- Button shows `MoreHorizontal` icon (lucide-react, 16-20px size matching table density)
- Button has `aria-label="Open project actions"` for accessibility
- Button has hover state (background highlight, cursor pointer per existing Tailwind patterns)

### Dropdown Open State
- Dropdown menu appears below/above ellipsis button (positioned by shadcn DropdownMenu)
- Menu background is white/light (matching shadcn DropdownMenu theme)
- Three menu items rendered in order:
  1. "Open In" (text label)
  2. "Delete" (text label)
  3. "Share" (text label)
- First item has focus by default when dropdown opens
- Keyboard focus indicator visible on focused item (underline or background highlight)
- Menu never overflows viewport bounds (shadcn DropdownMenu responsibility)

### Closed State
- Menu is hidden
- Ellipsis button remains visible and accessible

---

## Keyboard Navigation Contract

### Tab Navigation
- Ellipsis button is reachable via Tab key (standard focusable button)
- Dropdown menu items are NOT in main Tab order (Escape to get back to Tab focus)
- Focus returns to ellipsis button after Escape or selection

### Arrow Navigation (Dropdown Open)
- Arrow Down: Move focus to next action (wraps from "Share" to "Open In")
- Arrow Up: Move focus to previous action (wraps from "Open In" to "Share")
- No other keys navigate within dropdown

### Selection Keys (Dropdown Open)
- Enter: Select focused action and close dropdown
- Escape: Cancel selection and close dropdown

### Outside Click (Dropdown Open)
- Click anywhere outside dropdown menu: Close dropdown
- No onAction callback triggered on close-without-selection

---

## Accessibility Contract

- Ellipsis button has `aria-label="Open project actions"`
- Dropdown menu items are standard native elements or have proper ARIA roles (DropdownMenu provides)
- All interactions available via keyboard (no mouse-only actions)
- Focus indicator visible on focused menu items
- Screen readers announce button and menu items correctly (shadcn DropdownMenu handles)

---

## Responsive/Viewport Contract

### Desktop (≥768px)
- Ellipsis button size: 36px or 40px (matches table row height/padding)
- Dropdown menu width: auto (fits content, consistent with shadcn DropdownMenu)
- Dropdown positions below button if space available, above otherwise

### Tablet/Mobile (<768px)
- Ellipsis button size: same as desktop (no size increase on mobile, per user clarification)
- Dropdown menu width: auto (same as desktop)
- Dropdown auto-positions to avoid viewport overflow (above/below/left/right as needed)
- Touch interaction same as click (browser standard)

---

## Fallback/Error Contract

| Scenario | Behavior | Reason |
|----------|----------|--------|
| Dropdown fails to open on click | Button remains visible, no error shown | This iteration is UI-only; no backend impact |
| Multiple dropdowns somehow open | Only most recent click's dropdown stays open | Normal browser focus behavior |
| Chevron icon fails to load | Text "..." appears instead or button appears without icon | Graceful degradation |

---

## State Isolation Contract

- Dropdown state (open/close) is local to ActionCell only
- One ActionCell's state does not affect other ActionCell dropdowns in the same table
- Closing one dropdown does not trigger other dropdowns to close (unless user clicks new ellipsis)
- No shared parent state for dropdown open/close

---

## Action Payload Contract

When user selects an action, onAction callback receives:
```typescript
onAction(action: ProjectAction, projectId: string)
// Examples:
onAction("open-in", "project-1")
onAction("delete", "project-2")
onAction("share", "project-3")
```

**No further data passed** (e.g., no project full object)  
**In this iteration**: Action handler does nothing (placeholder) but signature is documented for future implementation

---

## Summary

✓ Dropdown opens/closes correctly on user interaction  
✓ Keyboard navigation works (Arrow keys, Enter, Escape)  
✓ Accessibility attributes present  
✓ Viewport boundary handling auto-correct  
✓ State isolated per ActionCell  
✓ Clear action selection callback payload  

This contract can be verified via unit tests (render, click, keyboard) and integration tests (full table visible, multiple rows).
