import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { getTodoEntities } from '../../selectors/todo.selectors';
import { map } from 'rxjs/operators';
import { Todo, TodoStatus } from '../../todo';

// Note to whoever see this:
// This component could get a complete todo instead of a just an id, and be a so-called "dumb component"
// But in this case, when a todo is updated, the list of todo is updated, and trigger an unecessary update in the todo list component.

// So the way it's currently done, only this component is updated
// Of course I can add a layer of container component, to have a pure "dumb component", but seriously, why (as long as todo is not a shared component) ? :)

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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {
  @Input() todoId: string;

  todo$ = this.Store.pipe(
    select(getTodoEntities),
    map((todoEntities) => todoEntities[this.todoId])
  )

  constructor(
    private Store: Store<State>
  ) { }

  ngOnInit() {
  }

  isCompleted(todo: Todo) {
    return todo.status === TodoStatus.COMPLETED
  }
}
