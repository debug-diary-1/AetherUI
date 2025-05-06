// This script handles navigation for AetherUI website
// It's used primarily in development mode to handle navigation

document.addEventListener('DOMContentLoaded', () => {
  // Helper function to log navigation
  const logInfo = (msg) => console.log(`[AetherUI Navigation] ${msg}`);

  // Fix base URL for GitHub Pages
  const fixGitHubPagesLinks = () => {
    // Check if we're on GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');

    if (isGitHubPages) {
      // Get all links
      const links = document.querySelectorAll('a[href^="docs/"]');

      // Fix the links to include the repo name if needed
      links.forEach((link) => {
        const href = link.getAttribute('href');
        // The base path is already included in the href, so we don't need to modify it
        logInfo(`GitHub Pages link: ${href}`);
      });
    }
  };

  // Fix links when on localhost for development
  const fixLocalLinks = () => {
    const isLocalhost =
      window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isLocalhost && window.location.port === '3000') {
      // We're on the landing page server
      const links = document.querySelectorAll('a[href^="docs/"]');

      // Update links to point to the docs server
      links.forEach((link) => {
        const href = link.getAttribute('href');
        const newHref = `http://localhost:4321/${href.replace('docs/', '')}`;
        link.setAttribute('href', newHref);
        logInfo(`Fixed local link: ${href} → ${newHref}`);
      });
    }
  };

  // Initialize links based on environment
  fixGitHubPagesLinks();
  fixLocalLinks();

  // Log that the navigation script is active
  logInfo('Navigation script initialized');
});
