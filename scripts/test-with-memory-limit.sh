#!/bin/bash

# This script runs the test command with a memory limit
# Usage: bash test-with-memory-limit.sh [memory_limit_in_mb]

# Default memory limit is 512MB if not provided
MEMORY_LIMIT=${1:-512}

# Run the tests with reduced parallel execution and memory limits
NODE_OPTIONS="--max-old-space-size=$MEMORY_LIMIT" nx run-many -t test --parallel=1

echo ""
echo "✅ Tests completed with ${MEMORY_LIMIT}MB memory limit"