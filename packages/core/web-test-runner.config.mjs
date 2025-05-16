import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: [
    'src/**/__tests__/*.test.ts',
    '!src/**/api.test.ts',
    '!src/**/toast-manager.test.ts'
  ],
  nodeResolve: true,
  plugins: [
    esbuildPlugin({ 
      ts: true,
      target: 'ES2020',
      tsconfig: './tsconfig.wtr.json',
    }),
  ],
  rootDir: '.',
};