import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class WebinGdprService {

  private _baseUrl = environment.webinGdprServiceUrl;

  // TODO check consent
  consented = false;

  constructor(private http: HttpClient, private router: Router) { }

  public consent() {
    console.log('** Webin consent **', this._baseUrl);

    this.consented = true;

    // TODO set consent

    this.router.navigateByUrl('dashboard', { skipLocationChange: true });
  }
}
