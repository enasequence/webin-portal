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
            if (err.status == 200) { // TODO: Angular bug caused by am empty JSON response
              this.onSuccessfulLogin();
            }
            else {
              this.onFailedLogin();
              console.error(err);
            }
        });
    }
}
