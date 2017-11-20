import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { SubmissionFormatSelectorComponent } from '../submission-format-selector/submission-format-selector.component';
import { SubmissionSpreadsheetSelectorComponent } from '../submission-spreadsheet-selector/submission-spreadsheet-selector.component';

import { WebinRestService } from '../webin-rest.service';

import {Observable} from 'rxjs/Observable';
 import {Subject} from 'rxjs/Subject';

export interface WebinError {
  error: string;
}

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

  webinErrorTableColumns = ['error'];
  webinErrorDataSource: WebinErrorDataSource;
  result;
  @ViewChild(MatPaginator) webinErrorPaginator: MatPaginator;

  submissionType: string;
  submissionFormat: string;
  submissionSpreadsheet: string;
  spreadsheetFile: File;
  action: string = 'add';
  errorDisplay: string = 'table';

  constructor(
    private webinRestService: WebinRestService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  getNumberOfErrors() {
    console.log(this.result);
    if (this.result == null || this.result.errors == null) {
      return 0;
    }
    return this.result.errors.length;
  }

  consumeSubmissionTypeChange(submissionType: string) {
    this.submissionType = submissionType;
    this.submissionFormat = undefined;
    this.webinErrorDataSource = null;
    this.result = null;
    // console.info('Received changed submission type: ' + submissionType);
  }

  consumeSubmissionFormatChange(submissionFormat: string) {
    this.submissionFormat = submissionFormat;
    this.webinErrorDataSource = null;
    this.result = null;
    // console.info('Received changed submission format: ' + submissionFormat);
  }

  consumeSubmissionSpreadsheetChange(submissionSpreadsheet: string) {
    this.submissionSpreadsheet = submissionSpreadsheet;
    this.webinErrorDataSource = null;
    this.result = null;
    // console.info('Received changed submission spreadsheet: ' + submissionSpreadsheet);
  }

  // https://stackoverflow.com/questions/35399617/angular-2-file-upload-from-input-type-file
  onChangeSpreadsheetFile(files) {
    this.spreadsheetFile = files[0];
    this.webinErrorDataSource = null;
    this.result = null;
    //console.info("Spreadsheet file: " + this.spreadsheetFile);
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
              this.result = this.webinRestService.parseResult(data);
              console.log('** Webin spreadsheet submission succeeded **', this.result);

              this.webinErrorDataSource = new MatTableDataSource<WebinError>(this.result.errors);
              this.webinErrorDataSource.paginator = this.webinErrorPaginator;
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
}
