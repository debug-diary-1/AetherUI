import { playwrightLauncher } from '@web/test-runner-playwright';

// Custom plugin to handle TypeScript with accessor keyword
const typeScriptPlugin = () => ({
  name: 'typescript-transform',
  async transform(context) {
    if (context.response.is('ts')) {
      const body = context.body;
      
      // Use dynamic import to load TypeScript
      const { default: ts } = await import('typescript');
      
      // Create a TypeScript compiler
      const result = ts.transpileModule(body, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.ESNext,
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          useDefineForClassFields: false,
          // This is key - it handles the accessor keyword properly
          lib: ["ES2022", "DOM", "DOM.Iterable"],
        }
      });
      
      return {
        body: result.outputText,
        headers: {
          'content-type': 'application/javascript',
        },
      };
    }
  },
});

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
        channel: 'chrome',
        executablePath: '/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
      }
    })
  ],
  mimeTypes: {
    '**/*.ts': 'ts',
  },
  plugins: [
    typeScriptPlugin(),
  ],
  testFramework: {
    config: {
      timeout: 10000,
    },
  },
  testsFinishTimeout: 30000,
  testsStartTimeout: 20000,
};