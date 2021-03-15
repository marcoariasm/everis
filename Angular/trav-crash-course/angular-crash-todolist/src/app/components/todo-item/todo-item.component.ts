import { Component, OnInit, Input } from '@angular/core';
import { Todo } from './../../models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo = {
    id: 0,
    title: 'Nada',
    completed: false,
  };

  constructor() { }

  ngOnInit(): void {
  }

  // Set Dynamic Classes
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }

    return classes;
  }

  onToggle(todo: Todo): void {
    console.log('toggle');
    todo.completed = !todo.completed;
  }

  onDelete(todo: Todo): void {
    console.log('delete');
    
  }

}
