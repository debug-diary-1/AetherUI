import { defineConfig } from 'vitest/config';

// Get memory optimization settings from environment
// NODE_OPTIONS with memory limit indicates we want memory optimization
const IS_MEMORY_OPTIMIZED = process.env.MEMORY_OPTIMIZED === 'true' || 
  (process.env.NODE_OPTIONS && process.env.NODE_OPTIONS.includes('--max-old-space-size='));
const maxWorkers = process.env.MAX_WORKERS ? parseInt(process.env.MAX_WORKERS, 10) : 2;
const maxConcurrency = process.env.MAX_CONCURRENCY ? parseInt(process.env.MAX_CONCURRENCY, 10) : 2;

console.log(`Running tests with memory optimization: ${IS_MEMORY_OPTIMIZED ? 'ENABLED' : 'DISABLED'}`);
if (IS_MEMORY_OPTIMIZED) {
  console.log(`Workers: ${maxWorkers}, Concurrency: ${maxConcurrency}`);
}

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [
      './test-setup.js',
    ],
    environmentOptions: {
      jsdom: {
        // Optimize JSDOM for faster testing and lower memory usage
        pretendToBeVisual: true,
        resources: 'usable', // Load resources but don't execute them
        features: {
          FetchExternalResources: false, // Don't fetch external resources to save memory
          ProcessExternalResources: false, // Don't process external resources
        }
      }
    },
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      // Exclude Web Component tests (these run with Web Test Runner)
      'src/alert/__tests__/*.test.ts',
      'src/combo/__tests__/*.test.ts',
      'src/toast/__tests__/ae-toast*.test.ts',
      'src/treeview/__tests__/*.test.ts'
    ],
    reporters: IS_MEMORY_OPTIMIZED ? ['basic'] : ['verbose'], // Use basic reporter in memory-optimized mode
    passWithNoTests: true,
    
    // Apply memory optimizations conditionally
    ...(IS_MEMORY_OPTIMIZED ? {
      // Memory optimizations
      pool: 'forks', // Use process isolation instead of worker threads
      poolOptions: {
        forks: {
          isolate: true,
          singleFork: false
        }
      },
      maxConcurrency, // Limit concurrent test runs
      maxWorkers, // Limit worker processes
      minWorkers: 1,
      fileParallelism: false, // Run files sequentially
      testTimeout: 30000, // Longer timeout for slower memory-constrained execution
      teardownTimeout: 5000,
      // Don't generate coverage reports in memory-constrained mode
      coverage: {
        enabled: false
      }
    } : {
      coverage: {
        reporter: ['text', 'html'],
        exclude: [
          'node_modules/',
          'dist/',
          '**/*.d.ts',
          '**/*.test.ts'
        ]
      },
    })
  }
});