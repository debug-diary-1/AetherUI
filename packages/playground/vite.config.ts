import { defineConfig } from 'vite';

export default defineConfig({
  base: '/playground/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          prism: ['prismjs'],
        },
      },
    },
  },
  server: {
    port: 3001,
  },
});
