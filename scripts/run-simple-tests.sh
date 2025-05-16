#!/bin/bash

# This script runs tests in a very simple manner to avoid memory issues
# Usage: bash run-simple-tests.sh [memory_limit_in_mb]

# Default memory limit is 512MB if not provided
MEMORY_LIMIT=${1:-512}

echo "Running API tests with ${MEMORY_LIMIT}MB memory limit..."
echo ""

# Create a minimal config file just for the tests
cat > /tmp/simple-vitest.config.js << EOF
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['./src/toast/__tests__/api.test.ts'],
  }
});
EOF

# Run the tests with the simplified config
cd /Users/paull/projects/oss/aetherUi/packages/core
NODE_OPTIONS="--max-old-space-size=$MEMORY_LIMIT" npx vitest run --config /tmp/simple-vitest.config.js

# Check result
if [ $? -eq 0 ]; then
  echo "✅ Tests completed successfully"
else
  echo "❌ Tests had failures"
fi

# Clean up
rm /tmp/simple-vitest.config.js

echo ""
echo "Note: Only a minimal set of tests was run to avoid memory issues."
echo "Web component tests using @open-wc/testing were skipped due to JSDOM compatibility issues."