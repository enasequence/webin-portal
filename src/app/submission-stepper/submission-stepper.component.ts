import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { SubmissionFormatSelectorComponent } from '../submission-format-selector/submission-format-selector.component';
import { SubmissionSpreadsheetSelectorComponent } from '../submission-spreadsheet-selector/submission-spreadsheet-selector.component';

import { WebinRestService } from '../webin-rest.service';

@Component({
  selector: 'app-submission-stepper',
  templateUrl: './submission-stepper.component.html',
  styleUrls: ['./submission-stepper.component.css'],
  providers: [
    SubmissionFormatSelectorComponent,
    SubmissionSpreadsheetSelectorComponent
  ]
})
export class submissionStepperComponent {

  submissionType: string;
  submissionFormat: string;
  submissionSpreadsheet: string;

  consumeSubmissionTypeChange(submissionType: string) {
    this.submissionType = submissionType;
    this.submissionFormat = undefined;
    console.info('Received changed submission type: ' + submissionType);
  }

  consumeSubmissionFormatChange(submissionFormat: string) {
    this.submissionFormat = submissionFormat;
    console.info('Received changed submission format: ' + submissionFormat);
  }

  consumeSubmissionSpreadsheetChange(submissionSpreadsheet: string) {
    this.submissionSpreadsheet = submissionSpreadsheet;
    console.info('Received changed submission spreadsheet: ' + submissionSpreadsheet);
  }

  submissionSubmitFormGroup: FormGroup;

  spreadsheetFile: File;

  // https://stackoverflow.com/questions/35399617/angular-2-file-upload-from-input-type-file
  onChangeSpreadsheetFile(files) {
    this.spreadsheetFile = files[0];
    console.info("Spreadsheet file: " + this.spreadsheetFile);
  }

  canSubmit() {
    return this.spreadsheetFile !== undefined;
  }

  //angular.io/guide/http
  // https://stackoverflow.com/questions/46059226/upload-image-with-httpclient
  submit() {
      this.webinRestService.submitSpreadsheet(this.spreadsheetFile);
  }

  constructor(
    private _formBuilder: FormBuilder,
    private webinRestService: WebinRestService) {
  }

  ngOnInit() {
    this.submissionSubmitFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
