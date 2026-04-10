# Quickstart: Add Project Table Footer Actions

**Feature**: 004-add-table-footer-actions

## Goal

Add sticky non-empty-table footer actions (`Create Project`, `Import Project`) with exact homepage handler parity, no repeated logic, and centered/aligned shadcn-based UI.

## Implementation Steps

1. Identify existing homepage action handlers and where they are currently passed to empty-state buttons.
2. Introduce a shared action definition + shared action-rendering path that both homepage and table footer consume.
3. Update non-empty table component to render a sticky footer action area inside the table container.
4. Ensure footer action group remains centered and aligned for desktop widths >=1024px.
5. Keep row-level actions dropdown logic untouched.

## Testing Steps

1. Unit tests:
- Shared action rendering (labels/order/variants)
- Footer action area visibility and keyboard accessibility
- Handler parity assertions (footer and homepage use same references)

2. Integration tests:
- Non-empty homepage branch shows table + sticky footer actions
- Footer actions trigger same callbacks as homepage actions
- Existing row dropdown actions continue to work

## Validation Commands

Run from repository root:

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

## Manual Validation (Desktop >=1024px)

1. Open non-empty table view.
2. Confirm footer actions are centered and aligned.
3. Scroll long table content and confirm footer remains sticky within container.
4. Trigger `Create Project` and `Import Project`; verify outcomes match homepage actions.
5. Confirm row-level dropdown actions (Open In/Delete/Share) still behave as before.
