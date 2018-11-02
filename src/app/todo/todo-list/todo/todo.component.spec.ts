import { ComponentFixture, TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared.module';
import { LoadTodosSuccess, SetTodoStatus } from '../../actions/todo.actions';
import { moduleTodoReducer } from '../../reducers';
import { TodoStatus } from '../../todo';
import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let store: Store<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          'module-todo': combineReducers(moduleTodoReducer)
        }),
        SharedModule
      ],
      declarations: [TodoComponent]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should show a todo', () => {
    const action = new LoadTodosSuccess([{
      id: '1',
      title: 'Test',
      status: TodoStatus.COMPLETED
    }]);

    component.todoId = '1';
    store.dispatch(action);

    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('h4');
    expect(title.textContent).toContain('Test');
  });

  it('should dispach todo status change', () => {
    const action = new LoadTodosSuccess([{
      id: '1',
      title: 'Test',
      status: TodoStatus.COMPLETED
    }]);

    component.todoId = '1';
    store.dispatch(action);

    fixture.detectChanges();

    const box = fixture.nativeElement.querySelector('mat-checkbox input');
    box.click();

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(new SetTodoStatus({ id: '1', status: TodoStatus.ACTIVE }));
  });
});
