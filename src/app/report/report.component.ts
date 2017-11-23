import { Component, EventEmitter, OnInit, ViewEncapsulation, Input, Output, ViewChild } from '@angular/core';
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
  public id: string;
  spinner: boolean;

  data;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) dataPaginator: MatPaginator;

  dataError;
  displayedColumns;
  displayedColumnsCallback;

  @Output() public onReportChange = new EventEmitter<any>();

  getSearchButtonText() {
    //if (this.id) {
    //  return "Search " + this.id;
    //}
    return "Search";
  }

  setStudyReportColumns() {
    this.displayedColumns = [
      'Accession',
      'BioProject',
      'Title',
      'Submission date',
      'Release date'
      'Status',
      // 'Action' // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      BioProject: this.secondaryIdColumnCallback.bind(this),
      Title: this.titleColumnCallback.bind(this),
      'Submission date': this.submissionDateColumnCallback.bind(this),
      'Release date': this.releaseDateColumnCallback.bind(this),
      Status: this.statusColumnCallback.bind(this)
    };
  }

  setSampleReportColumns() {
    this.displayedColumns = [
      'Accession',
      'BioSample',
      'Title',
      'Organism',
      'Tax id',
      'Submission date',
      'Status',
      // 'Action' // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      BioSample: this.secondaryIdColumnCallback.bind(this),
      Title: this.titleColumnCallback.bind(this),
      Organism: this.organismColumnCallback.bind(this),
      'Tax id': this.taxIdColumnCallback.bind(this),
      'Submission date': this.submissionDateColumnCallback.bind(this),
      Status: this.statusColumnCallback.bind(this)
    };
  }

  setRunReportColumns() {
    this.displayedColumns = [
      'Accession',
      'Instrument',
      'Study',
      'Sample',
      'Experiment',
      'Submission date',
      'Status',
      'Action' // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      Instrument: this.instrumentColumnCallback.bind(this),
      Study: this.studyColumnCallback.bind(this),
      Sample: this.sampleColumnCallback.bind(this),
      Experiment: this.experimentColumnCallback.bind(this),
      'Submission date': this.submissionDateColumnCallback.bind(this),
      Status: this.statusColumnCallback.bind(this)
    };
  }

  setAnalysisReportColumns() {
    this.displayedColumns = [
      'Accession',
      'Analysis type',
      'Study',
      'Sample',
      'Submission date',
      'Status',
      'Action' // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      'Analysis type': this.analysisTypeColumnCallback.bind(this),
      Study: this.studyColumnCallback.bind(this),
      Sample: this.sampleColumnCallback.bind(this),
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
    return result.report.sampleId;
  }

  getExperimentId(result) {
    if (result.report.experimentEgaId) {
      return result.report.experimentEgaId;
    }
    return result.report.experimentId;
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

  experimentColumnCallback(result) {
    return this.getExperimentId(result);
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

  titleColumnCallback(result) {
    return result.report.title;
  }

  organismColumnCallback(result) {
    return result.report.scientificName;
  }

  taxIdColumnCallback(result) {
    return result.report.taxId;
  }

  instrumentColumnCallback(result) {
   return result.report.instrumentModel;
  }



  getElementValue(result, col) {
    let callback = this.displayedColumnsCallback[col];
    return this.displayedColumnsCallback[col](result);
  }


  action(result) {
    console.log("** action **", result);
    // Show study action.
    let study: string = this.getStudyId(result);
    // Show samples action.
    let samples: string;
    if (this.getSampleId(result)) {
      samples = this.getId(result);
    }

    let reportDialogRef = this.reportDialog.open(ReportDialogComponent, {
//      height: '400px',
//       width: '250px',
      data: {
        study: study,
        samples: samples
      }
    });

    reportDialogRef.afterClosed().subscribe(data => {
      if (data && data.type && data.type == 'reportChange') {
        this.onReportChange.emit(data);
      }
    });
  }

  report() {
    //console.log(" ** report **", this.reportType);

    let observable: Observable<text> = this.initReport();

    if (observable != null) {
      this.spinner = true;

      observable.subscribe(
        // Success
        data => {
            // HttpResponse when using {observe: 'response'}
            //this.result = this.webinRestService.parseResult(data);
            this.data = data;
            console.log('** Webin reports service **', this.data);

            this.spinner = false;

            this.dataSource = new MatTableDataSource<any>(this.data);
            this.dataSource.paginator = this.dataPaginator;
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

  initReport()
  {
    if (this.reportType == "studies") {
      this.setStudyReportColumns();
      if (this.id) {
        return this.webinReportService.getStudiesOne(this.id);
      }
      return this.webinReportService.getStudiesAll();
    }

    if (this.reportType == "samples") {
      this.setSampleReportColumns();
      if (this.id) {
        return this.webinReportService.getSamplesOne(this.id);
      }
      return this.webinReportService.getSamplesAll();
    }

    if (this.reportType == "runs") {
      this.setRunReportColumns();
      if (this.id) {
        return this.webinReportService.getRunsOne(this.id);
      }
      return this.webinReportService.getRunsAll();
    }

    if (this.reportType == "analyses") {
      this.setAnalysisReportColumns();
      if (this.id) {
        return this.webinReportService.getAnalysesOne(this.id);
      }
      return this.webinReportService.getAnalysesAll();
    }

    if (this.reportType == "run files") {
      this.setRunFileReportColumns();
      if (this.id) {
        return this.webinReportService.getRunFilesOne(this.id);
      }
      return this.webinReportService.getRunFilesAll();
    }

    if (this.reportType == "analysis files") {
      this.setAnalysisFileReportColumns();
      if (this.id) {
        return this.webinReportService.getAnalysisFilesOne(this.id);
      }
      return this.webinReportService.getAnalysisFilesAll();
    }
    
  }
}
