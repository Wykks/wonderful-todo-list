import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { TodoActions, TodoActionTypes } from '../actions/todo.actions';
import { Todo } from '../todo';

export interface UiState {
  loadingTodoList: boolean;
  todoListError: Error | null;
}

export const initialState: UiState = {
  loadingTodoList: false,
  todoListError: null
}

export function reducer(state = initialState, action: TodoActions): UiState {
  switch (action.type) {
    case TodoActionTypes.LoadTodos:
      return { ...state, loadingTodoList: true, todoListError: null };
    case TodoActionTypes.LoadTodosSuccess:
      return { ...state, loadingTodoList: false };
    case TodoActionTypes.LoadTodosFailure:
      return { ...state, loadingTodoList: false, todoListError: action.payload };
    default:
      return state;
  }
}
