import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../classes/task';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TaskService {
  private apiURL = `${environment.apiUrl}tasks/`;

  constructor(private http: HttpClient) {
  }

  public getTasks(): Observable<Task[]> {
    return this.http.get(this.apiURL)
      .map((tasks: any) => {
        return tasks.map(task => new Task(task.id, task.description));
      })
      .catch((err) => Observable.throw(new Error(`Cannot get tasks: ${err}`)));
  }

  public addTask(description: string): Observable<Task> {
    return this.http.post(this.apiURL, { description }).map((newTask: any) => {
      return new Task(newTask.id, newTask.description);
    });
  }

  public removeTask(taskId: number): Observable<any> {
    const url = `${this.apiURL}${taskId}/`;
    return this.http.delete(url);
  }

  public editTask(taskId: number, description: string): Observable<Task> {
    const url = `${this.apiURL}${taskId}/`;
    return this.http.put(url, { description }).map((updatedTask: any) => {
      return new Task(updatedTask.id, updatedTask.description);
    });
  }

}
