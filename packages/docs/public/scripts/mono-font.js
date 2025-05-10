/**
 * Script to apply monospace font to all code elements 
 * This runs on every page load and after client-side navigation
 */
(function() {
  // Apply monospace font to all code elements
  const applyMonospaceFont = () => {
    // Get all code elements
    const monoElements = document.querySelectorAll(
      'code, pre, .astro-code, pre code, .expressive-code code, ' +
      '.shiki, .shiki code, ' + 
      'div[data-rehype-pretty-code-fragment] pre, ' +
      'div[data-rehype-pretty-code-fragment] code, ' +
      '.sl-markdown-content :not(pre) > code, ' +
      '.sl-markdown-content code, ' +
      '.starlight-aside code'
    );
    
    // Apply monospace font to each element
    monoElements.forEach(el => {
      el.style.fontFamily = "'JetBrains Mono', 'Fira Code', monospace";
      el.style.fontFeatureSettings = "'liga' 0, 'calt' 1, 'ss01' 1, 'ss02' 1";
    });
  };
  
  // Apply immediately
  if (document.readyState !== 'loading') {
    applyMonospaceFont();
  } else {
    document.addEventListener('DOMContentLoaded', applyMonospaceFont);
  }
  
  // Apply after page transitions (for Astro View Transitions)
  document.addEventListener('astro:page-load', applyMonospaceFont);
  
  // Apply periodically for a short time to catch any late-loading elements
  const interval = setInterval(applyMonospaceFont, 500);
  setTimeout(() => clearInterval(interval), 5000);
})();