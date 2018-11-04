import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './index.component.html',
  styles: [`
    :host {
      display: flex;
      margin: 20px 0;
      flex-direction: column;
      max-width: 400px;
    }

    mat-card {
      display: flex;
      padding: 0px;
      flex-direction: column;
      min-height: 0;
    }

    h1 {
      padding: 16px 16px 0px 16px;
      text-align: center;
      margin-bottom: 6px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent {}
