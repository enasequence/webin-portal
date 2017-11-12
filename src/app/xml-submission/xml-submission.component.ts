import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { WebinRestService } from '../webin-rest.service';

@Component({
  selector: 'app-xml-submission',
  templateUrl: './xml-submission.component.html',
  styleUrls: ['./xml-submission.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class XmlSubmissionComponent implements OnInit {

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

  onChangeSubmissionFile(files) {
    this.submissionFile = files[0];
    console.info("Submission file: " + this.submissionFile);
  }

  onChangeStudyFile(files) {
    this.studyFile = files[0];
    console.info("Study file: " + this.studyFile);
  }

  onChangeProjectFile(files) {
    this.projectFile = files[0];
    console.info("Project file: " + this.projectFile);
  }

  onChangeSampleFile(files) {
    this.sampleFile = files[0];
    console.info("Sample file: " + this.sampleFile);
  }

  onChangeExperimentFile(files) {
    this.experimentFile = files[0];
    console.info("Experiment file: " + this.experimentFile);
  }

  onChangeRunFile(files) {
    this.runFile = files[0];
    console.info("Run file: " + this.runFile);
  }

  onChangeAnalysisFile(files) {
    this.analysisFile = files[0];
    console.info("Analysis file: " + this.analysisFile);
  }

  onChangeDacFile(files) {
    this.dacFile = files[0];
    console.info("Dac file: " + this.dacFile);
  }

  onChangePolicyFile(files) {
    this.policyFile = files[0];
    console.info("Policy file: " + this.policyFile);
  }

  onChangeDatasetFile(files) {
    this.datasetFile = files[0];
    console.info("Dataset file: " + this.datasetFile);
  }

  canSubmit() {
    return this.submissionFile !== undefined && (
      this.studyFile  !== undefined ||
      this.projectFile !== undefined ||
      this.sampleFile !== undefined ||
      this.experimentFile !== undefined ||
      this.runFile !== undefined ||
      this.analysisFile !== undefined ||
      this.dacFile !== undefined ||
      this.policyFile !== undefined ||
      this.datasetFile !== undefined);
  }

  //angular.io/guide/http
  // https://stackoverflow.com/questions/46059226/upload-image-with-httpclient
  submit() {
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
  }

  constructor(
    private webinRestService: WebinRestService) {
  }

  ngOnInit() {
  }
}
