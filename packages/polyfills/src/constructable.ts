// Basic polyfill for constructable stylesheets
export function polyfillConstructableStylesheets() {
  if ('adoptedStyleSheets' in document) {
    return;
  }

  // Simple polyfill that just appends styles to shadow root
  Object.defineProperty(ShadowRoot.prototype, 'adoptedStyleSheets', {
    configurable: true,
    get() {
      return this._adoptedStyleSheets || [];
    },
    set(sheets: CSSStyleSheet[]) {
      this._adoptedStyleSheets = sheets;
      
      // Remove old styles
      const oldStyles = this.querySelectorAll('style[data-adopted]');
      oldStyles.forEach((style: Element) => {
        if (style instanceof HTMLStyleElement) {
          style.remove();
        }
      });

      // Add new styles
      sheets.forEach((sheet: CSSStyleSheet) => {
        const style = document.createElement('style');
        style.textContent = Array.from(sheet.cssRules)
          .map((rule: CSSRule) => rule.cssText)
          .join('\n');
        style.dataset.adopted = 'true';
        this.appendChild(style);
      });
    }
  });
} 