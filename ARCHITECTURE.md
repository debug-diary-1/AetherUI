# AetherUI Architecture & Testing Guide

## Table of Contents
- [Overview](#overview)
- [Design Principles](#design-principles)
- [Component Architecture](#component-architecture)
- [Testing Strategy](#testing-strategy)
- [Component Catalog](#component-catalog)
- [Development Workflow](#development-workflow)
- [CI/CD Pipeline](#cicd-pipeline)

## Overview

AetherUI is a modern, accessible web component library built with **Lit** (Web Components) and TypeScript. The library provides 17 production-ready UI components with comprehensive testing, documentation, and E2E validation.

### Technology Stack
- **Framework**: Lit 3.x (Web Components)
- **Language**: TypeScript 5.x
- **Build Tool**: Vite
- **Testing**:
  - Unit: Web Test Runner + @open-wc/testing
  - E2E: Storybook Test Runner + Playwright
- **Documentation**: Storybook 8.x
- **Monorepo**: Turborepo + pnpm workspaces

## Design Principles

### 1. Consistency First
All components follow identical architectural patterns:
- Property naming: `camelCase` → `kebab-case` attributes
- Event naming: `ae-[component]-[action]` (e.g., `ae-input-change`)
- Reflected attributes: Properties marked with `reflect: true` for CSS attribute selectors
- Shadow DOM: Encapsulated styles with CSS parts for customization

### 2. Accessibility Built-In
- WAI-ARIA compliance out of the box
- Keyboard navigation support
- Screen reader announcements
- Focus management
- High contrast mode support

### 3. Form Integration
Components that represent form controls use the **ElementInternals API** for native form participation:
- `ae-input`
- `ae-textarea`
- `ae-select`
- `ae-checkbox`
- `ae-radio`
- `ae-switch`

### 4. Progressive Enhancement
- Works without JavaScript (where possible)
- Graceful degradation
- Respects user preferences (prefers-reduced-motion, forced-colors)

## Component Architecture

### File Structure
```
packages/core/src/[component]/
├── ae-[component].ts      # Main component class
├── styles.ts              # Component styles (lit css)
├── middleware.ts          # (Optional) Utility functions
├── index.ts               # Public exports
└── __tests__/
    ├── ae-[component].test.ts      # Component tests
    └── [component].unit.test.ts    # (Optional) Unit tests
```

### Component Template

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { componentStyles } from './styles.js';

/**
 * @element ae-component
 * @fires ae-component-action - Description
 *
 * @slot - Default slot description
 * @part base - The component's base wrapper
 *
 * @cssproperty --ae-component-bg - Background color
 */
@customElement('ae-component')
export class AeComponent extends LitElement {
  static styles = componentStyles;

  /**
   * Property description
   */
  @property({ type: String, reflect: true })
  accessor variant: 'primary' | 'secondary' = 'primary';

  /**
   * Size of the component
   */
  @property({ type: String, reflect: true })
  accessor size: 'sm' | 'md' | 'lg' = 'md';

  private _handleEvent() {
    this.dispatchEvent(new CustomEvent('ae-component-action', {
      detail: { /* event data */ },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div part="base">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-component': AeComponent;
  }
}
```

### Style Template

```typescript
import { css } from 'lit';

export const componentStyles = css`
  :host {
    display: block;
  }

  /* Base styles */
  [part="base"] {
    /* ... */
  }

  /* Size variants */
  :host([size='sm']) [part="base"] {
    font-size: 0.8125rem;
  }

  :host([size='md']) [part="base"] {
    font-size: 0.875rem;
  }

  :host([size='lg']) [part="base"] {
    font-size: 1rem;
  }

  /* Variant styles */
  :host([variant='primary']) [part="base"] {
    background: var(--ae-primary-bg, #4f46e5);
  }
`;
```

## Testing Strategy

### 3-Layer Testing Approach

```
┌─────────────────────────────────────────┐
│  Layer 3: E2E Visual Tests (Playwright) │
│  - Cross-browser testing                │
│  - Visual regression detection          │
│  - Screenshot comparison                │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│  Layer 2: Storybook Play Functions      │
│  - Real browser interactions            │
│  - Component behavior verification      │
│  - Shadow DOM testing                   │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│  Layer 1: Unit Tests (Web Test Runner)  │
│  - Component API testing                │
│  - Property reflection                  │
│  - Event dispatching                    │
└─────────────────────────────────────────┘
```

### 1. Unit Tests (Web Test Runner)

**Purpose**: Verify component API, properties, events, and basic rendering.

**Location**: `packages/core/src/[component]/__tests__/`

**Pattern**:
```typescript
import { html, fixture, expect } from '@open-wc/testing';
import { AeComponent } from '../ae-component.js';

describe('ae-component', () => {
  it('has correct default properties', async () => {
    const el = await fixture<AeComponent>(
      html`<ae-component></ae-component>`
    );
    expect(el.variant).to.equal('primary');
    expect(el.size).to.equal('md');
  });

  it('reflects properties to attributes', async () => {
    const el = await fixture<AeComponent>(
      html`<ae-component size="lg"></ae-component>`
    );
    expect(el.size).to.equal('lg');
    expect(el.getAttribute('size')).to.equal('lg');
  });

  it('emits custom events', async () => {
    const el = await fixture<AeComponent>(
      html`<ae-component></ae-component>`
    );

    let eventFired = false;
    el.addEventListener('ae-component-action', () => {
      eventFired = true;
    });

    // Trigger action
    const button = el.shadowRoot!.querySelector('button');
    button!.click();

    await waitUntil(() => eventFired);
    expect(eventFired).to.be.true;
  });
});
```

**Run**: `pnpm test` (from packages/core)

### 2. Storybook Play Functions

**Purpose**: Test real user interactions in browser environment with shadow DOM.

**Location**: `packages/storybook/src/stories/Ae[Component].stories.js`

**Pattern**:
```javascript
import { html } from 'lit';
import { expect, within, userEvent, waitFor } from '@storybook/test';

export const Default = {
  render: (args) => html`
    <ae-component size="${args.size}">
      <button>Click me</button>
    </ae-component>
  `,
  play: async ({ canvasElement }) => {
    // Access shadow DOM directly
    const component = canvasElement.querySelector('ae-component');
    expect(component).toBeInTheDocument();

    // Get elements from shadow DOM
    const button = component.shadowRoot.querySelector('button');
    expect(button).toBeTruthy();

    // Simulate user interaction
    await userEvent.click(button);

    // Verify state changes
    await waitFor(() => {
      expect(component.open).toBe(true);
    });

    // Verify shadow DOM rendering
    const overlay = component.shadowRoot.querySelector('[part="overlay"]');
    expect(overlay).toBeTruthy();
  },
};
```

**Key Considerations**:
- ❌ **Don't use**: Testing Library's `getByRole()` (can't pierce shadow DOM)
- ✅ **Do use**: Direct `.shadowRoot.querySelector()` access
- ❌ **Don't use**: `userEvent.clear()` on shadow DOM inputs (focus issues)
- ✅ **Do use**: Direct value manipulation + event dispatching

**Run**: `pnpm test:storybook` (from root)

### 3. E2E Visual Tests (Playwright)

**Purpose**: Visual regression testing across browsers.

**Location**: `tests/e2e/visual.spec.ts`

**Pattern**:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Component Visual Tests', () => {
  test('ae-component renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-component--default');

    // Wait for component to be ready
    await page.waitForSelector('ae-component');

    // Take screenshot
    await expect(page).toHaveScreenshot('ae-component-default.png');
  });

  test('ae-component size variants', async ({ page }) => {
    await page.goto('/iframe.html?id=components-component--all-sizes');

    await page.waitForSelector('ae-component');
    await expect(page).toHaveScreenshot('ae-component-sizes.png');
  });
});
```

**Run**: `pnpm test:e2e` (from root)

## Component Catalog

### Form Controls (6 components)

#### 1. **ae-input**
Text input with validation and accessibility.

**Features**:
- ElementInternals form participation
- Built-in validation states (error, success, warning)
- Helper text and error messages
- Prefix/suffix slots
- Size variants (sm, md, lg)

**Events**: `ae-input-input`, `ae-input-change`, `ae-input-focus`, `ae-input-blur`

**File**: `/packages/core/src/input/ae-input.ts:1`

---

#### 2. **ae-textarea**
Multi-line text input with auto-resize.

**Features**:
- Auto-resize to content
- Character counter
- Validation states
- ElementInternals integration

**Events**: `ae-textarea-input`, `ae-textarea-change`

**File**: `/packages/core/src/textarea/ae-textarea.ts:1`

---

#### 3. **ae-select**
Native select wrapper with consistent styling.

**Features**:
- Multiple selection support
- Validation states
- Option groups
- ElementInternals integration

**Events**: `ae-select-change`, `ae-select-focus`, `ae-select-blur`

**File**: `/packages/core/src/select/ae-select.ts:1`

---

#### 4. **ae-checkbox**
Checkbox with indeterminate state.

**Features**:
- Indeterminate state
- Validation states
- ElementInternals integration

**Events**: `ae-checkbox-change`

**File**: `/packages/core/src/checkbox/ae-checkbox.ts:1`

---

#### 5. **ae-radio**
Radio button for mutually exclusive choices.

**Features**:
- Radio groups
- Validation states
- ElementInternals integration

**Events**: `ae-radio-change`

**File**: `/packages/core/src/radio/ae-radio.ts:1`

---

#### 6. **ae-switch**
Toggle switch for boolean values.

**Features**:
- Size variants
- Validation states
- ElementInternals integration

**Events**: `ae-switch-change`

**File**: `/packages/core/src/switch/ae-switch.ts:1`

---

### Interactive Components (5 components)

#### 7. **ae-autocomplete**
Search input with filtered dropdown suggestions.

**Features**:
- Client-side filtering
- Keyboard navigation
- Highlighting matched text
- Min characters threshold
- Max items limit
- Option groups

**Events**: `ae-autocomplete-change`, `ae-autocomplete-select`

**File**: `/packages/core/src/autocomplete/ae-autocomplete.ts:1`

---

#### 8. **ae-combo**
Combobox with custom filtering and selection.

**Features**:
- Highlighting with `unsafeHTML`
- Keyboard navigation (Arrow keys, Enter, Escape)
- ARIA compliance (aria-expanded, aria-activedescendant)

**Events**: `ae-combo-change`, `ae-combo-select`

**File**: `/packages/core/src/combo/ae-combo.ts:1`

---

#### 9. **ae-pagination**
Page navigation with configurable display.

**Features**:
- First/Last page buttons
- Sibling page range control
- Size variants
- Responsive design

**Events**: `ae-page-change`

**File**: `/packages/core/src/pagination/ae-pagination.ts:1`

---

#### 10. **ae-tooltip**
Contextual information on hover/focus.

**Features**:
- 12 placement options
- Hover/hide delays
- Arrow indicator
- Animations (fade, scale)
- ESC key dismissal
- Floating UI positioning

**Events**: `ae-tooltip-show`, `ae-tooltip-hide`

**File**: `/packages/core/src/tooltip/ae-tooltip.ts:1`

---

#### 11. **ae-tabs**
Tabbed interface with keyboard navigation.

**Features**:
- Horizontal/vertical orientation
- Auto/manual activation modes
- ARIA compliance (role=tablist)
- Arrow key navigation

**Events**: `ae-tab-change`

**File**: `/packages/core/src/tabs/ae-tabs.ts:1`

---

### Overlay Components (3 components)

#### 12. **ae-drawer**
Side panel that slides in from screen edge.

**Features**:
- 4 placements (left, right, top, bottom)
- Focus trap
- ESC key dismissal
- Backdrop overlay

**Events**: `ae-drawer-open`, `ae-drawer-close`

**File**: `/packages/core/src/drawer/ae-drawer.ts:1`

---

#### 13. **ae-popover**
Floating overlay with positioning.

**Features**:
- Click/hover/manual triggers
- Floating UI positioning
- Arrow indicator
- Auto-close on outside click

**Events**: `ae-popover-open`, `ae-popover-close`

**File**: `/packages/core/src/popover/ae-popover.ts:1`

---

#### 14. **ae-menu**
Dropdown menu with keyboard navigation.

**Features**:
- Nested submenus
- Keyboard navigation
- ARIA compliance
- Click outside to close

**Events**: `ae-menu-select`, `ae-menu-open`, `ae-menu-close`

**File**: `/packages/core/src/menu/ae-menu.ts:1`

---

### Feedback Components (2 components)

#### 15. **ae-alert**
In-flow banner for status messages.

**Features**:
- 4 variants (info, success, warning, error)
- Size variants (sm, md, lg)
- Closable option
- Default icons per variant
- Custom icon slot

**Events**: `ae-close`

**File**: `/packages/core/src/alert/ae-alert.ts:1`

---

#### 16. **ae-toast**
Ephemeral notifications with auto-dismiss.

**Features**:
- 4 variants (info, success, warning, error)
- Size variants (sm, md, lg)
- Auto-dismiss with timer
- Progress bar animation
- Pause on hover
- 4 placements (top/bottom, left/right)

**Events**: `ae-close`, `ae-click`

**File**: `/packages/core/src/toast/ae-toast.ts:1`

---

### Display Components (3 components)

#### 17. **ae-badge**
Small status indicator or label.

**Features**:
- 7 variants (primary, secondary, success, warning, error, info, neutral)
- Size variants (sm, md, lg)
- Outline style
- Dot indicator mode
- Closable option

**Events**: `ae-badge-close`

**File**: `/packages/core/src/badge/ae-badge.ts:1`

---

#### 18. **ae-breadcrumb**
Navigation trail showing page hierarchy.

**Features**:
- Auto separator rendering
- aria-current for active page
- Custom separator slot

**File**: `/packages/core/src/breadcrumb/ae-breadcrumb.ts:1`

---

#### 19. **ae-progress**
Visual progress indicator.

**Features**:
- Linear progress bar
- Determinate/indeterminate modes
- Size variants

**File**: `/packages/core/src/progress/ae-progress.ts:1`

---

### Utility Components (1 component)

#### 20. **ae-spinner**
Loading indicator.

**Features**:
- Size variants (sm, md, lg)
- Color customization
- Accessible labels

**File**: `/packages/core/src/spinner/ae-spinner.ts:1`

---

#### 21. **ae-treeview**
Hierarchical list with expand/collapse.

**Features**:
- Nested items
- Expand/collapse states
- Keyboard navigation
- ARIA tree structure

**Events**: `ae-treeview-toggle`, `ae-treeview-select`

**File**: `/packages/core/src/treeview/ae-treeview.ts:1`

---

## Development Workflow

### 1. Component Creation

```bash
# Create component directory
mkdir -p packages/core/src/[component]

# Create files
touch packages/core/src/[component]/ae-[component].ts
touch packages/core/src/[component]/styles.ts
touch packages/core/src/[component]/index.ts
mkdir packages/core/src/[component]/__tests__
touch packages/core/src/[component]/__tests__/ae-[component].test.ts
```

### 2. Development

```bash
# Start Storybook dev server
pnpm dev

# Run unit tests in watch mode
cd packages/core && pnpm test:watch

# Run type checking
pnpm typecheck
```

### 3. Testing

```bash
# Run all unit tests
pnpm test

# Run Storybook tests
pnpm test:storybook

# Run E2E visual tests
pnpm test:e2e

# Update visual baselines
pnpm test:e2e:update
```

### 4. Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @aetherui-kit/core build

# Build Storybook
pnpm build-storybook
```

## CI/CD Pipeline

### GitHub Actions Workflow

**File**: `.github/workflows/ci.yml`

```yaml
jobs:
  test:
    steps:
      # 1. Unit Tests
      - name: Run Unit Tests
        run: pnpm test

      # 2. Build
      - name: Build Packages
        run: pnpm build

      # 3. Storybook Build
      - name: Build Storybook
        run: pnpm build-storybook

      # 4. Storybook Tests
      - name: Run Storybook Tests
        run: pnpm test:storybook:ci

      # 5. E2E Visual Tests
      - name: Run E2E Tests
        run: pnpm test:e2e

      # 6. Upload Artifacts
      - name: Upload Test Results
        uses: actions/upload-artifact@v4
```

### Quality Gates

All PRs must pass:
- ✅ TypeScript compilation (no errors)
- ✅ Unit tests (100% pass rate)
- ✅ Storybook tests (all play functions pass)
- ✅ E2E visual tests (no regressions)
- ✅ Linting (oxlint) and formatting (oxfmt)

## Best Practices

### 1. Property Naming

```typescript
// ✅ Good
@property({ type: String, attribute: 'helper-text' })
accessor helperText = '';

// ❌ Bad
@property({ type: String, attribute: 'helper_text' })
accessor helper_text = '';
```

### 2. Event Naming

```typescript
// ✅ Good
this.dispatchEvent(new CustomEvent('ae-input-change', { ... }));

// ❌ Bad (inconsistent prefix)
this.dispatchEvent(new CustomEvent('input-change', { ... }));
this.dispatchEvent(new CustomEvent('change', { ... }));
```

### 3. Size Variants

```typescript
// ✅ Good - always provide sm, md, lg
@property({ type: String, reflect: true })
accessor size: 'sm' | 'md' | 'lg' = 'md';
```

### 4. Reflected Attributes

```typescript
// ✅ Good - reflect for CSS attribute selectors
@property({ type: String, reflect: true })
accessor variant: 'primary' | 'secondary' = 'primary';

// Allows: :host([variant="primary"]) { ... }
```

### 5. Shadow DOM Testing

```typescript
// ✅ Good
const input = component.shadowRoot.querySelector('input');

// ❌ Bad (can't pierce shadow DOM)
const input = canvas.getByRole('textbox');
```

### 6. Event Dispatching

```typescript
// ✅ Good - bubbles and composed for cross-boundary
this.dispatchEvent(new CustomEvent('ae-component-action', {
  detail: { value: this.value },
  bubbles: true,
  composed: true
}));
```

## Performance Considerations

### 1. Virtual Scrolling
Not implemented yet, but recommended for:
- Large lists (>100 items)
- Tables with many rows
- Tree views with deep nesting

### 2. Lazy Loading
Components use dynamic imports where possible:
```typescript
// Good for large dependencies
const { computePosition } = await import('@floating-ui/dom');
```

### 3. Animation Performance
All animations use CSS transforms for GPU acceleration:
```css
/* ✅ Good */
transform: translateY(0);
opacity: 1;

/* ❌ Bad */
top: 0;
opacity: 1;
```

## Accessibility Checklist

- ✅ ARIA roles and attributes
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader announcements
- ✅ Color contrast (WCAG AA)
- ✅ Focus indicators
- ✅ Semantic HTML
- ✅ aria-live regions for dynamic content
- ✅ Reduced motion support

## Future Enhancements

### Planned Features
1. **Virtual scrolling** for large lists
2. **Date/time pickers**
3. **Rich text editor**
4. **Color picker**
5. **File upload** with drag-and-drop
6. **Data grid** with sorting/filtering
7. **Chart components**
8. **Carousel/Slider**

### Infrastructure
1. **Visual regression testing** in CI
2. **Automated accessibility audits** (axe-core)
3. **Bundle size tracking**
4. **Performance budgets**
5. **Component documentation generator**

## Resources

- [Lit Documentation](https://lit.dev)
- [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/)
- [Storybook](https://storybook.js.org)
- [Playwright](https://playwright.dev)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Floating UI](https://floating-ui.com)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

## License

MIT
