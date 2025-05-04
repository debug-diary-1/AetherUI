import { NgModule, Component, Input, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { defineAeButton } from '@aetherui/core';

// Define the custom element
defineAeButton();

@Component({
  selector: 'ae-button',
  template: '<ae-button [disabled]="disabled"><ng-content></ng-content></ae-button>'
})
export class AeButtonComponent implements AfterViewInit {
  @Input() disabled = false;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const button = this.elementRef.nativeElement.querySelector('ae-button');
    if (button) {
      button.disabled = this.disabled;
    }
  }
}

@NgModule({
  declarations: [AeButtonComponent],
  imports: [CommonModule],
  exports: [AeButtonComponent]
})
export class AetherUIModule {} 