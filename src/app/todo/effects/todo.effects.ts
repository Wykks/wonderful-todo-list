import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import {
  LoadTodo,
  LoadTodoFailure,
  LoadTodosFailure,
  LoadTodosSuccess,
  LoadTodoSuccess,
  SetTodoStatus,
  SetTodoStatusFailure,
  SetTodoStatusSuccess,
  TodoActionTypes
} from '../actions/todo.actions';
import { TodoApiService } from '../api/todo-api.service';

@Injectable()
export class TodoEffects {

  @Effect()
  loadTodos$ = this.actions$.pipe(
    ofType(TodoActionTypes.LoadTodos),
    switchMap(() =>
      this.TodoApiService.getTodos().pipe(
        map((todos) =>
          new LoadTodosSuccess(todos)
        ),
        catchError((error) =>
          of(new LoadTodosFailure(error))
        )
      )
    )
  );

  @Effect()
  loadTodo$ = this.actions$.pipe(
    ofType<LoadTodo>(TodoActionTypes.LoadTodo),
    mergeMap((action) =>
      this.TodoApiService.getTodo(action.payload).pipe(
        map((todo) =>
          new LoadTodoSuccess(todo)
        ),
        catchError((error) =>
          of(new LoadTodoFailure({ id: action.payload, error }))
        )
      )
    )
  );

  @Effect()
  changeTodoStatus$ = this.actions$.pipe(
    ofType<SetTodoStatus>(TodoActionTypes.SetTodoStatus),
    mergeMap((action) =>
      this.TodoApiService.changeTodoStatus(action.payload.id, action.payload.status).pipe(
        map(() =>
          new SetTodoStatusSuccess(action.payload)
        ),
        catchError((error) =>
          of(new SetTodoStatusFailure({ id: action.payload.id, error, status: action.payload.status }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private TodoApiService: TodoApiService
  ) { }
}
