import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, first, filter } from 'rxjs/operators';
import { LoadTodos, SetTodoStatus } from '../actions/todo.actions';
import { State } from '../reducers';
import { getTodoIds } from '../selectors/todo.selectors';
import { getTodoErrorById, getTodoListError, isTodoListLoading, isTodoListLoaded } from '../selectors/ui.selectors';

@Component({
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  todoIds$ = this.Store.pipe(select(getTodoIds));
  isLoading$ = this.Store.pipe(select(isTodoListLoading));
  isError$ = this.Store.pipe(select(getTodoListError));
  atLeastOneTodoInError$ = this.Store.pipe(
    select(getTodoErrorById),
    map((todoErrorById) => !!Object.keys(todoErrorById).length)
  )

  constructor(
    private Store: Store<State>
  ) { }

  ngOnInit() {
    this.loadTodoListIfNeeded();
  }

  loadTodoListIfNeeded() {
    this.Store.pipe(
      select(isTodoListLoaded),
      first(),
      filter((isTodoListLoaded) => !isTodoListLoaded)
    ).subscribe(() => {
      this.Store.dispatch(new LoadTodos());
    });
  }

  retryAll() {
    this.Store.pipe(select(getTodoErrorById), first()).subscribe((todoErrorById) => {
      // Note: We can add some kind of queing to this (or a backend route to do it once)
      for (const [todoId, errorData] of Object.entries(todoErrorById)) {
        if (errorData.changes && errorData.changes.status) {
          this.Store.dispatch(new SetTodoStatus({ id: todoId, status: errorData.changes.status }))
        }
      }
    })
  }
}
