import {Injectable, Injector} from "@angular/core";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import { WebinAuthenticationService } from './webin-authentication.service';

@Injectable()
export class WebinAuthenticationInterceptor implements HttpInterceptor {

  private _baseUrlRegex = /.*drop-box\/submit\/.*/';

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.match(this._baseUrlRegex)) {
      console.info('WebinAuthenticationInterceptor');
      const webinAuthenticationService = this.injector.get(WebinAuthenticationService);
      const authReq = req.clone({headers: req.headers.set('Authorization', webinAuthenticationService.getAuthorizationHeader())});
      return next.handle(authReq);
    }
    else {
       return next.handle(req);
   }
}
