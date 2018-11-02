import { TodoActions, TodoActionTypes } from '../actions/todo.actions';

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
