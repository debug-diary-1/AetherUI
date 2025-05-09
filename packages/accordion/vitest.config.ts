import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    testTransformMode: {
      web: ['.[jt]sx?'],
    },
  },
  esbuild: {
    target: 'es2022',
    tsconfigRaw: {
      compilerOptions: {
        useDefineForClassFields: false,
        experimentalDecorators: true,
      },
    },
  },
});