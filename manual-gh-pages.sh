#!/bin/bash
set -e

# Create a temporary directory for building the site
echo "Creating temporary directory for building..."
rm -rf gh-pages-temp
mkdir -p gh-pages-temp

# Copy landing page to the temporary directory
echo "Copying landing page files..."
cp landing/*.html landing/*.js landing/*.svg gh-pages-temp/

# Try to build the docs site locally with base path set correctly
echo "Attempting to build documentation site with correct base path..."
cd packages/docs

# Create a temporary fix for the astro.config.mjs file to set the correct base path
ORIGINAL_CONFIG="astro.config.mjs"
BACKUP_CONFIG="astro.config.mjs.bak"
cp $ORIGINAL_CONFIG $BACKUP_CONFIG

# Update the config file to use the correct base path for GitHub Pages
sed -i '' 's|base: '\''/docs'\''|base: '\''/AetherUI/docs'\''|g' $ORIGINAL_CONFIG

# Install dependencies and build
pnpm install --no-frozen-lockfile
pnpm run build

# Restore the original config file
mv $BACKUP_CONFIG $ORIGINAL_CONFIG

if [ -d "dist" ]; then
  echo "Copying built documentation to docs folder..."
  mkdir -p ../../gh-pages-temp/docs
  cp -r dist/* ../../gh-pages-temp/docs/
  
  # Add a fix for possible CSS path issues - create a .nojekyll file
  touch ../../gh-pages-temp/.nojekyll
else
  echo "Creating placeholder documentation..."
  mkdir -p ../../gh-pages-temp/docs
  cat > ../../gh-pages-temp/docs/index.html << EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AetherUI Documentation</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      line-height: 1.6;
    }
    a {
      color: #4f46e5;
    }
  </style>
</head>
<body>
  <h1>AetherUI Documentation</h1>
  <p>Documentation is under construction. Please check back later.</p>
  <p><a href="/">Back to Home</a></p>
</body>
</html>
EOF
fi

cd ../..

# Switch to or create the gh-pages branch
echo "Checking if gh-pages branch exists..."
if git show-ref --verify --quiet refs/heads/gh-pages; then
  echo "Checking out existing gh-pages branch..."
  git checkout gh-pages
else
  echo "Creating new gh-pages branch..."
  git checkout --orphan gh-pages
  git rm -rf .
  echo "# AetherUI GitHub Pages" > README.md
  git add README.md
  git commit -m "Initialize gh-pages branch"
fi

# Remove everything except .git
echo "Cleaning gh-pages branch..."
find . -maxdepth 1 ! -name '.git' ! -name 'gh-pages-temp' -exec rm -rf {} \;

# Copy all built files from temp directory
echo "Copying built files to gh-pages branch..."
cp -r gh-pages-temp/* .
cp -r gh-pages-temp/.* . 2>/dev/null || true
rm -rf gh-pages-temp

# Add and commit all files
echo "Committing changes to gh-pages branch..."
git add .
git commit -m "Update GitHub Pages site $(date)"

# Push to GitHub
echo "Pushing to GitHub..."
git push origin gh-pages

# Return to main branch
echo "Switching back to main branch..."
git checkout main

echo "GitHub Pages deployment complete!"
echo "Your site should be available at https://pallavl01.github.io/AetherUI/ shortly." 