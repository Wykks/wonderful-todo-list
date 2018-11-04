import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';
import { Todo, TodoStatus } from '../todo';

@Injectable()
export class MockTodoApi implements HttpInterceptor {
  todosDb: Todo[] = [
    {
      id: '1',
      title: 'Detail a TODO',
      desc: `
        Display one of my todo in a separate or dedicated view.<br/>
        This todo will contain its title and a description (which is a new information not shown in the previous view).
      `,
      status: TodoStatus.ACTIVE
    },
    {
      id: '2',
      title: 'Add a new TODO',
      desc: 'Add a new todo in my list',
      status: TodoStatus.ACTIVE
    },
    {
      id: '3',
      title: 'More things TODO',
      desc: 'Do fancy stuff',
      status: TodoStatus.ACTIVE
    },
    {
      id: '4',
      title: 'Eat an apple',
      desc: 'Because why not',
      status: TodoStatus.ACTIVE
    },
    {
      id: '5',
      title: 'List my TODOs',
      desc: 'List my current todos',
      status: TodoStatus.COMPLETED
    },
    {
      id: '6',
      title: 'Change a TODO state',
      desc: 'Change a todo state by checking a "box"',
      status: TodoStatus.COMPLETED
    }
  ];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(
      delay(Math.floor(Math.random() * 1000)),
      mergeMap(() => {
        if (Math.floor(Math.random() * 4) === 0) {
          return throwError(new HttpErrorResponse({ status: 500 }));
        }
        if (request.method === 'GET') {
          if (request.url.endsWith('todos')) {
            return of(new HttpResponse({ status: 200, body: this.todosDb }));
          }
          const params = request.url.match(/^todo\/(.*)$/);
          if (params) {
            const id = params[1];
            const todo = this.todosDb.find((todo) => todo.id === id);
            if (!todo) {
              return throwError(new HttpErrorResponse({ status: 404 }));
            }
            return of(new HttpResponse({ status: 200, body: todo }));
          }
        }
        if (request.method === 'PUT') {
          const params = request.url.match(/^todo\/(.*)\/status\/(.*)$/);
          if (params) {
            const id = params[1];
            const status = <TodoStatus>params[2];
            const todo = this.todosDb.find((todo) => todo.id === id);
            if (!todo) {
              return throwError(new HttpErrorResponse({ status: 404 }));
            }
            todo.status = status;
            return of(new HttpResponse({ status: 200 }));
          }
        }
        return next.handle(request);
      })
    )
  }
}

export let mockTodoApiProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MockTodoApi,
  multi: true
};
