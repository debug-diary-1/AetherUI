import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./packages/tokens/vite.config.ts",
  "./packages/adapters/vite.config.ts",
  "./packages/accordion/vite.config.ts",
  "./packages/core/vite.config.ts",
  "./packages/core/vite.lib.config.ts"
])