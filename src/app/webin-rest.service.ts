import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebinRestService {

  private _baseUrl = 'https://www-test.ebi.ac.uk/ena/submit/drop-box/submit/';

  // TODO
  username: string = 'lbower@ebi.ac.uk';
  password: string = 'sausages';

  constructor(private http: HttpClient) { }

  headers() {
    return new HttpHeaders()
      .append('Content-Type', 'multipart/form-data')
      .append("Authorization", "Basic " + btoa(this.username + ':' + this.password))
      .append("Content-Type", "application/x-www-form-urlencoded");
  }

  add(formData: FormData, name: string, file: File) {
    if (file !== undefined) {
      formData.append(name, file, file.name);
    }
  }

  async post(formData: FormData) {
    const headers = this.headers();

    await this.http
      .post(this._baseUrl, formData, { headers, observe: 'response' })
      // .toPromise()
      .subscribe(
        // Success.
        data => { /* TODO */ },
        // Errors.
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
              // A client-side or network error occurred. Handle it accordingly.
              console.log('An error occurred:', err.error.message);
          }
          else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
      });
  }

  public addSpreadsheet(spreadsheetFile: File) {
    console.info('Add spreadsheet');
    const formData: FormData = new FormData();
    this.add(formData, 'ADD', spreadsheetFile);
    this.post(formData);
  }

  public updateSpreadsheet(spreadsheetFile: File) {
    console.info('Update spreadsheet');
    const formData: FormData = new FormData();
    this.add(formData, 'UPDATE', spreadsheetFile);
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
    this.add(formData, 'SUBMISSION', submissionFile);
    this.add(formData, 'STUDY', studyFile);
    this.add(formData, 'PROJECT', projectFile);
    this.add(formData, 'SAMPLE', sampleFile);
    this.add(formData, 'EXPERIMENT', experimentFile);
    this.add(formData, 'RUN', runFile);
    this.add(formData, 'ANALYSIS', analysisFile);
    this.add(formData, 'DAC', dacFile);
    this.add(formData, 'POLICY', policyFile);
    this.add(formData, 'DATASET', datasetFile);
    this.post(formData);
  }
}
