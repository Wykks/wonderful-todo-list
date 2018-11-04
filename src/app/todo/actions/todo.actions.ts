import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Todo, TodoStatus } from '../todo';

export enum TodoActionTypes {
  LoadTodos = '[Todo] Load Todos',
  LoadTodosSuccess = '[Todo] Load Todos Success',
  LoadTodosFailure = '[Todo] Load Todos Failure',
  SetTodoStatus = '[Todo] Set Todo Status',
  SetTodoStatusSuccess = '[Todo] Set Todo Status Success',
  SetTodoStatusFailure = '[Todo] Set Todo Status Failure',
  LoadTodo = '[Todo] Load Todo',
  LoadTodoSuccess = '[Todo] Load Todo Success',
  LoadTodoFailure = '[Todo] Load Todo Failure',
  AddTodo = '[Todo] Add Todo'
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

  constructor(public payload: HttpErrorResponse) { }
}

export class SetTodoStatus implements Action {
  readonly type = TodoActionTypes.SetTodoStatus;

  constructor(public payload: { id: string; status: TodoStatus }) { }
}

export class SetTodoStatusSuccess implements Action {
  readonly type = TodoActionTypes.SetTodoStatusSuccess;

  constructor(public payload: { id: string; status: TodoStatus }) { }
}

export class SetTodoStatusFailure implements Action {
  readonly type = TodoActionTypes.SetTodoStatusFailure;

  constructor(public payload: { id: string; error: HttpErrorResponse, status: TodoStatus }) { }
}

export class LoadTodo implements Action {
  readonly type = TodoActionTypes.LoadTodo;

  constructor(public payload: string) { }
}

export class LoadTodoSuccess implements Action {
  readonly type = TodoActionTypes.LoadTodoSuccess;

  constructor(public payload: Todo) { }
}

export class LoadTodoFailure implements Action {
  readonly type = TodoActionTypes.LoadTodoFailure;

  constructor(public payload: { id: string, error: HttpErrorResponse }) { }
}

export class AddTodo implements Action {
  readonly type = TodoActionTypes.AddTodo;

  constructor(public payload: Todo) { }
}

export type TodoActions =
  LoadTodos |
  LoadTodosSuccess |
  LoadTodosFailure |
  SetTodoStatus |
  SetTodoStatusSuccess |
  SetTodoStatusFailure |
  LoadTodo |
  LoadTodoSuccess |
  LoadTodoFailure |
  AddTodo;
