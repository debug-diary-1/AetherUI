/**
 * This is a shim file for lit decorators
 */
const { 
  customElement, 
  property, 
  state, 
  query, 
  queryAll, 
  eventOptions, 
  queryAsync 
} = require('lit/decorators');

module.exports = {
  customElement,
  property,
  state,
  query,
  queryAll,
  eventOptions,
  queryAsync
};