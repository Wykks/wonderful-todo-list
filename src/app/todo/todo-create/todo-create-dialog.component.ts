import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoApiService } from '../api/todo-api.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { AddTodo } from '../actions/todo.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './todo-create-dialog.component.html',
  styles: [`
    :host {
      display: block;
      width: 50vw;
    }

    .form {
      display: flex;
      flex-direction: column;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoCreateDialogComponent {
  form: FormGroup;
  isLoading = false;
  private sub: Subscription;

  constructor(
    private FormBuilder: FormBuilder,
    private TodoApiService: TodoApiService,
    private ChangeDetectorRef: ChangeDetectorRef,
    private MatDialogRef: MatDialogRef<TodoCreateDialogComponent, void>,
    private Store: Store<State>,
    public MatSnackBar: MatSnackBar
  ) {
    this.form = this.FormBuilder.group({
      title: ['', Validators.required],
      desc: ''
    });
  }

  save() {
    this.isLoading = true;
    this.form.disable({ emitEvent: false });
    this.sub = this.TodoApiService.createTodo(this.form.value).pipe(
      finalize(() => {
        this.isLoading = false;
        this.form.enable({ emitEvent: false });
        this.ChangeDetectorRef.markForCheck();
      })
    ).subscribe((todo) => {
      this.Store.dispatch(new AddTodo(todo));
      this.MatDialogRef.close();
    }, () => {
      this.MatSnackBar.open('Something went wrong', undefined, {
        duration: 1000
      });
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
