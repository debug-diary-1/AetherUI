import { defineConfig } from 'vite';
import dts from 'unplugin-dts/vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'AetherUITokens',
      fileName: 'index',
      formats: ['es'],
    },
    target: 'es2022',
    outDir: 'dist',
    rolldownOptions: {
      external: [],
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDirs: 'dist',
      entryRoot: 'src',
    }),
    // Copy CSS files to dist
    {
      name: 'copy-css-files',
      closeBundle() {
        try {
          mkdirSync(resolve(import.meta.dirname, 'dist'), { recursive: true });
          copyFileSync(
            resolve(import.meta.dirname, 'src/minimal.css'),
            resolve(import.meta.dirname, 'dist/minimal.css'),
          );
          copyFileSync(
            resolve(import.meta.dirname, 'src/light.css'),
            resolve(import.meta.dirname, 'dist/light.css'),
          );
          copyFileSync(
            resolve(import.meta.dirname, 'src/dark.css'),
            resolve(import.meta.dirname, 'dist/dark.css'),
          );
          console.log('✅ CSS theme files copied to dist/');
        } catch (error) {
          console.error('❌ Error copying CSS files:', error);
        }
      },
    },
  ],
  server: {
    port: 3001,
  },
});
