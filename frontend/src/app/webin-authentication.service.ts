// https://medium.com/@ryanchenkie_40935/angular-webin-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable()
export class WebinAuthenticationService {

  private username: string;
  private password: string;
  token: string;
  authenticated = false;
  account: string;
  ega: boolean;
  loginDate;
  logoutDate;

  constructor(private http: HttpClient) { }

  getAuthorizationHeader() {
      console.log('** Webin authorization header **');
      return 'Basic ' + btoa(this.username + ':' + this.password);
  }

  /*
  getAuthorizationTokenHeader() {
      console.log('** Webin authorization token header **');
      return 'Bearer ' + this.token;
  }
  */

  public logout() {
    this.username = undefined;
    this.password = undefined;
    this.token = undefined;
    this.authenticated = false;
    this.account = undefined;
    this.ega = undefined;
    this.loginDate = undefined;
    this.logoutDate = undefined;
  }

  public login(username: string, password: string): Observable<any> {
    const baseUrl: string = environment.webinAuthenticationServiceUrl;
    console.log('** Webin authentication login **', baseUrl);

    this.username = username;
    this.password = password;
    this.loginDate = new Date();
    this.logoutDate = new Date();
    this.logoutDate.setDate(this.loginDate + 7);

    const body = { authRealms: [ 'SRA', 'EGA' ], password: this.password, username: this.username };
    const headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', '*/*');

    return this.http.post(baseUrl, body, { headers, withCredentials: false });
  }

  public loginToken(username: string, password: string): Observable<any> {
    const baseUrl: string = environment.webinAuthenticationTokenUrl;
    console.log('** Webin authentication token **', baseUrl);

    this.username = username;
    this.password = password;
    this.loginDate = new Date();
    this.logoutDate = new Date();
    this.logoutDate.setDate(this.loginDate + 7);

    const body = { authRealms: [ 'SRA', 'EGA' ], password: this.password, username: this.username };
    const headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', '*/*');

    return this.http.post(baseUrl, body, { headers, withCredentials: false, responseType: 'text' });
  }
}
