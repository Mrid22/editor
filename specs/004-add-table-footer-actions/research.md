# Research: Add Project Table Footer Actions

**Feature**: 004-add-table-footer-actions  
**Date**: 2026-04-10  
**Status**: Complete

## Decision 1: Shared Action Definition and Exact Handler Reuse

**Decision**: Use a single shared action definition and shared rendering path consumed by both homepage empty-state and project-table footer; both contexts pass through the same handler references.

**Rationale**:
- Satisfies FR-003 and FR-004 requiring exact handler parity and no duplicated logic.
- Prevents label/order drift across views.
- Keeps future updates low-risk (single change location).

**Alternatives considered**:
- Duplicate action buttons in each component and manually keep in sync: rejected due to drift risk and repeated logic.
- Centralized state manager solely for two UI actions: rejected as unnecessary complexity for UI-only scope.

## Decision 2: Sticky Footer Placement in Table Container

**Decision**: Implement footer action area as sticky at the bottom of the table container for non-empty table state.

**Rationale**:
- Matches accepted clarification for long-list behavior.
- Keeps entry actions discoverable without forcing users to scroll to the end.
- Works with existing table layout and desktop-only viewport assumptions.

**Alternatives considered**:
- Static footer below table rows: rejected (less discoverable for long lists).
- Footer outside table container: rejected (weaker visual grouping with table content).

## Decision 3: UI-Only with Existing shadcn Components

**Decision**: Use existing shadcn primitives (`Button`, existing table structure) and avoid new custom interaction components.

**Rationale**:
- Aligns with user directive to keep this UI-only and use shadcn components.
- Preserves visual consistency with current homepage action controls.
- Reduces styling and accessibility regressions.

**Alternatives considered**:
- Custom button wrappers and bespoke footer controls: rejected due to avoidable complexity and inconsistency risk.

## Decision 4: Centering and Alignment Strategy

**Decision**: Keep footer action group horizontally centered and vertically aligned using existing Tailwind utility patterns already present in empty-state action layout.

**Rationale**:
- Explicitly satisfies user request to keep everything centered and aligned.
- Maintains consistent visual rhythm between empty-state and non-empty table views.
- Straightforward to test with deterministic class/DOM expectations.

**Alternatives considered**:
- Left-aligned footer controls: rejected as it diverges from requested alignment intent.
- Independent spacing logic per view: rejected as it introduces duplication.

## Decision 5: Testing Approach for Parity and Regression

**Decision**: Add focused tests that validate action label/order parity, exact handler invocation parity, sticky footer visibility in non-empty state, and non-regression of existing row action dropdown.

**Rationale**:
- Directly proves FR-002 through FR-007 and SC-001..SC-006.
- Keeps regression detection near affected code paths.

**Alternatives considered**:
- Manual-only validation: rejected because constitution requires automated proof for behavior changes.
