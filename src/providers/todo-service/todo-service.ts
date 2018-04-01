import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoService {
    private todos = [];
    private archivedTodos = [];

  constructor(public http: HttpClient) {
    console.log('Hello TodoServiceProvider Provider');
  }
  addTodo(todoText)
  {
      this.todos.push(todoText);
  }
  editTodo(todoText,todoIndex)
  {
      this.todos[todoIndex] = todoText;
  }
  getTodos()
  {
      return this.todos;
  }
  archivedTodo(todoIndex)
  {
      let todoTobeArchived = this.todos[todoIndex];
      this.todos.splice(todoIndex,1);
      this.archivedTodos.push(todoTobeArchived);
  }
  getArchivedTodos()
  {
      return this.archivedTodos;
  }

}
