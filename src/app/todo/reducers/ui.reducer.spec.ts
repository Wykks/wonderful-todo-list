import { reducer, initialState } from './ui.reducer';
import { LoadTodosSuccess, LoadTodos, LoadTodosFailure } from '../actions/todo.actions';

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
    });
  });

  describe('LoadTodosFailure', () => {
    it('should clear loading and set error', () => {
      const error = new Error();
      const action = new LoadTodosFailure(error);

      const result = reducer(initialState, action);

      expect(result.loadingTodoList).toBe(false);
      expect(result.todoListError).toBe(error);
    });
  });
});
