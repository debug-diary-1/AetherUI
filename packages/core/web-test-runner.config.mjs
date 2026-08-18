import { playwrightLauncher } from '@web/test-runner-playwright';

const crossBrowser = process.env.CROSS_BROWSER === 'true';
const coverage = process.env.COVERAGE === 'true';
const products = crossBrowser ? ['chromium', 'firefox', 'webkit'] : ['chromium'];

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
          lib: ['ES2022', 'DOM', 'DOM.Iterable'],
        },
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
  browsers: products.map((product) =>
    playwrightLauncher({
      product,
      launchOptions: {
        headless: true,
        ...(product === 'chromium'
          ? {
              args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
              ],
            }
          : {}),
      },
    }),
  ),
  coverage,
  coverageConfig: {
    include: ['src/**/*.ts'],
    exclude: ['src/**/*.test.ts', 'src/**/__tests__/**', 'src/**/styles.ts', 'src/test-utils/**'],
    threshold: {
      statements: 80,
      branches: 65,
      functions: 70,
      lines: 80,
    },
    report: true,
    reportDir: 'coverage',
    reporters: ['lcov', 'text-summary'],
  },
  mimeTypes: {
    '**/*.ts': 'ts',
  },
  plugins: [typeScriptPlugin()],
  testFramework: {
    config: {
      timeout: 10000,
    },
  },
  testsFinishTimeout: 30000,
  testsStartTimeout: 20000,
};
