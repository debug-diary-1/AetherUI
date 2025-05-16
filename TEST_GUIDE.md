# Testing Guide

This guide explains the testing setup for the Aether UI project, including memory optimizations and Web Component testing.

## Testing Commands

### Root Level Commands

```bash
# Run all tests (API + Web Components)
pnpm test

# Run all tests in parallel (faster but uses more memory)
pnpm test:fast

# Run tests with memory optimization
pnpm test:memory

# Run only changed tests
pnpm test:changed

# Run only API tests
pnpm test:api

# Run only Web Component tests
pnpm test:wc
```

### Package-specific Commands (Core)

```bash
cd packages/core

# Run all tests (API + Web Components)
pnpm test

# Run Web Component tests with Web Test Runner
pnpm test:wc
pnpm test:wc:watch    # Watch mode

# Run API tests with Vitest
pnpm test:api

# Run tests with memory optimization
pnpm test:memory
```

## Testing Architecture

The project uses two different test runners for different types of tests:

### 1. Web Component Testing with Web Test Runner

Web Components are tested using `@open-wc/testing` and Web Test Runner. These tests live in `src/**/__tests__/` directories and test the actual Web Components.

Example structure:
```
src/alert/__tests__/ae-alert.test.ts    # Web Component test
src/toast/__tests__/ae-toast.test.ts    # Web Component test
src/combo/__tests__/ae-combo.test.ts    # Web Component test
```

Web Component test example:
```typescript
import { html, fixture, expect } from '@open-wc/testing';
import '../ae-component.js';
import { AeComponent } from '../ae-component.js';

describe('ae-component', () => {
  it('should render', async () => {
    const el = await fixture<AeComponent>(html`<ae-component></ae-component>`);
    expect(el).to.exist;
  });
});
```

Configuration: `web-test-runner.config.mjs`

### 2. API/Unit Testing with Vitest

Non-Web-Component tests (APIs, utilities, etc.) use Vitest. These tests can be anywhere in the source tree and test logic, not DOM components.

Example structure:
```
src/toast/__tests__/api.test.ts         # API test
src/toast/__tests__/toast-manager.test.ts  # Unit test (mocked)
```

API test example:
```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '../my-module';

describe('myFunction', () => {
  it('should work', () => {
    expect(myFunction()).toBe(true);
  });
});
```

Configuration: `vitest.config.js`

## Test Organization

```
packages/core/src/
├── component/
│   ├── ae-component.ts           # Component implementation
│   ├── __tests__/
│   │   └── ae-component.test.ts  # Web Component test (Web Test Runner)
│   └── api.test.ts              # API test (Vitest)
└── utils/
    ├── utils.ts                 # Utility functions
    └── utils.test.ts            # Unit test (Vitest)
```

## Memory Optimization

The project is configured to handle memory constraints during testing:

- **Sequential Execution**: Tests run sequentially by default to reduce memory usage
- **Memory Limits**: Node.js memory can be limited for specific test runs
- **Process Isolation**: Tests run in isolated processes to prevent memory leaks

Use `pnpm test:memory` for memory-optimized test runs.

## Best Practices

1. **Use the right test runner**:
   - Web Components → Web Test Runner with @open-wc/testing
   - APIs/utilities → Vitest

2. **Test file naming**:
   - Web Component tests: `src/**/__tests__/*.test.ts`
   - API tests: `src/**/__tests__/api.test.ts`
   - Other unit tests: anywhere, ending with `.test.ts`

3. **Memory management**:
   - Run `pnpm test:memory` for memory-intensive test suites
   - Use `pnpm test:fast` only when you have sufficient memory

4. **Development workflow**:
   - Use watch mode: `pnpm test:wc:watch` or `pnpm test:unit:watch`
   - Run changed tests: `pnpm test:changed`
   - Run full suite before committing: `pnpm test`

## Troubleshooting

### Out of Memory Errors

If you encounter memory issues:
1. Use `pnpm test:memory` for memory-optimized runs
2. Run tests for specific packages: `cd packages/core && pnpm test:memory`
3. Set custom memory limits: `NODE_OPTIONS=--max-old-space-size=1024 pnpm test`

### Web Component Test Failures

1. Ensure custom elements are properly registered
2. Check that async operations complete with `await elementUpdated(el)`
3. Verify DOM selectors match actual component structure
4. Use `await fixture()` to create components in tests

### Test Runner Conflicts

If tests are running in the wrong runner:
- Web Component tests should only run with `pnpm test:wc`
- API tests should only run with `pnpm test:api`
- Check file locations and naming conventions

## CI/CD Considerations

In CI environments:
- Use sequential test execution to minimize memory usage
- Set appropriate memory limits based on available resources
- Run different test types in separate jobs for better isolation:
  ```yaml
  - run: pnpm test:api
  - run: pnpm test:wc
  ```