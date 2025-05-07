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
      external: ['lit', 'lit/decorators.js'],
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  server: {
    port: 3002,
  },
  esbuild: {
    target: 'es2022',
  },
});
