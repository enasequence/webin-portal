/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import { Component, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

import { WebinRestService } from '../webin-rest.service';

import {Observable} from 'rxjs';
import {saveAs as importedSaveAs} from 'file-saver';

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
  showReceiptXml = false;
  @Input() showReceiptSuccess = true;

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
    if (!this.isResult()) { return false; }
    if (this.isError()) { return true; }
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
    this.reset();
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
              } else {
                this.webinAccessionDataSource = new MatTableDataSource<WebinAccession>(this.result.accessions);
                this.webinAccessionDataSource.paginator = this.webinAccessionPaginator;
              }
          },
          // Errors
          (err: HttpErrorResponse) => {
            console.error('** Webin submission service failed **', err);
            const msg = 'Webin submission service failed. Please try again later. If the problem persists please contact the helpdesk.';
            // if (err.message) {
            //   msg += " " + err.message;
            // }
            this.resultError = msg;
        });
      }
  }

  downloadReceiptXml() {
    const blob = new Blob([this.result.xml], {type: 'text/plain;charset=utf-8'});
    importedSaveAs(blob, 'Webin-receipt-' + this.result.date + '.xml');
  }

  downloadErrorTable() {
    if (this.result.errors == null) {
      return;
    }

    const arr = [];
    arr.push(
      'ERROR');
    const len = this.result.errors.length;
    for (let i = 0; i < len; i++) {
      arr.push(
        this.result.errors[i].error
      );
    }
    const blob = new Blob([arr.join('\n')], {type: 'text/plain;charset=utf-8'});
    importedSaveAs(blob, 'Webin-errors-' + this.result.date + '.txt');
  }

  downloadAccessionTable() {
    if (this.result.accessions == null) {
      return;
    }

    const arr = [];
    arr.push(
      'TYPE\t' +
      'ACCESSION\t' +
      'ALIAS');
    const len = this.result.accessions.length;
    for (let i = 0; i < len; i++) {
      arr.push(
        this.result.accessions[i].type + '\t' +
        this.result.accessions[i].accession + '\t' +
        this.result.accessions[i].alias
      );
    }
    const blob = new Blob([arr.join('\n')], {type: 'text/plain;charset=utf-8'});
    importedSaveAs(blob, 'Webin-accessions-' + this.result.date + '.txt');
  }

  humanReadableFormat(token: string) {
    if (token) {
      const str: string = token.toLowerCase();
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return token;
  }
}
