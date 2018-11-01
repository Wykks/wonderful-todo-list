import * as cuid from 'cuid';
import { Todo, TodoStatus } from '../todo';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { mergeMap, delay } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';

@Injectable()
export class MockTodoApi implements HttpInterceptor {
  todosDb: Todo[] = [
    {
      id: cuid(),
      title: 'List my TODOs',
      status: TodoStatus.COMPLETED
    },
    {
      id: cuid(),
      title: 'Change a TODO state',
      status: TodoStatus.ACTIVE
    },
    {
      id: cuid(),
      title: 'Detail a TODO',
      status: TodoStatus.ACTIVE
    },
    {
      id: cuid(),
      title: 'Add a new TODO',
      status: TodoStatus.ACTIVE
    },
    {
      id: cuid(),
      title: 'More things TODO',
      status: TodoStatus.ACTIVE
    },
    {
      id: cuid(),
      title: 'Eat an apple',
      status: TodoStatus.ACTIVE
    }
  ];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(
      delay(Math.floor(Math.random() * 1000)),
      mergeMap(() => {
        if (Math.floor(Math.random() * 4) === 0) {
          return throwError({ error: { message: '' } });
        }
        if (request.url.endsWith('todos') && request.method === 'GET') {
          return of(new HttpResponse({ status: 200, body: this.todosDb }));
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
