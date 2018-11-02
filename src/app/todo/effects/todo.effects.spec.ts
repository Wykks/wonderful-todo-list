import { inject, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { LoadTodos, LoadTodosSuccess, LoadTodosFailure } from '../actions/todo.actions';
import { TodoApiService } from '../api/todo-api.service';
import { Todo, TodoStatus } from '../todo';
import { TodoEffects } from './todo.effects';

describe('TodoEffects', () => {
  let actions$: Observable<any>;
  let effects: TodoEffects;

  let testTodos: Todo[];
  let getTodosSpy: jasmine.Spy;

  beforeEach(() => {
    testTodos = [
      {
        id: '1',
        title: 'Test',
        status: TodoStatus.COMPLETED
      },
      {
        id: '2',
        title: 'Test2',
        status: TodoStatus.ACTIVE
      }
    ]

    const todoApiService = jasmine.createSpyObj('TodoApiService', ['getTodos']);
    getTodosSpy = todoApiService.getTodos.and.returnValue(of(testTodos));

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
      const error = new Error('Oops');
      const q$ = cold('-#|', null, error);
      getTodosSpy.and.returnValue(q$);

      const completion = new LoadTodosFailure(error);

      const expected = cold('---b', { b: completion });

      expect(effects.loadTodos$).toBeObservable(expected);
    });
  });
});
