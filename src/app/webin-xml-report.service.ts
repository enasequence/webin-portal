import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class WebinXmlReportService {

  private _baseUrl = environment.webinXmlReportServiceUrl;

  constructor(private http: HttpClient) { }

  public getStudyXml(id: string) : Observable<any> {
    return this.getXml('studies', id);
  }
  public getProjectXml(id: string) : Observable<any> {
    return this.getXml('projects', id);
  }
  public getSampleXml(id: string) : Observable<any> {
    return this.getXml('samples', id);
  }
  public getRunXml(id: string) : Observable<any> {
    return this.getXml('runs', id);
  }
  public getExperimentXml(id: string) : Observable<any> {
    return this.getXml('experiments', id);
  }
  public getAnalysisXml(id: string) : Observable<any> {
    return this.getXml('analysess', id);
  }
  public getDacXml(id: string) : Observable<any> {
    return this.getXml('dacs', id);
  }
  public getPolicyXml(id: string) : Observable<any> {
    return this.getXml('policies', id);
  }
  public getDatasetXml(id: string) : Observable<any> {
    return this.getXml('datasets', id);
  }

  private getXml(xmlType: string, id: string) : Observable<any> {
    let url: string = this._baseUrl + "/" + xmlType + "/" + id + "?format=xml";
    console.log(url);
    return this.http.get(url, {responseType: 'text' });
  }
}
