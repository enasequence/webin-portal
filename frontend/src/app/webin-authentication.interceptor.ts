import {Injectable, Injector} from "@angular/core";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { WebinAuthenticationService } from './webin-authentication.service';
import { environment } from '../environments/environment';

@Injectable()
export class WebinAuthenticationInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.startsWith(environment.webinAuthenticationServiceUrl) &&
        !req.url.startsWith(environment.spreadsheetServiceUrl)) {
      console.info('** Webin authentication interceptor **');
      const webinAuthenticationService = this.injector.get(WebinAuthenticationService);
      const authReq = req.clone({headers: req.headers.set('Authorization', webinAuthenticationService.getAuthorizationHeader())});
      return next.handle(authReq);
    }
    else {
       return next.handle(req);
    }
  }
}
