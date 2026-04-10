# Research: Homepage Empty State

**Feature**: 001-homepage-empty-state  
**Date**: 2026-04-10  
**Phase**: Phase 0 - Unknowns Resolution

## Findings

### 1. Project State Management

**Question**: Where is the project list state managed?

**Finding**: The DataTable component (`src/components/data-table.tsx`) accepts an `initialData`
prop of type `z.infer<typeof schema>[]` (array of typed project/document objects). State is
managed locally within the component using React.useState:

```typescript
const [data, setData] = React.useState(() => initialData)
```

**Implication**: The parent component (to be identified in App.tsx or a dashboard page) will
pass an array of projects. Empty array = empty state trigger.

**Status**: RESOLVED. The projects array is passed as a prop to DataTable.

---

### 2. Empty State Trigger Condition

**Question**: What is the exact condition to show/hide the empty state?

**Finding**: DataTable receives `data: z.infer<typeof schema>[]` where schema is defined in
the same file. The condition to display empty state is:

```
data.length === 0 (no items in the array passed to DataTable)
```

The parent component rendering DataTable will have access to this condition and can conditionally
render either the empty state or the populated table.

**Implication**: Parent component needs a guard:
```
{data.length > 0 ? <DataTable data={data} /> : <EmptyState />}
```

**Status**: RESOLVED. Condition is straightforward data length check.

---

### 3. Visual Decoration & Icon Requirement

**Question**: Should the empty state have an icon/illustration?

**Finding**: The specification provides no visual decoration requirement beyond message + buttons.
shadcn/ui offers Lucide React icons which are already imported in the project (e.g.,
`GripVerticalIcon`, `CircleCheckIcon`, etc. in data-table.tsx). Adding an optional icon
makes the empty state visually consistent with the app but is not mandatory for MVP.

**Implication**: Icon is OPTIONAL. Start with text + buttons; add illustration in a future
polish pass if needed.

**Status**: RESOLVED. Icon is optional for this feature.

---

## Decisions

1. **Empty State Component Location**: `src/components/empty-state.tsx`
   - Rationale: Reusable component pattern; may be needed on other UI surfaces with zero data.

2. **Integration Pattern**: Parent component conditional rendering
   - Rationale: Keeps separation of concerns. Parent manages data logic; child components render UI.

3. **Button Styling**: Use shadcn Button with build-in `variant` prop
   - `variant="default"` for primary "Create Project" button
   - `variant="secondary"` for secondary "Import Project" button
   - Rationale: Leverages existing design system; no custom CSS needed.

4. **Icons**: Skip for MVP
   - Rationale: Spec requires message + 2 buttons. Icons enhance visual hierarchy but are not
     required for user clarity. Can add later.

5. **Testing Strategy**:
   - Unit test: Mount EmptyState component in isolation; verify text and button render.
   - Integration test: Render parent with empty data array; verify EmptyState appears;
     render parent with non-empty data; verify EmptyState hidden and table shown.
   - Manual UX validation: Launch app with no projects; observe empty state display.

---

## Next Steps

All unknowns resolved. Proceed to Phase 1 design:
- Generate `data-model.md` documenting the EmptyState component interface
- Generate `quickstart.md` with build/run/test instructions for the feature
- Ready for task generation `/speckit.tasks`
