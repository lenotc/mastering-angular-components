import {Injectable} from '@angular/core';
import {Task} from '../model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

const url = 'http://localhost:8080/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  private loadTasks() {
    this.http.get<Task[]>(url).subscribe((tasks) => this.tasks.next(tasks));
  }

  getTasks(): Observable<Task[]> {
    return this.tasks.asObservable();
  }

  addTask(task: Task) {
    return this.http.post<Task>(url, task).subscribe(() => this.loadTasks());
  }

  updateTask(task: Task) {
    return this.http.put<Task>(`${url}/${task.id}`, task).subscribe(() => this.loadTasks());
  }


  getProjectTasks(projectId: number) {
    return this.tasks.asObservable()
      .pipe(
        map((tasks) => tasks.filter((task) => task.projectId === projectId)
        )
      );
  }
}
