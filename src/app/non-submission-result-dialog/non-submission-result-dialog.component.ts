import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SubmissionResultComponent } from '../submission-result/submission-result.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubmissionResultDialogComponent } from '../submission-result-dialog/submission-result-dialog.component';

@Component({
  selector: 'app-non-submission-result-dialog',
  templateUrl: './non-submission-result-dialog.component.html',
  styleUrls: ['./non-submission-result-dialog.component.css']
})
export class NonSubmissionResultDialogComponent implements OnInit {

  @ViewChild(SubmissionResultComponent, { static: true }) submissionResult: SubmissionResultComponent;

  title: string;
  redirectPath: string
  constructor(
    public dialogRef: MatDialogRef<SubmissionResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { string }) {
    this.title = data["title"];
    //if (data["redirectPath"]) {
    this.redirectPath = data["redirectPath"]
    //}
  }

  ngOnInit() {
    this.submissionResult.showMessage(this.data);
  }
}
