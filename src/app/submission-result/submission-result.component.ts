import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

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
  selector: 'app-submission-result',
  templateUrl: './submission-result.component.html',
  styleUrls: ['./submission-result.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SubmissionResultComponent implements OnInit {

  webinErrorTableColumns = ['error'];
  webinAccessionTableColumns = ['type', 'accession', 'alias'];
  webinErrorDataSource;
  webinAccessionDataSource;
  @ViewChild(MatPaginator) webinErrorPaginator: MatPaginator;
  @ViewChild(MatPaginator) webinAccessionPaginator: MatPaginator;
  result;
  resultError;
  resultDisplay: string = 'table';

  spinner: boolean;

  constructor(
    private webinRestService: WebinRestService) {
  }

  ngOnInit() {
  }

  private reset() {
    this.webinErrorDataSource = undefined;
    this.webinAccessionDataSource = undefined;
    this.result = undefined;
    this.resultError = undefined;
  }

  submit(observable: Observable<text>) {
    if (observable != null) {
      this.spinner = true;
        observable.subscribe(
          // Success
          data => {
            this.spinner = false;

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
