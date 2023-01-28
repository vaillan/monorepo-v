import { Component, HostBinding, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { ShareService } from 'src/app/services/share.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() sidenav: any;
  @Input() drawer: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isLarge$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  icon: string;
  subscriptions: Subscription = new Subscription();
  isLogged!: boolean;

  constructor(
    private themeService: ThemeService,
    private breakpointObserver: BreakpointObserver,
    private httpService: HttpService,
    private shareService: ShareService,
    private router: Router
  ) {
    this.icon = "navigate_before";
    this.subscriptions.add(this.shareService.isLogged$.subscribe((isLogged: boolean) => this.isLogged = isLogged));
  }

  ngOnInit() { }

  onThemeChange(e: boolean) {
    this.themeService.changeColorTheme(e);
  }

  fullScreen() {
    this.icon = this.icon == "navigate_before" ? "navigate_next" : "navigate_before";
  }

  logOut(): void {
    this.subscriptions.add(this.httpService.logOut().subscribe(res => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      this.subscriptions.add(this.shareService.changeStatusLogged(false));
      this.shareService.changeCurrentUser(null);
      this.router.navigateByUrl('/page');
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
