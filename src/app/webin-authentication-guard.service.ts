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

import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { WebinAuthenticationService } from './webin-authentication.service';

@Injectable()
export class WebinAuthenticationGuardService  {

  constructor(private webinAuthenticationService: WebinAuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // console.log('WebinAuthenticationGuardService.canActivate');
    if (this.webinAuthenticationService.authenticated) {
      if (new Date() >=
        this.webinAuthenticationService.logoutDate) {
        // console.log('WebinAuthenticationGuardService: authentication timeout');
        this.webinAuthenticationService.logout();
        this.router.navigate(['login']);
        return false;
      } else {
        // console.log('WebinAuthenticationGuardService: authenticated');
        return true;
      }
    }

    // console.log('WebinAuthenticationGuardService: not authenticated');

    const url = state.url;
    console.log("URL ::");
    console.log(url);
    if (url.startsWith("/?page=")) {
      // console.log('WebinAuthenticationGuardService: set redirectUrl', url);
      this.webinAuthenticationService.redirectUrl = url;
    }



    this.router.navigate(['login']);
    return false;

  }
}
