import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.wc.ts'],
    include: [
      'src/**/__tests__/*.test.ts',
      '!src/**/api.test.ts',
      '!src/**/toast-manager.test.ts'
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**'
    ],
    // Run tests sequentially to reduce memory usage
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true
      }
    },
    // Disable coverage to save resources
    coverage: {
      enabled: false
    }
  }
});