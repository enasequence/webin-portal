/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

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

  constructor(
    private _router: Router,
    private _webinAuthenticationService: WebinAuthenticationService) {
  }

  ngOnInit() {
    if (this._webinAuthenticationService.authenticated) {
      this._router.navigateByUrl('dashboard', { skipLocationChange: true });
    }
  }

  onSuccessfulLogin(loginData) {
    console.log(`Webin login succeeded`);
    this.error = false;
    this._webinAuthenticationService.authenticated = true;
    this._webinAuthenticationService.ega = loginData.roles.EGA;
    this._webinAuthenticationService.account = loginData.principle;

    this._webinAuthenticationService.loginToken(this.username, this.password)
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
    this._webinAuthenticationService.token = data;
    this._router.navigateByUrl('dashboard', { skipLocationChange: true });
  }

  onFailedLogin() {
    this.error = true;
    this._webinAuthenticationService.authenticated = false;
  }

  login() {
    this._webinAuthenticationService.logout();

    this._webinAuthenticationService.login(this.username, this.password)
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
