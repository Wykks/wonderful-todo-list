import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { metaReducers, reducers } from './reducers';
import { TODO_ROUTES, TodoModule } from './todo/todo.module';
import { environment } from 'src/environments/environment';

export const APP_ROUTES: Routes = [
  {
    path: '',
    children: TODO_ROUTES
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTES),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: 'Todo app',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    TodoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
