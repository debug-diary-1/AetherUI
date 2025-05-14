/**
 * This is a shim file for lit decorators
 */
const { customElement, property, state, query, queryAll, eventOptions, queryAsync } = 
  require('@lit/reactive-element/decorators.js');

module.exports = {
  customElement,
  property,
  state,
  query,
  queryAll,
  eventOptions,
  queryAsync
};