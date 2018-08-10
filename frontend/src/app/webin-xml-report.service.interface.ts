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

export interface WebinXmlReportServiceInterface {
  getStudyXml(id: string): Observable<any>;
  getProjectXml(id: string): Observable<any>;
  getSampleXml(id: string): Observable<any>;
  getRunXml(id: string): Observable<any>;
  getExperimentXml(id: string): Observable<any>;
  getAnalysisXml(id: string): Observable<any>;
  getDacXml(id: string): Observable<any>;
  getPolicyXml(id: string): Observable<any>;
  getDatasetXml(id: string): Observable<any>;
}
