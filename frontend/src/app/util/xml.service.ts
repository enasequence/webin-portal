import { Injectable } from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { WebinAuthenticationService } from '../webin-authentication.service';
import { WebinRestService } from '../webin-rest.service';
import { ReportType } from '../report-type.enum';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilService } from '../util/Util-services';
import { PopupMessageComponent } from '../popup-message/popup-message.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class XmlService {

  constructor(
    public dialog: MatDialog,
    private _webinAuthenticationService:WebinAuthenticationService,
    private _webinRestService:WebinRestService,
    private util:UtilService) { }

  generateStudyXml(form,selectedPubMedArray){

    let pubMedXml=this.getPubMedXmlTags(selectedPubMedArray);
    let alias=this.getAlias();

    let projectXml=new Blob(['<?xml version = "1.0" encoding = "UTF-8"?>'+
      '<PROJECT_SET>'+
        '<PROJECT alias="'+alias+'">'+
          '<NAME>'+form.studyName+'</NAME>'+
          '<TITLE>'+form.studyTitle+'</TITLE>'+
          '<DESCRIPTION>'+form.description+'</DESCRIPTION>'+
          '<SUBMISSION_PROJECT>'+
            '<SEQUENCING_PROJECT/>'+
	        '</SUBMISSION_PROJECT>'+
                 pubMedXml+
        '</PROJECT>'+
      '</PROJECT_SET>'])

    let dateStr=this.getFormatedReleseDate(new Date(form.releaseDate));
    const observable: Observable<string>=this._webinRestService.updateXml(ReportType.projects,projectXml,'Add',dateStr)
    this.handleServerResponse(observable);
  }

  

 getPubMedXmlTags(selectedPubMedArray){
   let pubmedXml="<PROJECT_LINKS>";
  selectedPubMedArray.forEach(element => {
    pubmedXml+='<PROJECT_LINK>'+
                  '<XREF_LINK>'+
                    '<DB>PUBMED</DB>'+
                    '<ID>'+element.id+'</ID>'+
                  '</XREF_LINK>'+
                '</PROJECT_LINK>';
  });
  pubmedXml+='</PROJECT_LINKS>';
  return pubmedXml;
 }

 updateProjectXml(orginalXml,form,pubMedArray){
  var pubMedXmlStr=this.getPubMedXmlTags(pubMedArray);
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(orginalXml, "text/xml");
  var pubMexXml=parser.parseFromString(pubMedXmlStr,"text/xml");
  var nameTag=xmlDoc.getElementsByTagName("NAME")[0];
  var titleTag=xmlDoc.getElementsByTagName("TITLE")[0];
  var descriptionTag=xmlDoc.getElementsByTagName("DESCRIPTION")[0];

  /** Check empty tags and set value */
  nameTag.hasChildNodes() ? nameTag.childNodes[0].nodeValue=form.studyName : nameTag.appendChild(xmlDoc.createTextNode(form.studyName));
  titleTag.hasChildNodes() ? titleTag.childNodes[0].nodeValue=form.studyTitle : titleTag.appendChild(xmlDoc.createTextNode(form.studyTitle));
  descriptionTag.hasChildNodes() ? descriptionTag.childNodes[0].nodeValue=form.description : descriptionTag.appendChild(xmlDoc.createTextNode(form.description));

  
  if(xmlDoc.getElementsByTagName("PROJECT_LINKS")[0]){
    //xmlDoc.getElementsByTagName("PROJECT_LINKS")[0].replaceWith(pubMexXml.getElementsByTagName("PROJECT_LINKS")[0]);
    var xmlDocProjectLinks=xmlDoc.getElementsByTagName("PROJECT_LINKS")[0];
    var xrefLinkCnt=xmlDocProjectLinks.getElementsByTagName("XREF_LINK").length;
    var newProjectLinks=pubMexXml.getElementsByTagName("PROJECT_LINKS")[0];
    var newXrefLinkCnt=newProjectLinks.getElementsByTagName("PROJECT_LINK").length;

    // Remove old XREF_LINK tag
    for(var i=0;i<xrefLinkCnt;i++){
      xmlDocProjectLinks.getElementsByTagName("XREF_LINK")[0].parentElement.remove();
    }

    
    // Add new XREF_LINK tag
    for(var j=0;j<newXrefLinkCnt;j++){
      // appendChild method moves the element from newProjectLinks to existingProjectLinks that is why er are moving [0]th element
      xmlDocProjectLinks.appendChild(newProjectLinks.getElementsByTagName("PROJECT_LINK")[0])
    }
    
  }else{
    if(pubMexXml){
      xmlDoc.getElementsByTagName("PROJECT")[0].append(pubMexXml.getElementsByTagName("PROJECT_LINKS")[0])
    }
  }
  var xmlDocStr=new XMLSerializer().serializeToString(xmlDoc.documentElement);
  console.log(xmlDocStr)

  let dateStr=this.getFormatedReleseDate(form.releaseDate)
  const observable: Observable<string>=this._webinRestService.updateXml(ReportType.projects,new Blob([xmlDocStr]),'Edit',dateStr)
  this.handleServerResponse(observable);
 }

  
 getAlias(){
  let submissionaccount=JSON.parse(this._webinAuthenticationService.getSubmissionAccount());
  let centerName = submissionaccount["centerName"];
  return centerName+this.getDateString();
 }

 getDateString(){
  let currdate=new Date();
  return currdate.getDate()+"-"+currdate.getMonth()+"-"+currdate.getFullYear()+"-"+currdate.getHours()+"-"+currdate.getMinutes()+"-"+currdate.getSeconds()+"-"+currdate.getMilliseconds(); 
 }

 handleServerResponse(observable){
  if (observable) {
    observable.pipe(
      retry(3)
    ).subscribe(
      data => {
          let result = this._webinRestService.parseResult(data);
          if (result.isError) {
            console.log(result.errors)
            let message=result.errors[0]["error"];
            this.showErrorPopup(message)
          } else {
            
            console.log(result.accessions);
            let message="Successfully subimited project with project identification : "+result.accessions[0]["accession"];
            this.showSuccessPopup(message);
            
          }
      },
      (err: HttpErrorResponse) => {
        console.error('** Webin submission service failed **', err);
        const message = 'Webin submission service failed. Please try again later. If the problem persists please contact the helpdesk.';
        this.showErrorPopup(message);
    }
  
  );

  }
 }

 getFormatedReleseDate(date){
  return date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2); 
}

 showSuccessPopup(message){
  const dialogRef = this.dialog.open(PopupMessageComponent, {
    width: '500px',
    backdropClass: 'custom-dialog-backdrop-class',
    panelClass: 'custom-dialog-panel-class',
    data: {'action':'Success','message':message,'title':'Study Submission'}
  });
 }
  showErrorPopup(message){
    const dialogRef = this.dialog.open(PopupMessageComponent, {
      width: '500px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: {'action':'Error','message':message,'title':'Study Submission'}
    });

 }


}
