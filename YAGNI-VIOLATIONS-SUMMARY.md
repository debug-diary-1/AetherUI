# YAGNI Violations Summary - AetherUI

## Overview
This document outlines violations of the YAGNI (You Aren't Gonna Need It) principle found in the AetherUI codebase. Addressing these issues will reduce complexity, improve maintainability, and decrease bundle size.

## Critical Issues to Address

### 1. Unused Test Infrastructure
**Files to Remove:**
- `/packages/core/src/test-helpers.ts` - Contains `fixture()` and `waitForEvent()` functions never imported
- `/packages/core/src/test-lit-polyfill.ts` - DOM/window polyfills for testing not used anywhere

**Impact:** Reduces maintenance burden and confusion about testing approach

### 2. Deprecated APIs Still Maintained
**Components with Deprecated Features:**

#### Radio Group (`/packages/core/src/radio/ae-radio-group.ts`)
- Still dispatches both `ae-change` (deprecated) and `ae-radio-group-change` events
- Remove deprecated event before v1.0

#### Accordion (`/packages/core/src/accordion/ae-accordion.ts`)
- Maintains deprecated `expanded` property alongside `value`
- Still dispatches deprecated `ae-expand-change` event
- Remove backward compatibility code

#### Accordion Item (`/packages/core/src/accordion/ae-accordion-item.ts`)
- Has deprecated `item` part alongside `base` part
- Simplify to single part system

### 3. Over-Engineered Features

#### AutocompleteController (`/packages/core/src/autocomplete/controller.ts`)
- Complex highlighting logic that could be simplified
- Debouncing functionality that may not be essential
- Consider simplifying to basic filtering

#### Toast Manager (`/packages/core/src/toast/toast-manager.ts`)
- `clearAll()` method is never called or demonstrated
- Consider removing if not needed

#### Dropdown KeyboardController (`/packages/core/src/dropdown/keyboard.ts`)
- Type-ahead search functionality adds complexity
- May not be necessary for basic dropdown

### 4. Documentation Mismatches

#### Modal Component
- JSDoc references CSS properties that don't exist:
  - `--ae-modal-backdrop-bg`
  - `--ae-modal-panel-bg`
  - Several others
- Update docs to match actual implementation

#### Multiple Components
- Many components document CSS custom properties that aren't implemented
- Either implement or remove from documentation

### 5. Structural Inconsistencies

#### Modal Define Pattern
- `/packages/core/src/modal/define.ts` - Only modal uses separate define file
- Either standardize this pattern or integrate into main file

#### Complex Import/Export
- Index.ts has complex logic to avoid naming conflicts between autocomplete and combo
- Consider simpler approach or better naming

## Recommendations

### Immediate Actions (Before v1.0)
1. Remove unused test files
2. Remove all deprecated APIs
3. Update documentation to match implementation
4. Simplify modal file structure

### Consider for Simplification
1. Reduce AutocompleteController complexity
2. Remove unused Toast Manager methods
3. Simplify Dropdown keyboard handling
4. Standardize component patterns

### Bundle Size Impact
Removing these violations could reduce bundle size by approximately 10-15% and improve tree-shaking efficiency.

## Next Steps
1. Create issues for each major violation
2. Prioritize based on impact and effort
3. Address critical issues before v1.0 release
4. Document decisions for future reference