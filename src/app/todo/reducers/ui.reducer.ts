import { Dictionary } from '@ngrx/entity';
import produce from 'immer';
import { TodoActions, TodoActionTypes } from '../actions/todo.actions';
import { Todo } from '../todo';

export interface UiState {
  loadingTodoList: boolean;
  loadingTodoById: Dictionary<boolean>;
  errorTodoById: Dictionary<{ changes: Partial<Todo>, error: Error }>;
  todoListError: Error | null;
}

export const initialState: UiState = {
  loadingTodoList: false,
  loadingTodoById: {},
  errorTodoById: {},
  todoListError: null
}

export function reducer(state = initialState, action: TodoActions): UiState {
  return produce(state, (draft) => {
    switch (action.type) {
      case TodoActionTypes.LoadTodos:
        draft.loadingTodoList = true;
        draft.todoListError = null;
        break;
      case TodoActionTypes.LoadTodosSuccess:
        draft.loadingTodoList = false;
        break;
      case TodoActionTypes.LoadTodosFailure:
        draft.loadingTodoList = false;
        draft.todoListError = action.payload;
        break;
      case TodoActionTypes.SetTodoStatus:
        draft.loadingTodoById[action.payload.id] = true;
        delete draft.errorTodoById[action.payload.id];
        break;
      case TodoActionTypes.SetTodoStatusSuccess:
        delete draft.loadingTodoById[action.payload.id];
        delete draft.errorTodoById[action.payload.id];
        break;
      case TodoActionTypes.SetTodoStatusFailure:
        delete draft.loadingTodoById[action.payload.id];
        draft.errorTodoById[action.payload.id] = {
          changes: { status: action.payload.status},
          error: action.payload.error
        };
        break;
    }
  });
}
