import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [':host { display: flex; flex: 1; justify-content: center; min-height: 0 }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent { }
