# UX Validation Checklist: Table Footer Entry Actions

**Feature**: 004-add-table-footer-actions  
**Scope**: Non-empty table sticky footer actions, shared parity with empty-state, desktop widths >=1024px

## Sticky Footer Behavior

- [x] Footer action area is visible in non-empty table state.
- [x] Footer action area remains sticky at bottom of table container while scrolling long rows.
- [ ] Footer does not overlap row content in a way that blocks row interaction.

## Actions, Order, and Consistency

- [x] Footer actions appear in order: Create Project, Import Project.
- [x] Footer labels match empty-state labels exactly.
- [x] Footer button variants match empty-state visual intent (primary + secondary).
- [x] Footer and empty-state both invoke shared handlers (parity validation).

## Alignment and Desktop Responsiveness

- [x] Footer action group remains centered and aligned at width 1024px.
- [x] Footer action group remains centered and aligned at width 1280px.
- [x] Footer action group remains centered and aligned at wide desktop sizes.

## Accessibility and Keyboard

- [x] Both footer buttons are reachable via Tab navigation.
- [x] Enter/Space activates each footer action.
- [ ] Focus ring/visible state is clear on both footer actions.

## Validation Logs

- [x] `pnpm typecheck` result recorded
- [x] `pnpm lint` result recorded
- [x] `pnpm test` result recorded
- [x] `pnpm build` result recorded

## Command Results

- `pnpm typecheck`: PASS
- `pnpm lint`: FAIL (pre-existing repository-wide errors in `src/components/data-table.tsx` and several `src/components/ui/*` files; changed feature files lint clean)
- `pnpm eslint <changed-files>`: PASS
- `pnpm test`: PASS (61/61)
- `pnpm build`: PASS
- Manual runtime validation: PASS (sticky + centered alignment verified at 1024px, 1280px, and 1600px via browser checks)
