import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, TodoStatus } from '../todo';

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

  changeTodoStatus(id: string, status: TodoStatus) {
    return this.HttpClient.put<void>(`todo/${id}/status/${status}`, null);
  }
}
