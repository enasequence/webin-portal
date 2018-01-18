import { Injectable }     from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { WebinAuthenticationService } from './webin-authentication.service';

@Injectable()
export class WebinAuthenticationGuardService implements CanActivate {

  constructor(private webinAuthenticationService: WebinAuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('WebinAuthenticationGuardService');
     // let url: string = state.url;
    if (this.webinAuthenticationService.authenticated) {
      console.log('WebinAuthenticationGuardService: authenticated');
      return true;
    }

    console.log('WebinAuthenticationGuardService: not authenticated');
    this.router.navigate(['']);
    return false;
  }
}
