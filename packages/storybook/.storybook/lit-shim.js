/**
 * This is a shim file to properly export the required functions from lit 
 * that Storybook expects
 */
const { html, css } = require('lit');
const { LitElement } = require('lit-element');
const { render } = require('lit-html');

module.exports = {
  html,
  css,
  LitElement,
  render
};