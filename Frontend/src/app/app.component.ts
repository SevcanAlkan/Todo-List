import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { Todo } from './models/todo.mode';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public items: Todo[];

  public showIsDeleted: boolean;
  public showIsCompleted: boolean;

  public showOnlyIsDeleted: boolean;
  public showOnlyIsCompleted: boolean;
  public showOnlyIsImportant: boolean;

  public editModeEnabled: boolean;
  public tempItem: Todo;

  public isLoading: boolean;

  constructor(private todoService: TodoService) {
    this.items = [];
    this.showIsCompleted = false;
    this.showIsDeleted = false;
    this.showOnlyIsDeleted = false;
    this.showOnlyIsCompleted = false;
    this.showOnlyIsImportant = false;
    this.editModeEnabled = false;
    this.tempItem = {} as Todo;
    this.isLoading = false;
  }

  ngOnInit() {
    this.loadTodoItems();
  }

  ngOnDestroy() {

  }

  public getItemCount(): number {
    return this.items.length;
  }

  public add(): void {
    this.tempItem = {} as Todo;
    this.editModeEnabled = true;
  }

  public edit(item: Todo): void {
    this.tempItem = item;
    this.editModeEnabled = true;
  }

  public delete(item: Todo): void {
    item.isDeleted = true;

    this.todoService.put(item.id, item)
      .pipe(catchError(err => {
        if (err) {
          console.error(err);
        }
        return of();
      }), retry(3)).subscribe(data => {
        if (data) {
          this.loadTodoItems();
        }
    });
  }

  public complete(item: Todo): void {
    item.isCompleted = true;

    this.todoService.put(item.id, item)
      .pipe(catchError(err => {
        if (err) {
          console.error(err);
        }
        return of();
      }), retry(3)).subscribe(data => {
        if (data) {
          this.loadTodoItems();
        }
    });
  }

  public completeEditing(): void {
    this.editModeEnabled = false;
    this.tempItem = {} as Todo;
    this.loadTodoItems();
  }

  public setShowOption(selection: number): void {
    this.showOnlyIsImportant = false;
    this.showOnlyIsDeleted = false;
    this.showOnlyIsCompleted = false;

    switch (selection) {
      case 1:
        this.showIsCompleted = !this.showIsCompleted;
        break;
      case 2:
        this.showIsDeleted = !this.showIsDeleted;
        break;
      default:
        break;
    }

    this.loadTodoItems();
  }

  public setShowOnly(selection: number): void {
    this.showIsDeleted = false;
    this.showIsCompleted = false;

    switch (selection) {
      case 1:
        this.showOnlyIsDeleted = !this.showOnlyIsDeleted;
        this.showOnlyIsCompleted = false;
        this.showOnlyIsImportant = false;
        break;
      case 2:
        this.showOnlyIsCompleted = !this.showOnlyIsCompleted;
        this.showOnlyIsDeleted = false;
        this.showOnlyIsImportant = false;
        break;
      case 3:
        this.showOnlyIsImportant = !this.showOnlyIsImportant;
        this.showOnlyIsDeleted = false;
        this.showOnlyIsCompleted = false;
        break;
      default:
        break;
    }

    this.loadTodoItems();
  }

  public clearFilters(): void {
    this.showOnlyIsImportant = false;
    this.showOnlyIsDeleted = false;
    this.showOnlyIsCompleted = false;
    this.showIsDeleted = false;
    this.showIsCompleted = false;

    this.loadTodoItems();
  }

  private loadTodoItems(): void {
    this.isLoading = true;

    this.todoService.get(this.showIsDeleted, this.showIsCompleted,
      this.showOnlyIsDeleted, this.showOnlyIsCompleted, this.showOnlyIsImportant)
      .subscribe(data => {
        if (data) {
        this.items = data as Todo[];
        this.isLoading = false;
      }
    });
  }
}
