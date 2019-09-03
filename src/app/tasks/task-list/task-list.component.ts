import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {TaskService} from '../task.service';
import {Task, TaskListFilterType} from '../../model';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'mac-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {

  @Input()
  taskFilterTypes: TaskListFilterType[];
  @Input()
  activeTaskFilterType: TaskListFilterType;
  @Input()
  tasks: Task[];
  @Output()
  outAddTask = new EventEmitter<string>();
  @Output()
  outActivateFilterType = new EventEmitter<TaskListFilterType>();
  @Output()
  outUpdateTask = new EventEmitter<Task>();

  activateFilterType(type: TaskListFilterType) {
    this.outActivateFilterType.emit(type);
  }

  addTask(title: string) {
    this.outAddTask.emit(title);
  }

  updateTask(task: Task) {
    this.outUpdateTask.emit(task);
  }
}
