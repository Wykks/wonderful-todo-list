import { reducer, initialState, selectTodoIds, selectTodosEntities } from './todo.reducer';
import { LoadTodosSuccess, SetTodoStatusSuccess } from '../actions/todo.actions';
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
  describe('SetTodoStatusSuccess', () => {
    it('should change todo status', () => {
      const state1 = reducer(initialState, new LoadTodosSuccess([{
        id: '1',
        title: 'Test',
        status: TodoStatus.COMPLETED
      }]));

      const result = reducer(state1, new SetTodoStatusSuccess({
        id: '1',
        status: TodoStatus.ACTIVE
      }));

      const todo = selectTodosEntities(result)['1'];
      expect(todo).toBeTruthy();
      expect(todo.status).toBe(TodoStatus.ACTIVE);
    });
  });
});
