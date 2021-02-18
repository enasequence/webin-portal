import { Component, OnInit } from '@angular/core';
import { MatStepper, MatTableDataSource, MatDialog } from '@angular/material';
import { WebinRestService } from '../webin-rest.service';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { PopupMessageComponent } from '../popup-message/popup-message.component';
import { TaxonomyDialogModalComponent } from '../taxonomy-dialog-modal/taxonomy-dialog-modal.component';
import { utils } from 'protractor';
import { UtilService } from '../util/Util-services';
import { WebinAuthenticationService } from '../webin-authentication.service';
import { TagContentType } from '@angular/compiler';
import { CustomValidationService } from '../validation/custom-validation.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-taxonomy-management',
  templateUrl: './taxonomy-management.component.html',
  styleUrls: ['./taxonomy-management.component.css']
})
export class TaxonomyManagementComponent implements OnInit {

  showLoadingFlag=false;
  panelOpenState: boolean=false;
  validTaxaArray=[];
  invalidTaxaArray=[];
  proposedNameArr=[];
  validDataSource: MatTableDataSource<any>;
  invalidDataSource: MatTableDataSource<any>;
  nameSubmissionFlag: boolean;
  submissionAccount: {};
  stepper: MatStepper;
  displayedColumnsForValidTaxonomy: string[] = ['proposedName', 'nameType','host',"projectId","description",'edit','remove'];
  displayedColumnsForInvalidTaxonomy: string[] = ['proposedName', 'nameType','host',"projectId","description","message"];
  

  constructor(private _webinRestService: WebinRestService,
    private _webinAuthService: WebinAuthenticationService,
    public dialog: MatDialog,
    private util: UtilService) { }

  ngOnInit() {
  }

  clearData(){
    this.validTaxaArray=[];
  this.invalidTaxaArray=[];
  }

  uploadFile(form,stepper: MatStepper){
    this.showLoading();
    this.stepper = stepper;
    const observable: Observable<string> =this._webinRestService.uploadTaxonTemplate(form.spreadSheet);
    this.handleServerResponse(observable);
  }


  handleServerResponse(observable){
    if (observable) {
      observable.pipe(
        retry(3)
      ).subscribe(
        data => {
          if(data.indexOf("TaxonomyError")>-1){
            data=data.replace("TaxonomyError:","");
            this.showErrorPopup(data);
          }else{
            let result = JSON.parse(data);
              this.validTaxaArray=this.validTaxaArray.concat(result.taxonomyResp.filter(val => val.registered==false));
              this.validTaxaArray.forEach(element => {
                element["id"] = this.util.getId();
              });
              this.invalidTaxaArray=this.invalidTaxaArray.concat(result.taxonomyResp.filter(val => val.registered==true))
              this.validDataSource=new MatTableDataSource<any>(this.validTaxaArray);
              this.invalidDataSource=new MatTableDataSource<any>(this.invalidTaxaArray);
              this.proposedNameArr=this.proposedNameArr.concat(result.taxonomyResp.map(val => (val.proposedName)));

              if(this.stepper){
              this.stepper.next();
              }
              
          }
            this.hideLoading();
        },
        (err: HttpErrorResponse) => {
          this.util.showHttpError(this,err);
      }
    
    );
  
    }
   }

   showSuccessPopup(message){
    const dialogRef = this.dialog.open(PopupMessageComponent, {
      width: '500px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: {'action':'Success','message':message,'title':'Taxonomy Registration'}
    });
   }

    showErrorPopup(message){
      const dialogRef = this.dialog.open(PopupMessageComponent, {
        width: '550px',
        backdropClass: 'custom-dialog-backdrop-class',
        panelClass: 'custom-dialog-panel-class',
        data: {'action':'Error','message':message,'title':'Taxonomy Registration Error'}
      });
  
    }

    openDialog(action,obj): void {
      const dialogRef = this.dialog.open(TaxonomyDialogModalComponent, {
        width: '500px',
        backdropClass: 'custom-dialog-backdrop-class',
        panelClass: 'custom-dialog-panel-class',
        data: {action: action, taxonRefObj:obj, proposedNameArr:this.proposedNameArr}
      });
  
      dialogRef.afterClosed().subscribe(result => {
  
        if(result.event!='close'){
  
          let taxonRefObj=result.data;
          
          if(result.event==='Update'){
            var index = this.validTaxaArray.map(function(item) { return item.id; }).indexOf(taxonRefObj.id);
            this.setParentValues(taxonRefObj, this.validTaxaArray[index]);
          }

          if(result.event==='Add'){
            var taxonTSV=this.objectToTsv(taxonRefObj);
            const bytes = new TextEncoder().encode(taxonTSV);
            const blob = new Blob([bytes])
            const observable: Observable<string> =this._webinRestService.uploadTaxonTemplate(blob);
            this.handleServerResponse(observable)
          }

          if(result.event==='Delete'){
            var index = this.validTaxaArray.map(function(item) { return item.id; }).indexOf(taxonRefObj.id);
            this.validTaxaArray.splice(index, 1);
          }
          if(typeof taxonRefObj!="undefined"){
            this.validDataSource = new MatTableDataSource<any>(this.validTaxaArray);
  
          }
        }
      });  
    }

