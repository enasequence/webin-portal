// https://medium.com/@ryanchenkie_40935/angular-webin-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable()
export class WebinAuthenticationService {

  private _baseUrl = environment.webinAuthenticationServiceUrl;

  private username: string;
  private password: string;
  authenticated: boolean = false;
  ega: boolean = false; // TODO

  constructor(private http: HttpClient) { }

  getAuthorizationHeader() {
      console.info('** Webin authorization header **');
      return "Basic " + btoa(this.username + ':' + this.password);
  }

  headers() {
    return new HttpHeaders()
      .append("Authorization", this.getAuthorizationHeader())
  }

  logout() {
    this.username = undefined;
    this.password = undefined;
    this.authenticated = false;

  }

  login(username: string, password: string) : Observable<any> {
    console.log('Webin authentication login');

    this.username = username;
    this.password = password;

    const headers = this.headers();
    return this.http.get(this._baseUrl, { headers, observe: 'response' });
  }
}
