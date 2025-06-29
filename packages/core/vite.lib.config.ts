import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'AeButton', // change per package
      fileName: 'index',
      formats: ['es']
    },
    target: 'es2022',
    outDir: 'dist',
    rollupOptions: {
      external: [/^lit/]
    }
  },
  plugins: [dts({ entryRoot: 'src' })]
}); 