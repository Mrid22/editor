# UX Validation Checklist: Non-Empty Project Table

## Table Visibility

- [x] Non-empty data shows table instead of empty state
- [x] Empty data still shows empty state fallback
- [x] Table contains required headers: Project Name, Path, Date Created

## Data Presentation

- [x] Project names are readable and non-blank
- [x] Path display preserves trailing segments for long paths
- [x] Date Created displays in YYYY-MM-DD format
- [x] Malformed date values render fallback text without crashing

## Interaction and Accessibility

- [x] Rows are read-only and row clicks do not navigate/open anything
- [x] Keyboard focus remains stable while interacting with surrounding controls
- [x] Narrow viewport layout remains readable with no overlapping text

## Consistency

- [x] Table spacing and typography match shared app patterns
- [x] Empty/non-empty state transition feels consistent and predictable
