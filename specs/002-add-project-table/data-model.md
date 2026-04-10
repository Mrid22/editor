# Phase 1 Data Model: Non-Empty Project Table

## Entity: ProjectRow

Represents one project displayed in the homepage non-empty table.

Fields:
- id: string
  - Purpose: Stable key for rendering row identity.
  - Validation: non-empty unique string in dummy dataset.
- name: string
  - Purpose: Project display name.
  - Validation: non-empty string.
- path: string
  - Purpose: Canonical source path used to derive display path suffix.
  - Validation: non-empty string; may contain separators and spaces.
- createdAt: string
  - Purpose: Source timestamp/date for created-date column.
  - Validation: parseable date string when valid; malformed values fallback safely.

Derived display fields:
- displayPath: string
  - Rule: End-biased truncation preserving trailing segments.
  - Example: `~/Coding/Websites/React/Next/Website` -> `React/Next/Website`.
- displayCreatedDate: string
  - Rule: Must render in `YYYY-MM-DD` format.

## Entity: ProjectCollection

Represents the project list state used by homepage view selection.

Fields:
- projects: ProjectRow[]

State transitions:
- empty: projects.length === 0 -> render EmptyState.
- nonEmpty: projects.length > 0 -> render project table.

Invariants:
- Every rendered row maps directly to one `ProjectRow` record.
- Non-empty state requires at least one valid row in `projects`.
- Row presentation is read-only (no click/open action in this phase).

## Validation Rules

- Name column must never render blank for valid dummy rows.
- Path column must show trailing segments for long paths.
- Date column must show `YYYY-MM-DD` for valid values.
- Malformed `createdAt` should not crash render; fallback text is allowed per edge-case handling.
