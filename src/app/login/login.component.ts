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

    private username: string;
    private password: string;
    private error: boolean = false;

    onSuccessfulLogin() {
      console.log(`Webin authentication succeeded`);
      this.error = false;
      this.webinAuthenticationService.authenticated = true;
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
        this.webinAuthenticationService.logout();
    }

    login() {
      this.webinAuthenticationService.logout();

      this.webinAuthenticationService.login(this.username, this.password)
        .subscribe(
          data => {
          },
          // Errors.
          (err: HttpErrorResponse) => {
            if (err.status == 200) {
              this.onSuccessfulLogin();
            }
            else if (err.error instanceof Error) {
              console.log(`Webin login finished with a client or network error ${err.error.message}`);
              this.onFailedLogin();
            }
            else {
              console.log(`Webin login finished with a server error code: ${err.status}, body was: ${err.error}`);
              this.onFailedLogin();
            }
        });
    }
}
