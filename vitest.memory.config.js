import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

// Don't use workspace config
process.env.VITEST_WORKSPACE = 'false';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.dom-setup.js'],
    include: [
      'packages/**/src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'packages/**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**'
    ],
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        '**/*.test.ts'
      ]
    },
    watch: false,
    reporters: ['default'],
    testTimeout: 10000,
    passWithNoTests: true,
    // Memory optimizations
    pool: 'forks', // Use process isolation instead of worker threads
    poolOptions: {
      forks: {
        isolate: true,
        singleFork: false
      }
    },
    maxConcurrency: 2, // Limit concurrent test runs
    maxWorkers: 2, // Limit worker processes
    minWorkers: 1,
    fileParallelism: false, // Run files sequentially
    // Silent to reduce console output memory usage
    silent: true,
    // Isolate each test to prevent memory leaks between tests
    isolate: true,
    // Set a reasonable timeout to prevent hanging tests
    teardownTimeout: 5000
  },
  resolve: {
    alias: {
      '@aetherui/core': resolve(__dirname, 'packages/core/src')
    }
  }
});