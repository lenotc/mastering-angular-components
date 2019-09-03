import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input} from '@angular/core';
import {Project} from '../../model';

@Component({
  selector: 'mac-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent  {

  @Input() project: Project;

}
