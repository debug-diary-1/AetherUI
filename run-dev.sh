#!/bin/bash

# Start the documentation server
cd packages/docs && npm run dev &
DOCS_PID=$!

# Start the landing page server
cd landing && npx serve -p 3000 &
LANDING_PID=$!

echo "Landing page running at http://localhost:3000"
echo "Documentation running at http://localhost:4321"
echo "Press Ctrl+C to stop both servers"

# Function to kill both processes on exit
function cleanup {
  echo "Stopping servers..."
  kill $DOCS_PID
  kill $LANDING_PID
  exit 0
}

# Trap the SIGINT signal (Ctrl+C)
trap cleanup SIGINT

# Wait for either process to exit
wait 