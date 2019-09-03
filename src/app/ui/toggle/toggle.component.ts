import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {TaskListFilterType} from '../../model';

@Component({
  selector: 'mac-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToggleComponent implements OnInit {

  @Input() buttonList: TaskListFilterType[];
  @Input() activeButton: TaskListFilterType;
  @Output() outActivate = new EventEmitter<TaskListFilterType>();

  constructor() {
  }

  ngOnInit() {
    if (!this.activeButton) {
      this.activeButton = this.buttonList[0];
    }
  }

  activate(button: TaskListFilterType) {
    this.outActivate.emit(button);
  }
}
