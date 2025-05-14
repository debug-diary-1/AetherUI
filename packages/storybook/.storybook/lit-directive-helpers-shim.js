/**
 * Shim for lit/directive-helpers.js
 */
const { isTemplateResult, isDirectiveResult } = require('lit/directive-helpers.js');

module.exports = {
  isTemplateResult,
  isDirectiveResult
};