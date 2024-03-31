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

import { Component, EventEmitter, ViewEncapsulation, ViewChild, Input, Output, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { ReportEditDialogComponent } from '../report-edit-dialog/report-edit-dialog.component';
import { ReportType } from '../report-type.enum';
import { ReportActionType } from '../report-action-type.enum';

import { WebinReportService } from '../webin-report.service';
import { WebinAuthenticationService } from '../webin-authentication.service';
import { ReportActionInterface } from '../report-action.interface';
import { ActivatedRoute } from '@angular/router';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ReleaseDatePopupComponent } from '../release-date-popup/release-date-popup/release-date-popup.component';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportComponent implements OnInit {

  ReportType = ReportType;   // Allows use in template


  @Input() reportType: ReportType;
  @Input() embDefaultSearch: boolean;
  @Input() embeded: boolean;
  @Output() reportChange = new EventEmitter<ReportActionInterface>();
  @Output() selectedRecord = new EventEmitter<string>();
  @ViewChild(MatPaginator, { static: true }) dataPaginator: MatPaginator;

  private _id: string;
  private _showAlias = false;
  private _status: string;
  private _processStatus: string;
  private _analysisType: string;
  rows = '100';
  data;
  dataSource: MatTableDataSource<any>;
  displayedColumns;
  displayedColumnsCallback;
  dataError;
  active: boolean;

  constructor(
    private _webinReportService: WebinReportService,
    private _webinAuthenticationService: WebinAuthenticationService,
    private _reportDialog: MatDialog,
    public media: MediaObserver,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params.reportType != null) {
      this.reportType = this.activatedRoute.snapshot.params.reportType;

    }
    var defaultSearch = this.activatedRoute.snapshot.params.defaultSearch;
    this._id = this.activatedRoute.snapshot.params.id;

    if (defaultSearch === "true" || this.embDefaultSearch) {

      this.report();
    }


    if (this.reportType && this._id) {
      this.report();
    }
  }

  isEga(): boolean {
    return this._webinAuthenticationService.ega;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
    this._status = undefined;
    this._processStatus = undefined;
    this._analysisType = undefined;
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
      this.reportType !== ReportType.analysisProcess &&
      this.reportType !== ReportType.unsubmittedFiles;
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
      'Secondary Accession',
      'Title',
      'Submission date',
      'Release date',
      'Status',
      'Action', // No callback for Action column
    ];
    if (this.embeded) {
      this.displayedColumns.splice(-1, 1);
      this.displayedColumns.unshift('Select')
    }
    this.displayedColumnsCallback = {
      'Select': this.accessionColumnCallback.bind(this),
      Accession: this.accessionColumnCallback.bind(this),
      'Unique name': this.aliasColumnCallback.bind(this),
      'Secondary Accession': this.secondaryIdColumnCallback.bind(this),
      Title: this.titleColumnCallback.bind(this),
      'Submission date': this.submissionDateColumnCallback.bind(this),
      'Release date': this.releaseDateColumnCallback.bind(this),
      Status: this.statusColumnCallback.bind(this)
    };
  }

  setUmbrellaProjectReportColumns() {
    this.displayedColumns = [
      this._showAlias ? 'Unique name' : 'Accession',
      'Title',
      'Submission date',
      'Release date',
      'Status',
      'Action', // No callback for Action column
    ];
    if (this.embeded) {
      this.displayedColumns.splice(-1, 1);
      this.displayedColumns.unshift('Select')
    }
    this.displayedColumnsCallback = {
      'Select': this.accessionColumnCallback.bind(this),
      Accession: this.accessionColumnCallback.bind(this),
      'Unique name': this.aliasColumnCallback.bind(this),
      'Secondary Accession': this.secondaryIdColumnCallback.bind(this),
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
      'Processing start',
      'Processing end',
      'Action', // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      'Process status': this.processingStatusColumnCallback.bind(this),
      'Process error': this.processingErrorColumnCallback.bind(this),
      'Processing start': this.processingExecStartCallback.bind(this),
      'Processing end': this.processingExecEndCallback.bind(this)
    };
  }

  setAnalysisProcessReportColumns() {
    this.displayedColumns = [
      'Accession',
      'Analysis type',
      'Sequence accession',
      'Process status',
      'Process error',
      'Processing start',
      'Processing end',
      'Action', // No callback for Action column
    ];
    this.displayedColumnsCallback = {
      Accession: this.accessionColumnCallback.bind(this),
      'Analysis type': this.analysisTypeColumnCallback.bind(this),
      'Sequence accession': this.processingAccessionColumnCallback.bind(this),
      'Process status': this.processingStatusColumnCallback.bind(this),
      'Process error': this.processingErrorColumnCallback.bind(this),
      'Processing start': this.processingExecStartCallback.bind(this),
      'Processing end': this.processingExecEndCallback.bind(this)
    };
  }

  setUnsubmittedFilesReportColumns() {
    this.displayedColumns = [
      'File name',
      'File size',
      'Expiration date'
    ];
    this.displayedColumnsCallback = {
      'File name': this.fileNameColumnCallback.bind(this),
      'File size': this.fileSizeColumnCallback.bind(this),
      'Expiration date': this.expirationDateColumnCallback.bind(this)
    };
  }

  setDacReportColumns() {
    this.displayedColumns = [
      this._showAlias ? 'Unique name' : 'Accession',
      'Title',
      'Submission date',
      'Status',
      'Action', // No callback for Action column
    ]; if (this.embeded) {
      this.displayedColumns.splice(-1, 1);
      this.displayedColumns.unshift('Select')
    }
    this.displayedColumnsCallback = {
      'Select': this.accessionColumnCallback.bind(this),
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
    if (this.embeded) {
      this.displayedColumns.splice(-1, 1);
      this.displayedColumns.unshift('Select')
    }
    this.displayedColumnsCallback = {
      'Select': this.accessionColumnCallback.bind(this),
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

    let columnName = '';
    if (this.media.isActive('xs')) {
      columnName = `${col}: `;
    }

    const callback = this.displayedColumnsCallback[col];
    return columnName + callback(result);

  }

  getActions(result): Array<ReportActionInterface> {
    const actions = [];
    // Allow edit XML.
    if (this.reportType === ReportType.runFiles) {
      actions.push(ReportActionType.createEditXmlAction(ReportType.runs, this.getId(result)));
    } else if (this.reportType === ReportType.analysisFiles) {
      actions.push(ReportActionType.createEditXmlAction(ReportType.analyses, this.getId(result)));
    } else if (this.reportType === ReportType.studies ||
      this.reportType === ReportType.projects) {
      actions.push(ReportActionType.createEditXmlAction(ReportType.projects, this.getId(result)));
      // actions.push(this.createEditXmlAction(ReportType.studies, this.getSecondaryId(result)));
    } else {
      actions.push(ReportActionType.createEditXmlAction(this.reportType, this.getId(result)));
      if (this.reportType === ReportType.runs) {
        actions.push(ReportActionType.createEditXmlAction(ReportType.experiments, this.getExperimentId(result)));
      }
    }

    // Allow navigation to studies report.
    if (this.getStudyId(result)) {
      actions.push(ReportActionType.createChangeReportAction(ReportType.studies, this.getStudyId(result)));
    }

    // Allow navigation to samples report.
    if (this.getSampleId(result)) {
      actions.push(ReportActionType.createChangeReportAction(ReportType.samples, this.getId(result)));
    }

    // Allow navigation to run report.
    if (this.reportType === ReportType.studies) {
      actions.push(ReportActionType.createChangeReportAction(ReportType.runs, this.getSecondaryId(result)));
      actions.push(ReportActionType.createChangeReportAction(ReportType.analyses, this.getSecondaryId(result)));
    }
    if (this.reportType === ReportType.samples ||
      this.reportType === ReportType.runFiles) {
      actions.push(ReportActionType.createChangeReportAction(ReportType.runs, this.getId(result)));
    }

    if (this.reportType === ReportType.samples ||
      this.reportType === ReportType.analysisFiles) {
      actions.push(ReportActionType.createChangeReportAction(ReportType.analyses, this.getId(result)));
    }

    // Allow navigation to run files and run process.
    if (this.reportType === ReportType.runs && !this.isEga()) {
      actions.push(ReportActionType.createChangeReportAction(ReportType.runFiles, this.getId(result)));
      actions.push(ReportActionType.createChangeReportAction(ReportType.runProcess, this.getId(result)));
    }

    // Allow navigation to analysis files annd analysis process.
    if (this.reportType === ReportType.analyses && !this.isEga()) {
      actions.push(ReportActionType.createChangeReportAction(ReportType.analysisFiles, this.getId(result)));
      actions.push(ReportActionType.createChangeReportAction(ReportType.analysisProcess, this.getId(result)));
    }

    // Allow navigation from run process.
    if (this.reportType === ReportType.runProcess) {
      actions.push(ReportActionType.createChangeReportAction(ReportType.runs, this.getId(result)));
      actions.push(ReportActionType.createChangeReportAction(ReportType.runFiles, this.getId(result)));
    }

    // Allow navigation from analysis process.
    if (this.reportType === ReportType.analysisProcess) {
      actions.push(ReportActionType.createChangeReportAction(ReportType.analyses, this.getId(result)));
      actions.push(ReportActionType.createChangeReportAction(ReportType.analysisFiles, this.getId(result)));
    }

    if (this.reportType === ReportType.dacs) {
      actions.push(ReportActionType.createChangeReportAction(ReportType.policies, this.getId(result)));
    }

    if (this.reportType === ReportType.policies) {
      actions.push(ReportActionType.createChangeReportAction(ReportType.dacs, this.getDacId(result)));
      actions.push(ReportActionType.createChangeReportAction(ReportType.datasets, this.getId(result)));
    }
    if (this.reportType === ReportType.datasets) {
      actions.push(ReportActionType.createChangeReportAction(ReportType.policies, this.getPolicyId(result)));
    }

    return actions;
  }

  action(action: ReportActionInterface): void {
    console.log('** action **', action);

    if (action && action.reportActionType === ReportActionType.changeReport) {
      // console.log('** change report action **', action);
      //this.reportChange.emit(action);
      this.router.navigate(['/report', action.reportType, action.id]);
    }

    if (action && action.reportActionType === ReportActionType.editXml) {
      // console.log('** edit xml action **', action);
      this.editXml(action);
    }

  }

  editXml(action: ReportActionInterface): void {

    const reportDialogRef = this._reportDialog.open(ReportEditDialogComponent, {
      width: window.innerWidth + 'px',
      height: window.innerHeight - 200 + 'px',
      data: action
    });
    reportDialogRef.afterClosed().subscribe(result => {
      this.report();
    });
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

    this.initReportColumns();
    const observable: Observable<any> = this.initReportObservable('json', this.rows) as Observable<any>;

    if (observable) {
      this.active = true;
      this.data = undefined;
      this.dataError = undefined;

      observable.pipe(
        retry(3)
      ).subscribe(
        data => {
          // console.log('** Webin reports service **', data);
          this.data = data;

          // Filtering umbrella projects using study_id (secondaryId === null) because study_id will be null for umbrella projects.
          if (this.reportType === ReportType.umbrellaProjects) {
            this.data = data.filter((record) => record.report.secondaryId === null)
          }
          if (this.reportType === ReportType.projects || this.reportType === ReportType.studies) {
            this.data = data.filter((record) => record.report.secondaryId != null)
          }
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.dataPaginator;
        },
        (err: HttpErrorResponse) => {
          console.log('** Webin reports service failed **', err);
          const msg = 'Webin reports service failed. Please try again later. If the problem persists please contact the helpdesk.';
          this.dataError = msg;
          if (err.status === 401 || err.status === 403) {
            this.router.navigate(['/login']);
          }
        },
        () => {
          this.active = false;
        }
      );
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
    } else if (this.reportType === ReportType.unsubmittedFiles) {
      this.setUnsubmittedFilesReportColumns();
    } else if (this.reportType === ReportType.dacs) {
      this.setDacReportColumns();
    } else if (this.reportType === ReportType.policies) {
      this.setPolicyReportColumns();
    } else if (this.reportType === ReportType.datasets) {
      this.setDatasetReportColumns();
    } else if (this.reportType === ReportType.umbrellaProjects) {
      this.setUmbrellaProjectReportColumns();
    }
  }

  initReportObservable(format: string, rows: string) {
    if (!rows) {
      rows = this.rows;
    }

    if (this.reportType === ReportType.studies ||
      this.reportType === ReportType.projects) {
      if (this.id) {
        return this._webinReportService.getProjects(this.id, rows, format);
        // return this._webinReportService.getStudies(this.id, rows, format);
      }
      return this._webinReportService.getProjectsAll(this._status, rows, format);
      // return this._webinReportService.getStudiesAll(this._status, rows, format);
    }

    if (this.reportType === ReportType.umbrellaProjects) {
      if (this.id) {
        return this._webinReportService.getProjects(this.id, rows, format);
        // return this._webinReportService.getStudies(this.id, rows, format);
      }
      return this._webinReportService.getProjectsAll(this._status, rows, format);
      // return this._webinReportService.getStudiesAll(this._status, rows, format);
    }

    if (this.reportType === ReportType.samples) {
      if (this.id) {
        return this._webinReportService.getSamples(this.id, rows, format);
      }
      return this._webinReportService.getSamplesAll(this._status, rows, format);
    }

    if (this.reportType === ReportType.runs) {
      if (this.id) {
        return this._webinReportService.getRuns(this.id, rows, format);
      }
      return this._webinReportService.getRunsAll(this._status, rows, format);
    }

    if (this.reportType === ReportType.analyses) {
      if (this.id) {
        return this._webinReportService.getAnalyses(this.id, rows, format);
      }
      return this._webinReportService.getAnalysesAll(this._status, this._analysisType, rows, format);
    }

    if (this.reportType === ReportType.runFiles) {
      if (this.id) {
        return this._webinReportService.getRunFiles(this.id, rows, format);
      }
      return this._webinReportService.getRunFilesAll(this._processStatus, rows, format);
    }

    if (this.reportType === ReportType.analysisFiles) {
      if (this.id) {
        return this._webinReportService.getAnalysisFiles(this.id, rows, format);
      }
      return this._webinReportService.getAnalysisFilesAll(this._analysisType, this._processStatus, rows, format);
    }

    if (this.reportType === ReportType.runProcess) {
      if (this.id) {
        return this._webinReportService.getRunProcess(this.id, rows, format);
      }
      return this._webinReportService.getRunProcessAll(this._processStatus, rows, format);
    }

    if (this.reportType === ReportType.analysisProcess) {
      if (this.id) {
        return this._webinReportService.getAnalysisProcess(this.id, rows, format);
      }
      return this._webinReportService.getAnalysisProcessAll(this._analysisType, this._processStatus, rows, format);
    }

    if (this.reportType === ReportType.unsubmittedFiles) {
      return this._webinReportService.getUnsubmittedFilesAll(this.id, rows, format);
    }

    if (this.reportType === ReportType.dacs) {
      if (this.id) {
        return this._webinReportService.getDacs(this.id, rows, format);
      }
      return this._webinReportService.getDacsAll(this._status, rows, format);
    }

    if (this.reportType === ReportType.policies) {
      if (this.id) {
        return this._webinReportService.getPolicies(this.id, rows, format);
      }
      return this._webinReportService.getPoliciesAll(this._status, rows, format);
    }

    if (this.reportType === ReportType.datasets) {
      if (this.id) {
        return this._webinReportService.getDatasets(this.id, rows, format);
      }
      return this._webinReportService.getDatasetsAll(this._status, rows, format);
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

  getSecondaryId(result) {
    return result.report.secondaryId;
  }

  removeNullAndUndefined(value) {
    if (value === null || value === undefined) {
      return '';
    }
    return value;
  }

  // Column callbacks
  //

  accessionColumnCallback(result) {
    return this.removeNullAndUndefined(this.getId(result));
  }

  aliasColumnCallback(result) {
    return this.removeNullAndUndefined(result.report.alias);
  }

  studyColumnCallback(result) {
    return this.removeNullAndUndefined(this.getStudyId(result));
  }

  sampleColumnCallback(result) {
    return this.removeNullAndUndefined(this.getSampleId(result));
  }

  experimentColumnCallback(result) {
    return this.removeNullAndUndefined(this.getExperimentId(result));
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
    return this.humanReadableFormat(this.removeNullAndUndefined(result.report.analysisType));
  }

  processingStatusColumnCallback(result) {
    return this.removeNullAndUndefined(result.report.processingStatus);
  }

  processingErrorColumnCallback(result) {
    return this.removeNullAndUndefined(result.report.processingError);
  }

  processingAccessionColumnCallback(result) {
    return this.removeNullAndUndefined(result.report.acc);
  }

  processingExecStartCallback(result) {
    return this.removeNullAndUndefined(result.report.processingStart);
  }

  processingExecEndCallback(result) {
    return this.removeNullAndUndefined(result.report.processingEnd);
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
      month[date.getMonth()] + ' ' +
      date.getFullYear();
  }

  dateTimeFormat(date: Date) {
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
      month[date.getMonth()] + ' ' +
      date.getFullYear() + ' ' +
      date.getHours() + ':' +
      date.getMinutes() + ':' +
      date.getSeconds();
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

  uploadDateColumnCallback(result) {
    if (result.report.uploadDate) {
      const date: Date = new Date(result.report.uploadDate);
      return this.dateFormat(date);
    }
    return '';
  }

  expirationDateColumnCallback(result) {
    if (result.report.expirationDate) {
      const date: Date = new Date(result.report.expirationDate);
      return this.dateFormat(date);
    }
    return '';
  }

  statusColumnCallback(result) {
    return this.removeNullAndUndefined(this.humanReadableFormat(result.report.releaseStatus));
  }

  fileNameColumnCallback(result) {
    return this.removeNullAndUndefined(result.report.fileName);
  }

  fileSizeColumnCallback(result) {
    return this.removeNullAndUndefined(result.report.bytes);
  }

  fileChecksumMethodColumnCallback(result) {
    return this.removeNullAndUndefined(result.report.checksumMethod);
  }

  fileChecksumColumnCallback(result) {
    return this.removeNullAndUndefined(result.report.checksum);
  }

  fileFormatColumnCallback(result) {
    return this.removeNullAndUndefined(result.report.fileFormat);
  }

  fileArchiveStatusColumnCallback(result) {
    return this.removeNullAndUndefined(result.report.archiveStatus);
  }

  secondaryIdColumnCallback(result) {
    return this.removeNullAndUndefined(this.getSecondaryId(result));
  }

  titleColumnCallback(result) {
    return this.removeNullAndUndefined(result.report.title);
  }

  organismColumnCallback(result) {
    return this.removeNullAndUndefined(result.report.scientificName);
  }

  taxIdColumnCallback(result) {
    return this.removeNullAndUndefined(result.report.taxId);
  }

  instrumentColumnCallback(result) {
    return this.removeNullAndUndefined(result.report.instrumentModel);
  }

  dacColumnCallback(result) {
    return this.removeNullAndUndefined(this.getDacId(result));
  }

  policyColumnCallback(result) {
    return this.removeNullAndUndefined(this.getPolicyId(result));
  }

  csvDownloadAllLink() {
    return this.initReportObservable('csv', '10000000');
  }

  updateReleaseDate(row) {
    this.openUpdateReleaseDateDialog(row)
  }

  openUpdateReleaseDateDialog(obj): void {
    const dialogRef = this._reportDialog.open(ReleaseDatePopupComponent, {
      width: '500px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { studyObj: obj }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result.event === 'close') {
        this.report();
      }
    })
  }

  selectRow(element) {
    this.selectedRecord.emit(element.report);
  }


}
