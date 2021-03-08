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
import { SubmissionResultDialogComponent } from '../submission-result-dialog/submission-result-dialog.component';

@Component({
  selector: 'app-read-submission',
  templateUrl: './read-submission.component.html',
  styleUrls: ['./read-submission.component.css']
})
export class ReadSubmissionComponent implements OnInit {
  panelOpenState: boolean = false;
  reportType = ReportType.studies;
  selectedStudy: string;
  readFileDetails = {};
  selectedFieldsArray = [];
  mandatoryFields = {};
  selectedFieldType: string;
  selectedFieldName: string;
  fieldType = {};
  constructor(private _webinReportService: WebinReportService,
    private util: UtilService,
    private _webinRestService: WebinRestService,
    public dialog: MatDialog,
    private _webinAuthenticationService: WebinAuthenticationService
  ) { }

  ngOnInit() {
    this.getReadFileDetails();
  }

  getSelectedStudy(studyAlias: object, stepper: MatStepper) {
    this.selectedStudy = studyAlias["alias"];
    stepper.next();
  }

  getReadFileDetails() {
    this._webinReportService.getReadFiletypeAndFields().
      pipe(retry(3)).
      subscribe(data => {
        this.readFileDetails = data;
      });
  }

  selectFileType(fieldType, name) {
    this.selectedFieldsArray = [];
    this.selectedFieldType = fieldType;
    this.selectedFieldName = name
    this.readFileDetails["fieldTypes"].forEach(fieldType => {
      if (fieldType.name === this.selectedFieldName) {
        fieldType.fields.forEach(field => {
          if (field.mandatory) {
            this.selectedFieldsArray.push(field);
          }
        })

      }
    });
  }

  selectedField(event, field) {
    if (event.checked) {
      if (this.selectedFieldsArray.indexOf(field) === -1) {
        this.selectedFieldsArray.push(field);
      }
    } else {
      this.selectedFieldsArray.splice(this.selectedFieldsArray.indexOf(field), 1);
    }
  }

  downloadReadTsvTemplate() {
    let selObj = { "fields": this.selectedFieldsArray, "displayUnits": false }
    selObj["checklistType"] = "FileType";
    selObj["checklistFieldName"] = "Read submission file type";
    selObj["checklistFieldValue"] = this.selectedFieldType;
    selObj["displayChecklistRow"] = "true";
    this.util.downloadTsvTemplate(selObj).
      subscribe((data) => {
        let blob = new Blob([data], { type: "text/plain;charset=utf-8'" });
        saveAs(blob, this.util.getFileNameByTemplate(this.selectedFieldName, ".tsv"));
      }, (error) => {
        console.log('Error', error);
      });
  }

  downloadReadExcelTemplate() {
    let selObj = { "fields": this.selectedFieldsArray, "displayUnits": false }
    selObj["checklistType"] = "FileType";
    selObj["checklistFieldName"] = "Read submission file type";
    selObj["checklistFieldValue"] = this.selectedFieldType;
    selObj["displayChecklistRow"] = "true";
    this.util.downloadExcelTemplate(selObj).
      subscribe((data) => {
        let blob = new Blob([data], { type: "text/plain;charset=utf-8'" });
        saveAs(blob, this.util.getFileNameByTemplate(this.selectedFieldName, ".xlsx"));
      }, (error) => {
        console.log('Error', error);
      });
  }



  buildSelectedChecklistRequestObject(callback) {
    let selectedChecklistObject = {};
    selectedChecklistObject["fields"] = this.selectedFieldsArray;
  }

  uploadFile(form) {
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
    let redirectPath = "/read-submission";
    this.util.showSubmissionResponse(this, SubmissionResultDialogComponent, observable, redirectPath)
  }

  isEga(): boolean {
    return this._webinAuthenticationService.ega;
  }

  /*** This method is to hide ega fields */
  displayEgaField(field): boolean {
    let showField = true;
    if (field["is_ega_field"]) {
      if (field["is_ega_field"] != this.isEga()) {
        showField = false;
      }
    }
    return showField;
  }
}
