import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdminRoutingModule } from './user-admin-routing.module';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { MaterialModule } from '@myorg/material';
import { SharedModule } from '../../shared/shared.module';

//Components
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    UserAdminRoutingModule,
    BreadcrumbModule,
    MaterialModule,
    SharedModule,
  ]
})
export class UserAdminModule { }
