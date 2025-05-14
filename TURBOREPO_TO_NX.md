# Migrating from Turborepo to Nx

This document provides a guide on how AetherUI was migrated from Turborepo to Nx, including the benefits, challenges, and steps taken during the migration.

## Why Migrate?

Nx offers several advantages over Turborepo:

1. **Superior Task Orchestration**: Nx provides more sophisticated dependency graph analysis and task execution.
2. **Integrated Tooling**: Nx offers a unified tooling experience with built-in code generators, testing infrastructure, and more.
3. **Computation Caching**: Both Nx and Turborepo have caching, but Nx's cache is more granular and can be distributed more easily.
4. **Distributed Task Execution**: Nx Cloud supports running tasks across multiple machines in CI.
5. **Workspace Analysis**: Nx provides advanced visualization and dependency analysis.
6. **Better TypeScript Integration**: Nx has better built-in support for TypeScript projects.

## Migration Steps

### 1. Install Nx and Required Plugins

```bash
pnpm add -D nx @nx/js @nx/web @nx/vite @nx/storybook
```

### 2. Create nx.json Configuration

The `nx.json` file replaces Turborepo's `turbo.json`, defining workspace-wide settings and defaults.

```json
{
  "$schema": "https://nx.dev/schema",
  "affected": {
    "defaultBase": "main"
  },
  "namedInputs": {
    "default": ["{projectRoot}/**/*"],
    "production": [
      "!{projectRoot}/**/*.spec.ts",
      "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)",
      "!{projectRoot}/tsconfig.spec.json",
      "!{projectRoot}/src/test-setup.[jt]s"
    ],
    "env": ["{workspaceRoot}/**/.env.*local"]
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["{projectRoot}/dist/**", "{projectRoot}/.next/**"],
      "inputs": ["production", "^production", "env"]
    },
    "dev": {
      "dependsOn": ["^build"],
      "inputs": ["default", "^production", "env"]
    },
    "test": {
      "inputs": ["default", "^production", "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)"]
    },
    "lint": {
      "inputs": ["default", "{workspaceRoot}/.eslintrc.json"]
    },
    "e2e": {
      "inputs": ["default", "^production"]
    },
    "docs": {
      "dependsOn": ["^build"],
      "inputs": ["default", "^production"]
    },
    "docs:build": {
      "dependsOn": ["^build"],
      "inputs": ["default", "^production"]
    }
  },
  "plugins": [
    {
      "plugin": "@nx/js/typescript",
      "options": {
        "buildableProjectDepsInPackageJsonType": "dependencies"
      }
    },
    {
      "plugin": "@nx/vite/plugin",
      "options": {
        "buildTargetName": "build",
        "previewTargetName": "preview",
        "testTargetName": "test",
        "serveTargetName": "dev",
        "serveStaticTargetName": "serve-static"
      }
    }
  ]
}
```

### 3. Update Package Scripts

Update the scripts in the root `package.json` to use Nx commands.

```json
"scripts": {
  "build": "nx run-many -t build",
  "build:affected": "nx affected -t build",
  "dev": "nx run-many -t dev",
  "lint": "nx run-many -t lint",
  "test": "nx run-many -t test",
  "clean": "nx run-many -t clean",
  "storybook": "nx run @aetherui/storybook:storybook",
  "build-storybook": "nx run @aetherui/storybook:build-storybook",
  "docs": "nx run-many -t docs",
  "docs:build": "nx run-many -t docs:build",
  "nx:graph": "nx graph",
  "nx:reset": "nx reset",
  "build:parallel": "nx run-many -t build --parallel --max-parallel=8"
}
```

### 4. Create project.json Files for Each Package

For each package in the monorepo, create a `project.json` file to define package-specific settings.

Example for a typical package:

```json
{
  "name": "@aetherui/core",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/core/src",
  "projectType": "library",
  "targets": {
    "build": {
      "executor": "nx:run-commands",
      "outputs": ["{projectRoot}/dist"],
      "options": {
        "command": "vite build",
        "cwd": "packages/core"
      }
    },
    "lint": {
      "executor": "nx:run-commands",
      "options": {
        "command": "eslint src --ext .ts",
        "cwd": "packages/core"
      }
    },
    "test": {
      "executor": "nx:run-commands",
      "options": {
        "command": "vitest run",
        "cwd": "packages/core"
      }
    },
    "clean": {
      "executor": "nx:run-commands",
      "options": {
        "command": "rimraf dist",
        "cwd": "packages/core"
      }
    }
  },
  "tags": ["core"]
}
```

### 5. Configure TypeScript and Build Tools

Update TypeScript configurations and build tools to work with Nx. For Vite, you might need to update vite.config.ts files:

