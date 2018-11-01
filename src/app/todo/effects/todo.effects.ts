import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TodoActionTypes, LoadTodosSuccess, LoadTodosFailure } from '../actions/todo.actions';
import { TodoApiService } from '../api/todo-api.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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

  constructor(
    private actions$: Actions,
    private TodoApiService: TodoApiService
  ) { }
}
