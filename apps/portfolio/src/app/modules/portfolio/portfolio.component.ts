/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  show:boolean;

  constructor() {
    this.show = true;
  }
}
