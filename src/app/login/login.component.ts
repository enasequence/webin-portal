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

    onSuccessfulLogin(data) {
      console.log(`Webin authentication succeeded`);
      this.error = false;
      this.webinAuthenticationService.authenticated = true;
      this.webinAuthenticationService.ega = data.roles.EGA;
      this.webinAuthenticationService.account = data.principle;
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
            this.onSuccessfulLogin(data);
          },
          // Errors.
          (err: HttpErrorResponse) => {
            this.onFailedLogin();
            console.error(err);
        });
    }
}
