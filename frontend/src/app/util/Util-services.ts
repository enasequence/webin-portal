import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, startWith, map,debounceTime, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



@Injectable({
    providedIn: 'root'
  })
  export class UtilService {
    constructor(private httpClient: HttpClient) { }
  
    countries = <any>[];
  
    getCountries(prefix) {
      var url="http://localhost:8121/rest/country";
      if(prefix){
         url='http://localhost:8121/rest/country/suggest/'+prefix; 
      }
        this.httpClient.get<string[]>(url,{responseType: 'json' }).subscribe((data:any) => {
            this.countries = data  as any[];
          })
          return this.countries;
    }

    async saveSubmissionAccount(payload){
      return this.httpClient.post('http://localhost:8210/ena/webinauth/admin/submission-account', payload).
        pipe(
           map((data: Response) => {
             return data;
           })
        )
    }
      
    }
