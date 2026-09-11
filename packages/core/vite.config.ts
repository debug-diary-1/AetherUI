import { defineConfig } from 'vite';
import dts from 'unplugin-dts/vite';
import { resolve } from 'path';

// Define component entries
const components = [
  'accordion',
  'alert',
  'button',
  'checkbox',
  'dropdown',
  'modal',
  'radio',
  'tabs',
  'treeview',
  'toast',
  'combo',
  'autocomplete',
];

// Create entries object with index and components
// Use Record<string, string> type to allow dynamic keys
const entries: Record<string, string> = {
  index: resolve(import.meta.dirname, 'src/index.ts'),
};

// Add individual component entries
components.forEach((component) => {
  entries[`${component}/index`] = resolve(import.meta.dirname, `src/${component}/index.ts`);
});

export default defineConfig({
  build: {
    lib: {
      entry: entries,
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rolldownOptions: {
      external: [/^lit/, '@floating-ui/dom'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    target: 'es2022',
    sourcemap: true,
  },
  plugins: [
    dts({
      include: ['src/**/*.ts'],
      entryRoot: 'src',
    }),
  ],
});
