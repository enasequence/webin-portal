import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ReportDialogComponent } from '../report-dialog/report-dialog.component';

import { WebinReportService } from '../webin-report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportComponent implements OnInit {

  constructor(
    private webinReportService: WebinReportService,
    private reportDialog: MatDialog) {
  }

  ngOnInit() {
  }

  @Input() reportType: string;
  id: string;

  data;
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataError;
  displayedColumns;
  displayedColumnsCallback;

  getNumberOfRows() {
    if (this.data == null || this.data.length == null) {
      return 0;
    }
    return this.data.length;
  }

  setStudyReportColumns() {
    this.displayedColumns = [
      'Accession',
      'Project',
      'Title',
      'Submission date',
      'Release date'
      'Status',
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      Project: this.secondaryIdColumnCallback.bind(this),
      Title: this.titleColumnCallback.bind(this),
      'Submission date': this.submissionDateColumnCallback.bind(this),
      'Release date': this.releaseDateColumnCallback.bind(this),
      Status: this.statusColumnCallback.bind(this)
    };
  }

  setSampleReportColumns() {
    this.displayedColumns = [
      'Accession',
      'Submission date',
      'Status'
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      'Submission date': this.submissionDateColumnCallback.bind(this),
      Status: this.statusColumnCallback.bind(this)
    };
  }

  setRunReportColumns() {
    this.displayedColumns = [
      'Accession',
      'Submission date',
      'Status'
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      'Submission date': this.submissionDateColumnCallback.bind(this),
      Status: this.statusColumnCallback.bind(this)
    };
  }

  setAnalysisReportColumns() {
    this.displayedColumns = [
      'Accession',
      'Study',
      'Sample',
      'Analysis type',
      'Submission date',
      'Status'
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      Study: this.studyColumnCallback.bind(this),
      Sample: this.sampleColumnCallback.bind(this),
      'Analysis type': this.analysisTypeColumnCallback.bind(this),
      'Submission date': this.submissionDateColumnCallback.bind(this),
      Status: this.statusColumnCallback.bind(this)
    };
  }

  setRunFileReportColumns() {
    this.displayedColumns = [
      'Accession',
      //'Submission date',
      'File name',
      'File format',
      'File size',
      //'Checksum method',
      'MD5 checksum',
      'Archive status'
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      //'Submission date': this.submissionDateColumnCallback.bind(this),
      'File name': this.fileNameColumnCallback.bind(this),
      'File format': this.fileFormatColumnCallback.bind(this),
      'File size': this.fileSizeColumnCallback.bind(this),
      //'Checksum method': this.fileChecksumMethodColumnCallback.bind(this),
      'MD5 checksum': this.fileChecksumColumnCallback.bind(this),
      'Archive status': this.fileArchiveStatusColumnCallback.bind(this)
    };
  }

  setAnalysisFileReportColumns() {
    this.displayedColumns = [
      'Accession',
      //'Analysis type',
      //'Submission date',
      'File name',
      'File format',
      'File size',
      //'Checksum method',
      'MD5 checksum',
      'Archive status'
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      //'Analysis type': this.analysisTypeColumnCallback.bind(this),
      //'Submission date': this.submissionDateColumnCallback.bind(this),
      'File name': this.fileNameColumnCallback.bind(this),
      'File format': this.fileFormatColumnCallback.bind(this),
      'File size': this.fileSizeColumnCallback.bind(this),
      //'Checksum method': this.fileChecksumMethodColumnCallback.bind(this),
      'MD5 checksum': this.fileChecksumColumnCallback.bind(this),
      'Archive status': this.fileArchiveStatusColumnCallback.bind(this)
    };
  }

  getId(result) {
    if (result.report.egaId) {
      return result.report.egaId;
    }
    return result.report.id;
  }

  getStudyId(result) {
    if (result.report.studyEgaId) {
      return result.report.studyEgaId;
    }
    return result.report.studyId;
  }

  getSampleId(result) {
    if (result.report.sampleEgaId) {
      return result.report.sampleEgaId;
    }
    result.report.sampleId;
  }

  accessionColumnCallback(result) {
    return this.getId(result);
  }

  studyColumnCallback(result) {
    return this.getStudyId(result);
  }

  sampleColumnCallback(result) {
    return this.getSampleId(result);
  }

  tokenFormat(token: string) {
    if (token) {
      let str: string = token.toLowerCase();
      str = str.replace(/_/g, ' ');
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return token;
  }

  analysisTypeColumnCallback(result) {
    return this.tokenFormat(result.report.analysisType);
  }

  dateFormat(date: Date) {
    let month = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let day = date.getDate();
    let daySuffix: string;
    if(day > 3 && day < 21) {
      daySuffix = 'th';
    }
    else {
      switch (day % 10) {
        case 1: daySuffix = "st";
        case 2: daySuffix = "nd";
        case 3: daySuffix = "rd";
        default: daySuffix = "th";
      }
    }

    return date.getDate() + daySuffix + " " +
           month[date.getMonth()]  + " " +
           date.getFullYear();
  }

  submissionDateColumnCallback(result) {
    let date: Date = new Date(result.report.firstCreated);
    return this.dateFormat(date);
  }

  releaseDateColumnCallback(result) {
    let date: Date = new Date(result.report.holdDate);
    return this.dateFormat(date);
  }

  statusColumnCallback(result) {
    return this.tokenFormat(result.report.releaseStatus);
  }

  fileNameColumnCallback(result) {
    return result.report.fileName;
  }

  fileSizeColumnCallback(result) {
    return result.report.bytes;
  }

  fileChecksumMethodColumnCallback(result) {
    return result.report.checksumMethod;
  }

  fileChecksumColumnCallback(result) {
    return result.report.checksum;
  }

  fileFormatColumnCallback(result) {
    return result.report.fileFormat;
  }

  fileArchiveStatusColumnCallback(result) {
    return result.report.archiveStatus;
  }

  secondaryIdColumnCallback(result) {
    return result.report.secondaryId;
  }

  titleColumnCallback(result) {
    return result.report.title;
  }





  getElementValue(result, col) {
    let callback = this.displayedColumnsCallback[col];
    return this.displayedColumnsCallback[col](result);
  }


  clickRow(row) {
    console.log("clickRow", this, row);
    let reportDialogRef = this.reportDialog.open(ReportDialogComponent, {
//      height: '400px',
//       width: '250px',
      data: {
        study: 'test',
        sample: 'test'
      }
    });

    reportDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }




  report() {
    let observable: Observable<text>;
    //console.log(" ** report **", this.reportType);

    if (this.reportType == "studies") {
      this.setStudyReportColumns();
      observable = this.webinReportService.getStudiesAll();
    }
    if (this.reportType == "samples") {
      this.setSampleReportColumns();
      observable = this.webinReportService.getSamplesAll();
    }
    if (this.reportType == "runs") {
      this.setRunReportColumns();
      observable = this.webinReportService.getRunsAll();
    }
    if (this.reportType == "analyses") {
      this.setAnalysisReportColumns();
      observable = this.webinReportService.getAnalysesAll();
    }
    if (this.reportType == "run files") {
      this.setRunFileReportColumns();
      observable = this.webinReportService.getRunFilesAll();
    }
    if (this.reportType == "analysis files") {
      this.setAnalysisFileReportColumns();
      observable = this.webinReportService.getAnalysisFilesAll();
    }

      if (observable != null) {
        observable.subscribe(
          // Success
          data => {
              // HttpResponse when using {observe: 'response'}
              //this.result = this.webinRestService.parseResult(data);
              this.data = data;
              console.log('** Webin reports service **', this.data);

              this.dataSource = new MatTableDataSource<WebinError>(this.data);
              this.dataSource.paginator = this.paginator;
          },
          // Errors
          (err: HttpErrorResponse) => {
            console.log('** Webin submission failed **', err);

            if (err.error instanceof Error) {
              this.dataError = `Webin reports failed because of a client or network error: ${err.error.message}`;
            }
            else {
              this.dataError = `Webin reports failed because of a server error ${err.status}: ${err.error}`;
            }
            console.log(this.dataError);
        });
    }
  }
}