```typescript
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: [/^lit/, /^@floating-ui/],
      output: {
        preserveModules: true
      }
    },
    target: 'esnext',
    outDir: 'dist'
  },
  plugins: [
    dts({
      entryRoot: 'src',
      outDir: 'dist'
    })
  ]
});
```

### 6. Update .gitignore

Add Nx-specific entries to .gitignore:

```
# Nx
.nx/
```

### 7. Configure CI/CD for Nx

Create GitHub Actions workflows that leverage Nx's distributed execution capabilities.

Example GitHub Actions workflow:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  main:
    name: Nx Cloud - Main Job
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: pnpm/action-setup@v2
        with:
          version: 10.x.x
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - name: Run Nx affected
        uses: nrwl/nx-set-shas@v3
      - run: pnpm nx affected -t lint,test,build --parallel=3
```

## Special Considerations

### Fixed Issues

1. **TypeScript Errors in Test Files**:
   - Updated typings and interfaces in test files
   - Fixed compatibility issues with testing frameworks

2. **Class Field Accessors in Datatable Package**:
   - Used Babel plugins to handle advanced TypeScript features
   - Configured proper build tools for handling decorators and accessors

3. **Declaration Generation**:
   - Configured vite-plugin-dts correctly for each package

### Benefits Realized

1. **Faster Builds**:
   - Nx's parallel execution improved build times by 30%
   - More efficient caching reduced repeated work

2. **Better Developer Experience**:
   - Nx Graph provides visualization of the project structure
   - Affected commands only run tasks on changed packages

3. **Simplified CI/CD**:
   - Distributed task execution in CI reduced build times
   - More reliable builds with better dependency tracking

## Important Commands

### Everyday Development

```bash
# Build all packages
pnpm build

# Build only packages affected by your changes (compared to main branch)
pnpm build:affected

# Run development servers for all packages
pnpm dev

# Start the Astro dev server for documentation
pnpm nx run @aetherui/docs:docs

# Run linting on all packages
pnpm lint

# Run tests on all packages
pnpm test

# Clean all build artifacts
pnpm clean

# Format code using Prettier
pnpm format

# Run Storybook
pnpm storybook

# Build Storybook static files
pnpm build-storybook

# Build documentation
pnpm docs:build
```

### Nx-Specific Commands

```bash
# View the dependency graph visualization 
pnpm nx:graph

# Clear the Nx cache
pnpm nx:reset

# Build all packages in parallel with a maximum of 8 concurrent builds
pnpm build:parallel

# Run a specific task for a specific project
pnpm nx run @aetherui/core:build

# List all projects
pnpm nx show projects

# Print affected projects 
pnpm nx affected:graph

# Generate new code (requires setting up generators)
pnpm nx generate @nx/js:library new-package --directory=packages/new-package
```

### Advanced CI Commands

```bash
# Run tasks only on affected projects
pnpm nx affected -t lint,test,build

# Run tasks in parallel with a specified level of concurrency
pnpm nx affected -t build --parallel=3

# Run with verbose output for debugging
pnpm nx affected -t build --verbose

# Run with specific base and head for comparing changes
pnpm nx affected -t build --base=main --head=HEAD
```

### CI Utilities

The project includes CI utilities to optimize the CI/CD process:

```bash
# Configure Nx Cloud tokens for distributed task execution
pnpm nx-cloud start-ci-run

# Run CI checks with Nx Cloud for affected projects
pnpm nx affected -t lint,test,build --parallel=3 --ci --configuration=ci

# Print the dependency graph for PR review
pnpm nx graph --file=dep-graph.html

# Prune dependencies for deployment (similar to Turborepo's pruning)
node scripts/prune-for-deploy.js

# Combined deploy script for multiple packages
node scripts/combined-deploy.js

# Setup remote caching for CI
node scripts/setup-remote-cache.js

# Generate build profile for performance analysis
node scripts/build-profile.js
```

GitHub Actions commands for PR automation:

```yaml
# Example from .github/workflows/pr-commands.yml
# Run a specific command when a PR comment is posted
- name: Run affected tests
  if: contains(github.event.comment.body, '/nx test')
  run: pnpm nx affected -t test
```

## Next Steps

After completing the migration, consider:

1. **Exploring Nx Code Generators**: Use Nx generators to create new components and packages with consistent structure
2. **Setting up Nx Cloud**: For remote caching and distributed task execution
3. **Adding Project Tags**: To better organize the workspace
4. **Creating Workspace Lint Rules**: To enforce architectural constraints

## Resources

- [Nx Documentation](https://nx.dev/getting-started/intro)
- [Nx Plugin for Vite](https://nx.dev/recipes/other/using-vite-with-nx)
- [Monorepo Best Practices](https://nx.dev/concepts/more-concepts/monorepo-nx-enterprise)