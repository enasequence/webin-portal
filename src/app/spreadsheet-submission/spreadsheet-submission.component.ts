import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { SubmissionFormatSelectorComponent } from '../submission-format-selector/submission-format-selector.component';
import { SubmissionSpreadsheetSelectorComponent } from '../submission-spreadsheet-selector/submission-spreadsheet-selector.component';
import { SubmissionResultComponent } from '../submission-result/submission-result.component';

import { WebinRestService } from '../webin-rest.service';

import {Observable} from 'rxjs/Observable';

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

  @ViewChild(SubmissionResultComponent) submissionResult: SubmissionResultComponent;

  submissionType: string;
  submissionFormat: string;
  submissionSpreadsheet: string;
  spreadsheetFile: File;
  action: string = 'Submit';

  constructor(
    private webinRestService: WebinRestService) {
  }

  ngOnInit() {
  }

  consumeSubmissionTypeChange(submissionType: string) {
    this.submissionType = submissionType;
    this.submissionFormat = undefined;
    this.submissionResult.reset();
    // console.info('Received changed submission type: ' + submissionType);
  }

  consumeSubmissionFormatChange(submissionFormat: string) {
    this.submissionFormat = submissionFormat;
    this.submissionResult.reset();
    // console.info('Received changed submission format: ' + submissionFormat);
  }

  consumeSubmissionSpreadsheetChange(submissionSpreadsheet: string) {
    this.submissionSpreadsheet = submissionSpreadsheet;
    this.submissionResult.reset();
    // console.info('Received changed submission spreadsheet: ' + submissionSpreadsheet);
  }

  onChangeSpreadsheetFile(files) {
    this.spreadsheetFile = files[0];
    this.submissionResult.reset();
    //console.info("Spreadsheet file: " + this.spreadsheetFile);
  }

  canSubmit() {
    return this.spreadsheetFile !== undefined;
  }

  submit() {
    console.log('** Webin spreadsheet submission **');

    let observable: Observable<text>;

    if (this.action == 'Submit') {
      observable = this.webinRestService.addSpreadsheet(this.spreadsheetFile);
    }
    else if (this.action == 'Update') {
      observable = this.webinRestService.updateSpreadsheet(this.spreadsheetFile);
    }
    else if (this.action == 'Validate') {
      observable = this.webinRestService.validateAddSpreadsheet(this.spreadsheetFile);
    }
    else if (this.action == 'Validate update') {
      observable = this.webinRestService.validateUpdateSpreadsheet(this.spreadsheetFile);
    }

    this.submissionResult.submit(observable);
  }
}
