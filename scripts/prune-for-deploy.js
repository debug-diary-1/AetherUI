#!/usr/bin/env node

/**
 * This script uses Turborepo's prune command to create a subset of the monorepo
 * for deployment, containing only the packages needed for a specific target.
 * 
 * Usage:
 *   node scripts/prune-for-deploy.js <target-package> [--output-dir=<dir>]
 * 
 * Example:
 *   node scripts/prune-for-deploy.js @aetherui/docs --output-dir=deploy
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Parse arguments
const args = process.argv.slice(2);
const targetPackage = args[0];
const outputDir = args.find(arg => arg.startsWith('--output-dir='))?.split('=')[1] || 'pruned';

if (!targetPackage) {
  console.error('Error: Target package not specified');
  console.log('Usage: node scripts/prune-for-deploy.js <target-package> [--output-dir=<dir>]');
  console.log('Example: node scripts/prune-for-deploy.js @aetherui/docs --output-dir=deploy');
  process.exit(1);
}

const fullOutputPath = path.join(process.cwd(), outputDir);

console.log(`Pruning monorepo for deployment of ${targetPackage}...`);
console.log(`Output directory: ${fullOutputPath}`);

try {
  // Clean output directory if it exists
  if (fs.existsSync(fullOutputPath)) {
    console.log(`Cleaning existing output directory: ${fullOutputPath}`);
    fs.rmSync(fullOutputPath, { recursive: true, force: true });
  }

  // Run the turbo prune command
  console.log(`Running turbo prune for ${targetPackage}...`);
  execSync(`npx turbo prune ${targetPackage} --out-dir=${outputDir}`, {
    stdio: 'inherit'
  });

  // Output summary
  console.log('\n✅ Monorepo pruned successfully!');
  console.log(`\nThe pruned repo is available at: ${fullOutputPath}`);
  console.log('\nIt contains:');
  console.log(` - ${fullOutputPath}/json/`);
  console.log(`   Modified package.json files that only reference pruned packages`);
  console.log(` - ${fullOutputPath}/full/`);
  console.log(`   The entire source code of all pruned packages`);
  
  console.log('\nNext steps:');
  console.log(` 1. cd ${outputDir}/json && pnpm install`);
  console.log(` 2. cd ${outputDir}/full && pnpm run build`);
  console.log(` 3. Deploy the built content in ${outputDir}/full/packages/${targetPackage.replace('@aetherui/', '')}/dist`);
} catch (error) {
  console.error('\n❌ Error pruning monorepo:', error.message);
  process.exit(1);
}