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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { tap, startWith, map, debounceTime, catchError } from 'rxjs/operators';


import { ReportType } from './report-type.enum';
import { WebinRestServiceInterface } from './webin-rest.service.interface';
import { WebinAuthenticationService } from './webin-authentication.service';

@Injectable()
export class WebinRestService implements WebinRestServiceInterface {

  private _baseUrl = environment.webinRestUrl + "/submit/";

  private _xmlParser = new DOMParser();

  constructor(private _http: HttpClient,
    private _webinAuthenticationService: WebinAuthenticationService) { }

  private headers() {
    return new HttpHeaders();
  }

  private appendXml(formData: FormData, name: string, blob: Blob) {
    if (blob) {
      let fileName: string = (blob as File).name;
      if (!fileName) {
        fileName = name.toLowerCase() + '.xml';
      }
      formData.append(name, blob, fileName);
    }
  }

  private post(formData: FormData, parameters?): Observable<string> {
    const headers = this.headers();
    var postParameters = parameters + "&ENA_SUBMISSION_TOOL=Webin-Portal";
    return this._http.post(this._baseUrl + "?" + postParameters, formData, { headers, responseType: 'text' });
  }

  private postTaxon(formData: FormData): Observable<string> {
    const headers = this.headers();
    return this._http.post(environment.webinRestUrl + "/portal/register/taxonomy", formData, { headers, responseType: 'text' });
  }

  private postProjectLink(reqJSON: object): Observable<any> {
    const headers = this.headers();
    return this._http.post(environment.webinRestUrl + "/portal/project/link", reqJSON, { headers, responseType: 'text' });
  }

