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

  ngOnInit() {
  }

  isChangeReportAction(reportType: ReportType): boolean {
      for (let i = 0; i < this.actions.length; i++) {
          if (this.actions[i].reportActionType === ReportActionType.changeReport &&
              this.actions[i].reportType === reportType) {
            return true;
          }
      }
      return false;
  }

  isEditXmlAction(reportType: ReportType): boolean {
      for (let i = 0; i < this.actions.length; i++) {
          if (this.actions[i].reportActionType === ReportActionType.editXml &&
              this.actions[i].reportType === reportType) {
            return true;
          }
      }
      return false;
  }

  getChangeReportAction(reportType: ReportType) {
      for (let i = 0; i < this.actions.length; i++) {
          if (this.actions[i].reportActionType === ReportActionType.changeReport &&
              this.actions[i].reportType === reportType) {
            return this.actions[i];
          }
      }
  }

  getEditXmlAction(reportType: ReportType) {
      for (let i = 0; i < this.actions.length; i++) {
          if (this.actions[i].reportActionType === ReportActionType.editXml &&
              this.actions[i].reportType === reportType) {
            return this.actions[i];
          }
      }
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
