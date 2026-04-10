# Research: Add Project Table Actions Column

**Phase**: 0 (Pre-Design Research)  
**Created**: 2026-04-10  
**Status**: Complete

## Overview

No external research was required for this feature. All technical decisions were clarified during specification phase and are directly supported by existing project dependencies.

## Technical Decisions Verified

### 1. Dropdown Component Library

**Decision**: Use shadcn UI's DropdownMenu component for Actions dropdown  
**Why**: Already available in project via existing UI imports; provides all required functionality including viewport boundary handling, keyboard navigation, and focus management  
**Alternatives Considered**:
- Custom HTML `<select>` dropdown: Would require manual keyboard event handling and viewport boundary detection
- Headless UI Popover: Would work but shadcn DropdownMenu is already integrated

**Outcome**: shadcn DropdownMenu is the right choice. No custom implementation needed.

### 2. Keyboard Navigation Support

**Decision**: Leverage shadcn DropdownMenu's built-in Arrow key (Up/Down) and Escape key support  
**Verified**: Project uses React 19+ with full TypeScript support; shadcn components handle keyboard event delegation automatically  
**Alternatives Considered**:
- Manual onKeyDown handlers: Would increase complexity and risk accessibility regressions
- Use browser's native keyboard handling: Already provided by DropdownMenu

**Outcome**: No custom keyboard logic required. Arrow Up/Down and Escape are handled by shadcn DropdownMenu out-of-the-box.

### 3. Viewport Boundary Handling

**Decision**: Use shadcn DropdownMenu's default positioning (auto-adjust to prevent vendor overflow)  
**Verified**: shadcn DropdownMenu uses Radix UI's Popper positioning, which automatically repositions (above/below/left/right) based on available space  
**Constraints**: Works on all screen sizes including mobile/narrow viewports  

**Outcome**: No custom viewport boundary logic needed. DropdownMenu handles this automatically.

### 4. Icon for Ellipsis Trigger

**Decision**: Use `MoreHorizontal` icon from lucide-react  
**Why**: lucide-react is already a dependency; MoreHorizontal is the standard ellipsis icon pattern  
**Verified**: Project already imports lucide-react icons in multiple components  

**Outcome**: Use MoreHorizontal icon. No new dependency needed.

### 5. State Management

**Decision**: Local React state (useState) for dropdown open/close within ActionCell component  
**Why**: Dropdown state is purely UI-local, not shared with other components; simple useState pattern follows existing project conventions  
**Alternatives Considered**:
- Context API: Overkill for single-component local state
- Action handlers callback: Still needed for selecting actions, but state stays local

**Outcome**: Use useState hook. State stays within ActionCell component.

## Dependencies Confirmed

| Dependency | Version | Used For | Status |
|----------|---------|----------|--------|
| shadcn/ui | (latest in project) | DropdownMenu component | ✓ Available |
| lucide-react | (latest in project) | MoreHorizontal icon | ✓ Available |
| React | 19.x | Hooks, state management | ✓ Available |
| TypeScript | 5.9.x | Type safety for ActionCell props | ✓ Available |
| Tailwind CSS | (latest in project) | Styling | ✓ Available |
| Vitest | 4.1.4 | Unit testing | ✓ Available |
| @testing-library/react | (latest in project) | Component testing | ✓ Available |

## No External Research Needed

✓ All APIs documented and available  
✓ No new frameworks or libraries required  
✓ Keyboard behavior standardized (follows ARIA patterns)  
✓ Viewport positioning documented in shadcn/Radix UI  

**Conclusion**: Ready to proceed to Phase 1 design phase. All technical unknowns resolved.
