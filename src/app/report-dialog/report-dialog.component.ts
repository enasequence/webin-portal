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
      this.dialogRef.close(this.reportChange('studies', this.data.study));
    }

    reportChangeSamples() {
      this.dialogRef.close(this.reportChange('samples', this.data.samples));
    }

    reportChange(report: string, id: string) {
        return {
          type: 'reportChange',
          report: report,
          id: id
        });
    }
}
