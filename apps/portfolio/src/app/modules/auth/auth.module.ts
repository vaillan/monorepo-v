import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '@myorg/material';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from '../../modules/auth/login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    BreadcrumbModule,
    SharedModule,
  ]
})
export class AuthModule { }
