import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Rx';

import { ReportType } from './report-type.enum';

@Injectable()
export class WebinRestService {

  private _baseUrl = environment.webinServiceUrl;
  private xmlParser = new DOMParser();

  constructor(private http: HttpClient) { }

  headers() {
    return new HttpHeaders();
  }

  appendFile(formData: FormData, name: string, file: File) {
    if (file !== undefined) {
      formData.append(name, file);
    }
  }

  appendXml(formData: FormData, name: string, blob: Blob) {
    if (blob !== undefined) {
      let fileName: string = (blob as File).name;
      if (fileName == undefined) {
        fileName = name.toLowerCase() + ".xml";
      }
      formData.append(name, blob, fileName);
    }
  }

  post(formData: FormData) : Observable<any> {
    const headers = this.headers();
    return this.http.post(this._baseUrl, formData, { headers, responseType: 'text', observe: 'response' });
  }

  addSpreadsheet(spreadsheet: File) {
    console.info('Add spreadsheet');
    const formData: FormData = new FormData();
    this.appendFile(formData, 'SUBMISSION', spreadsheet);
    formData.append('ACTION', 'ADD');
    return this.post(formData);
  }

  updateSpreadsheet(spreadsheet: File) {
    console.info('Update spreadsheet');
    const formData: FormData = new FormData();
    this.appendFile(formData, 'SUBMISSION', spreadsheet);
    formData.append('ACTION', 'MODIFY');
    return this.post(formData);
  }

  validateAddSpreadsheet(spreadsheet: File) {
    console.info('Validate add spreadsheet');
    const formData: FormData = new FormData();
    this.appendFile(formData, 'SUBMISSION', spreadsheet);
    formData.append('ACTION', 'ADD,VALIDATE');
    return this.post(formData);
  }

  validateUpdateSpreadsheet(spreadsheet: File) {
    console.info('Validate update spreadsheet');
    const formData: FormData = new FormData();
    this.appendFile(formData, 'SUBMISSION', spreadsheet);
    formData.append('ACTION', 'MODIFY,VALIDATE');
    return this.post(formData);
  }

  updateXml(
    reportType: ReportType,
    xml: Blob)
   {
     console.info('** Update XML **');
     let formData: FormData = new FormData();

     let submissionXml: Blob = new Blob([
       "<SUBMISSION_SET>" +
       "  <SUBMISSION>" +
       "	<ACTIONS>" +
       "    		<ACTION>" +
       "    			<MODIFY/>" +
       "    		</ACTION>" +
       "    	</ACTIONS>" +
       "    </SUBMISSION>" +
       "</SUBMISSION_SET>"]);

     this.appendXml(formData, 'SUBMISSION', submissionXml);

     switch(reportType) {
        case ReportType.studies: {
          this.appendXml(formData, 'STUDY', xml);
          break;
        }
        case ReportType.projects: {
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

    console.log("** webin submission form data **", formData);
    return this.post(formData);
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
    datasetXml: Blob) {

    console.info('** Submit XML **');
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
    return this.post(formData);
  }


  parseResult(data) {

    let xmlDoc = this.xmlParser.parseFromString(data.body, 'text/xml');
    let rootNode: any = xmlDoc.getElementsByTagName('RECEIPT')[0];
    let isError: boolean = (rootNode.getAttribute('success') != 'true');
    let date: string = rootNode.getAttribute('receiptDate');

    let receipt = {
      isError: isError,
      xml: data.body,
      date: date,
      accessions: [],
      errors: []
    };

    var i: number = 0;

    if (!isError) {
      let nodes = rootNode.childNodes;
      for (i = 0; i < nodes.length; i++) {
        let childNode = nodes[i];
        if (childNode.tagName == "ANALYSIS" ||
            childNode.tagName == "EXPERIMENT" ||
            childNode.tagName == "RUN" ||
            childNode.tagName == "SAMPLE" ||
            childNode.tagName == "STUDY" ||
            childNode.tagName == "DAC" ||
            childNode.tagName == "POLICY" ||
            childNode.tagName == "DATASET" ||
            childNode.tagName == "PROJECT" ||
            ( childNode.tagName == "SUBMISSION" && childNode.getAttribute('accession'))) {
          receipt.accessions.push(
            {
              type: childNode.tagName,
              accession: childNode.getAttribute('accession'),
              alias: childNode.getAttribute('alias')
            });
        }
      }
    }
    else {
      let messageRootNode = rootNode.getElementsByTagName('MESSAGES')[0];
      let nodes = messageRootNode.getElementsByTagName('ERROR');
      for (i = 0; i < nodes.length; i++) {
        receipt.errors.push(
          {
            error: nodes[i].textContent
          });
      }
    }

    return receipt;
  }
}
