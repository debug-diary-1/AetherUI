import { defineConfig } from 'vite';
import dts from 'unplugin-dts/vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'AetherUIAccordion',
      fileName: 'index',
      formats: ['es'],
    },
    target: 'es2022',
    outDir: 'dist',
    rolldownOptions: {
      external: [/^@aetherui-kit\/core/],
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      aliasesExclude: [/^@aetherui-kit\/core/],
    }),
  ],
  server: {
    port: 3002,
  },
});
