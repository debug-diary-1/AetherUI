import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AetherUITokens',
      fileName: 'index',
      formats: ['es'],
    },
    target: 'es2022',
    outDir: 'dist',
    rollupOptions: {
      external: [],
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
      entryRoot: 'src',
    }),
    // Copy CSS files to dist
    {
      name: 'copy-css-files',
      closeBundle() {
        try {
          mkdirSync(resolve(__dirname, 'dist'), { recursive: true });
          copyFileSync(
            resolve(__dirname, 'src/minimal.css'),
            resolve(__dirname, 'dist/minimal.css'),
          );
          copyFileSync(resolve(__dirname, 'src/light.css'), resolve(__dirname, 'dist/light.css'));
          copyFileSync(resolve(__dirname, 'src/dark.css'), resolve(__dirname, 'dist/dark.css'));
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
