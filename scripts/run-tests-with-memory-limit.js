#!/usr/bin/env node

/**
 * This script runs tests with memory limits for all packages.
 * It deliberately runs tests one at a time to avoid overwhelming system memory.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Memory limit in MB
const MEMORY_LIMIT = 512;

// Get all package directories
const packagesDir = path.join(__dirname, '..', 'packages');
const packages = fs.readdirSync(packagesDir).filter(dir => 
  fs.statSync(path.join(packagesDir, dir)).isDirectory()
);

console.log(`Found ${packages.length} packages to test\n`);

// Run tests for each package sequentially
for (const pkg of packages) {
  const packageDir = path.join(packagesDir, pkg);
  
  // Check if the package has tests
  const srcDir = path.join(packageDir, 'src');
  if (!fs.existsSync(srcDir)) {
    console.log(`Skipping ${pkg} - no src directory`);
    continue;
  }

  try {
    console.log(`\n=== Running tests for ${pkg} with ${MEMORY_LIMIT}MB memory limit ===\n`);
    
    execSync(
      `cd ${packageDir} && NODE_OPTIONS=--max-old-space-size=${MEMORY_LIMIT} npx vitest run --no-workspace`, 
      { 
        stdio: 'inherit',
        env: { ...process.env, NODE_OPTIONS: `--max-old-space-size=${MEMORY_LIMIT}` }
      }
    );
    
    console.log(`\n✅ Tests completed for ${pkg}\n`);
  } catch (error) {
    console.log(`\n❌ Tests failed for ${pkg}\n`);
    // Continue with next package even if this one failed
  }
}

console.log('\n🎉 All packages processed!');