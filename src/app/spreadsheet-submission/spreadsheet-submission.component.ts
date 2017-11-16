import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx';

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
    // console.info('Received changed submission type: ' + submissionType);
  }

  consumeSubmissionFormatChange(submissionFormat: string) {
    this.submissionFormat = submissionFormat;
    // console.info('Received changed submission format: ' + submissionFormat);
  }

  consumeSubmissionSpreadsheetChange(submissionSpreadsheet: string) {
    this.submissionSpreadsheet = submissionSpreadsheet;
    // console.info('Received changed submission spreadsheet: ' + submissionSpreadsheet);
  }

  spreadsheetFile: File;

  action: string = 'add';

  // https://stackoverflow.com/questions/35399617/angular-2-file-upload-from-input-type-file
  onChangeSpreadsheetFile(files) {
    this.spreadsheetFile = files[0];
    console.info("Spreadsheet file: " + this.spreadsheetFile);
  }

  canSubmit() {
    return this.spreadsheetFile !== undefined;
  }

  submit() {
    console.log('** Webin spreadsheet submission **');

    let observable: Observable<text>;

    if (this.action == 'add') {
      observable = this.webinRestService.addSpreadsheet(this.spreadsheetFile);
    }
    else if (this.action == 'update') {
      observable = this.webinRestService.updateSpreadsheet(this.spreadsheetFile);
    }
    else if (this.action == 'validate add') {
      observable = this.webinRestService.validateAddSpreadsheet(this.spreadsheetFile);
    }
    else if (this.action == 'validate update') {
      observable = this.webinRestService.validateUpdateSpreadsheet(this.spreadsheetFile);
    }

    if (observable != null) {
        observable.subscribe(
          // Success
          data => {
              // HttpResponse when using {observe: 'response'}
              console.log('** Webin spreadsheet submission succeeded **');
              this.parseResult(data);
          },
          // Errors
          (err: HttpErrorResponse) => {
            console.log('** Webin spreadsheet submission failed **', err);

            if (err.error instanceof Error) {
              console.log(`Webin login finished with a client or network error ${err.error.message}`);
            }
            else {
              console.log(`Webin login finished with a server error code: ${err.status}, body was: ${err.error}`);
            }
        });
      }
  }

  parseResult(data) {
    console.log("********* Parse result: ", data);
  }


  constructor(
    private webinRestService: WebinRestService) {
  }

  ngOnInit() {
  }
}
