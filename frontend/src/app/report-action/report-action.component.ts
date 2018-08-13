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

import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { ReportType } from '../report-type.enum';
import { ReportActionType } from '../report-action-type.enum';

@Component({
  selector: 'app-report-action',
  templateUrl: './report-action.component.html',
  styleUrls: ['./report-action.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportActionComponent implements OnInit {
  @Input() actions;

  @Output() onAction = new EventEmitter<any>();

  ReportType = ReportType;   // Allows use in template

  constructor() { }

  ngOnInit() { }

  private isAction(reportType: ReportType, reportActionType: ReportActionType, action ): boolean {
    return action.reportActionType === reportActionType && action.reportType === reportType;
  }

  isChangeReportAction(reportType: ReportType): boolean {
      return this.actions.some( action => this.isAction(reportType, ReportActionType.changeReport, action) );
  }

  isEditXmlAction(reportType: ReportType): boolean {
    return this.actions.some( action => this.isAction(reportType, ReportActionType.editXml, action) );
  }

  getChangeReportAction(reportType: ReportType) {
    return this.actions.find( action => this.isAction(reportType, ReportActionType.changeReport, action) );
  }

  getEditXmlAction(reportType: ReportType) {
    return this.actions.find( action => this.isAction(reportType, ReportActionType.editXml, action) );
  }

  changeReportAction(reportType: ReportType) {
    console.log('** change report action **', reportType);
     this.onAction.emit(this.getChangeReportAction(reportType));
  }

  editXmlAction(reportType: ReportType) {
     console.log('** edit xml action **', reportType);
      this.onAction.emit(this.getEditXmlAction(reportType));
  }
}
