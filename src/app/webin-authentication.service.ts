// https://medium.com/@ryanchenkie_40935/angular-webin-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class WebinAuthenticationService {

  private _baseUrl = 'https://www-test.ebi.ac.uk/ena/submit/drop-box/submit/login';

  username: string = 'lbower@ebi.ac.uk';
  password: string = 'sausages';

  constructor(private http: HttpClient) { }

  public getAuthorizationHeader() {
      console.info('WebinAuthenticationService.getAuthorizationHeader()');
      return "Basic " + btoa(this.username + ':' + this.password);
  }

  headers() {
    return new HttpHeaders()
//      .append('Content-Type', 'multipart/form-data')
      .append("Authorization", getAuthorizationHeader())
//      .append("Content-Type", "application/x-www-form-urlencoded");
  }

  login(username: string, password: string) {
    this.username = username;
    this.password = password;

    const headers = this.headers();
    const formData: FormData = new FormData();
    this.http.post(this._baseUrl, formData, { headers, observe: 'response' })
      .subscribe(
        // Success.
        data => {
          console.log(`Webin authentication call to ${this._baseUrl} finished succesfully`);
        },
        // Errors.
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log(`Webin authentication call to ${this._baseUrl} finished with a client or network error ${err.error.message}`);
          }
          else {
            console.log(`Webin authentication call to ${this._baseUrl} finished with a server error code: ${err.status}, body was: ${err.error}`);
          }
      });


/*
    return this.http.post(WebinAuthenticationService.AUTH_TOKEN, body, {headers})
      .map(res => res.json())
      .map((res: any) => {
        if (res.access_token) {
          return res.access_token;
        }
        return null;
      });
  }
*/

}
