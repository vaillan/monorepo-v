/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'monorepo-v-whats-app',
  templateUrl: './whats-app.component.html',
  styleUrls: ['./whats-app.component.scss'],
})
export class WhatsAppComponent {
  @Input() cellPhoneNumber: number = 5951137646;
  @Input() text: string = "text=Solicitud%20de%20información";
  image_path: string = 'assets/img/whats-app.png';

  /**
   * Función para habrir ventana de whatsApp
   * 
   * @param urlWhatsApp 
   * @returns void
   */
  openWindow(urlWhatsApp:string): void {
    const url = `${urlWhatsApp}/${this.cellPhoneNumber}?${this.text}`;
    window.open(url, '_blank');
  }

}
