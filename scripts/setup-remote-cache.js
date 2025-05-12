#!/usr/bin/env node

/**
 * This script helps set up Turborepo remote caching.
 * It guides you through configuring a remote cache for better build performance
 * across machines.
 * 
 * Usage:
 *   node scripts/setup-remote-cache.js
 * 
 * Options:
 *   --ci       Configure for CI/CD environment
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.slice(2);
const isCI = args.includes('--ci');

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('\n🚀 Turborepo Remote Cache Setup\n');
  
  if (isCI) {
    console.log('Setting up Turborepo remote cache for CI/CD environment...');
    
    // For CI, we just provide instructions as we need environment variables
    console.log('\n📋 CI/CD Instructions:\n');
    console.log('1. Make sure your CI/CD environment has the following environment variables:');
    console.log('   - TURBO_TOKEN: Your Turborepo API token');
    console.log('   - TURBO_TEAM: Your Turborepo team (if using Vercel)');
    console.log('   - TURBO_REMOTE_CACHE_URL: Your custom cache URL (if not using Vercel)');
    
    console.log('\n2. Add this to your CI/CD configuration:');
    console.log('   npx turbo run build --remote-only');
    
    console.log('\nFor GitHub Actions, add these environment variables to your workflows.');
    console.log('For GitLab CI, add them to your CI/CD variables.');
    console.log('For CircleCI, add them as environment variables in your project settings.');
    
    rl.close();
    return;
  }
  
  console.log('This script will help you set up Turborepo remote caching.');
  console.log('Remote caching allows you to share build cache across machines and CI/CD pipelines.');

  const useVercel = await question('\nDo you want to use Vercel for remote caching? (Y/n): ');
  
  if (useVercel.toLowerCase() !== 'n') {
    console.log('\nSetting up Vercel remote cache...');
    console.log('You\'ll need to login to Vercel CLI to enable remote caching.');
    
    try {
      // Check if Vercel CLI is installed
      try {
        execSync('npx vercel --version', { stdio: 'pipe' });
      } catch (error) {
        console.log('\nVercel CLI not found. Installing...');
        execSync('npm install -g vercel', { stdio: 'inherit' });
      }
      
      // Login to Vercel
      console.log('\nLogging in to Vercel...');
      execSync('npx vercel login', { stdio: 'inherit' });
      
      // Link to Turborepo remote cache
      console.log('\nLinking to Turborepo remote cache...');
      execSync('npx turbo link', { stdio: 'inherit' });
      
      console.log('\n✅ Remote cache successfully configured with Vercel!');
      console.log('You can now run builds with shared cache using:');
      console.log('  npx turbo run build --remote-only');
    } catch (error) {
      console.error('\n❌ Error setting up Vercel remote cache:', error.message);
      console.log('Please try again or set up manually.');
    }
  } else {
    const customUrl = await question('\nEnter your custom remote cache URL: ');
    const token = await question('Enter your auth token for the remote cache: ');
    const team = await question('Enter your team name (optional): ');
    
    try {
      // Configure custom remote cache
      console.log('\nSetting up custom remote cache...');
      
      if (customUrl && token) {
        // Write configuration to .turbo/config.json
        const configDir = path.join(process.env.HOME || process.env.USERPROFILE, '.turbo');
        if (!fs.existsSync(configDir)) {
          fs.mkdirSync(configDir, { recursive: true });
        }
        
        const config = {
          remoteCache: {
            url: customUrl,
            token: token,
            team: team || undefined
          }
        };
        
        fs.writeFileSync(
          path.join(configDir, 'config.json'),
          JSON.stringify(config, null, 2)
        );
        
        console.log('\n✅ Custom remote cache successfully configured!');
        console.log('Configuration saved to ~/.turbo/config.json');
        console.log('You can now run builds with shared cache using:');
        console.log('  npx turbo run build --remote-only');
      } else {
        console.error('\n❌ URL and token are required for custom remote cache.');
      }
    } catch (error) {
      console.error('\n❌ Error setting up custom remote cache:', error.message);
      console.log('Please try again or set up manually.');
    }
  }
  
  rl.close();
}

main().catch(console.error);