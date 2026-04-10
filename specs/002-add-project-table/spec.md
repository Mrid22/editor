# Feature Specification: Non-Empty Project Table

**Feature Branch**: `002-add-project-table`  
**Created**: 2026-04-10  
**Status**: Draft  
**Input**: User description: "now lets move on to the non-empty state, for now you can use dummy data to fill it in. It should be a table that shows the name of the project, the path, and the date created."

## Clarifications

### Session 2026-04-10

- Q: What date format should the "Date Created" column use? → A: YYYY-MM-DD.
- Q: How should long project paths be truncated in the table? → A: Truncate from the beginning and preserve the ending segments (e.g., React/Next/Website or Next/Website).
- Q: Should project rows be interactive in this phase? → A: No. Rows are display-only.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Existing Projects Table (Priority: P1)

As a user with existing projects, I want to see my projects in a non-empty table state so I can quickly review what exists and identify each project by name, filesystem path, and creation date.

**Why this priority**: This is the primary state once projects exist and is essential for continuing work after initial project creation.

**Independent Test**: Launch the homepage with non-empty dummy project data and verify that a table appears with one row per project and three visible columns: project name, project path, and created date.

**Acceptance Scenarios**:

1. **Given** the homepage has at least one project in the data source, **When** the page loads, **Then** the non-empty table state is shown instead of the empty-state view.
2. **Given** the table is visible, **When** each row is rendered, **Then** the row displays project name, path, and created date in the correct columns.
3. **Given** dummy data is used for this phase, **When** the page is refreshed, **Then** the same dummy rows remain visible for manual UI validation.

### Edge Cases

- Project names include spaces, punctuation, or mixed case and still render fully in the name column.
- Project paths are long and must remain readable without breaking overall table layout.
- Two projects share the same created date and both rows remain visible and distinct.
- Created date exists but is malformed in source data; the row still renders with a safe fallback display value.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST show a non-empty projects table on the homepage when one or more projects are available.
- **FR-002**: System MUST render exactly three user-visible data columns for each project row: project name, project path, and date created.
- **FR-003**: System MUST populate the table using dummy project records for this feature phase.
- **FR-004**: System MUST display one table row per dummy project record without omitting any provided record.
- **FR-005**: System MUST preserve the existing empty-state behavior when zero projects are present.
- **FR-006**: System MUST display the date created value in `YYYY-MM-DD` format for every rendered row.
- **FR-007**: System MUST truncate long project paths by removing leading segments first and preserving trailing segments, so users can see the most specific ending path parts.
- **FR-008**: System MUST render project table rows as display-only in this phase, with no row click action that opens details or files.

### Quality & Experience Requirements

- **QR-001**: The feature MUST preserve established shared UI patterns, copy tone, accessibility behavior, and error-state handling unless an explicit exception is approved.
- **QR-002**: The feature MUST define automated tests that verify non-empty table rendering and the presence of name, path, and date created values.
- **QR-003**: The feature MUST keep initial rendering of the non-empty table state responsive, with visible content available within 1 second for typical dummy-data volumes used in development.
- **QR-004**: The implementation MUST add concise explanatory comments for non-obvious conditional rendering or data-shaping logic.

### Key Entities *(include if feature involves data)*

- **Project Row**: A single listed project shown in the table with attributes: name, path, and created date.
- **Project Collection**: The list of project rows used to determine whether the homepage shows empty state or non-empty table state.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: With at least 1 dummy project in data, users see the non-empty table state on homepage load in 100% of validation runs.
- **SC-002**: Each displayed row contains non-blank values for name, path, and created date in their respective columns, and created date is shown as `YYYY-MM-DD`.
- **SC-003**: For a 10-row dummy dataset, users can visually identify a target project by name within 10 seconds during manual validation.
- **SC-004**: When project data is set to zero records, homepage reverts to the empty-state view in 100% of validation runs.
- **SC-005**: All affected automated tests pass and include regression checks for non-empty state visibility and required table columns.
- **SC-006**: The table remains readable on both desktop and narrow layouts, with no overlapping text in the three required columns during manual viewport checks, and truncated paths preserve ending segments.
- **SC-007**: Clicking a table row triggers no navigation or open action in 100% of validation runs for this phase.

## Assumptions

- Dummy project data is acceptable for this phase and backend persistence is out of scope.
- Date created is standardized to `YYYY-MM-DD` for this feature.
- Long paths are displayed with end-biased truncation so the most specific path suffix remains visible.
- Row interactivity is explicitly out of scope for this phase; table rows are read-only.
- Existing homepage structure and navigation remain unchanged except for state-based content in the main area.
- Users can have multiple projects, but pagination, sorting, and filtering behavior are not required for this feature phase.
