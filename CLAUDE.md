# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AetherUI is a headless, framework-agnostic Web Component library built with Lit. Components are distributed under the `@aetherui` npm scope and work with React, Vue, Angular, Svelte, or vanilla HTML.

**Key Goals:**
- Release v1.0.0 of core package within 12 weeks
- Achieve axe-core 100 accessibility score for every component  
- Keep core bundle ≤ 15KB (gzip)
- CI pipeline duration ≤ 5 min

## Key Commands

### Development
- `pnpm dev` - Run development server for all packages
- `pnpm build` - Build all packages using nx
- `pnpm build:affected` - Build only affected packages

### Testing
- `pnpm test` - Run all tests sequentially
- `pnpm test:memory` - Run tests with 512MB memory limit (use for constrained environments)
- `pnpm test:api` - Run only API tests (most reliable, avoids DOM issues)
- `pnpm test:changed` - Run tests for changed files only

### Code Quality
- `pnpm lint` - Run ESLint on all packages
- `pnpm format` - Format all .ts, .tsx, and .md files with Prettier

### Documentation
- `pnpm docs:dev` - Run documentation dev server
- `pnpm docs:build` - Build documentation for production

## Architecture Patterns

### Repository Structure
```
repo-root/
├─ packages/
│  ├─ core/              # grouped build of all components
│  ├─ button/            # per-component dist (optional add-on)
│  ├─ tokens/            # Style Dictionary → CSS vars
│  ├─ utils/             # shared Lit controllers
│  └─ docs/              # Astro + Starlight site
└─ turbo.json            # pipeline (build, test, docs)
```

### Component Structure
Each component follows this pattern:
```
packages/core/src/components/[component]/
├── ae-[component].ts      # Main component extending LitElement
├── styles.ts              # CSS using lit's css template literal
├── index.ts               # Exports component, styles, and define function
└── [component].test.ts    # Tests
```

### Key Conventions

1. **Component Registration**: Each component has a `defineAe[Component]()` function. Use `defineAll()` to register all components.

2. **Event Naming**: `ae-[component]-[action]` (e.g., `ae-button-click`)

3. **CSS Custom Properties**: `--ae-[component]-[property]-[variant?]` (e.g., `--ae-button-bg-primary`)

4. **Property Decorators**: Use `@property()` with type and reflect options. Use `accessor` keyword for modern syntax.

5. **Controllers**: Complex components use Lit's ReactiveController for state management (see AutocompleteController).

### Component Spec Template
| Field            | Value (example: **ae-accordion**)                                      |
| ---------------- | ---------------------------------------------------------------------- |
| **Tag**          | `ae-accordion`                                                         |
| **Props**        | `open:boolean`, `disabled`, `defaultOpen`, `expandIcon:TemplateResult` |
| **Events**       | `ae-toggle` detail `{ open }`                                          |
| **Slots**        | `header` (required), default `body`                                    |
| **Shadow Parts** | `header`, `panel`                                                      |
| **Tokens**       | `--ae-accordion-border`, `--ae-accordion-duration`                     |
| **A11y**         | APG Disclosure pattern                                                 |

## Naming Conventions (from STANDARDS.md)

### Component Naming
- **Element Tags**: `ae-` prefix (e.g., `<ae-button>`, `<ae-accordion>`)
- **Component Classes**: PascalCase (e.g., `AeButton`, `AeAccordion`)
- **Factory Functions**: `defineAe{ComponentName}()` (e.g., `defineAeButton()`)
- **Type Exports**: `{ComponentClass}Element` suffix (e.g., `AeButtonElement`)

### Event Naming
- **Format**: `ae-{component}-{action}` (e.g., `ae-button-click`)
- **Sub-components**: `ae-{component}-{subcomponent}-{action}`
- **Event Configuration**: Always include `bubbles: true, composed: true`
- **Event Detail**: Include relevant property/state that changed

### Property Naming
- **Selection**: `value`, `defaultValue`, `open`, `selected`
- **State**: `disabled`, `loading`, `error`
- **Appearance**: `size` (sm/md/lg), `variant`, `position`

