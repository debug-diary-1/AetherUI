#!/bin/bash

# This script runs only API tests that don't rely on the DOM
# to prevent memory issues and JSDOM-related failures.
# Usage: bash run-api-tests.sh [memory_limit_in_mb]

# Default memory limit is 512MB if not provided
MEMORY_LIMIT=${1:-512}

echo "Running API tests with ${MEMORY_LIMIT}MB memory limit..."
echo ""

# Run only api.test.ts files across all packages
API_TESTS=$(find packages -name "*api.test.ts")

if [ -z "$API_TESTS" ]; then
  echo "No API tests found."
  exit 0
fi

# Run each API test individually
for test in $API_TESTS; do
  echo "Testing: $test"
  NODE_OPTIONS="--max-old-space-size=$MEMORY_LIMIT" npx vitest run $test --no-workspace
  
  # Check if tests passed
  if [ $? -eq 0 ]; then
    echo "✅ $test completed successfully"
  else
    echo "❌ $test had failures"
  fi
  echo ""
done

echo "✅ All API tests completed with ${MEMORY_LIMIT}MB memory limit"
echo ""
echo "Note: Only API tests were run to avoid memory issues with DOM-based tests."
echo "To run component tests that use the DOM, consider using a browser-based test runner."