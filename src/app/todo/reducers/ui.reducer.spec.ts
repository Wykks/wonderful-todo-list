import { reducer, initialState } from './ui.reducer';
import { LoadTodosSuccess, LoadTodos, LoadTodosFailure, SetTodoStatusSuccess, SetTodoStatusFailure, SetTodoStatus } from '../actions/todo.actions';
import { TodoStatus } from '../todo';
import { HttpErrorResponse } from '@angular/common/http';

describe('[Todo] Ui Reducer', () => {
  describe('LoadTodos', () => {
    it('should mark loading', () => {
      const action = new LoadTodos();

      const result = reducer(initialState, action);

      expect(result.loadingTodoList).toBe(true);
    });
  });

  describe('LoadTodosSuccess', () => {
    it('should clear loading and error', () => {
      const action = new LoadTodosSuccess([]);

      const result = reducer(initialState, action);

      expect(result.loadingTodoList).toBe(false);
      expect(result.todoListError).toBe(null);
      expect(result.todoListLoaded).toBe(true);
    });
  });

  describe('LoadTodosFailure', () => {
    it('should clear loading and set error', () => {
      const error = new HttpErrorResponse({status: 500});
      const action = new LoadTodosFailure(error);

      const result = reducer(initialState, action);

      expect(result.loadingTodoList).toBe(false);
      expect(result.todoListError).toBe(500);
    });
  });

  describe('SetTodoStatus', () => {
    it('should mark todo loading', () => {
      const action = new SetTodoStatus({ id: '42', status: TodoStatus.ACTIVE });

      const result = reducer(initialState, action);

      expect(result.loadingTodoById['42']).toBe(true);
      expect(result.errorTodoById['42']).toBeFalsy();
    });
  });

  describe('SetTodoStatusSuccess', () => {
    it('should clear loading and error of todo', () => {
      const action = new SetTodoStatusSuccess({ id: '42', status: TodoStatus.ACTIVE });

      const result = reducer(initialState, action);

      expect(result.loadingTodoById['42']).toBeFalsy();
      expect(result.errorTodoById['42']).toBeFalsy();
    });
  });

  describe('SetTodoStatusFailure', () => {
    it('should clear loading and set error of todo', () => {
      const error = new HttpErrorResponse({});
      const action = new SetTodoStatusFailure({ id: '42', status: TodoStatus.ACTIVE, error });

      const result = reducer(initialState, action);

      expect(result.loadingTodoById['42']).toBeFalsy();
      expect(result.errorTodoById['42']).toBeTruthy();
    });
  });
});
