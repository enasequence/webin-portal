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

  generateStudyXml(form,selectedPubMedArray,attributeArray,locusTagArray){

    let pubMedXml=this.getPubMedXmlTags(selectedPubMedArray);
    let attributeXml=this.getAttributeXmlTags(attributeArray)
    let locusTagXml=this.getlocusTagXmlTags(locusTagArray);
    let alias=this.getAlias();

    let projectXml=new Blob(['<?xml version = "1.0" encoding = "UTF-8"?>'+
      '<PROJECT_SET>'+
        '<PROJECT alias="'+alias+'">'+
          '<NAME>'+form.studyName+'</NAME>'+
          '<TITLE>'+form.studyTitle+'</TITLE>'+
          '<DESCRIPTION>'+form.description+'</DESCRIPTION>'+
          '<SUBMISSION_PROJECT>'+
            '<SEQUENCING_PROJECT>'+
                  locusTagXml +
             '</SEQUENCING_PROJECT>'+     
	        '</SUBMISSION_PROJECT>'+
                 pubMedXml+
                 attributeXml+
        '</PROJECT>'+
      '</PROJECT_SET>'])
    var action={name:"add"};
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

 getAttributeXmlTags(attributeArray){
  let attributeXml="<PROJECT_ATTRIBUTES>";
  attributeArray.forEach(element => {
    attributeXml+='<PROJECT_ATTRIBUTE>'+
                   '<TAG>'+element.tag+'</TAG>'+
                   '<VALUE>'+element.tagValue+'</VALUE>'+
                  '</PROJECT_ATTRIBUTE>';
 });
 attributeXml+='</PROJECT_ATTRIBUTES>';
 return attributeXml;
}

getlocusTagXmlTags(locusTagArray){
  let locusTagXml="";
  locusTagArray.forEach(element => {
    locusTagXml+='<LOCUS_TAG_PREFIX>'+
                   element.locusTag +
                  '</LOCUS_TAG_PREFIX>';
 });
 
 return locusTagXml;
}

 updateProjectXml(orginalXml,form,pubMedArray,attributeArray,locusTagArray){
  var pubMedXmlStr=this.getPubMedXmlTags(pubMedArray);
  var attributeXmlStr=this.getAttributeXmlTags(attributeArray);
  var locusTagXmlStr='<LOCUS-TAGS>'+this.getlocusTagXmlTags(locusTagArray) + '</LOCUS-TAGS>';
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(orginalXml, "text/xml");
  var pubMedXml=parser.parseFromString(pubMedXmlStr,"text/xml");
  var attributeXml=parser.parseFromString(attributeXmlStr,"text/xml");
  var locusTagXml=parser.parseFromString(locusTagXmlStr,"text/xml");
  var nameTag=xmlDoc.getElementsByTagName("NAME")[0];
  var titleTag=xmlDoc.getElementsByTagName("TITLE")[0];
  var descriptionTag=xmlDoc.getElementsByTagName("DESCRIPTION")[0];

  /** Check if the tag is empty and set the values accordingly */
  nameTag.hasChildNodes() ? nameTag.childNodes[0].nodeValue=form.studyName : nameTag.appendChild(xmlDoc.createTextNode(form.studyName));
  titleTag.hasChildNodes() ? titleTag.childNodes[0].nodeValue=form.studyTitle : titleTag.appendChild(xmlDoc.createTextNode(form.studyTitle));
  descriptionTag.hasChildNodes() ? descriptionTag.childNodes[0].nodeValue=form.description : descriptionTag.appendChild(xmlDoc.createTextNode(form.description));

  /** Update PubMed Ids */
  this.updateProjectLinks(xmlDoc,pubMedXml) ; 

  /** Update project attributes */
  this.updateProjectAttributes(xmlDoc,attributeXml) ; 

  /** Update Locas tag Xml */
  this.updateProjectLocasTags(xmlDoc,locusTagXml) ; 

  var xmlDocStr=new XMLSerializer().serializeToString(xmlDoc.documentElement);
  //console.log(xmlDocStr);
  let dateStr=this.getFormatedReleseDate(new Date(form.releaseDate))
  
  var action={name:"Edit",id:form.id};
  const observable: Observable<string>=this._webinRestService.updateXml(ReportType.projects,new Blob([xmlDocStr]),action,dateStr)
  this.handleServerResponse(observable);
 }

 updateProjectLinks(xmlDoc,pubMedXml) {
  if(xmlDoc.getElementsByTagName("PROJECT_LINKS")[0]){
    var xmlDocProjectLinks=xmlDoc.getElementsByTagName("PROJECT_LINKS")[0];
    var xrefLinkCnt=xmlDocProjectLinks.getElementsByTagName("XREF_LINK").length;
    var newProjectLinks=pubMedXml.getElementsByTagName("PROJECT_LINKS")[0];
    var newXrefLinkCnt=newProjectLinks.getElementsByTagName("PROJECT_LINK").length;

    // Remove old XREF_LINK [ PubMed ] tag
    for(var i=0;i<xrefLinkCnt;i++){
      xmlDocProjectLinks.getElementsByTagName("XREF_LINK")[0].parentElement.remove();
    }
    
    // Add new XREF_LINK [ PubMed ] tag
    for(var j=0;j<newXrefLinkCnt;j++){
      /**  
       * The appendChild() method of DOM element moves the element from newProjectLinks to existingProjectLinks (it dose not copy )
       * that is why we are adding [0]th element always to the xml document.
       */
      xmlDocProjectLinks.appendChild(newProjectLinks.getElementsByTagName("PROJECT_LINK")[0])
    }
  }else{
      xmlDoc.getElementsByTagName("PROJECT")[0].append(pubMedXml.getElementsByTagName("PROJECT_LINKS")[0])
  }
  
 }
  
 updateProjectAttributes(xmlDoc,attributeXml){
  if(xmlDoc.getElementsByTagName("PROJECT_ATTRIBUTES")[0]){
    xmlDoc.getElementsByTagName("PROJECT_ATTRIBUTES")[0].replaceWith(attributeXml.getElementsByTagName("PROJECT_ATTRIBUTES")[0]);
  }else{
      xmlDoc.getElementsByTagName("PROJECT")[0].append(attributeXml.getElementsByTagName("PROJECT_ATTRIBUTES")[0])
  }
 }

 updateProjectLocasTags(xmlDoc,locusTagXml) {
  
  var oldlocusTagPrefixLength=xmlDoc.getElementsByTagName("LOCUS_TAG_PREFIX").length;
  var newlocusTagPrefixLength=locusTagXml.getElementsByTagName("LOCUS_TAG_PREFIX").length
  
  // Remove old locus_taf_prefix tag
  for(var i=0;i<oldlocusTagPrefixLength;i++){
    xmlDoc.getElementsByTagName("LOCUS_TAG_PREFIX")[0].remove();
  }

  for(var j=0;j<newlocusTagPrefixLength;j++){
    xmlDoc.getElementsByTagName("SEQUENCING_PROJECT")[0].append(locusTagXml.getElementsByTagName("LOCUS_TAG_PREFIX")[0]);
  }

  //xmlDoc.getElementsByTagName("SEQUENCING_PROJECT")[0].append(locusTagXml.getElementsByTagName("SEQUENCING_PROJECT")[0])
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
