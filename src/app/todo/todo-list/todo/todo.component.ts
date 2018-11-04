import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../reducers';
import { getTodoEntities } from '../../selectors/todo.selectors';
import { map, filter, first } from 'rxjs/operators';
import { Todo, TodoStatus } from '../../todo';
import { FormControl } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { SetTodoStatus } from '../../actions/todo.actions';
import { getTodoLoadingById, getTodoErrorById } from '../../selectors/ui.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list-todo',
  templateUrl: './todo.component.html',
  styles: [`
    mat-checkbox {
      display: flex;
      justify-content: center;
    }

    .completed {
      text-decoration: line-through;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {
  @Input() todoId: string;

  isLoading$ = this.Store.pipe(
    select(getTodoLoadingById),
    map((todoLoadingById) => !!todoLoadingById[this.todoId])
  );

  todoError$ = this.Store.pipe(
    select(getTodoErrorById),
    map((todoErrorById) => todoErrorById[this.todoId])
  );

  todo$ = combineLatest(
    this.Store.pipe(
      select(getTodoEntities),
      map((todoEntities) => todoEntities[this.todoId]),
      filter((todo) => !!todo)
    ),
    this.todoError$
  ).pipe(
    map(([todo, todoError]) => {
      if (todoError) {
        return { ...todo, ...todoError.changes };
      }
      return todo;
    })
  );

  todoControl = new FormControl();

  subscriptions = new Subscription();

  constructor(
    private Store: Store<State>,
    private Router: Router
  ) { }

  ngOnInit() {
    let sub = this.todo$.pipe(
      map((todo) => this.isCompleted(todo)),
      filter((isTodoCompleted) => isTodoCompleted !== this.todoControl.value)
    ).subscribe((isTodoCompleted) => {
      this.todoControl.reset(isTodoCompleted, { emitEvent: false });
    });
    this.subscriptions.add(sub);
    sub = this.todoControl.valueChanges
      .subscribe((value) => {
        this.Store.dispatch(new SetTodoStatus({ id: this.todoId, status: value ? TodoStatus.COMPLETED : TodoStatus.ACTIVE }))
      });
    this.subscriptions.add(sub);
    sub = this.todoError$.subscribe((error) => {
      error ? this.todoControl.disable({ emitEvent: false }) : this.todoControl.enable({ emitEvent: false });
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  isCompleted(todo: Todo) {
    return todo.status === TodoStatus.COMPLETED;
  }

  retry() {
    this.todoError$.pipe(first()).subscribe((error) => {
      if (error.changes && error.changes.status) {
        this.Store.dispatch(new SetTodoStatus({ id: this.todoId, status: error.changes.status }))
      }
    });
  }

  goToTodo(todo: Todo) {
    this.Router.navigate(['/todo', todo.id]);
  }
}
