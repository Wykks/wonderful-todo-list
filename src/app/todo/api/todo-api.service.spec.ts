import { TestBed } from '@angular/core/testing';

import { TodoApiService } from './todo-api.service';

describe('TodoApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should get todos', (next) => {
    const service: TodoApiService = TestBed.get(TodoApiService);
    service.getTodos()
      .subscribe((todos) => {
        expect(todos).toBeTruthy();
        next();
      });
  });
});
