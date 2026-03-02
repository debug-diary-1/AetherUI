#!/usr/bin/env node

const os = require('os');
const { execSync } = require('child_process');

// Check if running in CI environment
const isCI = process.env.CI === 'true' || process.env.CI === '1' ||
             process.env.GITHUB_ACTIONS === 'true' ||
             process.env.VERCEL === '1';

// Check if user explicitly wants to run resource-intensive tests
const forceRun = process.env.FORCE_TEST === 'true' || process.env.FORCE_TEST === '1';

// Get the command being run
const testCommand = process.argv[2] || '';

// Resource-intensive test commands
const intensiveCommands = ['test'];
const isIntensiveCommand = intensiveCommands.some(cmd => testCommand.includes(cmd));

/**
 * Get available memory in bytes.
 * On macOS, os.freemem() only reports truly "free" pages, ignoring
 * inactive/purgeable memory that is immediately reclaimable.
 * We use vm_stat to get a more accurate "available" number.
 */
function getAvailableMemory() {
  if (process.platform === 'darwin') {
    try {
      const vmstat = execSync('vm_stat', { encoding: 'utf8' });
      const pageSize = 16384; // Apple Silicon default
      const pageSizeMatch = vmstat.match(/page size of (\d+) bytes/);
      const actualPageSize = pageSizeMatch ? parseInt(pageSizeMatch[1]) : pageSize;

      const getPages = (label) => {
        const match = vmstat.match(new RegExp(`${label}:\\s+(\\d+)`));
        return match ? parseInt(match[1]) : 0;
      };

      const free = getPages('Pages free');
      const inactive = getPages('Pages inactive');
      const purgeable = getPages('Pages purgeable');

      return (free + inactive + purgeable) * actualPageSize;
    } catch {
      return os.freemem();
    }
  }
  return os.freemem();
}

if (!isCI && !forceRun && isIntensiveCommand) {
  const totalMemoryGB = os.totalmem() / (1024 ** 3);
  const availableMemoryGB = getAvailableMemory() / (1024 ** 3);

  // Only block if truly low — less than 2GB available on a machine with enough total RAM
  const MIN_AVAILABLE_MEMORY_GB = 2;

  console.log('\n⚠️  Resource Check for Test Command');
  console.log('─'.repeat(50));
  console.log(`System Memory: ${totalMemoryGB.toFixed(1)}GB total, ${availableMemoryGB.toFixed(1)}GB available`);

  if (availableMemoryGB < MIN_AVAILABLE_MEMORY_GB) {
    console.warn('\n⚠️  Low memory for parallel test execution.');
    console.warn('   Tests may run slowly or fail.\n');
    console.warn('   Alternatives:');
    console.warn('   • Close other applications to free memory');
    console.warn('   • Run tests for individual packages: pnpm test --filter @aetherui/core');
    console.warn('   • FORCE_TEST=true pnpm test  (skip this check)\n');
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
