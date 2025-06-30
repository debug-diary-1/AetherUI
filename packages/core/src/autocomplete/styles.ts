import { css } from 'lit';

export const autocompleteStyles = css`
  :host {
    display: block;
    position: relative;
    width: 100%;
    font-family: var(--ae-autocomplete-font-family, inherit);
    --ae-autocomplete-transition: 180ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .autocomplete-container {
    position: relative;
    width: 100%;
  }

  .autocomplete-input {
    width: 100%;
    padding: 0.6rem 1rem;
    border: 1px solid var(--ae-autocomplete-border-color, #ccc);
    border-radius: var(--ae-autocomplete-border-radius, 4px);
    background-color: var(--ae-autocomplete-background, white);
    color: var(--ae-autocomplete-text-color, #333);
    font-size: var(--ae-autocomplete-font-size, 1rem);
    line-height: var(--ae-autocomplete-line-height, 1.5);
    box-sizing: border-box;
    transition: border-color var(--ae-autocomplete-transition),
                box-shadow var(--ae-autocomplete-transition);
  }

  .autocomplete-input:focus {
    outline: none;
    border-color: var(--ae-autocomplete-focus-border-color, #007bff);
    box-shadow: 0 0 0 2px var(--ae-autocomplete-focus-shadow-color, rgba(0, 123, 255, 0.25));
  }

  .autocomplete-input:disabled {
    background-color: var(--ae-autocomplete-disabled-background, #f5f5f5);
    color: var(--ae-autocomplete-disabled-text-color, #999);
    cursor: not-allowed;
  }

  .autocomplete-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    max-height: var(--ae-autocomplete-dropdown-max-height, 250px);
    overflow-y: auto;
    background-color: var(--ae-autocomplete-dropdown-background, white);
    color: var(--ae-autocomplete-dropdown-text-color, #333);
    border: 1px solid var(--ae-autocomplete-dropdown-border-color, #ccc);
    border-radius: 0 0 var(--ae-autocomplete-border-radius, 4px) var(--ae-autocomplete-border-radius, 4px);
    box-shadow: var(--ae-autocomplete-dropdown-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
    display: none;
  }

  .autocomplete-dropdown.open {
    display: block;
  }

  .autocomplete-options {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .autocomplete-option {
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color var(--ae-autocomplete-transition);
    color: var(--ae-autocomplete-option-text-color, var(--ae-autocomplete-dropdown-text-color, #333));
  }

  .autocomplete-option:hover,
  .autocomplete-option.highlighted {
    background-color: var(--ae-autocomplete-highlight-background, #f0f0f0);
  }

  .autocomplete-option.selected {
    background-color: var(--ae-autocomplete-selected-background, #e6f2ff);
  }

  .autocomplete-option.disabled {
    color: var(--ae-autocomplete-disabled-text-color, #999);
    cursor: not-allowed;
  }

  .autocomplete-group-heading {
    padding: 0.5rem 1rem;
    font-weight: bold;
    color: var(--ae-autocomplete-group-text-color, #666);
    background-color: var(--ae-autocomplete-group-background, #f5f5f5);
    border-bottom: 1px solid var(--ae-autocomplete-group-border-color, #eee);
  }

  .autocomplete-empty {
    padding: 0.5rem 1rem;
    color: var(--ae-autocomplete-empty-text-color, #999);
    text-align: center;
  }

  .autocomplete-match {
    font-weight: bold;
    color: var(--ae-autocomplete-match-text-color, #007bff);
  }

  .autocomplete-clear {
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--ae-autocomplete-clear-color, #999);
    cursor: pointer;
    border: none;
    background: transparent;
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color var(--ae-autocomplete-transition);
  }
  
  .autocomplete-clear:hover {
    color: var(--ae-autocomplete-clear-hover-color, #666);
  }

  .autocomplete-clear svg {
    width: 14px;
    height: 14px;
  }

  .autocomplete-arrow {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--ae-autocomplete-arrow-color, #999);
    pointer-events: none;
  }

  .autocomplete-arrow svg {
    width: 14px;
    height: 14px;
  }
`;