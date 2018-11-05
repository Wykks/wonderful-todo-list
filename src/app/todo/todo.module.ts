import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxMdModule } from 'ngx-md';
import { SharedModule } from '../shared.module';
import { mockTodoApiProvider } from './api/mock-todo-api.service';
import { TodoEffects } from './effects/todo.effects';
import { GenericErrorComponent } from './generic-error/generic-error.component';
import { IndexComponent } from './index.component';
import { moduleTodoReducer } from './reducers';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodoCreateDialogComponent } from './todo-create/todo-create-dialog.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo-list/todo/todo.component';

export const TODO_ROUTES: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full'
      },
      {
        path: 'todos', // Workaround longstanding angular bug..
        component: TodoListComponent,
        children: [
          {
            path: 'create',
            component: TodoCreateComponent,
            outlet: 'dialog'
          }
        ]
      },
      { path: 'detail/:id', component: TodoCardComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    StoreModule.forFeature('module-todo', moduleTodoReducer),
    EffectsModule.forFeature([TodoEffects]),
    NgxMdModule
  ],
  declarations: [
    IndexComponent,
    TodoListComponent,
    TodoComponent,
    TodoCardComponent,
    GenericErrorComponent,
    TodoCreateComponent,
    TodoCreateDialogComponent
  ],
  providers: [
    mockTodoApiProvider
  ],
  entryComponents: [
    TodoCreateDialogComponent
  ]
})
export class TodoModule { }
