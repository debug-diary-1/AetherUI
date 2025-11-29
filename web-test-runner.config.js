import { playwrightLauncher } from '@web/test-runner-playwright';
import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: ['packages/**/src/**/*.test.ts', 'packages/**/__tests__/**/*.test.ts'],
  nodeResolve: true,
  browsers: [
    playwrightLauncher({
      product: 'chromium',
      launchOptions: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      }
    }),
  ],
  plugins: [
    esbuildPlugin({ ts: true }),
  ]
};