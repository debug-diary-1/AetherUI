# AetherUI Component Standards

This document defines the coding, naming, and design standards for the AetherUI component library. Following these standards ensures consistency across components and improves the developer experience.

## 1. Component Naming Conventions

- **Element Tags**: All component tags must use the `ae-` prefix (e.g., `<ae-button>`, `<ae-accordion>`)
- **Component Classes**: Use PascalCase for class names (e.g., `AeButton`, `AeAccordion`)
- **Factory Functions**: Use `defineAe{ComponentName}()` for component registration (e.g., `defineAeButton()`)
- **Type Exports**: Use `{ComponentClass}Element` suffix for type exports (e.g., `AeButtonElement`)

## 2. Event Naming Conventions

- **Format**: `ae-{component}-{action}` (e.g., `ae-button-click`, `ae-accordion-change`)
- **For sub-components**: `ae-{component}-{subcomponent}-{action}` (e.g., `ae-accordion-item-change`)
- **Event Detail**: Should include the relevant property or state that changed:
  ```ts
  // For value changes
  { value: newValue }
  
  // For state changes
  { open: boolean, headerId: string }
  ```
- **Event Configuration**: All events must include:
  ```ts
  {
    bubbles: true,
    composed: true,
    // Detail object with relevant data
    detail: { /* ... */ }
  }
  ```

## 3. Property Naming Conventions

- **Selection Properties**:
  - Use `value` for the primary selected value(s)
  - Use `defaultValue` for initial uncontrolled state
  - Use `open` for disclosure components
  - Use `selected` for selection components
  
- **State Properties**:
  - `disabled`: Boolean for disabled state
  - `loading`: Boolean for loading state
  - `error`: String/Boolean for error state
  
- **Appearance Properties**:
  - `size`: String for component size (`sm`, `md`, `lg`)
  - `variant`: String for visual style variant
  - `position`: String for positioning elements

## 4. CSS Custom Property Naming Conventions

- **Format**: `--ae-{component}-{property}-{variant?}`
- **Component-specific**: `--ae-button-gap`, `--ae-button-radius`
- **Global tokens**: `--ae-color-{palette}-{shade}`, `--ae-spacing-{size}`

### Common CSS Properties

- Padding: `--ae-{component}-padding-{x|y}`
- Background colors: `--ae-{component}-bg-{variant}`
- Text colors: `--ae-{component}-fg-{variant}`
- Border colors: `--ae-{component}-border-{variant}`
- Sizes: `--ae-{component}-{size}-{dimension}`
- Transitions: `--ae-{component}-transition-{property}`

## 5. Slot & Part Naming Conventions

### Slots

- **Default Slot**: Primary content
- **Common Named Slots**:
  - `icon`: For icon content
  - `prefix`: Content before main content
  - `suffix`: Content after main content
  - `header`: For disclosure component headers
  - `description`: For supplementary text

### Shadow Parts

- **Base Parts**:
  - `base`: The root/container element
  - `content`: The main content wrapper
  - `icon`: Icon wrapper
  - `label`: Text content wrapper

## 6. Documentation Standards

All components must use JSDoc comments with the following tags:

```ts
/**
 * Brief component description
 * 
 * @element ae-component
 * 
 * @property {type} propName - Description
 * @property {type} anotherProp - Description
 * 
 * @fires {CustomEvent<DetailType>} ae-component-action - Description
 * 
 * @slot - Default slot description
 * @slot name - Named slot description
 * 
 * @csspart partName - Part description
 * 
 * @cssproperty --ae-component-property - Description
 * 
 * @example
 * ```html
 * <ae-component property="value">Content</ae-component>
 * ```
 */
```

## 7. Backward Compatibility

When renaming properties or events to conform to standards:

1. Keep the old name as a deprecated property or event
2. Maintain synchronization between old and new properties
3. Add JSDoc `@deprecated` tag to old properties
4. Dispatch both new and old events for at least one major version cycle

## 8. Accessibility Standards

- All components must implement appropriate ARIA roles, states, and properties
- Interactive elements must be keyboard accessible
- Components should follow WAI-ARIA patterns where applicable
- Focus management must be properly implemented for interactive components

## 9. Component Architecture Guidelines

- Use the Lit decorator syntax consistently
- Prefer composition over inheritance
- Abstract common logic into controllers or mixin functions
- Keep components as simple and focused as possible

## 10. Performance Considerations

- Minimize DOM operations in update cycles
- Use Lit's efficient rendering and property systems
- For large, complex components, consider lazy-loading
- Use template caching for repeated elements
- Follow bundle size guidelines for each component

## 11. Testing Standards

### Test Organization

- **Web Component Tests**: Place in `src/{component}/__tests__/ae-{component}.test.ts`
  - Use Web Test Runner with `@open-wc/testing`
  - Test actual DOM rendering and shadow DOM behavior
  
- **Unit/API Tests**: Place in `src/{component}/__tests__/{feature}.unit.test.ts` or `api.test.ts`
  - Use Vitest for fast, lightweight testing
  - Mock components and test business logic without DOM
  - Ideal for CI/CD with memory constraints

### Test File Naming

- `ae-*.test.ts` - Web Component tests (requires browser)
- `*.unit.test.ts` - Unit tests (no browser required)
- `api.test.ts` - API/integration tests
- `*-manager.test.ts` - Service/manager class tests

### Running Tests

```bash
# All tests (unit + WC)
pnpm test

# Unit/API tests only (no browser)
pnpm test:api

# Web Component tests only (requires Playwright)
pnpm test:wc

# Memory-constrained environments
pnpm test:memory
```

## 12. File Structure Standards

### Component Directory Structure

```
src/
└── {component}/
    ├── ae-{component}.ts      # Main component class
    ├── styles.ts              # Component styles using lit's css``
    ├── index.ts               # Public exports
    ├── types.ts               # TypeScript interfaces/types
    ├── controller.ts          # Lit ReactiveController (if needed)
    └── __tests__/
        ├── ae-{component}.test.ts    # Web Component tests
        └── {component}.unit.test.ts  # Unit tests
```

### Export Standards

Each component's `index.ts` should export:

```ts
// Component class
export { AeComponent } from './ae-component.js';

// Component registration function
export { defineAeComponent } from './ae-component.js';

// TypeScript types
export type { AeComponentProps } from './types.js';

// Styles (if needed externally)
export { styles } from './styles.js';
```

## 13. Build Configuration Standards

### Package.json Exports

- Place `types` condition last in export conditions to avoid warnings
- Maintain both ESM and CJS builds for compatibility
- Use proper sideEffects configuration

```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  }
}
```

## 14. Error Handling Standards

- Use console.warn for development warnings (e.g., deprecated properties)
- Throw errors for critical failures (e.g., missing required slots)
- Dispatch error events for async operations
- Include helpful error messages with component context

## 15. Memory and Performance Testing

- Run tests with memory limits in CI: `NODE_OPTIONS='--max-old-space-size=512'`
- Use sequential test execution for memory-constrained environments
- Monitor bundle sizes with each PR
- Test components with large datasets to ensure performance

---

This standardization document ensures AetherUI components maintain consistency across the library and provide a predictable developer experience.