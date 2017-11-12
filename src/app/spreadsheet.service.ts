// npm install file-saver --save
// npm install @types/file-saver --save

import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Rx';
//import 'rxjs/add/operator/toPromise';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

@Injectable()
export class SpreadsheetService {

  private _baseUrl = 'https://github.com/enasequence/sequencetools/blob/master/';

  constructor(private http: HttpClient) { }

  public download(name : string): Observable<Blob> {
      let url = this._baseUrl + '/' + name;
      console.info('Downloading spreadsheet: ' + url);
      return this.http.get(url, {responseType: 'blob'});
  }
}
