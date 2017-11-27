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

  isChangeReportAction(reportType: ReportType) : boolean {
      for(let i = 0; i < this.actions.length; i++) {
          if (this.actions[i].reportActionType == ReportActionType.changeReport &&
              this.actions[i].reportType == reportType) {
            return true;
          }
      }
      return false;
  }

  isEditXmlAction(reportType: ReportType) : boolean {
      for(let i = 0; i < this.actions.length; i++) {
          if (this.actions[i].reportActionType == ReportActionType.editXml &&
              this.actions[i].reportType == reportType) {
            return true;
          }
      }
      return false;
  }

  getChangeReportAction(reportType: ReportType) {
      for(let i = 0; i < this.actions.length; i++) {
          if (this.actions[i].reportActionType == ReportActionType.changeReport &&
              this.actions[i].reportType == reportType) {
            return this.actions[i];
          }
      }
  }

  getEditXmlAction(reportType: ReportType) {
      for(let i = 0; i < this.actions.length; i++) {
          if (this.actions[i].reportActionType == ReportActionType.editXml &&
              this.actions[i].reportType == reportType) {
            return this.actions[i];
          }
      }
  }

  changeReportAction(reportType: ReportType) {
    console.log("** change report action **", reportType);
     this.onAction.emit(this.getChangeReportAction(reportType));
  }

  editXmlAction(reportType: ReportType) {
     console.log("** edit xml action **", reportType);
      this.onAction.emit(this.getEditXmlAction(reportType));
  }
}