### CSS Custom Properties
- **Format**: `--ae-{component}-{property}-{variant?}`
- **Common**: padding, bg, fg, border, size, transition

### Slots & Parts
- **Common Slots**: default, `icon`, `prefix`, `suffix`, `header`, `description`
- **Base Parts**: `base`, `content`, `icon`, `label`

## Documentation Standards

All components must use JSDoc comments with:
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

## Testing Strategy

The project uses dual testing approach:

### 1. Web Component Testing (Web Test Runner)
- Tests in `src/**/__tests__/` directories
- Uses `@open-wc/testing` for shadow DOM testing
- Example:
  ```typescript
  import { html, fixture, expect } from '@open-wc/testing';
  import '../ae-component.js';
  
  describe('ae-component', () => {
    it('should render', async () => {
      const el = await fixture(html`<ae-component></ae-component>`);
      expect(el).to.exist;
    });
  });
  ```

### 2. API/Unit Testing (Vitest)
- Tests for non-Web-Component code
- Can be anywhere, ending with `.test.ts`
- Example:
  ```typescript
  import { describe, it, expect } from 'vitest';
  import { myFunction } from '../my-module';
  
  describe('myFunction', () => {
    it('should work', () => {
      expect(myFunction()).toBe(true);
    });
  });
  ```

### Memory Optimization
- Use `pnpm test:memory` for constrained environments
- Tests run sequentially with 512MB memory limit
- Process isolation prevents memory leaks

## Build System

- **Monorepo**: Nx for orchestration
- **Bundler**: Vite with ES/CJS outputs
- **TypeScript**: ES2022 target with decorators
- **Package Manager**: pnpm 10.10.0
- **Node**: >= 20.19.0


## Framework Adapters

Adapters are simple wrappers in `packages/adapters/src/[framework]/` that:
- Import and define the web component
- Forward refs and props
- Handle framework-specific requirements

| Framework | Package | Approach |
|-----------|---------|----------|
| React | `@aetherui/react` | Wrap with `forwardRef`, use `reactify` util |
| Angular | `@aetherui/angular` | CUSTOM_ELEMENTS_SCHEMA module |
| Vue 3 | `@aetherui/vue` | Global plugin or defineAsyncComponent |
| Svelte | `@aetherui/svelte` | .svelte wrappers with props forwarding |

## Design Tokens

Located in `packages/tokens/src/index.ts`. Categories:
- **Colors**: `--ae-color-{palette}-{shade}`
- **Spacing**: `--ae-spacing-{size}`
- **Typography**: font sizes, weights, line heights
- **Border Radius**: corner radii
- **Shadows**: elevation shadows
- **Transitions**: animation timings

### Theming
```css
/* Light theme */
:root[data-theme="light"] { --ae-color-bg: #fff; }
/* Dark theme */
:root[data-theme="dark"] { --ae-color-bg: #000; }
```

## Performance Requirements

- **Bundle Size**: ≤ 15KB per component (gzip)
- **First Interaction**: ≤ 50ms
- **CI Time**: ≤ 5 min with Vercel Remote Cache
- **Browser Support**: Chrome, Edge, Safari 15+, Firefox ESR

## Accessibility Standards

- All components must implement appropriate ARIA roles, states, and properties
- Interactive elements must be keyboard accessible
- Components should follow WAI-ARIA 1.2 patterns
- Focus management must be properly implemented
- Zero critical axe-core violations

## Current Implementation Status

See ROADMAP.md for detailed implementation phases:
- **Phase 1**: Critical Functionality (Core components, A11y, API standardization)
- **Phase 2**: Developer Experience (Framework adapters, Docs, Build optimization)
- **Phase 3**: Production Readiness (Release management, Visual polish, QA)
- **Phase 4**: Advanced Features (Additional components, Performance, Enterprise)

## Important Notes

- Always follow existing component patterns when creating new components
- Components must be tree-shakeable (check bundle size ≤15KB target)
- All components must be WAI-ARIA compliant with keyboard navigation
- Use shadow DOM with ::part API for styling
- Check STANDARDS.md for naming conventions and API design
- Memory optimization is critical - use appropriate test commands