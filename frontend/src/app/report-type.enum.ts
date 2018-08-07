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

export enum ReportType {
  studies = 'studies',
  projects = 'projects',
  samples = 'samples',
  experiments = 'experiments',
  runs = 'runs',
  analyses = 'analyses',
  runFiles = 'runFiles',
  analysisFiles = 'analysisFiles',
  runProcess = 'runProcess',
  analysisProcess = 'analysisProcess',
  unsubmittedFiles = 'unsubmittedFiles',
  dacs = 'dacs',
  policies = 'policies',
  datasets = 'datasets'
}

export class ReportTypeUtils {

  static getCapitalisedSingularName(reportType: ReportType): string {
    switch (reportType) {
       case ReportType.studies: {
         return 'Study';
       }
       case ReportType.projects: {
         return 'Project';
       }
       case ReportType.samples: {
         return 'Sample';
       }
       case ReportType.experiments: {
         return 'Experiment';
       }
       case ReportType.runs: {
         return 'Run';
       }
       case ReportType.analyses: {
         return 'Analysis';
       }
       case ReportType.runFiles: {
         return 'Submitted files for run';
       }
       case ReportType.analysisFiles: {
         return 'Submitted files for analysis';
       }
       case ReportType.runProcess: {
         return 'Run processing status';
       }
       case ReportType.analysisProcess: {
         return 'Analysis processing status';
       }
       case ReportType.unsubmittedFiles: {
         return 'Unsubmitted files';
       }
       case ReportType.dacs: {
         return 'Dac';
       }
       case ReportType.policies: {
         return 'Policy';
       }
       case ReportType.datasets: {
         return 'Dataset';
       }
       default: {
         return '';
       }
    }
  }


  static getPluralName(reportType: ReportType): string {
    switch (reportType) {
       case ReportType.studies: {
         return 'studies';
       }
       case ReportType.projects: {
         return 'projects';
       }
       case ReportType.samples: {
         return 'samples';
       }
       case ReportType.experiments: {
         return 'experiments';
       }
       case ReportType.runs: {
         return 'runs';
       }
       case ReportType.analyses: {
         return 'analyses';
       }
       case ReportType.runFiles: {
         return 'run files';
       }
       case ReportType.analysisFiles: {
         return 'analyses files';
       }
       case ReportType.runProcess: {
         return 'processing status of archived run files';
       }
       case ReportType.analysisProcess: {
         return 'processing status of archived analysis files';
       }
       case ReportType.unsubmittedFiles: {
         return 'unsubmitted files';
       }
       case ReportType.dacs: {
         return 'dacs';
       }
       case ReportType.policies: {
         return 'policies';
       }
       case ReportType.datasets: {
         return 'datasets';
       }
       default: {
         return '';
       }
    }
  }
}
