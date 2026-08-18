import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

// Get memory limit from environment variable or use a default
const memoryLimited = process.env.MEMORY_OPTIMIZED === 'true';
const maxConcurrency = process.env.MAX_CONCURRENCY ? parseInt(process.env.MAX_CONCURRENCY, 10) : 2;
const maxWorkers = process.env.MAX_WORKERS ? parseInt(process.env.MAX_WORKERS, 10) : 2;

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.dom-setup.js'],
    include: [
      'packages/**/src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'packages/**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    exclude: ['**/node_modules/**', '**/dist/**', '**/build/**'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'dist/', '**/*.d.ts', '**/*.test.ts'],
    },
    watch: false,
    reporters: ['default'],
    testTimeout: 10000,
    passWithNoTests: false,

    // Apply memory optimization settings conditionally
    ...(memoryLimited
      ? {
          // Memory optimizations
          pool: 'forks', // Use process isolation instead of worker threads
          poolOptions: {
            forks: {
              isolate: true,
              singleFork: false,
            },
          },
          maxConcurrency, // Limit concurrent test runs
          maxWorkers, // Limit worker processes
          minWorkers: 1,
          fileParallelism: false, // Run files sequentially
          // Silent reduces console output memory usage
          silent: false,
          // Set a reasonable timeout to prevent hanging tests
          teardownTimeout: 5000,
        }
      : {}),
  },
  resolve: {
    alias: {
      '@aetherui/core': resolve(__dirname, 'packages/core/src'),
    },
  },
});
