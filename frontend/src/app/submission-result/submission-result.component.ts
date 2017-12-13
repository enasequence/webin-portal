import { Component, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

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
  showReceiptXml: boolean = false;
  @Input() showReceiptSuccess: boolean = true;

  active: boolean;

  constructor(
    private webinRestService: WebinRestService) {
  }

  ngOnInit() {
  }

  isResult(): boolean {
    return this.result !== undefined;
  }

  isError(): boolean {
    return this.result.isError;
  }

  showReceipt(): boolean {
    if (!this.isResult()) return false;
    if (this.isError()) return true;
    return this.showReceiptSuccess;
  }

  reset() {
    this.webinErrorDataSource = undefined;
    this.webinAccessionDataSource = undefined;
    this.result = undefined;
    this.resultError = undefined;
  }

  submit(observable: Observable<any>) {
    if (observable != null) {
      this.active = true;
        observable.subscribe(
          // Success
          data => {
            this.active = false;

              // HttpResponse when using {observe: 'response'}
              this.result = this.webinRestService.parseResult(data);
              console.log('** Webin submission **', this.result);

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
            console.error('** Webin submission service failed **', err);
            let msg: string = 'Webin submission service failed. Please try again later. If the problem persists please contact the helpdesk.';
            //if (err.message) {
            //  msg += " " + err.message;
            //}
            this.resultError = msg;
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

  humanReadableFormat(token: string) {
    if (token) {
      let str: string = token.toLowerCase();
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return token;
  }
}
