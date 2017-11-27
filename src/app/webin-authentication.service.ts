// https://medium.com/@ryanchenkie_40935/angular-webin-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable()
export class WebinAuthenticationService {

  private username: string;
  private password: string;
  authenticated: boolean = false;
  account: string;
  ega: boolean;

  constructor(private http: HttpClient) { }

  getAuthorizationHeader() {
      console.info('** Webin authorization header **');
      return "Basic " + btoa(this.username + ':' + this.password);
  }

  public logout() {
    this.username = undefined;
    this.password = undefined;
    this.authenticated = false;
    this.account = false;
    this.ega = undefined;
  }

  public login(username: string, password: string) : Observable<any> {
    let baseUrl: string = environment.webinAuthenticationServiceUrl;
    console.log('** Webin authentication login **', baseUrl);

    this.username = username;
    this.password = password;

    let body = { authRealms: [ "SRA", "EGA" ], password: this.password, username: this.username };
    let headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', '*/*');

    return this.http.post(baseUrl, body, { headers, withCredentials: false });
  }
}
