import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DegreeProjectComponent } from './degree-project/degree-project.component';
import { PortfolioProjectComponent } from './portfolio-project/portfolio-project.component';
import { ProjectsComponent } from './projects.component';
import { ThreeGlobeProjectComponent } from './three-globe-project/three-globe-project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
  },
  {
    path: 'three-globe',
    component: ThreeGlobeProjectComponent,
    data: {
      breadcrumb: 'Tree js data visualization project',
    },
  },
  {
    path: 'industria4.0',
    component: DegreeProjectComponent,
    data: {
      breadcrumb: 'Industry 4.0'
    }
  },
  {
    path: 'portfolio',
    component: PortfolioProjectComponent,
    data: {
      breadcrumb: 'Portfolio'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
