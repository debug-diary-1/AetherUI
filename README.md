# Aether UI

A headless, framework-agnostic Web Component library built on Lit and distributed under the `@aetherui` npm scope.

## Features

- 🚀 Framework-agnostic Web Components
- 🎨 Design token-driven theming
- ♿️ Built-in accessibility
- 📦 Tree-shakeable components
- 🧪 Comprehensive testing
- 📚 Beautiful documentation

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Packages

- `@aetherui/core` - Core component library
- `@aetherui/tokens` - Design tokens
- `@aetherui/docs` - Documentation site

## Testing

The project uses Vitest for testing and provides several test commands:

```bash
# Run all tests sequentially (default)
pnpm test

# Run tests with memory optimization (for machines with limited RAM)
pnpm test:memory

# Run only API tests (avoids DOM-related tests)
pnpm test:api

# Run web component tests specifically
pnpm test:wc
```

### Memory-Optimized Testing

If you encounter memory issues or terminal crashes during testing, use these commands:

```bash
# Run only API tests (most reliable)
pnpm test:core-api

# Run tests with memory constraints (512MB per package)
pnpm test:memory
```

> **Note:** Currently, Web Component tests that depend on @open-wc/testing may fail due to issues with JSDOM in the test environment. For reliable testing, use the API-focused test commands above.

These commands use several optimizations:
- Limit Node.js memory with `--max-old-space-size=512`
- Run tests sequentially to prevent parallel memory consumption
- Use process isolation for test files
- Disable coverage reports to save memory
- Focus on API tests that don't require full DOM implementation

### Testing Web Components

Web components tests use [@open-wc/testing](https://open-wc.org/docs/testing/testing-package/) for proper shadow DOM testing. When writing tests for components:

1. Import required testing utilities:
   ```ts
   import { html, fixture, expect } from '@open-wc/testing';
   ```

2. Create component fixtures:
   ```ts
   const element = await fixture(html`<ae-button>Click me</ae-button>`);
   ```

3. Test the shadow DOM and component behavior:
   ```ts
   expect(element.shadowRoot.querySelector('button')).to.exist;
   ```

See existing component tests in the repository for examples.

## Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 