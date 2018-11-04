import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, TodoStatus, NewTodo } from '../todo';

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

  getTodo(id: string) {
    return this.HttpClient.get<Todo>(`todo/${id}`);
  }

  changeTodoStatus(id: string, status: TodoStatus) {
    return this.HttpClient.put<void>(`todo/${id}/status/${status}`, null);
  }

  createTodo(todo: NewTodo) {
    return this.HttpClient.post<Todo>(`todo`, todo);
  }
}
