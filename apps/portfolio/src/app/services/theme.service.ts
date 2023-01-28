import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private colorTheme = new BehaviorSubject(false);
  currentColorTheme = this.colorTheme.asObservable();

  public changeColorTheme(theme:boolean) {
    this.colorTheme.next(theme);
  }
}
