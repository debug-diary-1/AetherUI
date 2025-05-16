/**
 * Test helpers for web component testing
 * Use this for creating and testing web components when @open-wc/testing has issues
 */
import { LitElement } from 'lit';

/**
 * Creates a simple test fixture for web components
 * 
 * @param template HTML template string or element to use as fixture
 * @returns Promise that resolves with the created element
 */
export async function fixture<T extends HTMLElement>(template: string | HTMLElement): Promise<T> {
  let element: T;
  
  if (typeof template === 'string') {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = template.trim();
    element = wrapper.firstElementChild as T;
    
    if (!element) {
      throw new Error('Template did not create a valid element');
    }
  } else {
    element = template as T;
  }
  
  // Add to DOM for testing
  document.body.appendChild(element);
  
  // Wait for LitElement to update
  if (element instanceof LitElement) {
    await element.updateComplete;
  }
  
  return element;
}

/**
 * Cleanup a fixture element
 * 
 * @param element Element to remove from DOM
 */
export function removeFixture(element: HTMLElement): void {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

/**
 * Creates a test fixture and automatically cleans it up after the test
 * 
 * @param template HTML template string or element to use as fixture
 * @returns Promise that resolves with the created element
 */
export async function fixtureCleanup<T extends HTMLElement>(template: string | HTMLElement): Promise<T> {
  const element = await fixture<T>(template);
  
  // Add to global fixture list for cleanup
  if (!window._testFixtures) {
    window._testFixtures = [];
  }
  window._testFixtures.push(element);
  
  return element;
}

/**
 * Wait for a specified event to be dispatched
 * 
 * @param element Element to listen for event on
 * @param eventName Name of the event to wait for
 * @returns Promise that resolves with the event
 */
export function waitForEvent<T extends Event>(element: HTMLElement, eventName: string): Promise<T> {
  return new Promise((resolve) => {
    element.addEventListener(eventName, ((event: T) => {
      resolve(event);
    }) as EventListener, { once: true });
  });
}

// Declare type for fixture tracking
declare global {
  interface Window {
    _testFixtures?: HTMLElement[];
  }
}