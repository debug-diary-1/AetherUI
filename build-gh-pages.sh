#!/bin/bash
set -e

# Create a clean gh-pages directory
echo "Creating clean gh-pages directory..."
rm -rf gh-pages
mkdir -p gh-pages

# Build the documentation site with Astro
echo "Building documentation with Astro..."
cd packages/docs
npm run build

# Copy the built documentation site to the gh-pages directory
echo "Copying docs to gh-pages/docs directory..."
mkdir -p ../../gh-pages/docs
cp -r dist/* ../../gh-pages/docs/

# Copy the landing page files to the gh-pages root
echo "Copying landing page to gh-pages directory..."
cd ../../landing
cp -r *.html *.js *.svg ../gh-pages/

echo "Build complete! Files ready in gh-pages/ directory"
echo "You can now deploy the gh-pages directory to GitHub Pages" 