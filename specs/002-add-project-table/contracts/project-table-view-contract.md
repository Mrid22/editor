# UI Contract: Homepage Non-Empty Project Table

## Purpose

Define the user-facing contract for rendering the non-empty project table with dummy data.

## Input Contract

The table view consumes a `ProjectCollection` shape:

```ts
{
  projects: Array<{
    id: string
    name: string
    path: string
    createdAt: string
  }>
}
```

## Display Contract

When `projects.length > 0`, homepage must display a table with exactly these user-visible columns:
1. Project Name
2. Path
3. Date Created

Column behavior:
- Project Name: raw `name` string.
- Path: end-biased truncated suffix from `path`, preserving trailing segments.
- Date Created: formatted as `YYYY-MM-DD`.

## Interaction Contract

- Rows are read-only.
- Row click does not navigate, open, or mutate state.
- No per-row action buttons are required in this phase.

## Fallback Contract

- If `projects.length === 0`, homepage renders empty-state view instead of table.
- Malformed date values must not crash rendering; fallback display is permitted.

## Testable Outcomes

- Non-empty input renders table with one row per project.
- Required columns are present and populated.
- Path suffix is trailing-segment biased for long values.
- Date format output is `YYYY-MM-DD`.
- Row interaction remains inert.
