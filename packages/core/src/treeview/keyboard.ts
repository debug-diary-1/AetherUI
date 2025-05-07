/**
 * Keyboard controller for TreeView component
 * Implements WAI-ARIA TreeView keyboard interaction pattern
 */

import { ReactiveController, ReactiveControllerHost } from 'lit';

export class TreeViewKeyboardController implements ReactiveController {
  private host: ReactiveControllerHost & Element;
  private nodes: HTMLElement[] = [];
  private currentFocus: number = -1;

  constructor(host: ReactiveControllerHost & Element) {
    this.host = host;
    host.addController(this);
  }

  hostConnected() {
    this.host.addEventListener('keydown', this.handleKeyDown as EventListener);
  }

  hostDisconnected() {
    this.host.removeEventListener('keydown', this.handleKeyDown as EventListener);
  }

  setNodes(nodes: HTMLElement[]) {
    this.nodes = nodes;
    this.currentFocus = -1;
  }

  private handleKeyDown = (event: Event) => {
    if (!this.nodes.length) return;
    
    const keyEvent = event as KeyboardEvent;

    switch (keyEvent.key) {
      case 'ArrowDown':
        keyEvent.preventDefault();
        this.focusNextNode();
        break;

      case 'ArrowUp':
        keyEvent.preventDefault();
        this.focusPreviousNode();
        break;

      case 'ArrowRight':
        keyEvent.preventDefault();
        this.expandCurrentNode();
        break;

      case 'ArrowLeft':
        keyEvent.preventDefault();
        this.collapseCurrentNode();
        break;

      case 'Home':
        keyEvent.preventDefault();
        this.focusFirstNode();
        break;

      case 'End':
        keyEvent.preventDefault();
        this.focusLastNode();
        break;

      case 'Enter':
      case ' ':
        keyEvent.preventDefault();
        this.selectCurrentNode();
        break;
    }
  };

  private focusNextNode() {
    if (this.currentFocus < this.nodes.length - 1) {
      this.currentFocus++;
      this.nodes[this.currentFocus].focus();
    }
  }

  private focusPreviousNode() {
    if (this.currentFocus > 0) {
      this.currentFocus--;
      this.nodes[this.currentFocus].focus();
    }
  }

  private expandCurrentNode() {
    const currentNode = this.nodes[this.currentFocus];
    if (!currentNode) return;

    const caret = currentNode.querySelector('.tree-caret');
    if (caret) {
      currentNode.click();
    }
  }

  private collapseCurrentNode() {
    const currentNode = this.nodes[this.currentFocus];
    if (!currentNode) return;

    const caret = currentNode.querySelector('.tree-caret');
    if (caret) {
      currentNode.click();
    } else {
      // If not expandable, try to focus parent node
      const parentGroup = currentNode.closest('.tree-children');
      if (parentGroup) {
        const parentNode = parentGroup.previousElementSibling as HTMLElement;
        if (parentNode) {
          const index = this.nodes.indexOf(parentNode);
          if (index !== -1) {
            this.currentFocus = index;
            parentNode.focus();
          }
        }
      }
    }
  }

  private focusFirstNode() {
    if (this.nodes.length) {
      this.currentFocus = 0;
      this.nodes[0].focus();
    }
  }

  private focusLastNode() {
    if (this.nodes.length) {
      this.currentFocus = this.nodes.length - 1;
      this.nodes[this.currentFocus].focus();
    }
  }

  private selectCurrentNode() {
    const currentNode = this.nodes[this.currentFocus];
    if (currentNode) {
      const checkbox = currentNode.querySelector('.tree-checkbox') as HTMLElement;
      if (checkbox) {
        checkbox.click();
      } else {
        currentNode.click();
      }
    }
  }
} 