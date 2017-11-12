import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { SubmissionFormatSelectorComponent } from '../submission-format-selector/submission-format-selector.component';
import { SubmissionSpreadsheetSelectorComponent } from '../submission-spreadsheet-selector/submission-spreadsheet-selector.component';

import { WebinRestService } from '../webin-rest.service';

@Component({
  selector: 'app-spreadsheet-submission',
  templateUrl: './spreadsheet-submission.component.html',
  styleUrls: ['./spreadsheet-submission.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    SubmissionFormatSelectorComponent,
    SubmissionSpreadsheetSelectorComponent
  ]
})
export class SpreadsheetSubmissionComponent implements OnInit {

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

  spreadsheetFile: File;

  addOrUpdate: string = 'add';

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
    if (this.addOrUpdate == 'add') {
      this.webinRestService.addSpreadsheet(this.spreadsheetFile);
    }
    else {
      this.webinRestService.updateSpreadsheet(this.spreadsheetFile);
    }
  }

  constructor(
    private webinRestService: WebinRestService) {
  }

  ngOnInit() {
  }
}
