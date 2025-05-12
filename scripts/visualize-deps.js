#!/usr/bin/env node

/**
 * This script generates a visual representation of package dependencies
 * in the monorepo using the Turborepo graph.
 * 
 * Usage:
 *   node scripts/visualize-deps.js [--format=dot|json|html] [--output=path/to/file]
 * 
 * Options:
 *   --format   Output format (default: html)
 *   --output   Output file path (default: ./deps-graph.html)
 *   --task     The task to analyze (default: build)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const format = args.find(arg => arg.startsWith('--format='))?.split('=')[1] || 'html';
const output = args.find(arg => arg.startsWith('--output='))?.split('=')[1] || 
  `./build-reports/deps-graph.${format}`;
const task = args.find(arg => arg.startsWith('--task='))?.split('=')[1] || 'build';

// Create directory for output if it doesn't exist
const outputDir = path.dirname(output);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Generating dependency graph for task "${task}" in format "${format}"...`);

try {
  if (format === 'dot' || format === 'json') {
    // Generate dot or json format directly
    const result = execSync(`npx turbo run ${task} --dry-run --graph=${format}`, {
      cwd: path.join(__dirname, '..')
    }).toString();
    
    fs.writeFileSync(output, result);
    console.log(`Dependency graph saved to: ${output}`);
  } else if (format === 'html') {
    // Generate dot format first
    const dotFile = path.join(outputDir, 'deps-graph.dot');
    execSync(`npx turbo run ${task} --dry-run --graph=dot`, {
      stdio: 'pipe',
      cwd: path.join(__dirname, '..')
    }).toString().trim();
    
    // Then convert dot to HTML with embedded SVG
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AetherUI Dependency Graph - ${task}</title>
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script src="https://cdn.jsdelivr.net/npm/@hpcc-js/wasm@1.14.1"></script>
  <script src="https://cdn.jsdelivr.net/npm/d3-graphviz@4.1.1"></script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
    }
    .container {
      padding: 20px;
      max-width: 100%;
      margin: 0 auto;
    }
    h1 {
      color: #1e293b;
      text-align: center;
    }
    .graph-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      padding: 20px;
      overflow: auto;
      margin-top: 20px;
      min-height: 600px;
    }
    .controls {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      gap: 10px;
    }
    button {
      padding: 8px 16px;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #2563eb;
    }
    #graph {
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>AetherUI Dependency Graph - ${task}</h1>
    <div class="controls">
      <button id="zoom-in">Zoom In</button>
      <button id="zoom-out">Zoom Out</button>
      <button id="reset">Reset</button>
    </div>
    <div class="graph-container">
      <div id="graph"></div>
    </div>
  </div>

  <script>
    // This renders the DOT graph using d3-graphviz
    const dotSource = \`
    // The dot content will be injected here
    \`;

    let zoomLevel = 1;

    document.addEventListener('DOMContentLoaded', () => {
      const graphviz = d3.select("#graph")
        .graphviz()
        .zoom(true)
        .fit(true)
        .renderDot(dotSource);

      document.getElementById('zoom-in').addEventListener('click', () => {
        zoomLevel *= 1.2;
        graphviz.zoom(true).scale(zoomLevel).render();
      });

      document.getElementById('zoom-out').addEventListener('click', () => {
        zoomLevel /= 1.2;
        graphviz.zoom(true).scale(zoomLevel).render();
      });

      document.getElementById('reset').addEventListener('click', () => {
        zoomLevel = 1;
        graphviz.resetZoom();
      });
    });
  </script>
</body>
</html>`;

    // Save the HTML file
    fs.writeFileSync(output, htmlContent);
    console.log(`HTML dependency graph template saved to: ${output}`);
    console.log('Note: You need to replace the dot source placeholder with actual dot content');
    
    // Recommend next steps
    console.log('\nTo generate a complete visualization, run:');
    console.log(`  npx turbo run ${task} --dry-run --graph=dot > temp.dot`);
    console.log('  Then manually insert the dot content into the HTML file');
  } else {
    console.error(`Unsupported format: ${format}`);
    console.error('Supported formats: dot, json, html');
    process.exit(1);
  }
} catch (error) {
  console.error('Error generating dependency graph:', error.message);
  process.exit(1);
}