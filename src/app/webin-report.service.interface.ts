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

export interface WebinReportServiceInterface {

    getStudiesAll(status: string, rows: string, format: string);
    getStudies(id: string, rows: string, format: string);

    getProjectsAll(status: string, rows: string, format: string);
    getProjects(id: string, rows: string, format: string);

    getSamplesAll(status: string, rows: string, format: string);
    getSamples(id: string, rows: string, format: string);

    getRunsAll(status: string, rows: string, format: string);
    getRuns(id: string, rows: string, format: string);

    getAnalysesAll(status: string, analysisType: string, rows: string, format: string);
    getAnalyses(id: string, rows: string, format: string);

    getRunFilesAll(archiveStatus: string, rows: string, format: string);
    getRunFiles(id: string, rows: string, format: string);

    getAnalysisFilesAll(analysisType: string, archiveStatus: string, rows: string, format: string);
    getAnalysisFiles(id: string, rows: string, format: string);

    getRunProcessAll(processStatus: string, rows: string, format: string);
    getRunProcess(id: string, rows: string, format: string);

    getAnalysisProcessAll(analysisType: string, processStatus: string, rows: string, format: string);
    getAnalysisProcess(id: string, rows: string, format: string);

    getUnsubmittedFilesAll(status: string, rows: string, format: string);

    getDacsAll(status: string, rows: string, format: string);
    getDacs(id: string, rows: string, format: string);

    getPoliciesAll(status: string, rows: string, format: string);
    getPolicies(id: string, rows: string, format: string);

    getDatasetsAll(status: string, rows: string, format: string);
    getDatasets(id: string, rows: string, format: string);

    getChecklistGroups(type: string);
    getChecklists(type: string);
    getChecklistXmls(type: string);
}
