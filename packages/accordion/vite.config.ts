import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AetherUIAccordion',
      fileName: 'index',
      formats: ['es'],
    },
    target: 'es2022',
    outDir: 'dist',
    rollupOptions: {
      external: [/^@aetherui\/core/],
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  esbuild: {
    target: 'es2022',
    tsconfigRaw: {
      compilerOptions: {
        useDefineForClassFields: false,
        experimentalDecorators: true,
      },
    },
  },
  server: {
    port: 3002,
  },
});
