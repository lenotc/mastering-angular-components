import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Project} from '../model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

const url = 'http://localhost:8080/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects = new BehaviorSubject<Project[]>([]);
  private selectedProjectId = new BehaviorSubject<number>(1);
  private selectedProject: Observable<Project>;

  constructor(private http: HttpClient) {
    this.loadProjects();

    this.selectedProject = combineLatest(this.projects, this.selectedProjectId)
      .pipe(
        map(([projects, selectedProjectId]) => projects.find((project) => project.id === selectedProjectId))
      );
  }

  private loadProjects() {
    this.http.get<Project[]>(url).subscribe(projects => this.projects.next(projects));
  }

  selectProject(id: number) {
    this.selectedProjectId.next(id);
  }

  getSelectedProject(): Observable<Project> {
    return this.selectedProject;
  }
}
