import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.mode';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() item: Todo;

  @Output() editEvent: EventEmitter<Todo>;
  @Output() deleteEvent: EventEmitter<Todo>;
  @Output() completeEvent: EventEmitter<Todo>;

  public showStatus: boolean;
  public status: string;

  constructor() {
    this.editEvent = new EventEmitter<Todo>();
    this.deleteEvent = new EventEmitter<Todo>();
    this.completeEvent = new EventEmitter<Todo>();

    this.showStatus = false;
    this.status = '';
  }

  ngOnInit() {
    if (this.item.isDeleted) {
      this.showStatus = true;
      this.status = 'DELETED';
    } else if (this.item.isCompleted) {
      this.showStatus = true;
      this.status = 'COMPLETED';
    }
  }

  // text-white bg-success COMPLETED
  // text-white bg-danger IMPORTANT
  // text-white bg-secondary DELETED
  public getCardClass(): string {
    if (this.item.isDeleted) {
      return 'card text-white bg-secondary';
    } else if (this.item.isCompleted) {
      return 'card text-white bg-success';
    } else if (this.item.isImportant) {
      return 'card text-white bg-danger';
    } else {
      return 'card';
    }
  }

  public edit(): void {
    this.editEvent.emit(this.item);
  }

  public delete(): void {
    if (confirm('Are you to delete the todo item?')) {
      this.deleteEvent.emit(this.item);
    } else {
      // Do nothing...
    }
  }

  public complete(): void {
    if (this.item.isCompleted || this.item.isDeleted) {
      return;
    }

    this.completeEvent.emit(this.item);
  }
}
