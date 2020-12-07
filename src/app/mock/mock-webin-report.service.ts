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

import { WebinReportServiceInterface } from '../webin-report.service.interface';

export class MockWebinReportService implements WebinReportServiceInterface {

  getStudiesAll(status: string, rows: string, format: string) {
    return null;
  }
  getStudies(id: string, rows: string, format: string) {
    return null;
  }

  getProjectsAll(status: string, rows: string, format: string) {
    return null;
  }
  getProjects(id: string, rows: string, format: string) {
    return null;
  }

  getSamplesAll(status: string, rows: string, format: string) {
    return null;
  }
  getSamples(id: string, rows: string, format: string) {
    return null;
  }

  getRunsAll(status: string, rows: string, format: string) {
    return null;
  }
  getRuns(id: string, rows: string, format: string) {
    return null;
  }

  getAnalysesAll(status: string, analysisType: string, rows: string, format: string) {
    return null;
  }
  getAnalyses(id: string, rows: string, format: string) {
    return null;
  }

  getRunFilesAll(archiveStatus: string, rows: string, format: string) {
    return null;
  }
  getRunFiles(id: string, rows: string, format: string) {
    return null;
  }

  getAnalysisFilesAll(analysisType: string, archiveStatus: string, rows: string, format: string) {
    return null;
  }
  getAnalysisFiles(id: string, rows: string, format: string) {
    return null;
  }

  getRunProcessAll(processStatus: string, rows: string, format: string) {
    return null;
  }

  getRunProcess(id: string, rows: string, format: string) {
    return null;
  }

  getAnalysisProcessAll(analysisType: string, processStatus: string, rows: string, format: string) {
    return null;
  }

  getAnalysisProcess(id: string, rows: string, format: string) {
    return null;
  }

  getUnsubmittedFilesAll(status: string, rows: string, format: string) {
    return null;
  }

  getDacsAll(status: string, rows: string, format: string) {
    return null;
  }
  getDacs(id: string, rows: string, format: string) {
    return null;
  }

  getPoliciesAll(status: string, rows: string, format: string) {
    return null;
  }
  getPolicies(id: string, rows: string, format: string) {
    return null;
  }

  getDatasetsAll(status: string, rows: string, format: string) {
    return null;
  }
  getDatasets(id: string, rows: string, format: string) {
    return null;
  }

  getChecklistGroups(type: string) {
    return null;
  }
  getChecklists(type: string) {
    return null;
  }
  getChecklistXmls(type: string) {
    return null;
  }

  getCsvUrlWithToken(url: string) {
    return null;
  }
}
