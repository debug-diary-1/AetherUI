import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['@aetherui/core'],
    exclude: ['lit', '@floating-ui/dom'],
  },
  build: {
    commonjsOptions: {
      include: [/@aetherui\/core/],
    },
    rollupOptions: {
      external: [/^@aetherui\/(?!core)/],
    },
  },
}); 