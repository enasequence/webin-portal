import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WebinAuthenticationService } from '../webin-authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

     username: string;
     password: string;
     error = false;

    onSuccessfulLogin(data) {
      console.log(`Webin login succeeded`);
      this.error = false;
      this.webinAuthenticationService.authenticated = true;
      this.webinAuthenticationService.ega = data.roles.EGA;
      this.webinAuthenticationService.account = data.principle;

      this.webinAuthenticationService.loginToken(this.username, this.password)
        .subscribe(
          data => {
            this.onSuccessfulLoginToken(data);
          },
          // Errors.
          (err: HttpErrorResponse) => {
            this.onFailedLogin();
            console.error(err);
        });
    }

    onSuccessfulLoginToken(data) {
      console.log('Webin token succeeded');
      this.webinAuthenticationService.token = data;
      this.router.navigateByUrl('dashboard', { skipLocationChange: true });
    }

    onFailedLogin() {
      this.error = true;
      this.webinAuthenticationService.authenticated = false;
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private webinAuthenticationService: WebinAuthenticationService) { }

    ngOnInit() {
        // this.webinAuthenticationService.logout();

        if (this.webinAuthenticationService.authenticated) {
          this.router.navigateByUrl('dashboard', { skipLocationChange: true });
        }
    }

    login() {
      this.webinAuthenticationService.logout();

      this.webinAuthenticationService.login(this.username, this.password)
        .subscribe(
          data => {
            this.onSuccessfulLogin(data);
          },
          // Errors.
          (err: HttpErrorResponse) => {
            this.onFailedLogin();
            console.error(err);
        });
    }
}
