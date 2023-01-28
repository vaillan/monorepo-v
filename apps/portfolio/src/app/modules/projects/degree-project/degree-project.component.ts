/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../core/interfaces/user';
import { HttpService } from '../../../services/http.service';
import { ShareService } from '../../../services/share.service';

@Component({
  selector: 'app-degree-project',
  templateUrl: './degree-project.component.html',
  styleUrls: ['./degree-project.component.scss']
})
export class DegreeProjectComponent implements OnDestroy {

  subscriptions: Subscription = new Subscription();
  user!: User | null;

  constructor(
    private httpService: HttpService,
    private shareService: ShareService
  ) {
    this.subscriptions.add(this.shareService.currentUser$.subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error(error)
      }
    }));
  }

  downloadFile(): void {
    console.log(this.user);
    const data = { user_id: this.user?.id ? this.user?.id : 1 };
    this.subscriptions.add(this.httpService.downloadFile(data).subscribe({
      next: (res: any) => {
        const file = res.file;
        window.open(file.file_url, '_blank');
      },
      error: (error) => {
        console.error(error);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
