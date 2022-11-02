import { Component, OnInit } from '@angular/core';
import { ReportType } from '../report-type.enum';
import { WebinReportService } from '../webin-report.service';
import { ChecklistComponent } from '../checklist/checklist.component';
import { UtilService } from '../util/Util-services'
import { retry, mergeMap } from 'rxjs/operators';
import { MatStepper, MatDialog, MatTableDataSource } from '@angular/material';
import { WebinRestService } from '../webin-rest.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PopupMessageComponent } from '../popup-message/popup-message.component';
import { WebinAuthenticationService } from '../webin-authentication.service';
import { SubmissionResultDialogComponent } from '../submission-result-dialog/submission-result-dialog.component';
import { NonSubmissionResultDialogComponent } from '../non-submission-result-dialog/non-submission-result-dialog.component';

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
  selectedFieldDatasource: MatTableDataSource<any>;
  mandatoryFieldDatasource: MatTableDataSource<any>;
  optionalFieldDatasource: MatTableDataSource<any>;
  customFieldDatasource: MatTableDataSource<any>;
  customFields: any;
  fieldsDisplayedColumns: string[] = [
    "selection",
    "fieldName",
    "fieldLabel",
    "permittedValue"
  ];
  mandatoryFields = {};
  selectedFieldType: string;
  selectedFieldName: string;
  fieldType = {};
  centerName: String;
  showDescription = false;
  isChecked: false;
  filter: "";
  submitEnabled = true;

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

  selectFileType(fieldType, name, stepper) {
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
        this.mandatoryFieldDatasource = new MatTableDataSource<any>(fieldType.fields.filter(field => field.mandatory));
        this.optionalFieldDatasource = new MatTableDataSource<any>(fieldType.fields.filter(field => !field.mandatory));

        // Setting filterPredicate that is used for filtering.
        this.mandatoryFieldDatasource.filterPredicate = this.getPredicate();
        this.optionalFieldDatasource.filterPredicate = this.getPredicate();



      }
    });
    stepper.next();
  }

  getPredicate() {
    return (data: any, filter: string) => data.label.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) != -1;
  }

  applyFilter(filterValue: string, accordion: any) {
    // If the filter text is empty close all expansion panel.
    if (filterValue != "") {
      accordion.multi = true;
      accordion.openAll();
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
    } else {
      // Open all expansions while filter text is not empty.
      accordion.closeAll();
      accordion.multi = false;
    }

    this.mandatoryFieldDatasource.filter = filterValue;
    this.optionalFieldDatasource.filter = filterValue;
    this.optionalFieldDatasource.filter = filterValue;
  }

  /** Below lines must be removed if custom fields are not needed for reads */

  /*addCustomField(customField: string, customText, accordion, form) {

     if (!form.invalid) {
       this.customFields = this.getCustomField(customField);
       this.selectedFields[customField] = true;
 
       // Get custom field group if already added to selectedChecklist.fieldGroups
       let customFieldGroup: any = this.selectedChecklist.fieldGroups.filter(fieldGroup => fieldGroup.name === "custom_fields")[0];
       if (customFieldGroup) {
         customFieldGroup.fields.push(this.customFields);
       } else {
         // create new custom field group
         customFieldGroup = { "name": "custom_fields", fields: [this.customFields] };
         this.selectedChecklist.fieldGroups.push(customFieldGroup);
       }
 
       this.customFieldsDataSource = new MatTableDataSource<any>(customFieldGroup.fields);
       this.customFieldsDataSource.filterPredicate = this.getPredicate();
       this.showSuccessPopup("Successfully added custom field '" + customField + "'. The field can be viewed in custom fields grouping below.", "Custom field");
       customText.value = "";
 
       //opening custom panal is not woeking as expected so closing all the panels after adding custom field. 
       accordion.multi = true;
       accordion.closeAll();
       accordion.multi = false;
       //this.customFieldsPanel.open();
  }
  }*/

  getCustomField(customFieldValue) {
    return {
      "name": customFieldValue,
      "label": customFieldValue,
      "type": "TEXT_FIELD",
      "mandatory": "recommended",
      "description": "custom field",
      "units": [],
      "textChoice": []
    };
  }

  addDescription(isChecked) {

    if (isChecked) {
      this.fieldsDisplayedColumns.push("description");
      this.showDescription = true;
    } else {
      this.fieldsDisplayedColumns.pop()
      this.showDescription = false;
    }
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
    if (!this._webinRestService.isValidTabSubmissionFile(form.spreadSheet)) {
      this.util.showError(this, NonSubmissionResultDialogComponent, "You have used an unsupported spreadsheet format. Please submit a tab-separated (.tsv or .tab) file.", "Submission Result")
    } else {
      this._webinRestService.isValidTabSubmissionFile(form.spreadSheet);
      const formData: FormData = new FormData();
      this.submitEnabled = false;
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
          null,
          this.centerName);
      let redirectPath = "";
      this.util.showSubmissionResponse(this, SubmissionResultDialogComponent, observable, redirectPath)
    }
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

  isBroker(): boolean {
    return this._webinAuthenticationService.isBroker();
  }
}
