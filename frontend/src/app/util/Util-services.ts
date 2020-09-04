import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, startWith, map,debounceTime, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpHeaders } from '../../../node_modules/@angular/common/http';



@Injectable({
    providedIn: 'root'
  })
  export class UtilService {
    constructor(private httpClient: HttpClient) { }
  
    getCountries(prefix) {
      var url=environment.webinAdminServiceUrl+"/country" +"?partialCountry="+prefix;
      return this.httpClient.get<string[]>(url,{responseType: 'json' });
    }

    saveSubmissionAccount(payload,editMode){
      if(editMode){
        return this.httpClient.put(environment.webinAdminServiceUrl+'/'+'submission-account', payload);
      }else{
        return this.httpClient.post(environment.webinAdminServiceUrl+'/'+'submission-account', payload);
        }
    }
    
    getAccountDetails(){
      return this.httpClient.get(environment.webinAdminServiceUrl+'/'+'submission-account');
    }

    deleteContact(contact){
      return this.httpClient.delete(environment.webinAdminServiceUrl+'/'+'submission-contact/' + contact["emailAddress"]);
    }

    saveNewContact(contact){
      return this.httpClient.post(environment.webinAdminServiceUrl+'/'+'submission-contact',contact);
    }

    sendResetPasswordRequest(resetPassReq){
      return this.httpClient.post(environment.webinAdminServiceUrl+'/'+'request-password-change',resetPassReq);
    }
    
    resetPassword(resetPassReq,token){
      return this.httpClient.put(environment.webinAdminServiceUrl+'/'+'change-password?token='+token,resetPassReq);
    }

    getPubMed(prefix) {
      var url=environment.pupMedUrl +"?query="+prefix+"&resultType=lite&cursorMark=*&format=json";
      return this.httpClient.get(url);
    }
    
    getPubMedById(id) {
      var url=environment.pupMedUrl +"?query=ext_id:"+id+"&resultType=lite&cursorMark=*&format=json";
      return this.httpClient.get(url);
    }

    getProjectDetails(projectId) {
      var url=environment.webinReportServiceUrl +"/projects/"+projectId;
      return this.httpClient.get(url);
    }

    getProjectXml(projectId) {
      var url=environment.webinReportServiceUrl +"/projects/xml/"+projectId;
      return this.httpClient.get(url,{ responseType: 'text' })
    }

    

    getId(){
      return Math.floor(1000 + Math.random() * 9000);
    }

    

}
