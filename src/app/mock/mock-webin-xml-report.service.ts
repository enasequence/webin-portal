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

import { Observable } from 'rxjs';

import { WebinXmlReportServiceInterface } from '../webin-xml-report.service.interface';

export class MockWebinXmlReportService implements WebinXmlReportServiceInterface {

  getStudyXml(id: string): Observable<string> {
    return null;
  }
  getProjectXml(id: string): Observable<string> {
    return null;
  }
  getSampleXml(id: string): Observable<string> {
    return null;
  }
  getRunXml(id: string): Observable<string> {
    return null;
  }
  getExperimentXml(id: string): Observable<string> {
    return null;
  }
  getAnalysisXml(id: string): Observable<string> {
    return null;
  }
  getDacXml(id: string): Observable<string> {
    return null;
  }
  getPolicyXml(id: string): Observable<string> {
    return null;
  }
  getDatasetXml(id: string): Observable<string> {
    return null;
  }
}
