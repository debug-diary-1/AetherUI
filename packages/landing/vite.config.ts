import { defineConfig } from 'vite';

// The landing page is served from the site root on both GitHub Pages
// (/AetherUI/) and Vercel (/). Assets are emitted with relative paths so the
// same build works under either prefix.
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // The demo bundle only registers a handful of components; keep it in one
    // file so the page makes a single request.
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
