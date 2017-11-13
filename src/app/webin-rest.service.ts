import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class WebinRestService {

  private _baseUrl = 'https://www-test.ebi.ac.uk/ena/submit/drop-box/submit/';

  constructor(private http: HttpClient) { }

  headers() {
    return new HttpHeaders()
      .append('Content-Type', 'multipart/form-data')
      .append("Content-Type", "application/x-www-form-urlencoded");
  }

  appendFile(formData: FormData, name: string, file: File) {
    if (file !== undefined) {
      formData.append(name, file, file.name);
    }
  }

  async post(formData: FormData) {
    const headers = this.headers();

    await this.http
      .post(this._baseUrl, formData, { headers, observe: 'response' })
      .subscribe(
        // Success.
        data => {
          console.log(`Webin REST call to ${this._baseUrl} finished succesfully`);
        },
        // Errors.
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log(`Webin REST call to ${this._baseUrl} finished with a client or network error ${err.error.message}`);
          }
          else {
            console.log(`Webin REST call to ${this._baseUrl} finished with a server error code: ${err.status}, body was: ${err.error}`);
          }
      });
  }

  public addSpreadsheet(spreadsheetFile: File) {
    console.info('Add spreadsheet');
    const formData: FormData = new FormData();
    this.appendFile(formData, 'SPREADSHEET-FILE', spreadsheetFile);
    formData.append('SPREADSHEET-ACTION', 'ADD');
    this.post(formData);
  }

  public updateSpreadsheet(spreadsheetFile: File) {
    console.info('Update spreadsheet');
    const formData: FormData = new FormData();
    this.appendFile(formData, 'SPREADSHEET-FILE', spreadsheetFile);
    formData.append('SPREADSHEET-ACTION', 'MODIFY');
    this.post(formData);
  }

  public validateAddSpreadsheet(spreadsheetFile: File) {
    console.info('Validate add spreadsheet');
    const formData: FormData = new FormData();
    this.appendFile(formData, 'SPREADSHEET-FILE', spreadsheetFile);
    formData.append('SPREADSHEET-ACTION', 'ADD,VALIDATE');
    this.post(formData);
  }

  public validateUpdateSpreadsheet(spreadsheetFile: File) {
    console.info('Validate update spreadsheet');
    const formData: FormData = new FormData();
    this.appendFile(formData, 'SPREADSHEET-FILE', spreadsheetFile);
    formData.append('SPREADSHEET-ACTION', 'MODIFY,VALIDATE');
    this.post(formData);
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
    this.post(formData);
  }
}
