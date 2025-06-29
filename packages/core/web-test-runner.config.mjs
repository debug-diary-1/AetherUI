import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: 'src/**/*.test.ts',
  nodeResolve: true,
  concurrency: 1,
  concurrentBrowsers: 1,
  plugins: [
    esbuildPlugin({ 
      ts: true,
      target: 'ES2022',
      tsconfig: './tsconfig.json'
    }),
  ],
  testRunnerHtml: testFramework => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <script type="module" src="${testFramework}"></script>
      </head>
      <body>
      </body>
    </html>
  `,
  testFramework: {
    config: {
      timeout: 10000,
    },
  },
};