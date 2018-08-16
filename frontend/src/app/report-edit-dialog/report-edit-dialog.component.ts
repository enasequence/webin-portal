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

import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

import { WebinXmlReportService } from '../webin-xml-report.service';
import { WebinRestService } from '../webin-rest.service';
import { SubmissionResultComponent } from '../submission-result/submission-result.component';

import { ReportType } from '../report-type.enum';
import { ReportActionInterface } from '../report-action.interface';

@Component({
  selector: 'app-report-edit-dialog',
  templateUrl: './report-edit-dialog.component.html',
  styleUrls: ['./report-edit-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportEditDialogComponent implements OnInit {

  @ViewChild(SubmissionResultComponent) submissionResult: SubmissionResultComponent;

  constructor(
    private _webinXmlReportService: WebinXmlReportService,
    private _webinRestService: WebinRestService,
    public dialogRef: MatDialogRef<ReportEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReportActionInterface) { }

  retrieveXmlError: string;
  xml: string;

  ngOnInit() {
    this.load();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  isUpdateXmlResult(): boolean {
    return this.submissionResult.isResult();
  }

  isUpdateXmlError(): boolean {
    return this.submissionResult.isError();
  }

  isRetrieveXmlError(): boolean {
    return this.retrieveXmlError ? true : false;
  }

  getTitle(): string {
    return ReportType.getCapitalisedSingularName(this.data.reportType) + ': ' + this.data.id;
  }

  load(): void {
    let observable: Observable<string>;

    const id: string = this.data.id;
    const reportType: ReportType = this.data.reportType;

    console.log('** xml retrieval **', reportType, id);

    switch (reportType) {
       case ReportType.studies: {
         observable = this._webinXmlReportService.getStudyXml(id);
         break;
       }
       case ReportType.projects: {
         observable = this._webinXmlReportService.getProjectXml(id);
         break;
       }
       case ReportType.samples: {
         observable = this._webinXmlReportService.getSampleXml(id);
         break;
       }
       case ReportType.runs: {
         observable = this._webinXmlReportService.getRunXml(id);
         break;
       }
       case ReportType.experiments: {
        observable = this._webinXmlReportService.getExperimentXml(id);
         break;
       }
       case ReportType.analyses: {
         observable = this._webinXmlReportService.getAnalysisXml(id);
         break;
       }
       case ReportType.dacs: {
         observable = this._webinXmlReportService.getDacXml(id);
         break;
       }
       case ReportType.policies: {
         observable = this._webinXmlReportService.getPolicyXml(id);
         break;
       }
       case ReportType.datasets: {
         observable = this._webinXmlReportService.getDatasetXml(id);
         break;
       }
    }

    if (observable) {
      observable.subscribe(
        // Success
        data => {
          console.log('** xml retrieval succeeded **', data);
          this.xml = data;
        },
        // Errors
        (err: HttpErrorResponse) => {
          console.error('** webin xml retrieval service failed **', err);
          const msg = 'Webin XML retrieval service failed. Please try again later. If the problem persists please contact the helpdesk.';
          this.retrieveXmlError = msg;
      });
    }
  }

  back(): void {
    this.submissionResult.reset();
  }

  save() {
    const observable: Observable<string> = this._webinRestService.updateXml(
      this.data.reportType, new Blob([ this.xml ]));

    this.submissionResult.submit(observable);
  }
}
