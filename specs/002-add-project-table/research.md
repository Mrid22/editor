# Phase 0 Research: Non-Empty Project Table

## Decision 1: Reuse existing shadcn table primitives via current DataTable surface

- Decision: Use shadcn table component primitives already present in the project and wire
  non-empty state through existing table rendering path.
- Rationale: Keeps UI consistency high and avoids introducing alternate table patterns.
  Aligns with constitution requirement to reuse established UI primitives.
- Alternatives considered:
  - Create a custom HTML table from scratch: rejected due to style drift and duplicated patterns.
  - Introduce a new data-grid dependency: rejected as unnecessary scope increase for dummy data.

## Decision 2: Keep data source in-memory dummy records for this phase

- Decision: Represent projects as a hard-coded dummy array in frontend state for non-empty flow.
- Rationale: User explicitly requested dummy-only data and deferred add flow/data model backend.
- Alternatives considered:
  - Persist to local storage: rejected as premature and out of scope.
  - Fetch from API/backend: rejected because backend contract not defined yet.

## Decision 3: Standardize created date output to YYYY-MM-DD

- Decision: Normalize date rendering to `YYYY-MM-DD` for every row.
- Rationale: Clarified requirement; deterministic output simplifies testing and review.
- Alternatives considered:
  - Localized date/time: rejected due to timezone variance and snapshot instability.
  - Full ISO timestamp: rejected as visually noisy for table scanning.

## Decision 4: Apply end-biased path truncation

- Decision: Display trailing path segments by truncating leading path segments first
  (e.g., `.../React/Next/Website` shown as `React/Next/Website` or `Next/Website` by width).
- Rationale: Most specific project context is at the end of the path and was explicitly requested.
- Alternatives considered:
  - Start-biased truncation (`~/Coding/...`): rejected by user preference.
  - Mid-string ellipsis with both ends: rejected as harder to implement consistently with fixed columns.

## Decision 5: Keep rows read-only with no row-level click behavior

- Decision: Render rows as non-interactive in this phase.
- Rationale: Clarified scope excludes open/details flow; prevents accidental UX commitments.
- Alternatives considered:
  - Row click to open project: rejected as future feature.
  - Row click to details panel: rejected as out of scope.

## Dependencies and Best Practices

- React 19 + Vitest testing: use Testing Library interactions and deterministic assertions.
- shadcn table usage: keep semantics (`Table`, `TableHeader`, `TableRow`, `TableCell`) and
  avoid bespoke styles unless needed for readability constraints.
- Performance: keep formatters pure and lightweight; avoid recomputing expensive transforms.
