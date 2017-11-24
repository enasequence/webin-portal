import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class WebinReportService {

  private _baseUrl = environment.webinReportServiceUrl;

  constructor(private http: HttpClient) { }

  public getStudiesAll(rows: string) : Observable<any> {
    return this.getAll('studies', rows);
  }
  public getStudies(id: string, rows: string) : Observable<any> {
    return this.get('studies', id, rows);
  }

  public getSamplesAll(rows: string) : Observable<any> {
    return this.getAll('samples', rows);
  }
  public getSamples(id: string, rows: string) : Observable<any> {
    return this.get('samples', id, rows);
  }

  public getRunsAll(rows: string) : Observable<any> {
    return this.getAll('runs', rows);
  }
  public getRuns(id: string, rows: string) : Observable<any> {
    return this.get('runs', id, rows);
  }

  public getAnalysesAll(rows: string) : Observable<any> {
    return this.getAll('analyses', rows);
  }
  public getAnalyses(id: string, rows: string) : Observable<any> {
    return this.get('analyses', id, rows);
  }

  public getRunFilesAll(rows: string) : Observable<any> {
    return this.getAll('run-files', rows);
  }
  public getRunFiles(id: string, rows: string) : Observable<any> {
    return this.get('run-files', id, rows);
  }

  public getAnalysisFilesAll(rows: string) : Observable<any> {
    return this.getAll('analysis-files', rows);
  }
  public getAnalysisFiles(id: string, rows: string) : Observable<any> {
    return this.get('analysis-files', id, rows);
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
