import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class WebinReportService {

  private _baseUrl = environment.webinReportServiceUrl;

  constructor(private http: HttpClient) { }

  public getStudiesAll() : Observable<text> {
    return this.getAll('studies');
  }
  public getStudiesOne(id: string) : Observable<text> {
    return this.getOne('studies', id);
  }

  public getSamplesAll() : Observable<text> {
    return this.getAll('samples');
  }
  public getSamplesOne(id: string) : Observable<text> {
    return this.getOne('samples', id);
  }

  public getRunsAll() : Observable<text> {
    return this.getAll('runs');
  }
  public getRunsOne(id: string) : Observable<text> {
    return this.getOne('runs', id);
  }

  public getAnalysesAll() : Observable<text> {
    return this.getAll('analyses');
  }
  public getAnalysesOne(id: string) : Observable<text> {
    return this.getOne('analyses', id);
  }

  public getRunFilesAll() : Observable<text> {
    return this.getAll('run-files');
  }
  public getRunFilesOne(id: string) : Observable<text> {
    return this.getOne('run-files', id);
  }

  public getAnalysisFilesAll() : Observable<text> {
    return this.getAll('analysis-files');
  }
  public getAnalysisFilesOne(id: string) : Observable<text> {
    return this.getOne('analysis-files', id);
  }


  private getAll(reportType: string) : Observable<text> {
    let url: string = this._baseUrl + "/" + reportType;
    console.log(url);
    return this.http.get(url);
  }

  private getOne(reportType: string, id: string) : Observable<text> {
    let url: string = this._baseUrl + "/" + reportType + "/" + id;
    console.log(url);
    return this.http.get(url);

  }
}
