import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Output() switchMode:EventEmitter<boolean> = new EventEmitter<boolean>();

  icon: string;
  isDark: any;

  constructor(private themeService: ThemeService) {
    this.icon = "wb_sunny";
    this.themeService.currentColorTheme.subscribe(mode => {
      this.isDark = mode;
      this.icon = !this.isDark? "wb_sunny" : "mode_night";
    });
  }

  onChangeTheme() {
    this.switchMode.emit(this.icon == "wb_sunny" ? true: false);
  }
}
