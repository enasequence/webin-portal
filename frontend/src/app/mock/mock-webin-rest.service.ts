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

import { ReportType } from '../report-type.enum';
import { WebinRestServiceInterface } from '../webin-rest.service.interface';
import { Observable } from '../../../node_modules/rxjs';

export class MockWebinRestService implements WebinRestServiceInterface {

  updateXml(
    reportType: ReportType,
    xml: Blob): Observable<string> {
    return null;
  }

  submitXml(
    submissionXml: Blob,
    studyXml: Blob,
    projectXml: Blob,
    sampleXml: Blob,
    experimentXml: Blob,
    runXml: Blob,
    analysisXml: Blob,
    dacXml: Blob,
    policyXml: Blob,
    datasetXml: Blob): Observable<string> {
    return null;
    }


  parseResult(data) {
    const receipt = {
      isError: false,
      xml: 'Mock',
      date: 'Mock',
      accessions: [],
      errors: []
    };

    return receipt;
  }
}
