import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared.module';
import { TodoEffects } from './effects/todo.effects';
import { IndexComponent } from './index.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo-list/todo/todo.component';
import { moduleTodoReducer } from './reducers';
import { mockTodoApiProvider } from './api/mock-todo-api.service';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { GenericErrorComponent } from './generic-error/generic-error.component';

export const TODO_ROUTES: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: '', component: TodoListComponent },
      { path: ':id', component: TodoListComponent },
      { path: 'todo/:id', component: TodoCardComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    StoreModule.forFeature('module-todo', moduleTodoReducer),
    EffectsModule.forFeature([TodoEffects])
  ],
  declarations: [
    IndexComponent,
    TodoListComponent,
    TodoComponent,
    TodoCardComponent,
    GenericErrorComponent
  ],
  providers: [
    mockTodoApiProvider
  ]
})
export class TodoModule { }
