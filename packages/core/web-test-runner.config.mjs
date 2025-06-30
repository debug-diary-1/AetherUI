import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: 'src/**/*.test.ts',
  nodeResolve: true,
  concurrency: 1,
  concurrentBrowsers: 1,
  browsers: [
    playwrightLauncher({ 
      product: 'chromium',
      launchOptions: {
        headless: true,
      }
    })
  ],
  plugins: [
    esbuildPlugin({ 
      ts: true,
      target: 'ES2022',
      tsconfig: './tsconfig.json'
    }),
  ],
  testFramework: {
    config: {
      timeout: 10000,
    },
  },
  testsFinishTimeout: 30000,
  testsStartTimeout: 20000,
};