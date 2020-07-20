import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, startWith, map,debounceTime, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



@Injectable({
    providedIn: 'root'
  })
  export class UtilService {
    constructor(private httpClient: HttpClient) { }
  
    async getCountries(prefix) {
      var url=environment.webinAdminServiceUrl+"/country" +"?partialCountry="+prefix;
      return this.httpClient.get<string[]>(url,{responseType: 'json' }).pipe(map((data:any) => {
        return data;
      }));
         
    }

    async saveSubmissionAccount(payload,editMode){
      if(editMode){
        return this.httpClient.put(environment.webinAdminServiceUrl+'/'+'submission-account', payload).
        pipe(
           map((data: Response) => {
             return data;
           })
        )
      }else{
        return this.httpClient.post(environment.webinAdminServiceUrl+'/'+'submission-account', payload).
        pipe(
           map((data: Response) => {
             return data;
           })
        )
        }
    }
    
    async getAccountDetails(){
      return this.httpClient.get(environment.webinAdminServiceUrl+'/'+'submission-account').
        pipe(
           map((data: Response) => {
             return data;
           })
        )
    }

    async deleteContact(contact){
      return this.httpClient.delete(environment.webinAdminServiceUrl+'/'+'submission-contact/' + contact["emailAddress"]).
        pipe(
           map((data: Response) => {
             return data;
           })
        )
    }

    async saveNewContact(contact){
      return this.httpClient.post(environment.webinAdminServiceUrl+'/'+'submission-contact/create',contact).
        pipe(
           map((data: Response) => {
             return data;
           })
        )
    }
      
    getId(){
      return Math.floor(1000 + Math.random() * 9000);
    }

    }
