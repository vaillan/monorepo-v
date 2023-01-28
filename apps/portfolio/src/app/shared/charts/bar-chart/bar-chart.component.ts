/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { ChartConfiguration } from "chart.js";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  
  @Input() barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true
  };

  @Input() barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  barChartLegend = true;
  barChartPlugins = [];


}
