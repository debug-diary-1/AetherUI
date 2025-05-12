#!/usr/bin/env node

/**
 * This script provides a simple interface for running Turborepo tasks with
 * various options and filters. It makes it easier to leverage Turborepo's
 * powerful features without remembering all the command-line options.
 * 
 * Usage:
 *   node scripts/turbo-make.js <task> [options]
 * 
 * Tasks:
 *   build       Build packages
 *   dev         Start development servers
 *   test        Run tests
 *   lint        Lint code
 *   clean       Clean build artifacts
 *   storybook   Start Storybook
 *   docs        Start documentation site
 * 
 * Options:
 *   --filter <package>   Only run for specific package(s)
 *   --force              Force execution even if cached
 *   --no-cache           Disable caching
 *   --parallel           Maximum number of parallel tasks (default: auto)
 *   --remote             Use remote cache
 *   --verbose            Increase logging verbosity
 */

const { execSync } = require('child_process');
const path = require('path');

// Parse arguments
const args = process.argv.slice(2);
const task = args[0];

if (!task) {
  showHelp();
  process.exit(1);
}

// Available tasks
const availableTasks = [
  'build', 'dev', 'test', 'lint', 'clean', 'storybook', 'docs', 
  'build-storybook', 'docs:build', 'perf'
];

if (!availableTasks.includes(task)) {
  console.error(`Unknown task: ${task}`);
  showHelp();
  process.exit(1);
}

// Extract options
const filterPackages = args.filter(arg => arg.startsWith('--filter=')).map(arg => arg.split('=')[1]);
const force = args.includes('--force');
const noCache = args.includes('--no-cache');
const remote = args.includes('--remote');
const verbose = args.includes('--verbose');
const parallel = args.find(arg => arg.startsWith('--parallel='))?.split('=')[1];

// Build the Turborepo command
let command = `npx turbo run ${task}`;

// Add filters
if (filterPackages.length > 0) {
  filterPackages.forEach(pkg => {
    command += ` --filter=${pkg}`;
  });
}

// Add other options
if (force) command += ' --force';
if (noCache) command += ' --no-cache';
if (remote) command += ' --remote-only';
if (verbose) command += ' --verbosity=verbose';
if (parallel) command += ` --concurrency=${parallel}`;

console.log(`Running: ${command}`);

try {
  execSync(command, {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
} catch (error) {
  process.exit(1);
}

function showHelp() {
  console.log(`
Turbo Make - Run Turborepo tasks with ease

Usage:
  node scripts/turbo-make.js <task> [options]

Tasks:
  ${availableTasks.join('\n  ')}

Options:
  --filter=<package>   Only run for specific package(s)
  --force              Force execution even if cached
  --no-cache           Disable caching
  --parallel=<number>  Maximum number of parallel tasks
  --remote             Use remote cache
  --verbose            Increase logging verbosity

Examples:
  # Build everything
  node scripts/turbo-make.js build

  # Build only the core package
  node scripts/turbo-make.js build --filter=@aetherui/core

  # Force rebuild docs package
  node scripts/turbo-make.js build --filter=@aetherui/docs --force

  # Run tests with remote cache
  node scripts/turbo-make.js test --remote
  `);
}