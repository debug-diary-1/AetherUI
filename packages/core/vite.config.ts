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
      component,
      resolve(__dirname, `src/${component}/index.ts`)
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
      external: [/^lit/, '@floating-ui/dom'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
    target: 'es2022',
    sourcemap: true,
  },
  plugins: [
    dts({
      rollupTypes: true,
      include: ['src/**/*.ts'],
      entryRoot: 'src',
    }),
  ],
  esbuild: {
    target: 'es2022',
    tsconfigRaw: {
      compilerOptions: {
        useDefineForClassFields: false,
        experimentalDecorators: true,
      },
    },
  },
}); 