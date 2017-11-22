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

  public getAnalysisAll() : Observable<text> {
    return this.getAll('analyses');
  }

  public getAnalysisOne(id: string) : Observable<text> {
    return this.getOne('analyses', id);
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
