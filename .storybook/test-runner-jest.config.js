module.exports = {
  async postVisit(page, _context) {
    // Get the entire document
    const elementHandler = await page.$('body');
    const innerHTML = await elementHandler?.innerHTML();

    // Check for common issues
    if (innerHTML?.includes('<span class="highlight"')) {
      // Ensure highlighted text is rendered, not as raw HTML
      const rawHtmlPattern = /&lt;span class="highlight"&gt;/;
      if (rawHtmlPattern.test(innerHTML)) {
        throw new Error(
          'Highlighted text is being rendered as escaped HTML instead of actual HTML',
        );
      }
    }
  },

  // Optional: Add custom test timeout
  testTimeout: 15000,
};
