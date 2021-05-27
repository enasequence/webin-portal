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

// https://medium.com/@ryanchenkie_40935/angular-webin-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { WebinAuthenticationServiceInterface } from './webin-authentication.service.interface';
import { WebinAuthenticationResultInterface } from './webin-authentication-result.interface';
import { UtilService } from './util/Util-services';

@Injectable()
export class WebinAuthenticationService implements WebinAuthenticationServiceInterface {

  redirectUrl: string;

  get username(): string {
    return sessionStorage.getItem('username');
  }
  set username(username: string) {
    sessionStorage.setItem('username', username);
  }

  get token(): string {
    return sessionStorage.getItem('token');
  }
  set token(token: string) {
    sessionStorage.setItem('token', token);
  }

  get authenticated(): boolean {
    if (sessionStorage['authenticated']) {
      return JSON.parse(sessionStorage.getItem('authenticated'));
    }
    return false;
  }
  set authenticated(authenticated: boolean) {
    sessionStorage.setItem('authenticated', JSON.stringify(authenticated));
  }

  get account(): string {
    return sessionStorage.getItem('account');
  }
  set account(account: string) {
    sessionStorage.setItem('account', account);
  }

  get ega(): boolean {
    return JSON.parse(sessionStorage.getItem('ega'));
  }
  set ega(ega: boolean) {
    sessionStorage.setItem('ega', JSON.stringify(ega));
  }

  get loginDate(): Date {
    return JSON.parse(sessionStorage.getItem('loginDate'));
  }
  set loginDate(loginDate: Date) {
    sessionStorage.setItem('loginDate', JSON.stringify(loginDate));
  }

  get logoutDate(): Date {
    return JSON.parse(sessionStorage.getItem('logoutDate'));
  }
  set logoutDate(logoutDate: Date) {
    sessionStorage.setItem('logoutDate', JSON.stringify(logoutDate));
  }



  constructor(private _http: HttpClient,
    private util: UtilService) { }

  /*
  getAuthorizationHeader() {
      console.log('** Webin authorization header **');
      return 'Basic ' + btoa(this.username + ':' + this.password);
  }
  */

  getAuthorizationTokenHeader() {
    //console.log('** Webin authorization token header **');
    return 'Bearer ' + this.token;
  }

  logout() {
    // console.log('logout');

    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('account');
    sessionStorage.removeItem('ega');
    sessionStorage.removeItem('loginDate');
    sessionStorage.removeItem('logoutDate');
    sessionStorage.removeItem('submissionAccount');

  }

  login(username: string, password: string): Observable<WebinAuthenticationResultInterface> {
    const baseUrl: string = environment.webinAuthUrl + "/login";
    // console.log('Webin authentication login', baseUrl);

    this.username = username;
    const today = new Date();
    this.loginDate = today;
    this.logoutDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

    const body = { authRealms: ['ENA', 'EGA'], password: password, username: this.username };
    const headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', '*/*');

    return this._http.post<WebinAuthenticationResultInterface>(baseUrl, body, { headers, withCredentials: false });
  }

  loginToken(username: string, password: string): Observable<string> {
    const baseUrl: string = environment.webinAuthUrl + "/token";
    // console.log('Webin authentication token', baseUrl);

    this.username = username;
    const today = new Date();
    this.loginDate = today;
    this.logoutDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

    const body = { authRealms: ['ENA', 'EGA'], password: password, username: this.username };
    const headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', '*/*');
    /*var txt=this._http.post(baseUrl, body, { headers, withCredentials: false, responseType: 'text' });
    console.log(txt)
    return txt;*/
    return this._http.post(baseUrl, body, { headers, withCredentials: false, responseType: 'text' });
  }

  getSubmissionAccount() {
    return sessionStorage.getItem('submissionAccount');
  }

  async setSubmissionAccount() {
    (await this.util.getAccountDetails()).
      subscribe((data: any) => {
        sessionStorage.setItem('submissionAccount', JSON.stringify(data));
      });
  }

  isBroker(): boolean {
    var submissionAccount = JSON.parse(
      sessionStorage.getItem('submissionAccount')
    );
    // Check if submissionAccount is not null in case of EGA user
    if (submissionAccount) {
      return submissionAccount["brokerName"] != "";
    }
    return false;
  }
}
