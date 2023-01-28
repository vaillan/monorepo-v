import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {

  @Input() lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };

  @Input() lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  @Input() lineChartLegend: boolean = true;

}
