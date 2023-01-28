import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { MaterialModule } from '@myorg/material';
import { SharedModule } from '../../shared/shared.module';
import { ThreeGlobeProjectComponent } from './three-globe-project/three-globe-project.component';
import { DegreeProjectComponent } from './degree-project/degree-project.component';
import { DataAnalitysProjectComponent } from './data-analitys-project/data-analitys-project.component';
import { PortfolioProjectComponent } from './portfolio-project/portfolio-project.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ThreeGlobeProjectComponent,
    DegreeProjectComponent,
    DataAnalitysProjectComponent,
    PortfolioProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    BreadcrumbModule,
    MaterialModule,
    SharedModule,
  ]
})
export class ProjectsModule { }
