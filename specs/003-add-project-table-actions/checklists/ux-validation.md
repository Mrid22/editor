# UX Validation Checklist: Actions Column

**Purpose**: Manual UX verification for actions dropdown column feature  
**Created**: 2026-04-10  
**Feature**: [spec.md](../../spec.md)

## Dropdown Interaction

- [ ] Ellipsis button is visible in each table row (fourth/rightmost column)
- [ ] Clicking ellipsis button opens dropdown menu below/above trigger (positioned correctly)
- [ ] Dropdown displays exactly three options in order: "Open In", "Delete", "Share"
- [ ] Clicking a menu option closes the dropdown
- [ ] Clicking outside dropdown area closes the dropdown
- [ ] Pressing Escape key while dropdown is open closes it
- [ ] Multiple dropdowns don't stay open simultaneously (clicking new ellipsis closes previous)

## Keyboard Accessibility

- [ ] Ellipsis button is reachable via Tab key navigation
- [ ] Pressing Enter on focused ellipsis button opens the dropdown
- [ ] Arrow Down key moves focus to next menu item
- [ ] Arrow Up key moves focus to previous menu item
- [ ] Arrow keys wrap around (Down from "Share" goes to "Open In"; Up from "Open In" goes to "Share")
- [ ] Pressing Enter on focused menu item selects that action and closes dropdown
- [ ] Pressing Escape in dropdown returns focus to ellipsis button
- [ ] All interactive elements have visible focus indicators

## Visual Consistency

- [ ] Ellipsis button size matches other table controls and row height
- [ ] Button hover state is visible (background highlight or color change)
- [ ] Dropdown menu styling matches existing UI patterns (colors, fonts, spacing)
- [ ] Menu item hover/focus states are clearly visible
- [ ] Icons in dropdown menu (if added) use consistent sizing with other app icons

## Responsive Design

- [ ] Actions column and ellipsis button visible on desktop (≥768px width)
- [ ] Actions column and ellipsis button visible on tablet (600-768px width)
- [ ] Actions column and ellipsis button visible on mobile (<600px width)
- [ ] Dropdown menu positions correctly on narrow screens (doesn't overflow)
- [ ] Touch interaction works identically to mouse click on mobile devices
- [ ] Table maintains usability with actions column on small screens

## Edge Cases & Scenarios

- [ ] Empty table still displays Actions column header
- [ ] Table with many projects (>10) shows ellipsis button in each row
- [ ] Long project names don't interfere with ellipsis button click area
- [ ] Ellipsis button is not accidentally triggered when clicking adjacent cells
- [ ] Dropdown remains visible and usable when table scrolls horizontally
- [ ] Focus management returns to trigger button after dropdown closes

## Accessibility Features

- [ ] Screen reader announces "Open project actions" for ellipsis button
- [ ] Screen reader announces menu items when dropdown opens
- [ ] Screen reader indicates which action is focused during navigation
- [ ] All keyboard interactions are equivalent to mouse interactions
- [ ] No color-only cues used to indicate state or interaction

## Performance

- [ ] Dropdown opens within 100ms of click (no noticeable lag)
- [ ] No layout shift when dropdown appears/disappears
- [ ] No flicker or visual glitches on repeated open/close cycles
- [ ] No performance degradation with many projects in table

