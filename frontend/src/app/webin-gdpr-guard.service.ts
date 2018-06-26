import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { WebinGdprService } from './webin-gdpr.service';

@Injectable()
export class WebinGdprGuardService implements CanActivate {

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
