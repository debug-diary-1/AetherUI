import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'unplugin-dts/vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rolldownOptions: {
      external: [/^lit/, /^@floating-ui/],
      output: {
        preserveModules: true,
      },
    },
    target: 'es2022',
    outDir: 'dist',
  },
  plugins: [
    dts({
      entryRoot: 'src',
      outDirs: 'dist',
      exclude: ['src/test/**'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
});
