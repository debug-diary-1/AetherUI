// This script handles redirection between the landing page and docs
// It's used primarily in development mode to handle navigation

document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the landing page
  const _isLandingPage = location.pathname === '/' || location.pathname === '/index.html';

  // Get all links that point to docs
  const _docsLinks = document.querySelectorAll('a[href^="/docs/"]');

  // In production, all links should already be correct - pointing to /docs/
  // No need to modify anything

  // Initialize components when available
  window.addEventListener('WebComponentsReady', () => {
    console.log('AetherUI components are ready!');
  });
});
