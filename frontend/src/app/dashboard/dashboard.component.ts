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

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ReportComponent } from '../report/report.component';
import { WebinAuthenticationService } from '../webin-authentication.service';
import { ReportType } from '../report-type.enum';
import { ReportActionInterface } from '../report-action.interface';

@Component({
  selector: 'app-main',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    ReportComponent
  ]
})
export class DashboardComponent {

  ReportType = ReportType;   // Allows use in template

  @ViewChild('tabGroup', { static: true }) tabGroup: MatTabGroup;
  @ViewChild('studies', { static: true }) studies: ReportComponent;
  @ViewChild('samples', { static: true }) samples: ReportComponent;
  @ViewChild('runs', { static: true }) runs: ReportComponent;
  @ViewChild('analyses', { static: true }) analyses: ReportComponent;
  @ViewChild('runFiles', { static: false }) runFiles: ReportComponent;
  @ViewChild('analysisFiles', { static: false }) analysisFiles: ReportComponent;
  @ViewChild('runProcess', { static: false }) runProcess: ReportComponent;
  @ViewChild('analysisProcess', { static: false }) analysisProcess: ReportComponent;
  @ViewChild('unsubmittedFiles', { static: false }) unsubmittedFiles: ReportComponent;
  @ViewChild('dacs', { static: false }) dacs: ReportComponent;
  @ViewChild('policies', { static: false }) policies: ReportComponent;
  @ViewChild('datasets', { static: false }) datasets: ReportComponent;

  constructor(
    private _webinAuthenticationService: WebinAuthenticationService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  isEga(): boolean {
    return this._webinAuthenticationService.ega;
  }

  consumeReportChange(reportAction: ReportActionInterface): void {
    const newTabIndex = this.getTabIndex(reportAction.reportType);
    console.log('** change dashboard report **', reportAction);
    if (newTabIndex) {
      this.tabGroup.selectedIndex = newTabIndex;
      this[reportAction.reportType].id = reportAction.id;
      this[reportAction.reportType].report();
    }
  }

  getTabIndex(reportType: ReportType) {
    if (this.isEga()) {
      switch (reportType) {
        case ReportType.studies: return 1;
        case ReportType.samples: return 2;
        case ReportType.runs: return 3;
        case ReportType.analyses: return 4;
        case ReportType.dacs: return 5;
        case ReportType.policies: return 6;
        case ReportType.datasets: return 7;
      }
    } else {
      switch (reportType) {
        case ReportType.studies: return 1;
        case ReportType.samples: return 2;
        case ReportType.runs: return 3;
        case ReportType.analyses: return 4;
        case ReportType.runFiles: return 5;
        case ReportType.analysisFiles: return 6;
        case ReportType.runProcess: return 7;
        case ReportType.analysisProcess: return 8;
        case ReportType.unsubmittedFiles: return 9;
      }
    }
    return undefined;
  }
}
