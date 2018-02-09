import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SubmissionResultComponent } from '../submission-result/submission-result.component';

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
    private webinRestService: WebinRestService) {
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
