# Feature Specification: Add Project Table Actions Column

**Feature Branch**: `003-add-project-table-actions`  
**Created**: 2026-04-10  
**Status**: Draft  
**Input**: User description: "now I want to add a collumn to the project table for actions. All actions should live in a dropdown menu that opens with a trigger with the icon of an ellipsis (...). The actions are: open in, delete, and share, this is once again just a ui change for now"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Access Project Actions via Dropdown (Priority: P1)

Users viewing the non-empty project table need a way to see available actions for each project. The actions column with an ellipsis dropdown menu provides a cohesive, space-efficient way to present three actions (Open In, Delete, Share) without cluttering the table layout.

**Why this priority**: P1 - This is the core feature that enables users to access project-specific actions. Without this, there's no way to interact with individual projects in the table.

**Independent Test**: Can be fully tested by rendering the project table and verifying that each row displays an actions column with the ellipsis trigger button, clicking opens a dropdown menu, and the dropdown displays the three action options.

**Acceptance Scenarios**:

1. **Given** the project table is rendered with projects, **When** the user views the table, **Then** each row displays an actions column with an ellipsis (...) icon button as the last column
2. **Given** the user sees an actions column, **When** the user clicks the ellipsis button, **Then** a dropdown menu opens with three options: "Open In", "Delete", and "Share"
3. **Given** the dropdown menu is open, **When** the user clicks outside the dropdown, **Then** the dropdown menu closes
4. **Given** the dropdown menu is open, **When** the user presses Escape, **Then** the dropdown menu closes
5. **Given** the dropdown menu is open, **When** the user presses Arrow Down key, **Then** focus moves to the next action option in the list
6. **Given** the dropdown menu is open, **When** the user presses Arrow Up key, **Then** focus moves to the previous action option in the list
7. **Given** an action option is focused in the dropdown, **When** the user presses Enter, **Then** the action is selected and the dropdown closes

---

### Edge Cases

- What happens when the ellipsis button receives keyboard focus? It should be accessible via Tab navigation and openable via Enter.
- How are Arrow keys handled within the dropdown menu? Up/Down arrows navigate between options; the first option receives focus when dropdown opens or after Escape closes the menu.
- What happens when multiple action dropdowns are open? Only one should remain open at a time (clicking a new ellipsis closes the previous dropdown).
- How does the dropdown position itself when near screen edges? It should not overflow the viewport. The dropdown automatically adjusts its position (above/below/left/right of trigger) to fit within the viewport boundaries.
- How should the actions column behave on mobile and narrow viewports? The ellipsis button size and actions column width remain consistent with desktop styling; the dropdown menu auto-positions to avoid viewport overflow, ensuring the UI works seamlessly across all screen sizes without special-case styling.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render an "Actions" column as the rightmost column in the project table
- **FR-002**: System MUST display an ellipsis (...) icon button in each row of the Actions column
- **FR-003**: System MUST open a dropdown menu when the ellipsis button is clicked
- **FR-004**: System MUST display three action options in the dropdown menu: "Open In", "Delete", and "Share"
- **FR-005**: System MUST close the dropdown menu when the user clicks outside of it or presses Escape
- **FR-006**: System MUST close any previously open dropdown when a new ellipsis button is clicked
- **FR-007**: The ellipsis button MUST be keyboard accessible (focusable and operable via Enter key)
- **FR-008**: System MUST support Arrow Up/Down keyboard navigation to move focus between action options within the dropdown menu
- **FR-009**: System MUST allow Enter key to select the currently focused action option and close the dropdown
- **FR-010**: System MUST prevent dropdown menu overflow beyond viewport boundaries

### Quality & Experience Requirements

- **QR-001**: The feature MUST preserve established shared UI patterns, copy tone, accessibility behavior, and error-state handling for dropdown menu interactions consistent with existing UI components in the application.
- **QR-002**: The feature MUST define the automated tests required to prove the changed behavior, specifically: dropdown opens on click, dropdown displays correct options, dropdown closes on outside click/Escape, and keyboard navigation works.
- **QR-003**: The feature MUST ensure keyboard accessibility is equivalent to mouse interaction for all users.
- **QR-004**: The ellipsis button styling MUST match existing table action patterns in the codebase (consistent icon sizing, padding, and hover states).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Actions column is visible in the project table as the rightmost column with ellipsis triggers present in all project rows
- **SC-002**: Ellipsis button click opens dropdown menu with exactly three visible options (Open In, Delete, Share)
- **SC-003**: Dropdown menu closes correctly on outside click and Escape key press
- **SC-004**: Ellipsis button is keyboard accessible and can be triggered via Tab + Enter navigation
- **SC-005**: All automated tests pass (component render tests, dropdown interaction tests, keyboard accessibility tests)
- **SC-006**: Dropdown menu fits within viewport boundaries and auto-positions (above/below/left/right) to prevent overflow regardless of trigger position or viewport size
- **SC-007**: Actions column and ellipsis button styling remain consistent across desktop and mobile viewports; dropdown intelligently positions itself to remain visible on narrow screens

## Assumptions

- The dropdown implementation uses shadcn UI's DropdownMenu component for consistency with existing UI architecture
- Action buttons (Open In, Delete, Share) are presentation-only in this iteration; no actual backend functionality is implemented yet
- Users can tab through table rows and reach the ellipsis buttons in focus order
- Dropdown positioning uses shadcn DropdownMenu's default viewport boundary handling
- Mobile touch interactions work identically to desktop click interactions
- No data validation or confirmation dialogs needed for action buttons in this iteration

## Clarifications

### Session 2026-04-10

- Q: How should keyboard navigation work within the dropdown menu? → A: Arrow keys (Up/Down) navigate between options; Enter selects the focused option
- Q: How should the actions column behave on mobile and narrow viewports? → A: Same styling and positioning as desktop; dropdown auto-adjusts to viewport (shadcn default)
