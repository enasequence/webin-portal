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

import { WebinGdprService } from './webin-gdpr.service';

@Injectable()
export class WebinGdprGuardService  {

  constructor(private webinGdprService: WebinGdprService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
    /*
    console.log('WebinGdprGuardService');

    if (this.webinGdprService.consented) {
      console.log('WebinGdprGuardService: consented');
      return true;
    }
    else {
      this.router.navigate(['consent']);
      return false;
    }
    */
  }
}
