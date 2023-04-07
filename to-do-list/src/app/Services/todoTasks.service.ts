import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoTasks } from '../model/TodoTasks';
import { Observable } from 'rxjs';

@Injectable()
export class TodoTasksService {
    elementApiurl = '';
    constructor(private http: HttpClient) { }

    getElements(): Observable<TodoTasks[]> {
        return this.http.get<TodoTasks[]>(this.elementApiurl);
    }

}