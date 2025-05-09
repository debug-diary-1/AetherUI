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

---

This standardization document ensures AetherUI components maintain consistency across the library and provide a predictable developer experience.