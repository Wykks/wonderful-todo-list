import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TodoActions, TodoActionTypes } from '../actions/todo.actions';
import { Todo } from '../todo';

export interface TodoState extends EntityState<Todo> {
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: (todo: Todo) => todo.id,
  sortComparer: false
});

export const initialState: TodoState = adapter.getInitialState({});

export function reducer(state = initialState, action: TodoActions): TodoState {
  switch (action.type) {

    case TodoActionTypes.LoadTodosSuccess:
      return adapter.addMany(action.payload, state);
    default:
      return state;
  }
}

const { selectIds, selectEntities } = adapter.getSelectors();

export const selectTodoIds = selectIds;
export const selectTodosEntities = selectEntities;
