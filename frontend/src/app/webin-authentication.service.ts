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
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable()
export class WebinAuthenticationService {

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

  get loginDate() {
    return JSON.parse(sessionStorage.getItem('loginDate'));
  }
  set loginDate(loginDate) {
    sessionStorage.setItem('loginDate', JSON.stringify(loginDate));
  }

  get logoutDate() {
    return JSON.parse(sessionStorage.getItem('logoutDate'));
  }
  set logoutDate(logoutDate) {
    sessionStorage.setItem('logoutDate', JSON.stringify(logoutDate));
  }

  constructor(private http: HttpClient) { }

  /*
  getAuthorizationHeader() {
      console.log('** Webin authorization header **');
      return 'Basic ' + btoa(this.username + ':' + this.password);
  }
  */

  getAuthorizationTokenHeader() {
      console.log('** Webin authorization token header **');
      return 'Bearer ' + this.token;
  }

  logout() {
    console.log('** logout **');

    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('account');
    sessionStorage.removeItem('ega');
    sessionStorage.removeItem('loginDate');
    sessionStorage.removeItem('logoutDate');
  }

  login(username: string, password: string): Observable<any> {
    const baseUrl: string = environment.webinAuthenticationServiceUrl;
    console.log('** Webin authentication login **', baseUrl);

    this.username = username;
    let today = new Date();
    this.loginDate = today;
    this.logoutDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);

    const body = { authRealms: [ 'SRA', 'EGA' ], password: password, username: this.username };
    const headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', '*/*');

    return this.http.post(baseUrl, body, { headers, withCredentials: false });
  }

  loginToken(username: string, password: string): Observable<any> {
    const baseUrl: string = environment.webinAuthenticationTokenUrl;
    console.log('** Webin authentication token **', baseUrl);

    this.username = username;
    let today = new Date();
    this.loginDate = today;
    this.logoutDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);

    const body = { authRealms: [ 'SRA', 'EGA' ], password: password, username: this.username };
    const headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', '*/*');

    return this.http.post(baseUrl, body, { headers, withCredentials: false, responseType: 'text' });
  }
}
