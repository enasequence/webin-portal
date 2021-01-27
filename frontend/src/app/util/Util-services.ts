import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, startWith, map,debounceTime, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';




@Injectable({
    providedIn: 'root'
  })
  export class UtilService {
    constructor(private httpClient: HttpClient,
      ) { }
  
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

    downloadExcelTemplate(checklistJson){
      return this.httpClient.post(environment.webinXmlReportServiceUrl+'/tab/spreadsheet',checklistJson,{responseType: 'arraybuffer'});
    }

    downloadTsvTemplate(checklistJson){
      return this.httpClient.post(environment.webinXmlReportServiceUrl+'/tab/tsv',checklistJson,{responseType: 'arraybuffer'});
    }

    getFileName(checklist,extension){
      return checklist.checklistType+"_"+checklist.checklistFieldName.replace(" ","-")+"_"+new Date().getTime()+extension;
    }

    getFileNameByTemplate(template,extension){
      return template.replace(/\s/g,"-")+"_template_"+new Date().getTime()+extension;
    }

    getId(){
      return Math.floor(1000 + Math.random() * 9000);
    }

    getTweet(){

     /* var url="https://api.twitter.com/1.1/search/tweets.json?q=enasequence&result_type=popular";
      var twitterToken="AAAAAAAAAAAAAAAAAAAAACHPOQAAAAAAK%2FQU%2BR0MB%2BcMXOiWrljWlX3%2BZ%2BU%3DFV9fOpABfT8s69ntGFAUNPwEf6fgcvNk3svOBfYXlKRsuEvUWd";
      var headers = new Headers();
      headers.append('Authorization', 'Bearer '+twitterToken);

    return this.httpClient.jsonp(url,'callback');*/

    }
     
    
    

}
