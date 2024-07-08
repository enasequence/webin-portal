import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AaiService} from '../aai/aai.service';

@Component({
  selector: 'app-elixir-login',
  templateUrl: './elixir.login.component.html',
  styleUrls: ['./elixir.login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ElixirLoginComponent {
  redirect: string;

  constructor(private aai: AaiService,
              private router: Router,
              private route: ActivatedRoute) {
    this.redirect = '/login';
    this.aai.userLoggedIn().subscribe(isLoggedIn => {
      console.log("Logged in 1");

      if (isLoggedIn) {
        this.navigate();
      }
    });
  }

  login(): void {
    this.aai.userLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        console.log("Logged in 2");

        this.navigate();
      } else {
        this.aai.startAuthentication(this.redirect);
      }
    });
  }

  navigate() {
    console.log("Navigate called");

    if (this.redirect) {
      console.log("Navigating to: " + this.redirect);

      this.router.navigateByUrl(this.redirect);
    } else {
      console.log("Navigating to login");

      this.router.navigateByUrl('/login');
    }
  }
}
