/**
 * This is a shim file to properly export the required functions from lit 
 * that Storybook expects (ESM version)
 */
import { html, css } from 'lit';
import { LitElement } from 'lit-element';
import { render } from 'lit-html';

export {
  html,
  css,
  LitElement,
  render
};