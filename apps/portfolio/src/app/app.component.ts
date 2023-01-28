/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, HostBinding } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';
  isDark:any = false;
  @HostBinding('class')
  get themeMode() {
    return this.isDark ? 'dark-theme' : '';
  }

  constructor(private themeService: ThemeService) {
    this.themeService.currentColorTheme.subscribe(mode => {
      this.isDark = !this.isDark? mode :false;
    });
  }

}
