import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';


// import { Observable } from 'rxjs/Rx';

@Injectable()
export class WebinRestService {

  private _baseUrl = environment.webinServiceUrl;
  private xmlParser = new DOMParser();

  constructor(private http: HttpClient) { }

  headers() {
    return new HttpHeaders()
      .append('Content-Type', 'multipart/form-data')
  }

  appendFile(formData: FormData, name: string, file: File) {
    if (file !== undefined) {
      formData.append(name, file, file.name);
    }
  }

  post(formData: FormData) : Observable<text> {
    const headers = this.headers();
    return this.http.post(this._baseUrl, formData, { headers, responseType: 'text', observe: 'response' });
  }

  public addSpreadsheet(spreadsheetFile: File) {
    console.info('Add spreadsheet');
    const formData: FormData = new FormData();
    this.appendFile(formData, 'SUBMISSION', spreadsheetFile);
    //formData.append('ACTION', 'ADD');
    return this.post(formData);
  }

  public updateSpreadsheet(spreadsheetFile: File) {
    console.info('Update spreadsheet');
    const formData: FormData = new FormData();
    this.appendFile(formData, 'SUBMISSION', spreadsheetFile);
    //formData.append('ACTION', 'MODIFY');
    return this.post(formData);
  }

  public validateAddSpreadsheet(spreadsheetFile: File) {
    console.info('Validate add spreadsheet');
    const formData: FormData = new FormData();
    this.appendFile(formData, 'SUBMISSION', spreadsheetFile);
    //formData.append('ACTION', 'ADD,VALIDATE');
    return this.post(formData);
  }

  public validateUpdateSpreadsheet(spreadsheetFile: File) {
    console.info('Validate update spreadsheet');
    const formData: FormData = new FormData();
    this.appendFile(formData, 'SUBMISSION', spreadsheetFile);
    //formData.append('ACTION', 'MODIFY,VALIDATE');
    return this.post(formData);
  }

  public submitXml(
    submissionFile: File,
    studyFile: File,
    projectFile: File,
    sampleFile: File,
    experimentFile: File,
    runFile: File,
    analysisFile: File,
    dacFile: File,
    policyFile: File,
    datasetFile: File) {

    console.info('Submit XML');
    const formData: FormData = new FormData();
    this.appendFile(formData, 'SUBMISSION', submissionFile);
    this.appendFile(formData, 'STUDY', studyFile);
    this.appendFile(formData, 'PROJECT', projectFile);
    this.appendFile(formData, 'SAMPLE', sampleFile);
    this.appendFile(formData, 'EXPERIMENT', experimentFile);
    this.appendFile(formData, 'RUN', runFile);
    this.appendFile(formData, 'ANALYSIS', analysisFile);
    this.appendFile(formData, 'DAC', dacFile);
    this.appendFile(formData, 'POLICY', policyFile);
    this.appendFile(formData, 'DATASET', datasetFile);
    return this.post(formData);
  }


  public parseResult(data) {

    let xmlDoc = this.xmlParser.parseFromString(data.body, 'text/xml');
    let rootNode = xmlDoc.getElementsByTagName('RECEIPT')[0];
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
        if (nodes[i].tagName == "ANALYSIS" ||
            nodes[i].tagName == "EXPERIMENT" ||
            nodes[i].tagName == "RUN" ||
            nodes[i].tagName == "SAMPLE" ||
            nodes[i].tagName == "STUDY" ||
            nodes[i].tagName == "DAC" ||
            nodes[i].tagName == "POLICY" ||
            nodes[i].tagName == "DATASET" ||
            nodes[i].tagName == "PROJECT" ||
            nodes[i].tagName == "SUBMISSION") {
          receipt.accessions.push(
            {
              type: nodes[i].tagName,
              accession: nodes[i].getAttribute('accession'),
              alias: nodes[i].getAttribute('alias')
            });
        }
      }
    }
    else {
      let messageRootNode = rootNode.getElementsByTagName('MESSAGES')[0];
      let nodes = messageRootNode.getElementsByTagName('ERROR');
      for (i = 0; i < nodes.length; i++) {
        console.log(nodes[i]);
        console.log(nodes[i].textContent);
        receipt.errors.push(
          {
            error: nodes[i].textContent
          });
      }
    }

    return receipt;
  }
}
