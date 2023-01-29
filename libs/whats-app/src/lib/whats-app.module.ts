/* eslint-disable @typescript-eslint/no-inferrable-types */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatsAppComponent } from './whats-app/whats-app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WHATS_APP_ICON } from './icons';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  declarations: [WhatsAppComponent],
  exports: [WhatsAppComponent],
})
export class WhatsAppModule {
  
  readonly WHATS_APP_SVG: string = WHATS_APP_ICON;

  constructor(
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry
  ) {
    this.matIconRegistry.addSvgIconLiteral("whats_app", this.setPath(this.WHATS_APP_SVG));
  }

  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustHtml(url);
  }
}
