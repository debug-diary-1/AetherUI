#!/usr/bin/env node

/**
 * This script optimizes the deployment process for docs and storybook
 * by determining which packages need to be built based on changes.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Determine if we need to build docs, storybook, or both
function determineChanges() {
  try {
    // If running in CI, get the list of changed files between the last two commits
    // Otherwise, just build everything
    if (process.env.CI) {
      // Get changed files
      const changedFiles = execSync('git diff --name-only HEAD HEAD~1')
        .toString()
        .split('\n')
        .filter(Boolean);
      
      const needsDocs = changedFiles.some(file => 
        file.startsWith('packages/docs/') || 
        file.startsWith('packages/core/') || 
        file.startsWith('packages/tokens/') ||
        file.includes('combined-deploy')
      );
      
      const needsStorybook = changedFiles.some(file => 
        file.startsWith('packages/storybook/') || 
        file.startsWith('packages/core/') ||
        file.includes('combined-deploy')
      );
      
      return {
        docs: needsDocs,
        storybook: needsStorybook,
        core: needsDocs || needsStorybook
      };
    }
  } catch (error) {
    console.warn('Error determining changes, building everything:', error.message);
  }
  
  // Default to building everything
  return {
    docs: true,
    storybook: true,
    core: true
  };
}

// Main function
async function main() {
  console.log('🚀 Preparing optimized deployment for docs and storybook...');
  
  // Check what needs to be built
  const { docs, storybook, core } = determineChanges();
  
  console.log(`Building: ${[
    core ? 'core' : '',
    docs ? 'docs' : '',
    storybook ? 'storybook' : ''
  ].filter(Boolean).join(', ')}`);
  
  if (!core && !docs && !storybook) {
    console.log('No relevant changes detected, skipping build.');
    return;
  }
  
  // Build the filter string for turbo
  const filters = [];
  
  if (core) {
    filters.push('@aetherui/core');
    filters.push('@aetherui/tokens');
  }
  
  if (docs) {
    filters.push('@aetherui/docs');
  }
  
  if (storybook) {
    filters.push('@aetherui/storybook');
  }
  
  // Create the turbo command
  const filterString = filters.map(f => `--filter="${f}"`).join(' ');
  const turboCommand = `pnpm turbo run build ${filterString} --no-daemon`;
  
  console.log(`Running: ${turboCommand}`);
  
  // Execute the build
  try {
    execSync(turboCommand, { stdio: 'inherit' });
    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
  
  // Now build docs and storybook if needed
  if (docs) {
    try {
      console.log('Building docs...');
      execSync('pnpm turbo run docs:build --no-daemon', { stdio: 'inherit' });
      console.log('✅ Docs build completed successfully!');
    } catch (error) {
      console.error('❌ Docs build failed:', error.message);
      process.exit(1);
    }
  }
  
  if (storybook) {
    try {
      console.log('Building storybook...');
      execSync('pnpm turbo run build-storybook --no-daemon', { stdio: 'inherit' });
      console.log('✅ Storybook build completed successfully!');
    } catch (error) {
      console.error('❌ Storybook build failed:', error.message);
      process.exit(1);
    }
  }
  
  console.log('✨ All builds completed!');
}

main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});