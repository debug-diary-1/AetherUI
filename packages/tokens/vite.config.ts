import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AetherUITokens',
      fileName: 'index',
      formats: ['es']
    },
    target: 'es2019',
    outDir: 'dist',
    rollupOptions: {
      external: []
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
      entryRoot: 'src'
    })
  ],
  server: {
    port: 3001
  }
}); 