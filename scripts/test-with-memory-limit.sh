#!/bin/bash

# This script runs the test command with a memory limit
# Usage: bash test-with-memory-limit.sh [memory_limit_in_mb]

# Default memory limit is 512MB if not provided
MEMORY_LIMIT=${1:-512}

# Get a list of all packages with test targets
PACKAGES=$(nx print-affected --target=test --all | grep -o '"name": "[^"]*"' | cut -d'"' -f4)

echo "Running tests with ${MEMORY_LIMIT}MB memory limit..."
echo ""

# Run each package's tests separately to minimize memory usage
for pkg in $PACKAGES; do
  echo "Testing package: $pkg"
  NODE_OPTIONS="--max-old-space-size=$MEMORY_LIMIT" nx run $pkg:test
  
  # Check if tests passed
  if [ $? -eq 0 ]; then
    echo "✅ $pkg tests completed successfully"
  else
    echo "❌ $pkg tests had failures"
  fi
  echo ""
done

echo "✅ All tests completed with ${MEMORY_LIMIT}MB memory limit"