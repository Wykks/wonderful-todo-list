import { HttpErrorResponse } from '@angular/common/http';
import { Dictionary } from '@ngrx/entity';
import produce from 'immer';
import { TodoActions, TodoActionTypes } from '../actions/todo.actions';
import { Todo } from '../todo';

export interface UiState {
  loadingTodoList: boolean;
  todoListLoaded: boolean;
  loadingTodoById: Dictionary<boolean>;
  errorTodoById: Dictionary<{ changes?: Partial<Todo>, error: number }>;
  todoListError: number | null;
}

export const initialState: UiState = {
  loadingTodoList: false,
  todoListLoaded: false,
  loadingTodoById: {},
  errorTodoById: {},
  todoListError: null
}

export function reducer(state = initialState, action: TodoActions): UiState {
  return produce(state, (draft) => {
    switch (action.type) {
      case TodoActionTypes.LoadTodos:
        draft.loadingTodoList = true;
        draft.todoListLoaded = false;
        draft.todoListError = null;
        break;
      case TodoActionTypes.LoadTodosSuccess:
        draft.loadingTodoList = false;
        draft.todoListLoaded = true;
        break;
      case TodoActionTypes.LoadTodosFailure:
        draft.loadingTodoList = false;
        draft.todoListError = action.payload.status;
        break;
      case TodoActionTypes.LoadTodo:
        draft.loadingTodoById[action.payload] = true;
        delete draft.errorTodoById[action.payload];
        break;
      case TodoActionTypes.LoadTodoSuccess:
        draft.loadingTodoById[action.payload.id] = false;
        delete draft.errorTodoById[action.payload.id];
        break;
      case TodoActionTypes.LoadTodoFailure:
        draft.loadingTodoById[action.payload.id] = false;
        if (action.payload.error.status !== 404) {
          draft.errorTodoById[action.payload.id] = {
            error: action.payload.error.status
          };
        }
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
          changes: { status: action.payload.status },
          error: action.payload.error.status
        };
        break;
    }
  });
}
