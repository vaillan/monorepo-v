import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { NotauthorizedComponent } from './shared/notauthorized/notauthorized.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/page",
    pathMatch: "full"
  },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: 'page',
        children: [
          {
            path: '',
            loadChildren: () => import("../app/modules/init/init.module").then(m => m.InitModule),
          },
          {
            path: 'projects',
            loadChildren: () => import("../app/modules//projects/projects.module").then(m => m.ProjectsModule)
          },
          {
            path: 'about',
            loadChildren: () => import("../app/modules/portfolio/portfolio.module").then(m => m.PortfolioModule)
          },
          {
            path: 'dahsboard',
            loadChildren: () => import("../app/modules/dashboard/dashboard.module").then(m => m.DashboardModule)
          },
          {
            path: 'admin',
            loadChildren: () => import("../app/modules/user-admin/user-admin.module").then(m => m.UserAdminModule),
            canMatch: [AuthGuard]
          },
          {
            path: 'login',
            loadChildren: () => import("../app/modules/auth/auth.module").then(m => m.AuthModule)
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
    ]
  },
  {
    path: "**",
    redirectTo: "/page"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
