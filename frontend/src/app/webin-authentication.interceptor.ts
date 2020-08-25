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

import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

import { WebinAuthenticationService } from './webin-authentication.service';
import { environment } from '../environments/environment';

@Injectable()
export class WebinAuthenticationInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  console.log(req.url);
  
    if (!req.url.startsWith(environment.webinAuthenticationServiceUrl) &&
        !req.url.startsWith(environment.webinReportServiceUrl + "/checklist-groups") &&
        !req.url.startsWith(environment.webinReportServiceUrl + "/checklists") &&
        !req.url.startsWith(environment.webinAuthenticationTokenUrl) &&
        !(req.url.startsWith(environment.webinAdminServiceUrl + "/submission-account") && req.method==="POST") &&
        !req.url.startsWith(environment.webinAdminServiceUrl + "/country") && 
        !req.url.startsWith(environment.pupMedUrl) && 
        !req.url.startsWith(environment.webinAdminServiceUrl + "/request-password-change") ) {
       //console.log('Webin authentication interceptor');
      const webinAuthenticationService = this.injector.get(WebinAuthenticationService);
      const authReq = req.clone({headers: req.headers.set('Authorization', webinAuthenticationService.getAuthorizationTokenHeader())});
      return next.handle(authReq);

    } else {
       return next.handle(req);
    }
  }
}
