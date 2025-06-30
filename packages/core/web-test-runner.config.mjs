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
    {
      name: 'transform-accessor-decorators',
      async transform(context) {
        if (context.path.endsWith('.ts') && context.body.includes('accessor')) {
          // Replace accessor keyword before decorators
          let transformed = context.body.replace(
            /@property\((.*?)\)\s*accessor\s+(\w+)/g,
            '@property($1)\n  $2'
          );
          
          // Also handle cases without decorator params
          transformed = transformed.replace(
            /@property\s*accessor\s+(\w+)/g,
            '@property\n  $1'
          );
          
          return { body: transformed };
        }
      }
    },
    esbuildPlugin({ 
      ts: true,
      target: 'ES2022',
      tsconfig: './tsconfig.json',
      loader: 'ts',
      tsconfigRaw: {
        compilerOptions: {
          target: 'ES2022',
          useDefineForClassFields: false,
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
        }
      },
      define: {
        'process.env.NODE_ENV': '"test"'
      }
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