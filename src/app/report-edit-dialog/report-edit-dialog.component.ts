import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { WebinXmlReportService } from '../webin-xml-report.service';
import { WebinRestService } from '../webin-rest.service';
import { SubmissionResultComponent } from '../submission-result/submission-result.component';

import { ReportType, ReportTypeUtils } from '../report-type.enum';

@Component({
  selector: 'app-report-edit-dialog',
  templateUrl: './report-edit-dialog.component.html',
  styleUrls: ['./report-edit-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportEditDialogComponent implements OnInit {

  @ViewChild(SubmissionResultComponent) submissionResult: SubmissionResultComponent;

  constructor(
    private webinXmlReportService: WebinXmlReportService,
    private webinRestService: WebinRestService,
    public dialogRef: MatDialogRef<ReportEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  retrieveXmlError: string;
  xml: string;

  private _testRetrieveXmlSuccess: boolean = true;

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
    return this.retrieveXmlError !== undefined;
  }

  getTitle(): string {
    return ReportTypeUtils.getTitle(this.data.reportType, this.data.id);
  }

  load() {
    if (this._testRetrieveXmlSuccess) {
      this.xml =
        '<?xml version="1.0" encoding="UTF-8"?>' + "\n" +
        '<STUDY accession="ERP021311">' + "\n" +
        '<DESCRIPTOR>' + "\n" +
        '  <STUDY_TITLE>TEST</STUDY_TITLE>' + "\n" +
        '  <STUDY_TYPE existing_study_type="Population Genomics"/>' + "\n" +
        '</DESCRIPTOR>' + "\n" +
        '</STUDY>';
      // '<testRetrieveXmlSuccess></testRetrieveXmlSuccess>';
      return;
    }

    let observable: Observable<any>;

    let id: string = this.data.id;
    let reportType: ReportType = this.data.reportType;

    console.log('** xml retrieval **', ReportType[reportType], id);

    switch(reportType) {
       case ReportType.studies: {
         observable = this.webinXmlReportService.getStudyXml(id);
         break;
       }
       case ReportType.projects: {
         observable = this.webinXmlReportService.getProjectXml(id);
         break;
       }
       case ReportType.samples: {
         observable = this.webinXmlReportService.getSampleXml(id);
         break;
       }
       case ReportType.runs: {
         observable = this.webinXmlReportService.getRunXml(id);
         break;
       }
       case ReportType.experiments: {
        observable = this.webinXmlReportService.getExperimentXml(id);
         break;
       }
       case ReportType.analyses: {
         observable = this.webinXmlReportService.getAnalysisXml(id);
         break;
       }
       case ReportType.dacs: {
         observable = this.webinXmlReportService.getDacXml(id);
         break;
       }
       case ReportType.policies: {
         observable = this.webinXmlReportService.getPolicyXml(id);
         break;
       }
       case ReportType.datasets: {
         observable = this.webinXmlReportService.getDatasetXml(id);
         break;
       }
    }

    if (observable != null) {
      observable.subscribe(
        // Success
        data => {
          console.log('** xml retrieval succeeded **', data);
          this.xml = data;
        },
        // Errors
        (err: HttpErrorResponse) => {
          console.log('** xml retrieval failed **', err);

          if (err.error instanceof Error) {
            this.retrieveXmlError = `XML retrieval failed because of a client or network error: ${err.error.message}`;
          }
          else {
            this.retrieveXmlError = `XML retrieval failed because of a server error ${err.status}: ${err.error}`;
          }
          console.log(this.retrieveXmlError);
      });
    }
  }

  back() {
    this.submissionResult.reset();
  }

  save() {
    let observable: Observable<any> = this.webinRestService.updateXml(
      this.data.reportType, new Blob([ this.xml ]));

    this.submissionResult.submit(observable);
  }
}
