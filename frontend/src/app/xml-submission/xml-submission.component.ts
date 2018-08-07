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

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import {MatTableDataSource} from '@angular/material';
import { MatStepper } from '@angular/material';

import { SubmissionResultComponent } from '../submission-result/submission-result.component';
import { ChecklistComponent } from '../checklist/checklist.component';
import { ChecklistType } from '../checklist-type.enum';

import { WebinAuthenticationService } from '../webin-authentication.service';
import { WebinRestService } from '../webin-rest.service';

@Component({
  selector: 'app-xml-submission',
  templateUrl: './xml-submission.component.html',
  styleUrls: ['./xml-submission.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class XmlSubmissionComponent implements OnInit {

  @ViewChild(SubmissionResultComponent) submissionResult: SubmissionResultComponent;

  ChecklistType = ChecklistType;   // Allows use in template

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

  constructor(
    private webinAuthenticationService: WebinAuthenticationService,
    private webinRestService: WebinRestService
    ) {
  }

  ngOnInit() {
  }

  isEga(): boolean {
    return this.webinAuthenticationService.ega;
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
    return this.submissionFile !== undefined;
  }

  submit() {
    console.log('** Webin XML submission **');

    const observable: Observable<any> =
      this.webinRestService.submitXml(
        this.submissionFile,
        this.studyFile,
        this.projectFile,
        this.sampleFile,
        this.experimentFile,
        this.runFile,
        this.analysisFile,
        this.dacFile,
        this.policyFile,
        this.datasetFile);

    this.submissionResult.submit(observable);
  }
}
