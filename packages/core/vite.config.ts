import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
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
  'treeview'
];

// Create entries object with index and all components
const entries = {
  'index': resolve(__dirname, 'src/index.ts'),
  ...Object.fromEntries(
    components.map(component => [
      `${component}/index`,
      resolve(__dirname, `src/${component}/index.ts`)
    ])
  ),
  ...Object.fromEntries(
    components.map(component => [
      `${component}/define`,
      resolve(__dirname, `src/${component}/define.ts`)
    ])
  )
};

export default defineConfig({
  build: {
    lib: {
      entry: entries,
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [/^lit/],
    },
    target: 'es2019',
    sourcemap: true,
  },
  plugins: [
    dts({
      rollupTypes: true,
      include: ['src/**/*.ts'],
    }),
  ],
}); 