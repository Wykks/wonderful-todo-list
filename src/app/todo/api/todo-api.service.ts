import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../todo';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(
    private HttpClient: HttpClient
  ) { }

  getTodos() {
    return this.HttpClient.get<Todo[]>('todos');
  }
}
