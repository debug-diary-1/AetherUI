import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import babel from '@rollup/plugin-babel';

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
      },
      plugins: [
        babel({
          babelHelpers: 'bundled',
          extensions: ['.ts', '.js'],
          presets: [
            ['@babel/preset-typescript', { allowDeclareFields: true }]
          ],
          plugins: [
            ['@babel/plugin-proposal-decorators', { version: '2023-05' }],
            ['@babel/plugin-proposal-class-properties'],
            ['@babel/plugin-transform-class-static-block']
          ],
          exclude: 'node_modules/**'
        })
      ]
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
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  }
});