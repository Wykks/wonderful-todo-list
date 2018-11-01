import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared.module';
import { TodoEffects } from './effects/todo.effects';
import { IndexComponent } from './index.component';
import * as fromTodo from './reducers/todo.reducer';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo-list/todo/todo.component';
import { moduleTodoReducer } from './reducers';
import { mockTodoApiProvider } from './api/mock-todo-api.service';

export const TODO_ROUTES: Routes = [
  { path: '', component: IndexComponent }
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('module-todo', moduleTodoReducer),
    EffectsModule.forFeature([TodoEffects])
  ],
  declarations: [IndexComponent, TodoListComponent, TodoComponent],
  providers: [
    mockTodoApiProvider
  ]
})
export class TodoModule { }
