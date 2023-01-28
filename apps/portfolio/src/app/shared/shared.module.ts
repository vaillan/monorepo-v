import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeGlobeComponent } from './three-globe/three-globe.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { MaterialModule } from '@myorg/material';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { NotauthorizedComponent } from './notauthorized/notauthorized.component';

@NgModule({
  declarations: [
    ThreeGlobeComponent,
    BreadcrumbComponent,
    LineChartComponent,
    BarChartComponent,
    NotauthorizedComponent,
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    MaterialModule
  ],
  exports: [
    ThreeGlobeComponent,
    BreadcrumbComponent,
    LineChartComponent,
    BarChartComponent,
    NotauthorizedComponent,
  ]
})
export class SharedModule { }
