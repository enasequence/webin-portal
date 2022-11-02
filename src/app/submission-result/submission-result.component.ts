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

import { Component, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';


import { WebinRestService } from '../webin-rest.service';

import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { saveAs as importedSaveAs } from 'file-saver';
import { MediaObserver } from '@angular/flex-layout';

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
export class SubmissionResultComponent {

  webinErrorTableColumns = ['error'];
  webinAccessionTableColumns = ['type', 'accession', 'alias'];
  webinErrorDataSource;
  webinAccessionDataSource;
  @ViewChild(MatPaginator, { static: false }) webinErrorPaginator: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) webinAccessionPaginator: MatPaginator;
  result;
  message;
  errorMessage;
  resultError;
  projectAccession: string;
  projectStatus: string;
  projectReleaseDateStr: string;
  projectLinkError;
  projectLinkMessage;
  showReceiptXml = false;
  @Input() showReceiptSuccess = true;
  active: boolean;
  displayMessage: string;

  constructor(
    private _webinRestService: WebinRestService,
    public media: MediaObserver) { }

  isResult(): boolean {
    return this.result ? true : false;
  }

  isMessage(): boolean {
    return this.message ? true : false;
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

  submit(observable: Observable<string>) {
    if (observable) {
      this.reset();
      this.active = true;

      observable.pipe(
        retry(3)
      ).subscribe(
        data => {
          // HttpResponse when using {observe: 'response'}
          this.result = this._webinRestService.parseResult(data);
          // console.log('** Webin submission **', this.result);

          // Find project submission and used its response for displaying different success message. 
          let projectResult = this.result.accessions.find(element => element.type === "PROJECT")
          if (projectResult) {
            this.setProjectDetails(projectResult);
          }

          if (this.result.isError) {
            this.webinErrorDataSource = new MatTableDataSource<WebinError>(this.result.errors);
            this.webinErrorDataSource.paginator = this.webinErrorPaginator;
          } else {
            this.webinAccessionDataSource = new MatTableDataSource<WebinAccession>(this.result.accessions);
            this.webinAccessionDataSource.paginator = this.webinAccessionPaginator;
          }
        },
        (err: HttpErrorResponse) => {
          console.error('** Webin submission service failed **', err);
          const msg = 'Webin submission service failed. Please try again later. If the problem persists please contact the helpdesk.';
          this.resultError = msg;
        },
        () => {
          this.active = false;
        });
    }
  }

  submitUmbrellaProject(observable: Observable<string>, projectLinkJsonForUpdate: object, projectLinkJsonForDelete: object) {
    if (observable) {
      this.reset();
      this.active = true;
      let calledProjectLink = false;

      observable.pipe(
        retry(3)
      ).subscribe(
        data => {
          // HttpResponse when using {observe: 'response'}
          this.result = this._webinRestService.parseResult(data);
          // console.log('** Webin submission **', this.result);

          if (this.result.isError) {
            this.webinErrorDataSource = new MatTableDataSource<WebinError>(this.result.errors);
            this.webinErrorDataSource.paginator = this.webinErrorPaginator;
          } else {

            // For project linking
            // Find project submission and used its response for displaying different success message. 
            let projectResult = this.result.accessions.find(element => element.type === "PROJECT")
            if (projectResult) {
              this.setProjectDetails(projectResult);
            }

            // Delete projectLink before insert / update
            if (projectLinkJsonForDelete["parentId"] || projectLinkJsonForDelete["childIds"].length > 0) {
              projectLinkJsonForDelete["projectId"] = this.projectAccession;
              console.log("Delete project link: " + JSON.stringify(projectLinkJsonForDelete))
              this.deleteProjectLink(projectLinkJsonForDelete);
            }

            // create project link if parentId or childId is added.
            if (projectLinkJsonForUpdate["parentId"] || projectLinkJsonForUpdate["childIds"].length > 0) {
              calledProjectLink = true;
              console.log("Insert / update project link: " + JSON.stringify(projectLinkJsonForUpdate))
              this.createProjectLink(projectLinkJsonForUpdate, this.result.accessions);
            }

            // If project link insertion is not called then show project submission success message here.
            if (!calledProjectLink) {
              this.displayUmbrelaProjectSucccess(this.result.accessions);
            }
          }
        },
        (err: HttpErrorResponse) => {
          console.error('** Webin submission service failed **' + err);
          const msg = 'Webin submission service failed. Please try again later. If the problem persists please contact the helpdesk.';
          this.resultError = msg;
        },
        () => {
          if (!calledProjectLink) {
            this.active = false;
          }
        });
    }
  }

  // Set project details beeded for displaying message.
  setProjectDetails(projectResult) {
    this.projectAccession = projectResult.accession;
    this.projectStatus = this.result.releaseStatus;
    if (this.result.releaseDate) {
      this.projectReleaseDateStr = this.result.releaseDate.slice(0, 10);
    }
  }

  createProjectLink(projectLinkJson: object, projectAccessions) {
    this.active = true;
    // Project link will be created if there is no record exist for the given parent and child id.
    var projectLinkobservable: Observable<string> = this._webinRestService.submitProjectLink(projectLinkJson);
    projectLinkobservable.pipe(
      retry(3)
    ).subscribe(
      data => {
        console.log(data);
        this.projectLinkMessage = "Project link creation successful: " +
          "Parent: " + projectLinkJson["parentId"] +
          "Child: " + projectLinkJson["childIds"];
        // Display submission success message  
        this.displayUmbrelaProjectSucccess(projectAccessions);
        this.active = false;

      }, (err: HttpErrorResponse) => {

        let msgJSON = JSON.parse(err.error);
        let msgStr = "Error while creatinf project link." + err.error;
        if (msgJSON) {
          msgStr = msgJSON.message
        }
        console.error('** Project linking service failed **' + err);
        const msg = 'Project linking failed: ' + msgStr;
        this.projectLinkError = msg;
        // Display submission success message
        this.displayUmbrelaProjectSucccess(projectAccessions);
        this.active = false;
      },
      () => {
        this.active = false;
      });
  }

  deleteProjectLink(projectLinkJson: object) {
    // Project link will be created if there is no record exist for the given parent and child id.
    var projectLinkobservable: Observable<string> = this._webinRestService.removeProjectLink(projectLinkJson);
    projectLinkobservable.pipe(
      retry(3)
    ).subscribe(
      data => {
        console.log(data);
        this.projectLinkMessage = "Project link creation successful: " +
          "Parent: " + projectLinkJson["parentId"] +
          "Child: " + projectLinkJson["childIds"];
      }, (err: HttpErrorResponse) => {

        let msgJSON = JSON.parse(err.error);
        let msgStr = "Error while creatinf project link." + err.error;
        if (msgJSON) {
          msgStr = msgJSON.message
        }
        console.error('** Project linking service failed **' + err);
        const msg = 'Project linking failed: ' + msgStr;
        this.projectLinkError = msg;

      });
  }

  displayUmbrelaProjectSucccess(projectAccessions) {
    this.webinAccessionDataSource = new MatTableDataSource<WebinAccession>(projectAccessions);
    this.webinAccessionDataSource.paginator = this.webinAccessionPaginator;
  }

  showMessage(resp) {
    this.message = true;
    this.errorMessage = resp.isError;
    this.displayMessage = resp.message;

  }

  downloadReceiptXml() {
    const blob = new Blob([this.result.xml], { type: 'text/plain;charset=utf-8' });
    importedSaveAs(blob, 'Webin-receipt-' + this.result.date + '.xml');
  }

  downloadErrorTable() {
    if (this.result.errors) {
      const arr = [];
      arr.push('ERROR');
      this.result.errors.forEach(error => arr.push(error.error));

      const blob = new Blob([arr.join('\n')], { type: 'text/plain;charset=utf-8' });
      importedSaveAs(blob, 'Webin-errors-' + this.result.date + '.txt');
    }
  }

  downloadAccessionTable() {
    if (this.result.accessions) {
      const arr = [];
      arr.push('TYPE\tACCESSION\tALIAS');
      this.result.accessions.forEach(accession => arr.push(
        `${accession.type}\t${accession.accession}\t${accession.alias}`
      ));

      const blob = new Blob([arr.join('\n')], { type: 'text/plain;charset=utf-8' });
      importedSaveAs(blob, 'Webin-accessions-' + this.result.date + '.txt');
    }
  }

  humanReadableFormat(token: string) {
    if (token) {
      const str: string = token.toLowerCase();
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return token;
  }
}
