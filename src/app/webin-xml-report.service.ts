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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { WebinXmlReportServiceInterface } from './webin-xml-report.service.interface';

@Injectable()
export class WebinXmlReportService implements WebinXmlReportServiceInterface {

  private _baseUrl = environment.webinXmlReportServiceUrl;

  constructor(private http: HttpClient) { }

  getStudyXml(id: string): Observable<string> {
    return this.getXml('studies', id);
  }
  getProjectXml(id: string): Observable<string> {
    return this.getXml('projects', id);
  }
  getSampleXml(id: string): Observable<string> {
    return this.getXml('samples', id);
  }
  getRunXml(id: string): Observable<string> {
    return this.getXml('runs', id);
  }
  getExperimentXml(id: string): Observable<string> {
    return this.getXml('experiments', id);
  }
  getAnalysisXml(id: string): Observable<string> {
    return this.getXml('analyses', id);
  }
  getDacXml(id: string): Observable<string> {
    return this.getXml('dacs', id);
  }
  getPolicyXml(id: string): Observable<string> {
    return this.getXml('policys', id);
  }
  getDatasetXml(id: string): Observable<string> {
    return this.getXml('datasets', id);
  }

  private getXml(xmlType: string, id: string): Observable<string> {
    const url: string = this._baseUrl + '/' + xmlType + '/' + id + '?format=xml';
    //console.log(url);
    return this.http.get(url, { responseType: 'text' });
  }
}
