/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  formData: FormData;
  vendorsBlackList: Array<any>;
  url: string;
  windowCfg: string;
  windowReferencia: any;

  constructor() {
    const top = (window.screen.height / 2) - (600 / 2);
    const left = (window.screen.width / 2) - (800 / 2);
    this.formData = new FormData();
    this.vendorsBlackList = [];
    this.url = "https://angular.io/license";
    this.windowCfg = "resizable,scrollbars,status,width=800,height=600,top=" + top.toString() + "," + "left=" + left.toString();
  }

  /**
   * Método para habrir ventana emergente
   * 
   * @returns void
   */
  openWindow() {
    this.windowReferencia = window.open(this.url, "Angular CLI", this.windowCfg);
  }

  /**
   * Método para cerrar ventana emergente
   * 
   * @returns void
   */
  closeWindow() {
    if (this.windowReferencia && this.windowReferencia.window.opener && !this.windowReferencia.window.opener.closed) {
      this.windowReferencia.close();
    }
  }

}
