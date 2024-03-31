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

import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { SubmissionResultComponent } from "../submission-result/submission-result.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-submission-result-dialog",
  templateUrl: "./submission-result-dialog.component.html",
  styleUrls: ["./submission-result-dialog.component.css"],
})
export class SubmissionResultDialogComponent implements OnInit {
  @ViewChild(SubmissionResultComponent, { static: true })
  submissionResult: SubmissionResultComponent;
  redirectPath: string;
  data: Observable<string>;

  //Only for umbrella project.
  projectLinkJsonForUpdate: object;
  projectLinkJsonForDelete: object;

  constructor(
    public dialogRef: MatDialogRef<SubmissionResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public popupData: Observable<string>,

  ) {
    this.data = popupData["observable"];
    this.redirectPath = popupData["redirectPath"];

    // Only for umbrella project.
    this.projectLinkJsonForUpdate = popupData["projectLinkJsonForUpdate"];
    this.projectLinkJsonForDelete = popupData["projectLinkJsonForDelete"];

  }

  ngOnInit() {

    if (this.projectLinkJsonForUpdate) {
      this.submissionResult.submitUmbrellaProject(this.data, this.projectLinkJsonForUpdate, this.projectLinkJsonForDelete)
    } else {
      this.submissionResult.submit(this.data);
    }
  }
}
