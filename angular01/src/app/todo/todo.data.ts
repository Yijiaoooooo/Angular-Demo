import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo.model';

export class InMemoryTodoDbService implements InMemoryDbService {
  createDb() {
      let todos: Todo[] = [];
      return todos;
  }
}
