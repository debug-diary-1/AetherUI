import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

interface PlaygroundFile {
  content: string;
}

interface PlaygroundConfig {
  stackblitz: {
    files: Record<string, PlaygroundFile>;
  };
}

const playgroundPath = join(process.cwd(), 'src/content/playground/accordion.json');
const playgroundConfig = JSON.parse(readFileSync(playgroundPath, 'utf-8')) as PlaygroundConfig;

// Verify StackBlitz configuration
console.log('Verifying StackBlitz configuration...');
if (!playgroundConfig.stackblitz) {
  throw new Error('Missing StackBlitz configuration');
}

// Verify required files
const requiredFiles = ['package.json', 'vite.config.ts', 'index.html', 'src/main.ts', 'src/styles.css'];
for (const file of requiredFiles) {
  if (!playgroundConfig.stackblitz.files[file]) {
    throw new Error(`Missing required file: ${file}`);
  }
}

// Verify dependencies
const packageJson = JSON.parse(playgroundConfig.stackblitz.files['package.json'].content);
const requiredDeps = ['@aetherui/accordion', '@aetherui/tokens'];
for (const dep of requiredDeps) {
  if (!packageJson.dependencies[dep]) {
    throw new Error(`Missing required dependency: ${dep}`);
  }
}

console.log('Playground configuration verified successfully!');

// Create a temporary directory to test the playground
const tempDir = join(process.cwd(), 'temp-playground');
try {
  console.log('Creating temporary playground...');
  execSync(`mkdir -p ${tempDir}`);
  
  // Write files to temp directory
  for (const [file, content] of Object.entries<PlaygroundFile>(playgroundConfig.stackblitz.files)) {
    const filePath = join(tempDir, file);
    execSync(`mkdir -p ${filePath.split('/').slice(0, -1).join('/')}`);
    execSync(`echo '${content.content}' > ${filePath}`);
  }

  // Create pnpm-workspace.yaml in temp directory
  const workspaceYaml = `packages:
  - 'packages/*'
  - 'packages/docs'
  - 'packages/accordion'
  - 'packages/tokens'
  - 'packages/adapters'`;
  execSync(`echo '${workspaceYaml}' > ${join(tempDir, 'pnpm-workspace.yaml')}`);

  // Install dependencies
  console.log('Installing dependencies...');
  execSync('pnpm install', { cwd: tempDir });

  // Start development server
  console.log('Starting development server...');
  const server = execSync('pnpm dev', { cwd: tempDir, stdio: 'pipe' });
  console.log('Development server started successfully!');

} catch (error) {
  console.error('Error testing playground:', error);
} finally {
  // Clean up
  console.log('Cleaning up...');
  execSync(`rm -rf ${tempDir}`);
} 