import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { NotauthorizedComponent } from '../shared/notauthorized/notauthorized.component';

const routes: Routes = [
  {
    path: 'page',
    children: [
      {
        path: '',
        loadChildren: () => import("../modules/init/init.module").then(m => m.InitModule),
      },
      {
        path: 'projects',
        loadChildren: () => import("../modules/projects/projects.module").then(m => m.ProjectsModule)
      },
      {
        path: 'about',
        loadChildren: () => import("../modules/portfolio/portfolio.module").then(m => m.PortfolioModule)
      },
      {
        path: 'dahsboard',
        loadChildren: () => import("../modules/dashboard/dashboard.module").then(m => m.DashboardModule)
      },
      {
        path: 'admin',
        loadChildren: () => import("../modules/user-admin/user-admin.module").then(m => m.UserAdminModule),
        canMatch: [AuthGuard]
      },
      {
        path: 'login',
        loadChildren: () => import("../modules/auth/auth.module").then(m => m.AuthModule)
      }
    ],
    data: {
      breadcrumb: 'Init page',
    },
  },
  {
    path: 'noauthorized',
    component: NotauthorizedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
