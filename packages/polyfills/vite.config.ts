import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        constructable: resolve(__dirname, 'src/constructable.ts'),
        'focus-visible': resolve(__dirname, 'src/focus-visible.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [],
    },
    outDir: 'dist'
  },
  plugins: [
    dts({
      entryRoot: 'src',
      outDir: 'dist'
    })
  ],
}); 