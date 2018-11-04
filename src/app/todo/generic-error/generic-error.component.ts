import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generic-error',
  template: `
    <p>Something went wrong</p>
    <button
      mat-raised-button
      color="primary"
      (click)="retry.emit()"
    >Retry</button>
  `,
  styleUrls: ['./generic-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericErrorComponent {
  @Output() retry = new EventEmitter<void>()
}
