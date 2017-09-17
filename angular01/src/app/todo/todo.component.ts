import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  desc = '';
  todos: Todo[] = [];
  constructor(private service: TodoService) { }

  ngOnInit() {
  }
  addTodo() {
    this.service
        .addTodo(this.desc)
        .then(todo => {
          this.todos = [...this.todos, todo];
          this.desc = '';
        });
  }

  toggleTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service
        .toggleTodo(todo)
        .then(res => {
          this.todos = [...this.todos.slice(0, i), res, ...this.todos.slice(i + 1)];
        });
  }

  removeTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service
        .deleteTodoById(todo.id)
        .then(() => {
          this.todos = [...this.todos.slice(0, i), ...this.todos.slice(i + 1)]
        });
  }

  getTodos() {
    this.service
        .getTodos()
        .then(res => {
          this.todos = [...res];
        });
  }
}
