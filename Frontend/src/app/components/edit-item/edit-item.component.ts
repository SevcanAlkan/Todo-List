import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/todo.mode';
import { TodoService } from 'src/app/todo.service';
import { catchError, retry } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit, OnDestroy, OnChanges {

  @Input() item: Todo;

  @Output() completeEvent: EventEmitter<boolean>;

  public todoForm: FormGroup;
  public isSubmitting;

  constructor(private todoService: TodoService) {
    this.completeEvent = new EventEmitter<boolean>();
    this.isSubmitting = false;
  }

  ngOnInit() {
    this.todoForm = new FormGroup({
      id: new FormControl(0, []),
      title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      description: new FormControl('', [Validators.maxLength(250)]),
      isDeleted: new FormControl(false, []),
      isCompleted: new FormControl(false, []),
      isImportant: new FormControl(false, [])
    });

    if (this.item) {
      this.todoForm.patchValue(this.item);
    }
  }

  ngOnDestroy() {
    this.isSubmitting = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.item && !changes.item.firstChange) {
      this.todoForm.patchValue(changes.item.currentValue);
    }
  }

  public submit(): void {
    this.isSubmitting = true;

    this.todoForm.markAllAsTouched();
    this.todoForm.markAsDirty();

    if (this.todoForm.valid) {
      let model = this.todoForm.value as Todo;
      let isNew = false;

      if (model.id === 0) {
        model.id = null;
        isNew = true;
      }

      if (isNew) {
      this.todoService.post(model)
        .pipe(catchError(err => {
          if (err) {
            console.error(err);
            this.isSubmitting = false;
          }
          return of();
        }), retry(3)).subscribe(data => {
          if (data) {
            this.completeEvent.emit(true);
          }
        });
      } else {
        this.todoService.put(model.id, model)
        .pipe(catchError(err => {
          if (err) {
            console.error(err);
            this.isSubmitting = false;
          }
          return of();
        }), retry(3)).subscribe(data => {
          if (data) {
            this.completeEvent.emit(true);
          }
        });
      }

    } else {
      alert('Form is not valid!');
      this.isSubmitting = false;
    }

  }

  public cancel(): void {
    this.isSubmitting = true;

    this.completeEvent.emit(true);
  }
}
