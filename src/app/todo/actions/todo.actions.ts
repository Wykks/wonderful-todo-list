import { Action } from '@ngrx/store';
import { Todo } from '../todo';

export enum TodoActionTypes {
  LoadTodos = '[Todo] Load Todos',
  LoadTodosSuccess = '[Todo] Load Todos Success',
  LoadTodosFailure = '[Todo] Load Todos Failure'
}

export class LoadTodos implements Action {
  readonly type = TodoActionTypes.LoadTodos;
}

export class LoadTodosSuccess implements Action {
  readonly type = TodoActionTypes.LoadTodosSuccess;

  constructor(public payload: Todo[]) { }
}

export class LoadTodosFailure implements Action {
  readonly type = TodoActionTypes.LoadTodosFailure;

  constructor(public payload: Error) { }
}

export type TodoActions =
  LoadTodos |
  LoadTodosSuccess |
  LoadTodosFailure;
