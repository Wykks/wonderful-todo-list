import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TodoActions, TodoActionTypes } from '../actions/todo.actions';
import { Todo, TodoStatus } from '../todo';

export interface TodoState extends EntityState<Todo> {
}

export function sortByStatus(a: Todo, b: Todo): number {
  return a.status === TodoStatus.ACTIVE ? 0 : 1;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: (todo: Todo) => todo.id,
  sortComparer: sortByStatus
});

export const initialState: TodoState = adapter.getInitialState({});

export function reducer(state = initialState, action: TodoActions): TodoState {
  switch (action.type) {
    case TodoActionTypes.LoadTodosSuccess:
      return adapter.addMany(action.payload, state);
    case TodoActionTypes.SetTodoStatusSuccess:
      return adapter.updateOne({ id: action.payload.id, changes: { status: action.payload.status } }, state);
    default:
      return state;
  }
}

const { selectIds, selectEntities } = adapter.getSelectors();

export const selectTodoIds = selectIds;
export const selectTodosEntities = selectEntities;
