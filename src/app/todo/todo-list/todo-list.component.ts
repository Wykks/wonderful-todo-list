import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LoadTodos } from '../actions/todo.actions';
import { State } from '../reducers';
import { getTodoIds } from '../selectors/todo.selectors';
import { getTodoListError, isTodoListLoading } from '../selectors/ui.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  todoIds$ = this.Store.pipe(select(getTodoIds));
  isLoading$ = this.Store.pipe(select(isTodoListLoading));
  isError$ = this.Store.pipe(select(getTodoListError));

  constructor(
    private Store: Store<State>
  ) { }

  ngOnInit() {
    this.loadTodoList();
  }

  loadTodoList() {
    this.Store.dispatch(new LoadTodos());
  }
}
