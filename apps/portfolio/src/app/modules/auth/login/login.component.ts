/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../../../services/http.service';
import { ShareService } from '../../../services/share.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  subscriptions: Subscription = new Subscription();
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  hide: boolean;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private shareService: ShareService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.hide = true;
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
        password: ['', Validators.required],
      }
    );
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.subscriptions.add(this.httpService.login(this.loginForm.value).subscribe({
        next: (res) => {
            sessionStorage.setItem('token', res.token);
            sessionStorage.setItem('user', JSON.stringify(res.user));
            this.subscriptions.add(this.shareService.changeStatusLogged(true));
            this.subscriptions.add(this.shareService.changeCurrentUser(res.user));
            this.router.navigateByUrl('/page/admin');
        },
        error: (error) => {
          this.openSnackBar('Without access');
        }
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  openSnackBar(msg: string): void {
    this._snackBar.open(msg, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
