import { reducer, initialState, selectTodoIds } from './todo.reducer';
import { LoadTodosSuccess } from '../actions/todo.actions';
import { TodoStatus } from '../todo';

describe('[Todo] Todo Reducer', () => {
  describe('LoadTodosSuccess', () => {
    it('should add new todos', () => {
      const action = new LoadTodosSuccess([
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
      ]);

      const result = reducer(initialState, action);

      expect(selectTodoIds(result)).toEqual(['1', '2']);
    });
  });
});
