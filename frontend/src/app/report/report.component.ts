import { Component, EventEmitter, OnInit, ViewEncapsulation, ViewChild, Input, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ReportEditDialogComponent } from '../report-edit-dialog/report-edit-dialog.component';
import { ReportType, ReportTypeUtils } from '../report-type.enum';
import { ReportActionType } from '../report-action-type.enum';

import { WebinReportService } from '../webin-report.service';

import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportComponent implements OnInit {

  ReportType = ReportType;   // Allows use in template
  ReportTypeUtils = ReportTypeUtils;   // Allows use in template

  @Input() reportType: ReportType;
  @Output() onReportChange = new EventEmitter<any>();
  @ViewChild(MatPaginator) dataPaginator: MatPaginator;

  rows = '100';
  data;
  dataSource: MatTableDataSource<any>;
  displayedColumns;
  displayedColumnsCallback;
  dataError;
  _id: string;
  _showAlias = false;
  _status: string;
  _processStatus: string;
  _analysisType: string;
  active: boolean;

  constructor(
    private webinReportService: WebinReportService,
    private reportDialog: MatDialog) {
  }

  ngOnInit() {
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
    this._processStatus = undefined;
  }

  get showAlias(): boolean {
    return this._showAlias;
  }

  set showAlias(showAlias: boolean) {
    this._showAlias = showAlias;
    this.initReportColumns();
  }

  get status(): string {
    return this._status;
  }

  set status(status: string) {
    this._status = status;
    this._id = undefined;
  }

  get processStatus(): string {
    return this._processStatus;
  }

  set processStatus(processStatus: string) {
    this._processStatus = processStatus;
    this._id = undefined;
  }

  get analysisType(): string {
    return this._analysisType;
  }

  set analysisType(analysisType: string) {
    this._analysisType = analysisType;
    this._id = undefined;
  }

  isMetadataReport() {
    return this.reportType !== ReportType.runFiles &&
           this.reportType !== ReportType.analysisFiles &&
           this.reportType !== ReportType.runProcess &&
           this.reportType !== ReportType.analysisProcess;
  }

  isFileReport() {
    return this.reportType === ReportType.runFiles ||
           this.reportType === ReportType.analysisFiles;
  }

  isProcessReport() {
    return this.reportType === ReportType.runProcess ||
           this.reportType === ReportType.analysisProcess;
  }

  setStudyReportColumns() {
    this.displayedColumns = [
      this._showAlias ? 'Unique name' : 'Accession',
      'BioProject',
      'Title',
      'Submission date',
      'Release date',
      'Status',
      'Action', // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      'Unique name': this.aliasColumnCallback.bind(this),
      BioProject: this.secondaryIdColumnCallback.bind(this),
      Title: this.titleColumnCallback.bind(this),
      'Submission date': this.submissionDateColumnCallback.bind(this),
      'Release date': this.releaseDateColumnCallback.bind(this),
      Status: this.statusColumnCallback.bind(this)
    };
  }

  setSampleReportColumns() {
    this.displayedColumns = [
      this._showAlias ? 'Unique name' : 'Accession',
      'BioSample',
      'Title',
      'Organism',
      'Tax id',
      'Submission date',
      'Status',
      'Action', // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      'Unique name': this.aliasColumnCallback.bind(this),
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
      this._showAlias ? 'Unique name' : 'Accession',
      'Instrument',
      'Study',
      'Sample',
      'Experiment',
      'Submission date',
      'Status',
      'Action', // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      'Unique name': this.aliasColumnCallback.bind(this),
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
      this._showAlias ? 'Unique name' : 'Accession',
      'Analysis type',
      'Study',
      'Sample',
      'Submission date',
      'Status',
      'Action', // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      'Unique name': this.aliasColumnCallback.bind(this),
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
      // 'Submission date',
      'File name',
      'File format',
      'File size',
      // 'Checksum method',
      'MD5 checksum',
      'Archive status',
      'Action' // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      // 'Submission date': this.submissionDateColumnCallback.bind(this),
      'File name': this.fileNameColumnCallback.bind(this),
      'File format': this.fileFormatColumnCallback.bind(this),
      'File size': this.fileSizeColumnCallback.bind(this),
      // 'Checksum method': this.fileChecksumMethodColumnCallback.bind(this),
      'MD5 checksum': this.fileChecksumColumnCallback.bind(this),
      'Archive status': this.fileArchiveStatusColumnCallback.bind(this)
    };
  }

  setAnalysisFileReportColumns() {
    this.displayedColumns = [
      'Accession',
      // 'Analysis type',
      // 'Submission date',
      'File name',
      'File format',
      'File size',
      // 'Checksum method',
      'MD5 checksum',
      'Archive status',
      'Action' // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      // 'Analysis type': this.analysisTypeColumnCallback.bind(this),
      // 'Submission date': this.submissionDateColumnCallback.bind(this),
      'File name': this.fileNameColumnCallback.bind(this),
      'File format': this.fileFormatColumnCallback.bind(this),
      'File size': this.fileSizeColumnCallback.bind(this),
      // 'Checksum method': this.fileChecksumMethodColumnCallback.bind(this),
      'MD5 checksum': this.fileChecksumColumnCallback.bind(this),
      'Archive status': this.fileArchiveStatusColumnCallback.bind(this)
    };
  }

  setRunProcessReportColumns() {
    this.displayedColumns = [
      'Accession',
      'Process status',
      'Process error',
      'Action', // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      'Process status': this.processingStatusColumnCallback.bind(this),
      'Process error': this.processingErrorColumnCallback.bind(this)
    };
  }

  setAnalysisProcessReportColumns() {
    this.displayedColumns = [
      'Accession',
      'Analysis type',
      'Process accession',
      'Process status',
      'Process error',
      'Action', // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      'Analysis type': this.analysisTypeColumnCallback.bind(this),
      'Process accession': this.processingAccessionColumnCallback.bind(this),
      'Process status': this.processingStatusColumnCallback.bind(this),
      'Process error': this.processingErrorColumnCallback.bind(this)
    };
  }

  setDacReportColumns() {
    this.displayedColumns = [
      this._showAlias ? 'Unique name' : 'Accession',
      'Title',
      'Submission date',
      'Status',
      'Action', // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      'Unique name': this.aliasColumnCallback.bind(this),
      Title: this.titleColumnCallback.bind(this),
      'Submission date': this.submissionDateColumnCallback.bind(this),
      Status: this.statusColumnCallback.bind(this)
    };
  }

  setPolicyReportColumns() {
    this.displayedColumns = [
      this._showAlias ? 'Unique name' : 'Accession',
      'Dac',
      'Title',
      'Submission date',
      'Status',
      'Action', // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      'Unique name': this.aliasColumnCallback.bind(this),
      Dac: this.dacColumnCallback.bind(this),
      Title: this.titleColumnCallback.bind(this),
      'Submission date': this.submissionDateColumnCallback.bind(this),
      Status: this.statusColumnCallback.bind(this)
    };
  }

  setDatasetReportColumns() {
    this.displayedColumns = [
      this._showAlias ? 'Unique name' : 'Accession',
      'Policy',
      'Title',
      'Submission date',
      'Status',
      'Action', // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      'Unique name': this.aliasColumnCallback.bind(this),
      Policy: this.policyColumnCallback.bind(this),
      Title: this.titleColumnCallback.bind(this),
      'Submission date': this.submissionDateColumnCallback.bind(this),
      Status: this.statusColumnCallback.bind(this)
    };
  }

  getElementValue(result, col) {
    const callback = this.displayedColumnsCallback[col];
    return callback(result);
  }

  createChangeReportAction(reportType: ReportType, id: string) {
    return {
      reportActionType: ReportActionType.changeReport,
      reportType: reportType,
      id: id
    };
  }

  createEditXmlAction(reportType: ReportType, id: string) {
    return {
      reportActionType: ReportActionType.editXml,
      reportType: reportType,
      id: id
    };
  }

  getActions(result) {
    const actions = [];

    // Allow edit XML.
    if (this.reportType === ReportType.runFiles) {
      actions.push(this.createEditXmlAction(ReportType.runs, this.getId(result)));
    } else if (this.reportType === ReportType.analysisFiles) {
      actions.push(this.createEditXmlAction(ReportType.analyses, this.getId(result)));
    } else {
      actions.push(this.createEditXmlAction(this.reportType, this.getId(result)));
      if (this.reportType === ReportType.studies) {
        actions.push(this.createEditXmlAction(ReportType.projects, result.report.secondaryId));
      }
      if (this.reportType === ReportType.runs) {
        actions.push(this.createEditXmlAction(ReportType.experiments, this.getExperimentId(result)));
      }
    }

    // Allow navigation to studies report.
    if (this.getStudyId(result)) {
      actions.push(this.createChangeReportAction(ReportType.studies, this.getStudyId(result)));
    }

    // Allow navigation to samples report.
    if (this.getSampleId(result)) {
      actions.push(this.createChangeReportAction(ReportType.samples, this.getId(result)));
    }

    // Allow navigation to run report.
    if (this.reportType === ReportType.studies ||
        this.reportType === ReportType.samples ||
        this.reportType === ReportType.runFiles) {
      actions.push(this.createChangeReportAction(ReportType.runs, this.getId(result)));
    }

    // Allow navigation to analysis report.
    if (this.reportType === ReportType.studies ||
        this.reportType === ReportType.samples ||
        this.reportType === ReportType.analysisFiles) {
      actions.push(this.createChangeReportAction(ReportType.analyses, this.getId(result)));
    }

    // Allow navigation to run files and run process.
    if (this.reportType === ReportType.runs) {
      actions.push(this.createChangeReportAction(ReportType.runFiles, this.getId(result)));
      actions.push(this.createChangeReportAction(ReportType.runProcess, this.getId(result)));
    }

    // Allow navigation to analysis files annd analysis process.
    if (this.reportType === ReportType.analyses) {
      actions.push(this.createChangeReportAction(ReportType.analysisFiles, this.getId(result)));
      actions.push(this.createChangeReportAction(ReportType.analysisProcess, this.getId(result)));
    }

    // Allow navigation from run process.
    if (this.reportType === ReportType.runProcess) {
      actions.push(this.createChangeReportAction(ReportType.runs, this.getId(result)));
      actions.push(this.createChangeReportAction(ReportType.runFiles, this.getId(result)));
    }

    // Allow navigation from analysis process.
    if (this.reportType === ReportType.analysisProcess) {
      actions.push(this.createChangeReportAction(ReportType.analyses, this.getId(result)));
      actions.push(this.createChangeReportAction(ReportType.analysisFiles, this.getId(result)));
    }

    if (this.reportType === ReportType.dacs) {
      actions.push(this.createChangeReportAction(ReportType.policies, this.getId(result)));
    }

    if (this.reportType === ReportType.policies) {
      actions.push(this.createChangeReportAction(ReportType.dacs, this.getDacId(result)));
      actions.push(this.createChangeReportAction(ReportType.datasets, this.getId(result)));
    }
    if (this.reportType === ReportType.datasets) {
      actions.push(this.createChangeReportAction(ReportType.policies, this.getPolicyId(result)));
    }

    return actions;
  }

  action(action) {
    console.log('** action **', action);

    if (action && action.reportActionType === ReportActionType.changeReport) {
      console.log('** change report action **' , action);
      this.onReportChange.emit(action);
    }

    if (action && action.reportActionType === ReportActionType.editXml) {
      console.log('** edit xml action **' , action);
      this.editXml(action);
    }

  }

  editXml(action) {
    const dialogData = {
      reportType: action.reportType,
      id: action.id
    };

    const reportDialogRef = this.reportDialog.open(ReportEditDialogComponent, {
        // height: '500px',
        width: '600px',
        data: dialogData
    });
    reportDialogRef.afterClosed().subscribe(data => {});
  }

  reset() {
    this.active = false;
    this.data = undefined;
    this.dataSource = undefined;
    this.dataError = undefined;
    this._id = undefined;
    this._status = undefined;
    this._processStatus = undefined;
    this._analysisType = undefined;

    // this.report();
  }

  report() {
    // console.log(" ** report **", this.reportType);

    this.data = undefined;

    this.initReportColumns();
    const observable: Observable<any> = this.initReportObservable();

    if (observable != null) {
      this.active = true;

      observable.subscribe(
        // Success
        data => {
          this.active = false;

          this.data = data;
          console.log('** Webin reports service **', this.data);

          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.dataPaginator;

          this.dataError = undefined;
        },
        // Errors
        (err: HttpErrorResponse) => {
          console.log('** Webin reports service failed **', err);
          const msg = 'Webin reports service failed. Please try again later. If the problem persists please contact the helpdesk.';
          // if (err.message) {
          //   msg += " " + err.message;
          // }
          this.dataError = msg;
      });
    }
  }

  initReportColumns() {
    if (this.reportType === ReportType.studies) {
      this.setStudyReportColumns();
    } else if (this.reportType === ReportType.samples) {
      this.setSampleReportColumns();
    } else if (this.reportType === ReportType.runs) {
      this.setRunReportColumns();
    } else if (this.reportType === ReportType.analyses) {
      this.setAnalysisReportColumns();
    } else if (this.reportType === ReportType.runFiles) {
      this.setRunFileReportColumns();
    } else if (this.reportType === ReportType.analysisFiles) {
      this.setAnalysisFileReportColumns();
    } else if (this.reportType === ReportType.runProcess) {
      this.setRunProcessReportColumns();
    } else if (this.reportType === ReportType.analysisProcess) {
      this.setAnalysisProcessReportColumns();
    } else if (this.reportType === ReportType.dacs) {
      this.setDacReportColumns();
    } else if (this.reportType === ReportType.policies) {
      this.setPolicyReportColumns();
    } else if (this.reportType === ReportType.datasets) {
      this.setDatasetReportColumns();
    }
  }

  initReportObservable() {
    if (this.reportType === ReportType.studies) {
      if (this.id) {
        return this.webinReportService.getStudies(this.id, this.rows);
      }
      return this.webinReportService.getStudiesAll(this._status, this.rows);
    }

    if (this.reportType === ReportType.samples) {
      if (this.id) {
        return this.webinReportService.getSamples(this.id, this.rows);
      }
      return this.webinReportService.getSamplesAll(this._status, this.rows);
    }

    if (this.reportType === ReportType.runs) {
      if (this.id) {
        return this.webinReportService.getRuns(this.id, this.rows);
      }
      return this.webinReportService.getRunsAll(this._status, this.rows);
    }

    if (this.reportType === ReportType.analyses) {
      if (this.id) {
        return this.webinReportService.getAnalyses(this.id, this.rows);
      }
      return this.webinReportService.getAnalysesAll(this._status, this._analysisType, this.rows);
    }

    if (this.reportType === ReportType.runFiles) {
      if (this.id) {
        return this.webinReportService.getRunFiles(this.id, this.rows);
      }
      return this.webinReportService.getRunFilesAll(this._processStatus, this.rows);
    }

    if (this.reportType === ReportType.analysisFiles) {
      if (this.id) {
        return this.webinReportService.getAnalysisFiles(this.id, this.rows);
      }
      return this.webinReportService.getAnalysisFilesAll(this._analysisType, this._processStatus, this.rows);
    }

    if (this.reportType === ReportType.runProcess) {
      if (this.id) {
        return this.webinReportService.getRunProcess(this.id, this.rows);
      }
      return this.webinReportService.getRunProcessAll(this._processStatus, this.rows);
    }

    if (this.reportType === ReportType.analysisProcess) {
      if (this.id) {
        return this.webinReportService.getAnalysisProcess(this.id, this.rows);
      }
      return this.webinReportService.getAnalysisProcessAll(this._analysisType, this._processStatus, this.rows);
    }


    if (this.reportType === ReportType.dacs) {
      if (this.id) {
        return this.webinReportService.getDacs(this.id, this.rows);
      }
      return this.webinReportService.getDacsAll(this._status, this.rows);
    }

    if (this.reportType === ReportType.policies) {
      if (this.id) {
        return this.webinReportService.getPolicies(this.id, this.rows);
      }
      return this.webinReportService.getPoliciesAll(this._status, this.rows);
    }

    if (this.reportType === ReportType.datasets) {
      if (this.id) {
        return this.webinReportService.getDatasets(this.id, this.rows);
      }
      return this.webinReportService.getDatasetsAll(this._status, this.rows);
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

  aliasColumnCallback(result) {
    return result.report.alias;
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

  humanReadableFormat(token: string) {
    if (token) {
      let str: string = token.toLowerCase();
      str = str.replace(/_/g, ' ');
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return token;
  }

  analysisTypeColumnCallback(result) {
    return this.humanReadableFormat(result.report.analysisType);
  }

  processingStatusColumnCallback(result) {
    return result.report.processingStatus;
  }

  processingErrorColumnCallback(result) {
    return result.report.processingError;
  }

  processingAccessionColumnCallback(result) {
    return result.report.acc;
  }

  dateFormat(date: Date) {
    const month = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    let daySuffix: string;
    if (day > 3 && day < 21) {
      daySuffix = 'th';
    } else {
      switch (day % 10) {
        case 1: daySuffix = 'st'; break;
        case 2: daySuffix = 'nd'; break;
        case 3: daySuffix = 'rd'; break;
        default: daySuffix = 'th';
      }
    }

    return date.getDate() + daySuffix + ' ' +
           month[date.getMonth()]  + ' ' +
           date.getFullYear();
  }

  submissionDateColumnCallback(result) {
    if (result.report.firstCreated) {
      const date: Date = new Date(result.report.firstCreated);
      return this.dateFormat(date);
    }
    return '';
  }

  releaseDateColumnCallback(result) {
    if (result.report.holdDate) {
      const date: Date = new Date(result.report.holdDate);
      return this.dateFormat(date);
    }
    return '';
  }

  statusColumnCallback(result) {
    return this.humanReadableFormat(result.report.releaseStatus);
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

  csv() {
    let cvsData = [];
    if (this.data) {
        let row = {};
        for (let col of this.displayedColumns) {
          if (col !== 'Action') {
            row[col] = col;
           }
        }
        cvsData.push(row);
        for (let element of this.data) {
          let row = {};
          for (let col of this.displayedColumns) {
            if (col !== 'Action') {
              row[col] = this.getElementValue(element, col);
             }
          }
          cvsData.push(row);
        }
      var options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: false,
        showTitle: false,
        useBom: true
      };
      new Angular2Csv(cvsData, ReportTypeUtils.getPluralName(this.reportType) + "_" + (new Date()).toISOString(), options);
    }
  }
}