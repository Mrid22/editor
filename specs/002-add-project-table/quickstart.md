# Quickstart: Non-Empty Project Table (Dummy Data)

## Goal

Render homepage non-empty state using dummy project data with a shadcn table showing:
- Project name
- Path (end-biased truncated)
- Date created (`YYYY-MM-DD`)

Rows are read-only in this phase.

## Implementation Steps

1. Prepare dummy data in homepage state
- Add a non-empty dummy project array for table validation.
- Keep empty-state fallback path intact for zero items.

2. Wire non-empty branch in homepage
- In `App.tsx`, render table branch when `projects.length > 0`.
- Preserve existing empty-state branch for `projects.length === 0`.

3. Use shadcn table primitives
- Render table header with `Project Name`, `Path`, `Date Created`.
- Render one row per dummy project record.

4. Add formatting helpers
- Date formatter: output `YYYY-MM-DD`.
- Path formatter: preserve trailing path segments for long paths.

5. Keep rows non-interactive
- Do not add row click handlers or navigation actions.

## Validation Commands

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## Manual Validation Checklist

- Non-empty dummy data shows table instead of empty state.
- Three required columns are visible.
- Long paths show trailing segments (not leading-only prefixes).
- Date values are `YYYY-MM-DD`.
- Row clicks do nothing.
- Setting data back to empty restores empty-state view.

## Out of Scope

- Real add/import/open project flows
- Persistent storage and backend APIs
- Sorting, filtering, pagination
- Row actions or details screens
