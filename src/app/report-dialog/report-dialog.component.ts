import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

    closeDialog() {
      this.dialogRef.close();
    }

    reportChangeStudies() {
      //console.log('reportChangeStudies');
      this.dialogRef.close(
        {
          type: 'reportChange',
          report: 'studies',
          id: this.data.study
        });
    }

    reportChangeSamples() {
      //console.log('reportChangeSampless');
      this.dialogRef.close(
        {
          type: 'reportChange',
          report: 'samples',
          id: this.data.samples
        });
    }
}
