export enum TodoStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed'
}

export interface Todo {
  id: string;
  status: TodoStatus;
  title: string;
  desc: string;
}

export type NewTodo = Pick<Todo, Exclude<keyof Todo, 'id' | 'status'>>;
