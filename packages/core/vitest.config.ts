import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: [
      'src/**/api.test.ts',
      'src/**/toast-manager.test.ts',
      'src/**/*.unit.test.ts',  // Include unit tests
      // Add other non-WC test patterns here
    ],
    exclude: [
      'src/**/__tests__/ae-*.test.ts',  // Exclude Web Component tests
      '**/node_modules/**',
      '**/dist/**'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['**/*.d.ts', '**/test/**', '**/*.test.ts']
    }
  }
});