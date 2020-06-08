import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './models/todo.mode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
  }

  public get(showIsDelete: boolean = false, showIsCompleted: boolean = false, showOnlyIsDeleted: boolean = false,
             showOnlyIsCompleted: boolean = false, showOnlyIsImportant: boolean = false): Observable<any> {
    const params = new HttpParams().set('showIsDelete', showIsDelete)
      .set('showIsCompleted', showIsCompleted)
      .set('showOnlyIsDeleted', showOnlyIsDeleted)
      .set('showOnlyIsCompleted', showOnlyIsCompleted)
      .set('showOnlyIsImportant', showOnlyIsImportant);

    return this.http.get<Todo[]>(environment.apiUrl + '/todo', { params });
  }

  public getById(id: number): Observable<any> {
    return this.http.get<Todo>(environment.apiUrl + `/todo/${id.toString()}`);
  }

  public post(model: Todo): Observable<any> {
    return this.http.post<Todo>(environment.apiUrl + `/todo`, model);
  }

  public put(id: number, model: Todo): Observable<any> {
    return this.http.put<Todo>(environment.apiUrl + `/todo/${id.toString()}`, model);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<void>(environment.apiUrl + `/todo/${id.toString()}`);
  }
}
