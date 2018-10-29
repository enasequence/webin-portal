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
import { Router } from '@angular/router';
import { WebinAuthenticationService } from '../webin-authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';


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
    private _webinAuthenticationService: WebinAuthenticationService) { }

  ngOnInit() {
    //  console.log('LoginComponent.ngOnInit');
    if (this._webinAuthenticationService.authenticated) {
      this._router.navigateByUrl('');
    }
  }

  login() {
    this._webinAuthenticationService.logout();

    this._webinAuthenticationService.login(this.username, this.password).
    pipe(
      mergeMap(data => {
        // console.log('WebinAuthenticationService.login succeeded');
        this._webinAuthenticationService.ega = data.roles.EGA;
        this._webinAuthenticationService.account = data.principle;
        return this._webinAuthenticationService.loginToken(this.username, this.password);
      })
    ).
    subscribe(
        data => {
          // console.log('WebinAuthenticationService.loginToken succeeded');
          this._webinAuthenticationService.token = data;
          const redirectUrl = this._webinAuthenticationService.redirectUrl;
          if (redirectUrl) {
            this._router.navigateByUrl(redirectUrl);
            this._webinAuthenticationService.redirectUrl = null;
          }
          else {
            this._router.navigateByUrl('');
          }
        },
        // Errors.
        (err: HttpErrorResponse) => {
          this.error = true;
          this._webinAuthenticationService.authenticated = false;
          console.error(err);
        },
        () => {
          this.error = false;
          this._webinAuthenticationService.authenticated = true;
        }
      );
  }
}
