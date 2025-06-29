#!/usr/bin/env node

const os = require('os');
const { execSync } = require('child_process');

// Check if running in CI environment
const isCI = process.env.CI === 'true' || process.env.CI === '1' || 
             process.env.GITHUB_ACTIONS === 'true' ||
             process.env.VERCEL === '1';

// Get system memory in GB
const totalMemoryGB = os.totalmem() / (1024 * 1024 * 1024);
const freeMemoryGB = os.freemem() / (1024 * 1024 * 1024);

// Check if user explicitly wants to run resource-intensive tests
const forceRun = process.env.FORCE_TEST === 'true' || process.env.FORCE_TEST === '1';

// Memory thresholds
const MIN_TOTAL_MEMORY_GB = 8; // Minimum 8GB total RAM
const MIN_FREE_MEMORY_GB = 4;  // Minimum 4GB free RAM

// Get the command being run
const testCommand = process.argv[2] || '';

// Resource-intensive test commands
const intensiveCommands = [
  'test'
];

// Check if this is a resource-intensive command
const isIntensiveCommand = intensiveCommands.some(cmd => testCommand.includes(cmd));

if (!isCI && !forceRun && isIntensiveCommand) {
  console.log('\n⚠️  Resource Check for Test Command');
  console.log('─'.repeat(50));
  console.log(`System Memory: ${totalMemoryGB.toFixed(1)}GB total, ${freeMemoryGB.toFixed(1)}GB free`);
  
  if (totalMemoryGB < MIN_TOTAL_MEMORY_GB || freeMemoryGB < MIN_FREE_MEMORY_GB) {
    console.error('\n❌ Insufficient memory for parallel test execution!');
    console.error(`   This command may crash your system.`);
    console.error('\n   Recommended alternatives:');
    console.error('   • Run tests for individual packages');
    console.error('   • FORCE_TEST=true pnpm test  (override check)\n');
    process.exit(1);
  }
  
  console.log('✅ Memory check passed\n');
}

// Execute the actual command
try {
  execSync(process.argv.slice(2).join(' '), { stdio: 'inherit' });
} catch (error) {
  process.exit(error.status || 1);
}