  private deleteProjectLink(reqJSON: object): Observable<any> {
    const headers = this.headers();
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:
        reqJSON
    };
    return this._http.delete(environment.webinRestUrl + "/portal/project/link", options);
  }

  getProjectLink(projectId: string) {

    const url: string = environment.webinRestUrl + '/portal/project/link/' + projectId;
    return this._http.get(url, { responseType: 'text', observe: 'response' });
  }


  private postEmail(formData) {
    const headers = this.headers();
    return this._http.post(environment.webinRestUrl + '/email', formData, { headers });
  }

  submitProjectXml(formData) {
    const headers = this.headers();
    return this._http.post(this._baseUrl, formData, { headers, responseType: 'text' }).
      pipe(
        map((data: any) => {
          return data;
        })
      )
  }


  updateXml(
    reportType: ReportType,
    xml: Blob,
    action: Object,
    releaseDate?: any,
    form?): Observable<string> {
    console.log('** Update XML **');
    const formData: FormData = new FormData();
    var mode = action["name"];

    var releaseDateStr = this.getReleaseDateStr(action, mode, releaseDate)
    var actionString = this.getActionStr(action, mode);
    let submissionXml: Blob = new Blob([
      '<SUBMISSION_SET>' +
      '  <SUBMISSION>' +
      '	<ACTIONS>' +
      actionString +
      releaseDateStr +
      '    	</ACTIONS>' +
      '    </SUBMISSION>' +
      '</SUBMISSION_SET>']);
    if (this._webinAuthenticationService.ega) {
      submissionXml = new Blob([
        '<SUBMISSION_SET>' +
        '  <SUBMISSION broker_name="EGA">' +
        '	<ACTIONS>' +
        actionString +
        '    		<ACTION>' +
        '    			<PROTECT/>' +
        '    		</ACTION>' +
        releaseDateStr +
        '    	</ACTIONS>' +
        '    </SUBMISSION>' +
        '</SUBMISSION_SET>']);
    }
    this.appendXml(formData, 'SUBMISSION', submissionXml);

    switch (reportType) {
      case ReportType.studies: {
        this.appendXml(formData, 'STUDY', xml);
        break;
      }
      case ReportType.projects: {
        this.appendXml(formData, 'PROJECT', xml);
        break;
      }
      case ReportType.umbrellaProjects: {
        this.appendXml(formData, 'PROJECT', xml);
        break;
      }
      case ReportType.samples: {
        this.appendXml(formData, 'SAMPLE', xml);
        break;
      }
      case ReportType.experiments: {
        this.appendXml(formData, 'EXPERIMENT', xml);
        break;
      }
      case ReportType.runs: {
        this.appendXml(formData, 'RUN', xml);
        break;
      }
      case ReportType.analyses: {
        this.appendXml(formData, 'ANALYSIS', xml);
        break;
      }
      case ReportType.dacs: {
        this.appendXml(formData, 'DAC', xml);
        break;
      }
      case ReportType.policies: {
        this.appendXml(formData, 'POLICY', xml);
        break;
      }
      case ReportType.datasets: {
        this.appendXml(formData, 'DATASET', xml);
        break;
      }
    }

    let postParam = "";
    if (form) {
      postParam = this.getCenterNamePostParam(form.centerName);
    }
    console.log('** webin submission form data **', formData);
    return this.post(formData, postParam);

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
    datasetXml: Blob,
    centerName?): Observable<string> {

    console.log('** Submit XML **');
    const formData: FormData = new FormData();
    this.appendXml(formData, 'SUBMISSION', submissionXml);
    this.appendXml(formData, 'STUDY', studyXml);
    this.appendXml(formData, 'PROJECT', projectXml);
    this.appendXml(formData, 'SAMPLE', sampleXml);
    this.appendXml(formData, 'EXPERIMENT', experimentXml);
    this.appendXml(formData, 'RUN', runXml);
    this.appendXml(formData, 'ANALYSIS', analysisXml);
    this.appendXml(formData, 'DAC', dacXml);
    this.appendXml(formData, 'POLICY', policyXml);
    this.appendXml(formData, 'DATASET', datasetXml);

    let postParam = "";
    if (centerName) {
      postParam = this.getCenterNamePostParam(centerName);
    }

    return this.post(formData, postParam);
  }

  submitProjectLink(reqJson) {
    return this.postProjectLink(reqJson);
  }

  removeProjectLink(reqJson) {
    return this.deleteProjectLink(reqJson);
  }

  getCenterNamePostParam(centerName) {
    if (centerName) {
      return "CENTER_NAME=" + centerName;
    }
  }

  parseResult(data: string) {

    const xmlDoc = this._xmlParser.parseFromString(data, 'text/xml');
    const rootNode: any = xmlDoc.getElementsByTagName('RECEIPT')[0];
    const isError: boolean = (rootNode.getAttribute('success') !== 'true');
    const date: string = rootNode.getAttribute('receiptDate');

    const receipt = {
      isError: isError,
      xml: data,
      date: date,
      accessions: [],
      errors: [],
      // Fields for Project / study
      releaseDate: String,
      releaseStatus: String
    };

    let i = 0;

    if (!isError) {
      const nodes = rootNode.childNodes;
      // Safer not use forEach for NodeList.
      for (i = 0; i < nodes.length; i++) {
        const childNode = nodes[i];
        if (childNode.tagName === 'ANALYSIS' ||
          childNode.tagName === 'EXPERIMENT' ||
          childNode.tagName === 'RUN' ||
          childNode.tagName === 'SAMPLE' ||
          childNode.tagName === 'STUDY' ||
          childNode.tagName === 'DAC' ||
          childNode.tagName === 'POLICY' ||
          childNode.tagName === 'DATASET' ||
          childNode.tagName === 'PROJECT' ||
          (childNode.tagName === 'SUBMISSION' && childNode.getAttribute('accession'))) {
          receipt.accessions.push(
            {
              type: childNode.tagName,
              accession: childNode.getAttribute('accession'),
              alias: childNode.getAttribute('alias')
            });

          // Save project details for displaying project specific message.
          if (childNode.tagName === 'PROJECT') {
            receipt.releaseDate = childNode.getAttribute('holdUntilDate');
            receipt.releaseStatus = childNode.getAttribute('status');
          }
        }
      }
    } else {
      const messageRootNode = rootNode.getElementsByTagName('MESSAGES')[0];
      const nodes = messageRootNode.getElementsByTagName('ERROR');
      // Safer not use forEach for NodeList.
      for (i = 0; i < nodes.length; i++) {
        receipt.errors.push(
          {
            error: nodes[i].textContent
          });
      }
    }

    return receipt;
  }

  getActionStr(action, mode) {
    var actionStr = "";
    if (mode === "Edit") {

      actionStr = '<ACTION>' +
        '  <MODIFY/>' +
        '</ACTION>';
    } else {
      actionStr = '<ACTION>' +
        '    			    <ADD/>' +
        '    		    </ACTION>'
    }

    return actionStr;
  }

  getReleaseDateStr(action, mode, releaseDate) {
    var releaseDateStr = "";
    var targetStr = "";

    if (mode === "Edit" && action["id"]) {
      targetStr = 'target="' + action["id"] + '"';
    }
    if (!this._webinAuthenticationService.ega) {
      if (releaseDate) {
        releaseDateStr = '<ACTION>' +
          '<HOLD ' + targetStr + ' HoldUntilDate="' + releaseDate + '"></HOLD>' +
          '</ACTION>';
      }
    }
    return releaseDateStr;
  }

  uploadTaxonTemplate(taxonTemplate: Blob): Observable<any> {
    console.log('** Submit tacon template **');
    const formData: FormData = new FormData();
    formData.append('taxonomyRegistrationFile', taxonTemplate, 'taxonomyTemplate.tsv');
    return this.postTaxon(formData);
  }

  sendTaxonEmail(mail: any, attachment) {
    const mailStr = JSON.stringify(mail);
    const mailBytes = new TextEncoder().encode(mailStr);
    console.log('** Send email for taxon **');
    const formData: FormData = new FormData();
    formData.append("mail", new Blob([mailBytes], { type: 'application/json' }));

    formData.append("attachmentFile", attachment, "taxonomy.csv");
    return this.postEmail(formData)
  }

  isValidTabSubmissionFile(blob: Blob) {
    var fileName = (blob as File).name;
    // Check if the file is NOT in valid format.
    if (!(fileName.endsWith("tab") || fileName.endsWith("tsv") || fileName.endsWith("csv"))) {
      return false;
    }
    return true;
  }

}
