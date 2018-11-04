import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TodoCreateDialogComponent } from './todo-create-dialog.component';
import { Router } from '@angular/router';
import { Subscription, race } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-create',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCreateComponent {
  private dialog: MatDialogRef<TodoCreateDialogComponent, void> | null;
  private sub: Subscription;

  constructor(
    private MatDialog: MatDialog,
    private Router: Router
  ) {
    this.dialog = this.MatDialog.open(TodoCreateDialogComponent, {
      disableClose: true
    });
    this.sub = race(
      this.dialog.beforeClose().pipe(tap(() => this.dialog = null)),
      this.dialog.backdropClick().pipe(mapTo(undefined))
    ).subscribe(() => {
      // this.Router.navigate([{ outlets: { dialog: null } }]);
      this.Router.navigate(['/todos']);
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.dialog) {
      this.dialog.close();
    }
  }
}
