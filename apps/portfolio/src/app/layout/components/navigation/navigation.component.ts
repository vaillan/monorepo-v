import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnDestroy {

  isLoggedIn!: boolean;
  subscriptions: Subscription = new Subscription();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private shareService: ShareService) {
    this.subscriptions.add(this.shareService.isLogged$.subscribe(isLogged => this.isLoggedIn = isLogged));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
