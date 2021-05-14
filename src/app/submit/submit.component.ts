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

import { Component, ViewEncapsulation } from "@angular/core";
import { Observable } from "rxjs";
import { ChecklistType } from "../checklist-type.enum";
import { WebinAuthenticationService } from "../webin-authentication.service";
import { WebinRestService } from "../webin-rest.service";
import { MatDialog } from "@angular/material";
import { SubmissionResultDialogComponent } from "../submission-result-dialog/submission-result-dialog.component";

@Component({
  selector: "app-submit",
  templateUrl: "./submit.component.html",
  styleUrls: ["./submit.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class SubmitComponent {
  ChecklistType = ChecklistType; // Allows use in template

  submissionFile: File;
  studyFile: File;
  projectFile: File;
  sampleFile: File;
  experimentFile: File;
  runFile: File;
  analysisFile: File;
  dacFile: File;
  policyFile: File;
  datasetFile: File;
  centerName: String;

  constructor(
    private _webinAuthenticationService: WebinAuthenticationService,
    private _webinRestService: WebinRestService,
    public dialog: MatDialog
  ) { }

  isEga(): boolean {
    return this._webinAuthenticationService.ega;
  }

  onChangeSubmissionFile(files) {
    this.submissionFile = files[0];
    // console.log("Submission file: " + this.submissionFile);
  }

  onChangeStudyFile(files) {
    this.studyFile = files[0];
    // console.log("Study file: " + this.studyFile);
  }

  onChangeProjectFile(files) {
    this.projectFile = files[0];
    // console.log("Project file: " + this.projectFile);
  }

  onChangeSampleFile(files) {
    this.sampleFile = files[0];
    // console.log("Sample file: " + this.sampleFile);
  }

  onChangeExperimentFile(files) {
    this.experimentFile = files[0];
    // console.log("Experiment file: " + this.experimentFile);
  }

  onChangeRunFile(files) {
    this.runFile = files[0];
    // console.log("Run file: " + this.runFile);
  }

  onChangeAnalysisFile(files) {
    this.analysisFile = files[0];
    // console.log("Analysis file: " + this.analysisFile);
  }

  onChangeDacFile(files) {
    this.dacFile = files[0];
    // console.log("Dac file: " + this.dacFile);
  }

  onChangePolicyFile(files) {
    this.policyFile = files[0];
    // console.log("Policy file: " + this.policyFile);
  }

  onChangeDatasetFile(files) {
    this.datasetFile = files[0];
    // console.log("Dataset file: " + this.datasetFile);
  }

  canSubmit() {
    return this.submissionFile ? true : false;
  }

  submit() {
    console.log("** Webin XML submission **");

    const observable: Observable<string> = this._webinRestService.submitXml(
      this.submissionFile,
      this.studyFile,
      this.projectFile,
      this.sampleFile,
      this.experimentFile,
      this.runFile,
      this.analysisFile,
      this.dacFile,
      this.policyFile,
      this.datasetFile,
      this.centerName
    );

    this.dialog.open(SubmissionResultDialogComponent, {
      width: "600px",
      data: { "observable": observable, "redirectPath": "/app-submit" },
    });
  }

  isBroker(): boolean {
    return this._webinAuthenticationService.isBroker();
  }
}
