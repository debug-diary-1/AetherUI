import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: [/^lit/, /^@floating-ui/],
      output: {
        preserveModules: true
      }
    },
    target: 'esnext',
    outDir: 'dist'
  },
  plugins: [
    dts({
      entryRoot: 'src',
      outDir: 'dist'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});