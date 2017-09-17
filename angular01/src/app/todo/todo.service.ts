import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UUID } from 'angular2-uuid';

import 'rxjs/add/operator/toPromise';

import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  private api_url = 'api/todos';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  // POST/todos
  addTodo(desc: string): Promise<Todo> {
    const todo = {
      id: UUID.UUID(),
      desc: desc,
      completed: false
    };
    return this.http
               .post(this.api_url, JSON.stringify(todo), {headers: this.headers})
               .toPromise()
               .then(res => res.json().data as Todo)
               .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error(error);
    return Promise.reject(error.message || error );
  }

  // PUT/todos/:id
  toggleTodo(todo: Todo): Promise<Todo> {
    const url = `${this.api_url}/${todo.id}`;
    const updateTodo = Object.assign({}, todo, {completed: !todo.completed});
    return this.http
               .put(url, JSON.stringify(updateTodo), {headers: this.headers})
               .toPromise()
               .then(() => updateTodo)
               .catch(this.handleError);
  }

  // Delete/todos/:id
  deleteTodoById(id: string) {
    const url = `${this.api_url}/${id}`;
    return this.http
               .delete(url, {headers: this.headers})
               .toPromise()
               .then(() => null)
               .catch(this.handleError);
  }

  // GET/todos
  getTodos() {
    return this.http
               .get(this.api_url, {headers: this.headers})
               .toPromise()
               .then(res => res.json().data as Todo[])
               .catch(this.handleError);
  }

}
