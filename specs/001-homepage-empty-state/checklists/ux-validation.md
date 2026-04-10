# UX Validation Checklist: Homepage Empty State

**Feature**: 001-homepage-empty-state  
**Task**: T007  
**Date**: 2026-04-10

## Manual UX Validation Checklist

Use this checklist when performing manual UX validation (T019, T020) to verify the empty state
feature meets all acceptance criteria and user expectations.

### Test Environment Setup

- [ ] **App Launched**: Run `pnpm dev` and open app in browser (localhost:1420)
- [ ] **Zero Projects State**: Clear any local projects or mock with empty array (`projects = []`)
- [ ] **Populated State Ready**: Have mock projects available to add (use `src/app/dashboard/data.json` sample)

---

## Visual Display Validation

### Empty State Visibility

- [ ] **Empty state appears** when app loads with zero projects (not blank, not error, not data table)
- [ ] **Message visible**: "No projects yet" (or configured title) is rendered and readable
- [ ] **Description visible**: Secondary message about creating/importing projects is present
- [ ] **Buttons visible**: Both "Create Project" and "Import Project" buttons are present
- [ ] **Layout centered**: Empty state is centered on screen (not left-aligned, not cramped)

### Visual Consistency

- [ ] **Button styling**: Primary button appears more prominent (default variant)
- [ ] **Secondary button**: Secondary button appears less prominent (secondary variant)
- [ ] **Button text**: Text labels match spec ("Create Project", "Import Project")
- [ ] **Text contrast**: All text is readable (good contrast against background)
- [ ] **Spacing**: Space between title, description, and buttons is consistent with app design

### Responsive Design

- [ ] **Desktop (1200px+)**: Empty state renders correctly; buttons remain in horizontal row
- [ ] **Tablet (768px-1200px)**: Empty state adapts; buttons may start to stack
- [ ] **Mobile (375px-768px)**: Buttons stack vertically; text remains readable
- [ ] **Mobile extreme (< 375px)**: No overflow; layout still makes sense
- [ ] **Bottom of page**: No hidden content; full empty state visible in viewport

---

## Interaction Testing

### Button States

- [ ] **Primary button hover**: Button changes appearance on hover (shadow, color shift, or other visual feedback)
- [ ] **Primary button focus**: Button shows focus indicator when tabbed to (keyboard accessible)
- [ ] **Primary button click**: Click does not crash app; button is responsive (no delays observed)
- [ ] **Secondary button hover**: Button changes appearance on hover
- [ ] **Secondary button focus**: Button shows focus indicator when tabbed to
- [ ] **Secondary button click**: Click does not crash app; button is responsive
- [ ] **Button disabled state**: Buttons are NOT disabled (both should be clickable)

### Keyboard Navigation

- [ ] **Tab order**: Can tab through both buttons in logical order
- [ ] **Enter key**: Can activate buttons with Enter key (not just mouse)
- [ ] **Focus visible**: Browser shows visible focus outline when tabbing (not hidden)
- [ ] **No keyboard trap**: Can tab away from buttons; focus not stuck

---

## Conditional Rendering Testing

### Empty State → Populated State

- [ ] **Start empty**: Empty state shown with zero projects
- [ ] **Add mock projects**: Programmatically add projects to app state (or use UI if available)
- [ ] **Empty state hidden**: Empty state immediately disappears (not still visible)
- [ ] **Table appears**: DataTable with projects renders in place of empty state
- [ ] **No flash**: Transition is smooth (not a jarring flicker or delay)

### Populated State → Empty State

- [ ] **Start populated**: DataTable shown with mock projects
- [ ] **Clear projects**: Programmatically remove all projects from app state
- [ ] **Table hidden**: DataTable immediately disappears
- [ ] **Empty state shows**: Empty state reappears correctly
- [ ] **No errors**: No console errors during state changes

---

## Accessibility Testing

### Screen Reader (Optional / Bonus)

- [ ] **Page structure**: Screen reader announces title and description (not just buttons)
- [ ] **Button labels**: Screen reader clearly identifies button purpose ("Create Project", "Import Project")
- [ ] **No redundancy**: Screen reader doesn't announce button function twice

### Keyboard Only Navigation

- [ ] **No mouse required**: All functionality accessible via keyboard alone
- [ ] **Visual focus**: Clear indication of which button is focused
- [ ] **Enter activates**: Pressing Enter on focused button triggers click

### Color Contrast

- [ ] **WCAG AA**: Text meets minimum contrast ratio (check with browser DevTools or Lighthouse)
- [ ] **Title contrast**: Title text readable against background
- [ ] **Button text**: Button text readable (not white on light gray, for example)

---

## Performance & Stability

### Rendering Performance

- [ ] **Fast render**: Empty state appears instantly (no noticeable delay on load)
- [ ] **No lag on click**: Buttons respond immediately to clicks (no 1-second delay)
- [ ] **State toggle fast**: Switching between empty/populated state is instant
- [ ] **React Profiler**: Check component render time <16ms (run React DevTools Profiler)

### Browser Console

- [ ] **No errors**: Browser console shows no JavaScript errors
- [ ] **No warnings**: No TypeScript/React warnings about props or missing dependencies
- [ ] **No network errors**: No failed API calls or missing assets

---

## Edge Cases & Error Scenarios

### Data Integrity

- [ ] **Empty array**: `projects.length === 0` triggers empty state (not `null`, not `undefined`)
- [ ] **One project**: Adding one project hides empty state (condition threshold correct)
- [ ] **Many projects**: Large number of projects (100+) still hides empty state

### Orientation Changes

- [ ] **Portrait → Landscape**: Rotating device/window resizes; layout adapts correctly
- [ ] **Landscape → Portrait**: Reverse rotation; layout re-adapts

### Browser Zoom

- [ ] **100% zoom**: Normal rendering
- [ ] **150% zoom**: Text and buttons scale; no overflow or cutoff
- [ ] **200% zoom**: Still usable; buttons may stack but remain clickable

---

## Sign-Off

**Tester Name**: ________________  
**Date**: ________________  
**All Checks Passed**: ☐ YES / ☐ NO

**If NO, list failed items**:  
_______________________________________________________________________________

_______________________________________________________________________________

**Notes/Comments**:  
_______________________________________________________________________________

_______________________________________________________________________________

**Approved for Merge**: ☐ YES / ☐ NO (pending fixes)
