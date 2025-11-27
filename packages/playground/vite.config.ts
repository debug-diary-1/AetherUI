import { defineConfig } from 'vite';

export default defineConfig({
  base: '/playground/',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3001,
  },
});
