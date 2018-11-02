import { TodoState, reducer as todoReducer } from './todo.reducer';
import { UiState, reducer as uiReducer } from './ui.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface ModuleTodoState {
  ui: UiState
  todo: TodoState
}

export interface State {
  'module-todo': ModuleTodoState;
}

export const moduleTodoReducer: ActionReducerMap<ModuleTodoState, any> = {
  ui: uiReducer,
  todo: todoReducer
}
