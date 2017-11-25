import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class WebinReportService {

  private _baseUrl = environment.webinReportServiceUrl;

  constructor(private http: HttpClient) { }

  getStudiesAll(rows: string) : Observable<any> {
    return this.getAll('studies', rows);
  }
  getStudies(id: string, rows: string) : Observable<any> {
    return this.get('studies', id, rows);
  }

  getSamplesAll(rows: string) : Observable<any> {
    return this.getAll('samples', rows);
  }
  getSamples(id: string, rows: string) : Observable<any> {
    return this.get('samples', id, rows);
  }

  getRunsAll(rows: string) : Observable<any> {
    return this.getAll('runs', rows);
  }
  getRuns(id: string, rows: string) : Observable<any> {
    return this.get('runs', id, rows);
  }

  getAnalysesAll(rows: string) : Observable<any> {
    return this.getAll('analyses', rows);
  }
  getAnalyses(id: string, rows: string) : Observable<any> {
    return this.get('analyses', id, rows);
  }

  getRunFilesAll(rows: string) : Observable<any> {
    return this.getAll('run-files', rows);
  }
  getRunFiles(id: string, rows: string) : Observable<any> {
    return this.get('run-files', id, rows);
  }

  getAnalysisFilesAll(rows: string) : Observable<any> {
    return this.getAll('analysis-files', rows);
  }
  getAnalysisFiles(id: string, rows: string) : Observable<any> {
    return this.get('analysis-files', id, rows);
  }


  getDacsAll(rows: string) : Observable<any> {
    return this.getAll('dacs', rows);
  }
  getDacs(id: string, rows: string) : Observable<any> {
    return this.get('dacs', id, rows);
  }

  getPoliciesAll(rows: string) : Observable<any> {
    return this.getAll('policies', rows);
  }
  getPolicies(id: string, rows: string) : Observable<any> {
    return this.get('policies', id, rows);
  }

  getDatasetsAll(rows: string) : Observable<any> {
    return this.getAll('datasets', rows);
  }
  getDatasets(id: string, rows: string) : Observable<any> {
    return this.get('datasets', id, rows);
  }




  private getAll(reportType: string, rows: string) : Observable<any> {
    let url: string = this._baseUrl + "/" + reportType + "?max-results=" + rows;
    console.log(url);
    return this.http.get(url);
  }

  private get(reportType: string, id: string, rows: string) : Observable<any> {
    let url: string = this._baseUrl + "/" + reportType + "/" + id.trim() + "?max-results=" + rows;
    console.log(url);
    return this.http.get(url);
  }
}
