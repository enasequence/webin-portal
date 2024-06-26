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

import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { ReportType } from '../report-type.enum';
import { ReportActionType } from '../report-action-type.enum';
import { ReportActionInterface } from '../report-action.interface';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-action',
  templateUrl: './report-action.component.html',
  styleUrls: ['./report-action.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportActionComponent {
  @Input() actions: Array<ReportActionInterface>;
  @Input() reportData: Object;
  @Output() actionChange = new EventEmitter<ReportActionInterface>();

  ReportType = ReportType;   // Allows use in template

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  private isAction(reportType: ReportType, reportActionType: ReportActionType, action): boolean {
    return action.reportActionType === reportActionType && action.reportType === reportType;
  }

  isChangeReportAction(reportType: ReportType): boolean {
    return this.actions.some(action => this.isAction(reportType, ReportActionType.changeReport, action));
  }

  isEditXmlAction(reportType: ReportType): boolean {
    return this.actions.some(action => this.isAction(reportType, ReportActionType.editXml, action));
  }

  getChangeReportAction(reportType: ReportType): ReportActionInterface {
    return this.actions.find(action => this.isAction(reportType, ReportActionType.changeReport, action));
  }

  getEditXmlAction(reportType: ReportType): ReportActionInterface {
    return this.actions.find(action => this.isAction(reportType, ReportActionType.editXml, action));
  }

  changeReportAction(reportType: ReportType): void {
    console.log('** change report action **', reportType);
    this.actionChange.emit(this.getChangeReportAction(reportType));
  }

  editXmlAction(reportType: ReportType): void {
    console.log('** edit xml action **', reportType);
    this.actionChange.emit(this.getEditXmlAction(reportType));
  }

  editProjectAction(projObj) {
    console.log(projObj);
    this.router.navigate(['/study', projObj.report.id]);
  }

  editUmbrellaProjectAction(umbrellaProjObj) {
    console.log(umbrellaProjObj);
    this.router.navigate(['/umbrella', umbrellaProjObj.report.id]);
  }

  editDacAction(dacObj) {
    console.log(dacObj);
    this.router.navigate(['/dac', dacObj.report.id]);
  }

  editPolicyAction(policyObj) {
    this.router.navigate(['/dac-policy', policyObj.report.id]);
  }

  editDatasetAction(datasetObj) {
    this.router.navigate(['/dac-dataset', datasetObj.report.id]);
  }
}
