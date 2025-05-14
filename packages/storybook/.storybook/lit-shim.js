/**
 * This is a shim file to properly export the required functions from lit 
 * that Storybook expects
 */
const lit = require('lit');
const litHtml = require('lit-html');

module.exports = {
  html: lit.html,
  css: lit.css,
  LitElement: lit.LitElement,
  render: litHtml.render
};