import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

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

  public async submitSpreadsheet(spreadsheetFile: File): Promise<void> {

    const headers = this.headers();

    const formData: FormData = new FormData();
    this.add(formData, 'SPREADSHEET', spreadsheetFile);

    const response: HttpResponse<any> = await this.http
      .post(this._baseUrl, formData, { headers, observe: 'response' })
      .toPromise();

    console.log(response.status);
  }

  public async submitXml(
    submissionFile: File,
    studyFile: File,
    projectFile: File,
    sampleFile: File,
    experimentFile: File,
    runFile: File,
    analysisFile: File,
    dacFile: File,
    policyFile: File,
    datasetFile: File): Promise<void> {

    const headers = this.headers();

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

    const response: HttpResponse<any> = await this.http
      .post(this._baseUrl, formData, { headers, observe: 'response' })
      .toPromise();

    console.log(response.status);
  }
}
