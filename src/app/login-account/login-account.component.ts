import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { WebinAuthenticationService } from '../webin-authentication.service';

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginAccountComponent implements OnInit {

  constructor(private webinAuthenticationService: WebinAuthenticationService) { }

  ngOnInit() {
  }

}