  objectToTsv(taxon){
    let tsvContent="proposed_name\tname_type\thost\tproject_id\tdescription"+"\n"
    return tsvContent + taxon["proposedName"]+"\t"+taxon["nameType"]+"\t"+taxon["host"]+"\t"+taxon["projectId"]+"\t"+taxon["description"];
  }  


    downloadTaxonTsvTemplate(){
      let selObj={"fields":this.taxonomyFields.fields,"displayUnits":false}
      selObj["displayChecklistRow"] = "false";
      this.util.downloadTsvTemplate(selObj).
      subscribe((data) => {
          let blob = new Blob([data], { type: "text/plain;charset=utf-8'"});
          saveAs(blob,this.util.getFileNameByTemplate("taxonomy",".tsv"));
        },(error) => {
          console.log('Error',error); 
        });
    }
  
    submitTaxonomyRequest(){
      this.submissionAccount=JSON.parse(this._webinAuthService.getSubmissionAccount());
      let mail={};
      mail["from"]=this.submissionAccount["submissionContacts"].filter(contact => contact.mainContact).map(contact => (contact.emailAddress))[0] ;
      mail["subject"]="Taxonom Consultation";
      mail["to"]=environment.taxonomySubmissionEmail;
      this.constructTaxonContentAndSendMail(function(taxonContent,thisObj){
        mail["content"]=taxonContent;
        const observable: Observable<string>=thisObj._webinRestService.sendTaxonEmail(mail);
        if (observable) {
            observable.pipe(
              retry(3)
            ).subscribe(
              data => {
                if(data["to"]===mail["to"]){
                  thisObj.showSuccessPopup("Your request has been send to the ENA helpdesk.");
                }else{
                  thisObj.showErrorPopup("Failed to sent email to curators. Contact system administrator for assistance.");
                    
                }
                thisObj.hideLoading();
              },
              (err: HttpErrorResponse) => {
                this.util.showHttpError(this,err);
            }
          
          );
        }
        
      },this);
    } 
    
    async constructTaxonContentAndSendMail(callback,webinRestService){
      let contentStr = "";
      let count=0;
      for( const taxon of this.validTaxaArray){

        contentStr+="\n";
        contentStr+="Number " + ++count +"\n";
        contentStr+="Name type: " + taxon.nameType + "\n";
        contentStr+="Proposed name: " + taxon.proposedName + "\n";
        contentStr+="Host: " + taxon.host + "\n";
        contentStr+="Project / Study id: " + taxon.projectId + "\n";
        contentStr+="Short description: " + taxon.description + "\n";
        contentStr+="\n";
      };

      contentStr+="Dear ENA" + "\n\n";
      contentStr+="Please examine above "+count+" organisms. " + "\n";
      contentStr+="Below are my contact details: " + "\n\n";
      contentStr+="Webin account id: " + this.submissionAccount["id"] + "\n";
      contentStr+="Names: " + this.submissionAccount["submissionContacts"].map(contact => (this.getContactName(contact))) + "\n";
      contentStr+="Emails: " + this.submissionAccount["submissionContacts"].map(contact => (contact.emailAddress)) + "\n\n";
      contentStr+="Thank you and regards";
      callback( contentStr,webinRestService);
    }


  getContactName(contact){
    if(contact.consortium){
      return contact.consortium
    }else{
      return contact.firstName +" "+(contact.surname || '');
    }
  }  

  showLoading(){
    this.showLoadingFlag=true;
  }

  hideLoading(){
    this.showLoadingFlag=false;
  }

  setParentValues(from,to){
    to.proposedName=from.proposedName;
    to.nameType=from.nameType;
    to.host=from.host;
    to.projectId=from.projectId;
    to.description=from.description;
  }

   taxonomySubmissionCheck(): Boolean{
    var retVal=true;
    for(const taxon of this.validTaxaArray){
      if(taxon.nameType && taxon.host && taxon.projectId && taxon.description){
        continue;
      }else{
        retVal=false;
        break;
      }
    };
    return retVal;
  }

  // Added because util method is not accessable from .html in prod build
  getId(){
    this.util.getId();
  }
  

  

  taxonomyFields={
    "fields": [
      {
        "name": "proposed_name",
        "mandatory": true,
      },
      {
        "name": "name_type",
        "mandatory": false,
      },
      {
        "name": "host",
        "mandatory": false,
      },
      {
        "name": "project_id",
        "mandatory": false,
      },
      {
        "name": "description",
        "mandatory": false,
      }
    ]
  }
}
