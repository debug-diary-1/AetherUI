#!/usr/bin/env node

/**
 * This script runs a build with Turborepo and generates a profile report
 * to help identify bottlenecks in the build process.
 * 
 * Usage:
 *   node scripts/build-profile.js
 * 
 * The profile will be generated in the .turbo/turbo-profile.json file
 * and can be viewed using the Turborepo CLI or uploaded to the web viewer:
 * https://turborepo.org/profiler
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create directory for reports if it doesn't exist
const reportsDir = path.join(__dirname, '..', 'build-reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Generate timestamp for the profile
const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
const profilePath = path.join(reportsDir, `turbo-profile-${timestamp}.json`);

console.log('Running Turborepo build with profiling...');
console.log(`Profile will be saved to: ${profilePath}`);

try {
  // Run the build with profile flag
  execSync(`npx turbo run build --profile="${profilePath}"`, {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });

  console.log('\nBuild completed successfully!');
  console.log(`Profile saved to: ${profilePath}`);
  console.log('You can view the profile at: https://turborepo.org/profiler');
} catch (error) {
  console.error('\nBuild failed:', error.message);
  process.exit(1);
}