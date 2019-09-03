import {Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Task} from '../../model';

@Component({
  selector: 'mac-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent {

  @Input() task: Task;
  @Output() outUpdateTask = new EventEmitter<Task>();

  @HostBinding('class.done')
  get done() {
    return this.task && this.task.done;
  }

  updateTask(done: boolean) {
    this.outUpdateTask.emit({...this.task, done});
  }
}
