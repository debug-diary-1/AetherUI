# Property Decorator Standards for AetherUI

## Overview
This document defines the standard patterns for using Lit property decorators across all AetherUI components.

## Standards

### 1. Always Use `accessor` Keyword
The `accessor` keyword is the modern way to declare reactive properties in Lit.

```typescript
// ✅ Correct
@property({ type: Boolean })
accessor disabled = false;

// ❌ Avoid (older pattern)
@property({ type: Boolean })
disabled = false;
```

### 2. Always Specify Attribute Names for Multi-Word Properties
Multi-word properties should explicitly define their attribute names using kebab-case.

```typescript
// ✅ Correct
@property({ type: Number, attribute: 'hover-delay' })
accessor hoverDelay = 100;

// ❌ Avoid (Lit will auto-convert but explicit is better)
@property({ type: Number })
accessor hoverDelay = 100;
```

### 3. Use `reflect: true` for Visual State
Properties that affect visual appearance should reflect to attributes for CSS styling.

```typescript
// ✅ Correct - Visual states should reflect
@property({ type: Boolean, reflect: true })
accessor open = false;

@property({ type: String, reflect: true })
accessor variant: 'primary' | 'secondary' = 'primary';

// ✅ Correct - Data properties don't need to reflect
@property({ type: String })
accessor value = '';
```

### 4. Use `@state` for Internal Reactive State
Internal state that triggers re-renders but shouldn't be exposed as attributes.

```typescript
// ✅ Correct
@state()
private accessor isAnimating = false;

@state()
private accessor tooltipPosition = { x: 0, y: 0 };
```

### 5. Use `@query` for Element References
Use query decorators instead of querySelector in methods.

```typescript
// ✅ Correct
@query('[part="panel"]')
private accessor panel?: HTMLElement;

// ❌ Avoid
private get panel() {
  return this.renderRoot.querySelector('[part="panel"]');
}
```

## Complete Property Pattern

```typescript
export class AeExample extends LitElement {
  // Public properties with reflection
  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: String, reflect: true })
  accessor size: 'small' | 'medium' | 'large' = 'medium';

  // Public properties without reflection (data)
  @property({ type: String })
  accessor value = '';

  @property({ type: Array })
  accessor options: string[] = [];

  // Multi-word properties with explicit attributes
  @property({ type: Number, attribute: 'hover-delay' })
  accessor hoverDelay = 100;

  @property({ type: Boolean, attribute: 'show-arrow' })
  accessor showArrow = true;

  // Internal reactive state
  @state()
  private accessor internalState = false;

  @state()
  private accessor computedValue = '';

  // Element references
  @query('[part="input"]')
  private accessor inputElement?: HTMLInputElement;

  @queryAll('[part="item"]')
  private accessor items?: NodeListOf<HTMLElement>;
}
```

## Migration Checklist

For each component:
- [ ] Add `accessor` keyword to all `@property` decorators
- [ ] Add explicit `attribute` names for multi-word properties
- [ ] Verify `reflect: true` is used appropriately
- [ ] Convert internal reactive properties to `@state`
- [ ] Replace querySelector calls with `@query` decorators
- [ ] Ensure private properties are marked as `private`

## Benefits

1. **Type Safety**: TypeScript can better infer types with accessor
2. **Performance**: Lit can optimize better with explicit decorators
3. **Maintainability**: Explicit attribute names prevent confusion
4. **Consistency**: Same patterns across all components
5. **Future Proof**: Aligns with modern JavaScript/TypeScript patterns