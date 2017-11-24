import { Component, EventEmitter, OnInit, ViewEncapsulation, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { ReportType } from '../report-type.enum';
import { ReportActionType } from '../report-action-type.enum';

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

  ReportType = ReportType;   // Allows use in template

  @Input() reportType: ReportType;
  public id: string;
  public rows: string = "100";

  data;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) dataPaginator: MatPaginator;
  displayedColumns;
  displayedColumnsCallback;
  dataError;

  spinner: boolean;

  @Output() public onReportChange = new EventEmitter<any>();

  setStudyReportColumns() {
    this.displayedColumns = [
      'Accession',
      'BioProject',
      'Title',
      'Submission date',
      'Release date',
      'Status',
      'Action' // No callback for Action column
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
      'Action' // No callback for Action column
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
      'Archive status',
      'Action' // No callback for Action column
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
      'Archive status',
      'Action' // No callback for Action column
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

  setDacReportColumns() {
    this.displayedColumns = [
      'Accession',
      'Title',
      'Submission date',
      'Status',
      //'Action' // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      Title: this.titleColumnCallback.bind(this),
      'Submission date': this.submissionDateColumnCallback.bind(this),
      Status: this.statusColumnCallback.bind(this)
    };
  }

  setPolicyReportColumns() {
    this.displayedColumns = [
      'Accession',
      'Dac',
      'Title',
      'Submission date',
      'Status',
      'Action' // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      Dac: this.dacColumnCallback.bind(this),
      Title: this.titleColumnCallback.bind(this),
      'Submission date': this.submissionDateColumnCallback.bind(this),
      Status: this.statusColumnCallback.bind(this)
    };
  }

  setDatasetReportColumns() {
    this.displayedColumns = [
      'Accession',
      'Policy',
      'Title',
      'Submission date',
      'Status',
      'Action' // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      Policy: this.policyColumnCallback.bind(this),
      Title: this.titleColumnCallback.bind(this),
      'Submission date': this.submissionDateColumnCallback.bind(this),
      Status: this.statusColumnCallback.bind(this)
    };
  }


  getElementValue(result, col) {
    let callback = this.displayedColumnsCallback[col];
    return this.displayedColumnsCallback[col](result);
  }

  action(result) {
    let dialogData = {
      reportType: this.reportType,
      id: this.getId(result)
    };
    //console.log("** action **", result);

    // Allow navigation to studies report.
    if (this.getStudyId(result)) {
      dialogData[ReportType.studies] = this.getStudyId(result);
    }

    // Allow navigation to samples report.
    if (this.getSampleId(result)) {
      dialogData[ReportType.samples] = this.getId(result);
    }

    // Allow navigation to run report.
    if (this.reportType == ReportType.studies ||
        this.reportType == ReportType.samples ||
        this.reportType == ReportType.runFiles) {
      dialogData[ReportType.runs] = this.getId(result);
    }

    // Allow navigation to analysis report.
    if (this.reportType == ReportType.studies ||
        this.reportType == ReportType.samples ||
        this.reportType == ReportType.analysisFiles) {
      dialogData[ReportType.analyses] = this.getId(result);
    }

    if (this.reportType == ReportType.policies) {
      dialogData[ReportType.dacs] = this.getDacId(result);
    }
    if (this.reportType == ReportType.datasets) {
      dialogData[ReportType.policies] = this.getPolicyId(result);
    }


    // Create data for report dialog.
    let reportDialogRef = this.reportDialog.open(ReportDialogComponent, {
        // height: '400px',
        // width: '250px',
        data: dialogData
    });

    reportDialogRef.afterClosed().subscribe(data => {
      console.log(" ** reports dialog closed **" , data);
      if (data && data.reportActionType == ReportActionType.changeReport) {
        console.log(" ** onReportChange **" , data);
        this.onReportChange.emit(data);
      }
    });
  }

  reset() {
    this.id = undefined;
    this.report();
  }

  report() {
    //console.log(" ** report **", this.reportType);

    let observable: Observable<any> = this.initReport();

    if (observable != null) {
      this.spinner = true;

      observable.subscribe(
        // Success
        data => {
          this.spinner = false;

          this.data = data;
          console.log('** Webin reports service **', this.data);

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
    if (this.reportType == ReportType.studies) {
      this.setStudyReportColumns();
      if (this.id) {
        return this.webinReportService.getStudies(this.id, this.rows);
      }
      return this.webinReportService.getStudiesAll(this.rows);
    }

    if (this.reportType == ReportType.samples) {
      this.setSampleReportColumns();
      if (this.id) {
        return this.webinReportService.getSamples(this.id, this.rows);
      }
      return this.webinReportService.getSamplesAll(this.rows);
    }

    if (this.reportType == ReportType.runs) {
      this.setRunReportColumns();
      if (this.id) {
        return this.webinReportService.getRuns(this.id, this.rows);
      }
      return this.webinReportService.getRunsAll(this.rows);
    }

    if (this.reportType == ReportType.analyses) {
      this.setAnalysisReportColumns();
      if (this.id) {
        return this.webinReportService.getAnalyses(this.id, this.rows);
      }
      return this.webinReportService.getAnalysesAll(this.rows);
    }

    if (this.reportType == ReportType.runFiles) {
      this.setRunFileReportColumns();
      if (this.id) {
        return this.webinReportService.getRunFiles(this.id, this.rows);
      }
      return this.webinReportService.getRunFilesAll(this.rows);
    }

    if (this.reportType == ReportType.analysisFiles) {
      this.setAnalysisFileReportColumns();
      if (this.id) {
        return this.webinReportService.getAnalysisFiles(this.id, this.rows);
      }
      return this.webinReportService.getAnalysisFilesAll(this.rows);
    }

    if (this.reportType == ReportType.dacs) {
      this.setDacReportColumns();
      if (this.id) {
        return this.webinReportService.getDacs(this.id, this.rows);
      }
      return this.webinReportService.getDacsAll(this.rows);
    }

    if (this.reportType == ReportType.policies) {
      this.setPolicyReportColumns();
      if (this.id) {
        return this.webinReportService.getPolicies(this.id, this.rows);
      }
      return this.webinReportService.getPoliciesAll(this.rows);
    }

    if (this.reportType == ReportType.datasets) {
      this.setDatasetReportColumns();
      if (this.id) {
        return this.webinReportService.getDatasets(this.id, this.rows);
      }
      return this.webinReportService.getDatasetsAll(this.rows);
    }

  }


  // Id getters
  //

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

  getDacId(result) {
    return result.report.egaDacId;
  }

  getPolicyId(result) {
    return result.report.egaPolicyId;
  }

  // Column callbacks
  //

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

  organismColumnCallback(result) {
    return result.report.scientificName;
  }

  taxIdColumnCallback(result) {
    return result.report.taxId;
  }

  instrumentColumnCallback(result) {
    return result.report.instrumentModel;
  }

  dacColumnCallback(result) {
    return this.getDacId(result);
  }

  policyColumnCallback(result) {
    return this.getPolicyId(result);
  }

}
