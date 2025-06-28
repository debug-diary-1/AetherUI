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
    target: 'es2022',
    outDir: 'dist'
  },
  esbuild: {
    target: 'es2022',
    supported: {
      decorators: true
    }
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
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  },
  test: {
    passWithNoTests: true
  }
});