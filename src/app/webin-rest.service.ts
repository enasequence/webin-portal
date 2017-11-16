import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';


// import { Observable } from 'rxjs/Rx';

@Injectable()
export class WebinRestService {

  private _baseUrl = environment.webinServiceUrl;

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
}
