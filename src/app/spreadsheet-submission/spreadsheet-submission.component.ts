import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { SubmissionFormatSelectorComponent } from '../submission-format-selector/submission-format-selector.component';
import { SubmissionSpreadsheetSelectorComponent } from '../submission-spreadsheet-selector/submission-spreadsheet-selector.component';

import { WebinRestService } from '../webin-rest.service';

import {Observable} from 'rxjs/Observable';
import {saveAs as importedSaveAs} from "file-saver";

export interface WebinError {
  error: string;
}

export interface WebinAccession {
  type: string;
  accession: string;
  alias: string;
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
  webinAccessionTableColumns = ['type', 'accession', 'alias'];
  webinErrorDataSource;
  webinAccessionDataSource;
  @ViewChild(MatPaginator) webinErrorPaginator: MatPaginator;
  @ViewChild(MatPaginator) webinAccessionPaginator: MatPaginator;
  result;
  resultError;

  submissionType: string;
  submissionFormat: string;
  submissionSpreadsheet: string;
  spreadsheetFile: File;
  action: string = 'add';
  resultDisplay: string = 'table';

  constructor(
    private webinRestService: WebinRestService) {
  }

  ngOnInit() {
  }

  getNumberOfErrors() {
    if (this.result == null || this.result.errors == null) {
      return 0;
    }
    return this.result.errors.length;
  }

  getNumberOfAccessions() {
    if (this.result == null || this.result.accessions == null) {
      return 0;
    }
    return this.result.accessions.length;
  }

  private resetResult() {
    this.webinErrorDataSource = undefined;
    this.webinAccessionDataSource = undefined;
    this.result = undefined;
    this.resultError = undefined;
  }

  consumeSubmissionTypeChange(submissionType: string) {
    this.submissionType = submissionType;
    this.submissionFormat = undefined;
    this.resetResult();
    // console.info('Received changed submission type: ' + submissionType);
  }

  consumeSubmissionFormatChange(submissionFormat: string) {
    this.submissionFormat = submissionFormat;
    this.resetResult();
    // console.info('Received changed submission format: ' + submissionFormat);
  }

  consumeSubmissionSpreadsheetChange(submissionSpreadsheet: string) {
    this.submissionSpreadsheet = submissionSpreadsheet;
    this.resetResult();
    // console.info('Received changed submission spreadsheet: ' + submissionSpreadsheet);
  }

  // https://stackoverflow.com/questions/35399617/angular-2-file-upload-from-input-type-file
  onChangeSpreadsheetFile(files) {
    this.spreadsheetFile = files[0];
    this.resetResult();
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

              if (this.result.isError) {
                this.webinErrorDataSource = new MatTableDataSource<WebinError>(this.result.errors);
                this.webinErrorDataSource.paginator = this.webinErrorPaginator;
              }
              else {
                this.webinAccessionDataSource = new MatTableDataSource<WebinAccession>(this.result.accessions);
                this.webinAccessionDataSource.paginator = this.webinAccessionPaginator;
              }
          },
          // Errors
          (err: HttpErrorResponse) => {
            console.log('** Webin submission failed **', err);

            if (err.error instanceof Error) {
              this.resultError = `Webin submission failed because of a client or network error: ${err.error.message}`;
            }
            else {
              this.resultError = `Webin submission failed because of a server error ${err.status}: ${err.error}`;
            }
            console.log(this.resultError);
        });
      }
  }

  downloadReceiptXml() {
    var blob = new Blob([this.result.xml], {type: "text/plain;charset=utf-8"});
    importedSaveAs(blob, "Webin-receipt-" + this.result.date + ".xml");
  }

  downloadErrorTable() {
    if (this.result.errors == null) {
      return;
    }

    let arr = [];
    arr.push(
      "ERROR");
    let len = this.result.errors.length;
    for (let i = 0; i < len; i++) {
      arr.push(
        this.result.errors[i].error
      );
    }
    var blob = new Blob([arr.join("\n")], {type: "text/plain;charset=utf-8"});
    importedSaveAs(blob, "Webin-errors-" + this.result.date + ".txt");
  }

  downloadAccessionTable() {
    if (this.result.accessions == null) {
      return;
    }

    let arr = [];
    arr.push(
      "TYPE\t" +
      "ACCESSION\t" +
      "ALIAS");
    let len = this.result.accessions.length;
    for (let i = 0; i < len; i++) {
      arr.push(
        this.result.accessions[i].type + "\t" +
        this.result.accessions[i].accession + "\t" +
        this.result.accessions[i].alias
      );
    }
    var blob = new Blob([arr.join("\n")], {type: "text/plain;charset=utf-8"});
    importedSaveAs(blob, "Webin-accessions-" + this.result.date + ".txt");
  }


}
