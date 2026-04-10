# Contract: Table Footer Entry Actions

**Feature**: 004-add-table-footer-actions  
**Date**: 2026-04-10

## Purpose

Define the expected user-facing and testable contract for footer entry actions in non-empty project table state, including exact parity with homepage entry actions.

## Inputs

- Non-empty project data set (`projects.length > 0`)
- Shared action definitions for:
  - `Create Project`
  - `Import Project`
- Shared callback references used by homepage actions

## Rendering Contract

1. Footer action area is rendered only in non-empty table state.
2. Footer action area remains sticky at bottom of table container while scrolling long lists.
3. Exactly two actions are displayed in fixed order:
   - Create Project (primary)
   - Import Project (secondary)
4. Footer action group is centered and aligned in the container.
5. Desktop support target is widths >=1024px.

## Behavior Contract

1. Activating `Create Project` in footer invokes the exact same handler reference used by homepage `Create Project` action.
2. Activating `Import Project` in footer invokes the exact same handler reference used by homepage `Import Project` action.
3. Keyboard activation (Tab + Enter/Space) is supported for both actions.
4. If shared handlers are disabled/unavailable, footer behavior mirrors homepage fallback behavior.

## Non-Regression Contract

1. Existing project row actions dropdown (Open In/Delete/Share) continues to function unchanged.
2. Existing empty-state rendering behavior remains unchanged.

## Test Contract

Automated checks must verify:
- Footer visibility in non-empty state
- Sticky positioning behavior contract at container level
- Exact labels and order
- Same handler invocation parity with homepage actions
- Keyboard reachability and activation
- No regressions in row dropdown interactions
