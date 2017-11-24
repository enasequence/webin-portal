import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ReportType } from '../report-type.enum';
import { ReportActionType } from '../report-action-type.enum';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
    }

    ReportType = ReportType;   // Allows use in template

    closeDialog() {
      this.dialogRef.close();
    }
    studies          = 2,
              = 3,
                 = 4,
             = 5,
    runFiles         = 6,
    analysisFiles    = 7

    getTitle() {
      let title: string;
      switch(this.data.reportType) {
         case ReportType.studies: {
           title = "Study";
           break;
         }
         case ReportType.samples: {
           title = "Sample";
           break;
         }
         case ReportType.runs: {
           title = "Run";
           break;
         }
         case ReportType.analyses: {
           title = "Analysis";
           break;
         }
         case ReportType.runFiles: {
           title = "Submitted files for run";
           break;
         }
         case ReportType.analysisFiles: {
           title = "Submitted files for analysis";
           break;
         }
         default: {
           return "";
         }
      }
      return title + " " + this.data.id;
    }

    changeReport(reportType : ReportType) {
      this.dialogRef.close({
        reportActionType: ReportActionType.changeReport,
        reportType: reportType,
        id: this.data[reportType]
      });
    }
}
