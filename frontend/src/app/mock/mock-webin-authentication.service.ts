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

import { Observable } from 'rxjs';
import { WebinAuthenticationServiceInterface } from '../webin-authentication.service.interface';

export class MockWebinAuthenticationService implements WebinAuthenticationServiceInterface {

  username = 'Mock';
  token = 'Mock';
  authenticated = true;
  account = 'Mock';
  ega = false;
  loginDate = new Date();
  logoutDate = new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate() + 7);

  getAuthorizationTokenHeader() {
      return 'Bearer ' + this.token;
  }

  logout() {
    this.authenticated = false;
  }

  login(username: string, password: string): Observable<any> {
    this.authenticated = true;
    return null;
  }

  loginToken(username: string, password: string): Observable<any> {
    this.authenticated = true;
    return null;
  }
}
