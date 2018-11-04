import { inject, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { LoadTodos, LoadTodosSuccess, LoadTodosFailure, SetTodoStatus, SetTodoStatusSuccess, SetTodoStatusFailure } from '../actions/todo.actions';
import { TodoApiService } from '../api/todo-api.service';
import { Todo, TodoStatus } from '../todo';
import { TodoEffects } from './todo.effects';
import { HttpErrorResponse } from '@angular/common/http';

describe('TodoEffects', () => {
  let actions$: Observable<any>;
  let effects: TodoEffects;

  let testTodos: Todo[];
  let getTodosSpy: jasmine.Spy;
  let changeTodoStatusSpy: jasmine.Spy;

  beforeEach(() => {
    testTodos = [
      {
        id: '1',
        title: 'Test',
        desc: '',
        status: TodoStatus.COMPLETED
      },
      {
        id: '2',
        title: 'Test2',
        desc: '',
        status: TodoStatus.ACTIVE
      }
    ]

    const todoApiService = jasmine.createSpyObj('TodoApiService', ['getTodos', 'changeTodoStatus']);
    getTodosSpy = todoApiService.getTodos.and.returnValue(of(testTodos));
    changeTodoStatusSpy = todoApiService.changeTodoStatus.and.returnValue(cold('--b', { b: undefined }));

    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        provideMockActions(() => actions$),
        { provide: TodoApiService, useValue: todoApiService }
      ]
    });

    effects = TestBed.get(TodoEffects);
  });

  describe('LoadTodos', () => {
    beforeEach(() => {
      const action = new LoadTodos();
      actions$ = hot('--a-', { a: action });
    });

    it('should load todos successfully', () => {
      const completion = new LoadTodosSuccess(testTodos);

      const expected = cold('--b', { b: completion });

      expect(effects.loadTodos$).toBeObservable(expected);
    });

    it('should handle error correctly ', () => {
      const error = new HttpErrorResponse({});
      const q$ = cold('-#|', null, error);
      getTodosSpy.and.returnValue(q$);

      const completion = new LoadTodosFailure(error);

      const expected = cold('---b', { b: completion });

      expect(effects.loadTodos$).toBeObservable(expected);
    });
  });

  describe('SetTodoStatus', () => {
    beforeEach(() => {
      const action = new SetTodoStatus({ id: '42', status: TodoStatus.ACTIVE });
      const action2 = new SetTodoStatus({ id: '43', status: TodoStatus.COMPLETED });
      actions$ = hot('--ab-', { a: action, b: action2 });
    });

    it('should change todo multiple status successfully', () => {
      const completion = new SetTodoStatusSuccess({ id: '42', status: TodoStatus.ACTIVE });
      const completion2 = new SetTodoStatusSuccess({ id: '43', status: TodoStatus.COMPLETED });

      const expected = cold('----bc', { b: completion, c: completion2 });

      expect(effects.changeTodoStatus$).toBeObservable(expected);
    });

    it('should handle multiple error correctly ', () => {
      const error = new HttpErrorResponse({});
      const q$ = cold('--#|', null, error);
      changeTodoStatusSpy.and.returnValue(q$);

      const completion = new SetTodoStatusFailure({ id: '42', status: TodoStatus.ACTIVE, error });
      const completion2 = new SetTodoStatusFailure({ id: '43', status: TodoStatus.COMPLETED, error });

      const expected = cold('----bc', { b: completion, c: completion2 });

      expect(effects.changeTodoStatus$).toBeObservable(expected);
    });
  });
});
