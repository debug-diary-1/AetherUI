import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        react: resolve(__dirname, 'src/react/index.ts'),
        angular: resolve(__dirname, 'src/angular/index.ts'),
        vue: resolve(__dirname, 'src/vue/index.ts'),
        svelte: resolve(__dirname, 'src/svelte/index.ts')
      },
      formats: ['es']
    },
    target: 'es2019',
    outDir: 'dist',
    rollupOptions: {
      external: [/^lit/, /^react/, /^@angular/, /^vue/, /^svelte/]
    }
  },
  plugins: [
    dts({
      entryRoot: 'src',
      include: ['src/**/*.ts', 'src/**/*.tsx']
    })
  ],
  server: {
    port: 3003
  },
  test: {
    passWithNoTests: true
  }
});