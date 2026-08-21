import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: 'test/**/*.test.ts',
  port: 8001,
  nodeResolve: true,
  browsers: [
    playwrightLauncher({
      product: 'chromium',
      launchOptions: { headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] },
    }),
  ],
  plugins: [
    esbuildPlugin({
      ts: true,
      tsconfig: './tsconfig.json',
    }),
  ],
};
