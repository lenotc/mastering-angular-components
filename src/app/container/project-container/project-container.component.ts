import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {ProjectService} from '../../project/project.service';
import {Observable} from 'rxjs';
import {Project} from '../../model';

@Component({
  selector: 'mac-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContainerComponent implements OnInit {

  selectedProject: Observable<Project>;

  constructor(private projectService: ProjectService) {
    this.selectedProject = projectService.getSelectedProject();
  }

  ngOnInit() {
  }

}
