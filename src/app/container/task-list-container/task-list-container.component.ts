import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Project, Task, TaskListFilterType} from '../../model';
import {TaskService} from '../../tasks/task.service';
import {map, switchMap, take} from 'rxjs/operators';
import {ProjectService} from '../../project/project.service';

@Component({
  selector: 'mac-task-list-container',
  templateUrl: './task-list-container.component.html',
  styleUrls: ['./task-list-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListContainerComponent {

  tasks: Observable<Task[]>;
  filteredTasks: Observable<Task[]>;
  selectedProject: Observable<Project>;
  taskFilterTypes: TaskListFilterType[] = ['all', 'done', 'open'];
  activeTaskFilterType = new BehaviorSubject<TaskListFilterType>('all');

  constructor(private taskService: TaskService,
              private projectService: ProjectService) {

    this.tasks = this.selectedProject.pipe(
      switchMap((project) => this.taskService.getProjectTasks(project.id))
    );

    this.selectedProject = this.projectService.getSelectedProject();

    this.filteredTasks = combineLatest(this.tasks, this.activeTaskFilterType).pipe(
      map(([tasks, activeTaskFilterType]) => {
        return tasks.filter((task: Task) => {
          if (activeTaskFilterType === 'all') {
            return true;
          } else if (activeTaskFilterType === 'open') {
            return !task.done;
          } else {
            return task.done;
          }
        });
      })
    );
  }

  activateFilterType(type: TaskListFilterType) {
    this.activeTaskFilterType.next(type);
  }

  addTask(title: string) {
    this.selectedProject
      .pipe(
        take(1)
      )
      .subscribe((project) => {
        const tasks: Task = {
          projectId: project.id, title, done: false
        };
        this.taskService.addTask(tasks);
      });
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task);
  }
}
