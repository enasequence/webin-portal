import { Component, OnInit } from '@angular/core';
import { ReportType } from '../report-type.enum';
import { WebinReportService } from '../webin-report.service';
import { ChecklistComponent } from '../checklist/checklist.component';
import { UtilService } from '../util/Util-services'
import { retry, mergeMap } from 'rxjs/operators';
import { MatStepper, MatDialog } from '@angular/material';
import { WebinRestService } from '../webin-rest.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PopupMessageComponent } from '../popup-message/popup-message.component';
import { WebinAuthenticationService } from '../webin-authentication.service';

@Component({
  selector: 'app-read-submission',
  templateUrl: './read-submission.component.html',
  styleUrls: ['./read-submission.component.css']
})
export class ReadSubmissionComponent implements OnInit {
  panelOpenState: boolean=false;
  reportType=ReportType.studies;
  selectedStudy: string;
  readFileDetails= {};
  selectedFieldsArray= [];
  mandatoryFields={};
  selectedFieldType: string;
  selectedFieldName: string;
  showLoadingFlag=false;
  fieldType={};
  constructor(private _webinReportService: WebinReportService,
    private util: UtilService,
    private _webinRestService: WebinRestService,
    public dialog: MatDialog,
    private _webinAuthenticationService: WebinAuthenticationService
    ) { }

  ngOnInit() {
    this.getReadFileDetails();
  }

  getSelectedStudy(studyAlias: string, stepper: MatStepper){
    this.selectedStudy=studyAlias;
    stepper.next();
  }

   getReadFileDetails(){
    this._webinReportService.getReadFiletypeAndFields().
      pipe(retry(3)).
        subscribe(data => {
          this.readFileDetails =  data;
        });
  }

  selectFileType(fieldType,name){
    this.selectedFieldsArray=[];
    this.selectedFieldType=fieldType;
    this.selectedFieldName=name
    this.readFileDetails["fieldTypes"].forEach(fieldType => {
      if( fieldType.name===this.selectedFieldName ){
        fieldType.fields.forEach(field=>{
          if(field.mandatory){
            this.selectedFieldsArray.push(field);
          }
        })
        
      }
    });
  }

  selectedField(event,field){
    if(event.checked){
      if(this.selectedFieldsArray.indexOf(field)===-1){
        this.selectedFieldsArray.push(field);
      }
    }else{
      this.selectedFieldsArray.splice(this.selectedFieldsArray.indexOf(field), 1);
    }
  }

  downloadReadTsvTemplate(){
      let selObj={"fields":this.selectedFieldsArray,"displayUnits":false}
      selObj["checklistType"] = "FileType";
      selObj["checklistFieldName"] = "Read submission file type";
      selObj["checklistFieldValue"] = this.selectedFieldType;
      selObj["displayChecklistRow"] = "true";
      this.util.downloadTsvTemplate(selObj).
      subscribe((data) => {
          let blob = new Blob([data], { type: "text/plain;charset=utf-8'"});
          saveAs(blob,this.util.getFileNameByTemplate(this.selectedFieldName,".tsv"));
        },(error) => {
          console.log('Error',error); 
        });
  }

  downloadReadExcelTemplate(){
    let selObj={"fields":this.selectedFieldsArray,"displayUnits":false}
    selObj["checklistType"] = "FileType";
    selObj["checklistFieldName"] = "Read submission file type";
    selObj["checklistFieldValue"] = this.selectedFieldType;
    selObj["displayChecklistRow"] = "true";
    this.util.downloadExcelTemplate(selObj).
    subscribe((data) => {
        let blob = new Blob([data], { type: "text/plain;charset=utf-8'"});
        saveAs(blob,this.util.getFileNameByTemplate(this.selectedFieldName,".xlsx"));
      },(error) => {
        console.log('Error',error); 
      });
}

  

  buildSelectedChecklistRequestObject(callback){
    let selectedChecklistObject= {};
    selectedChecklistObject["fields"]=this.selectedFieldsArray;
  }

  uploadFile(form){
    this.showLoading();
    const formData: FormData = new FormData();
    const observable: Observable<string> =
      this._webinRestService.submitXml(
        null,
        null,
        null,
        null,
        null,
        form.spreadSheet,
        null,
        null,
        null,
        null);
        this.handleServerResponse(observable);
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
              let message="";
              result.errors.forEach(errorObj => {
                message+=errorObj.error+"\n";
              });
              
              this.showErrorPopup(message)
            } else {
              
              console.log(result.accessions);
              let message="Successfully uploaded spreadsheet template and the runs(s) are created.";
              this.showSuccessPopup(message);
              
            }
            this.hideLoading();
        },
        (err: HttpErrorResponse) => {
          console.error('** Webin submission service failed **', err);
          const message = 'Webin submission service failed. Please try again later. If the problem persists please contact the helpdesk.';
          this.showErrorPopup(message);
          this.hideLoading();
      }
    
    );
  
    }
   }

   showLoading(){
    this.showLoadingFlag=true;
  }

  hideLoading(){
    this.showLoadingFlag=false;
  }
  
   showSuccessPopup(message){
    const dialogRef = this.dialog.open(PopupMessageComponent, {
      width: '500px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: {'action':'Success','message':message,'title':'Read Submission'}
    });
   }

    showErrorPopup(message){
      const dialogRef = this.dialog.open(PopupMessageComponent, {
        width: '550px',
        backdropClass: 'custom-dialog-backdrop-class',
        panelClass: 'custom-dialog-panel-class',
        data: {'action':'Error','message':message,'title':'Read Registration Error'}
      });
  
    }

    isEga(): boolean {
      return this._webinAuthenticationService.ega;
    }

    /*** This method is to hide ega fields */
    displayEgaField(field):boolean{
      let showField=true;
      if(field["is_ega_field"]){
        if(field["is_ega_field"]!=this.isEga()){
          showField=false;  
        }
      }
      return showField;
    }
  }
