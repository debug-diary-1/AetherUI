/**
 * Force monospace font application by directly modifying style sheets
 * This is a more aggressive approach that will override any cascade layers
 */
(function() {
  // Function to forcibly modify the document's stylesheets
  function enforceMonospaceFont() {
    // Define our monospace font stack
    const monoFont = "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    
    try {
      // Create our own stylesheet with !important rules
      const style = document.createElement('style');
      style.setAttribute('id', 'force-mono-font');
      style.textContent = `
        /* Direct element overrides */
        code, pre, kbd, samp, 
        .astro-code, .astro-code code, 
        pre code, .sl-markdown-content code,
        .expressive-code pre code,
        div[data-rehype-pretty-code-fragment] pre,
        div[data-rehype-pretty-code-fragment] code,
        [class*="language-"] code,
        [class*="language-"],
        .shiki, .shiki code {
          font-family: ${monoFont} !important;
        }

        /* Root variable override */
        :root {
          --sl-font-mono: ${monoFont} !important;
        }
      `;
      
      // Remove any existing version of our stylesheet
      const existingStyle = document.getElementById('force-mono-font');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      // Add the stylesheet at the end of <head> for maximum precedence
      document.head.appendChild(style);
      
      // Directly target known Starlight elements
      const codeElements = document.querySelectorAll('code, pre, .astro-code, pre code');
      codeElements.forEach(el => {
        el.style.setProperty('font-family', monoFont, 'important');
      });
      
      // Find and modify Starlight's styles if possible
      Array.from(document.styleSheets).forEach(sheet => {
        try {
          // Skip cross-origin sheets which can't be accessed
          if (sheet.href && !sheet.href.startsWith(window.location.origin)) return;
          
          Array.from(sheet.cssRules || []).forEach(rule => {
            // Find rules targeting code elements
            if (rule.selectorText && 
                (rule.selectorText.includes('code') || 
                 rule.selectorText.includes('pre') ||
                 rule.selectorText.includes('.astro-code'))) {
              // Try to modify the rule directly
              try {
                rule.style.setProperty('font-family', monoFont, 'important');
              } catch (e) {
                // Some rules may be read-only, which is fine
              }
            }
          });
        } catch (e) {
          // CORS might prevent accessing some stylesheets, which is fine
        }
      });
    } catch (e) {
      console.warn('Failed to enforce monospace font:', e);
    }
  }

  // Apply on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enforceMonospaceFont);
  } else {
    enforceMonospaceFont();
  }

  // Apply on page transitions (for Astro View Transitions)
  document.addEventListener('astro:page-load', enforceMonospaceFont);
  
  // Apply periodically for a short time for any late-loaded content
  const interval = setInterval(enforceMonospaceFont, 500);
  setTimeout(() => clearInterval(interval), 5000);
  
  // Apply whenever the style sheets change
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && 
          mutation.addedNodes.length > 0 &&
          Array.from(mutation.addedNodes).some(node => 
            node.nodeName === 'STYLE' || node.nodeName === 'LINK')) {
        enforceMonospaceFont();
        break;
      }
    }
  });
  
  observer.observe(document.head, { 
    childList: true, 
    subtree: true 
  });
})();