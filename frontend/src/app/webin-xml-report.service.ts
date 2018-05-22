import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class WebinXmlReportService {

  private _baseUrl = environment.webinXmlReportServiceUrl;

  constructor(private http: HttpClient) { }

  getStudyXml(id: string): Observable<any> {
    return this.getXml('studies', id);
  }
  getProjectXml(id: string): Observable<any> {
    return this.getXml('projects', id);
  }
  getSampleXml(id: string): Observable<any> {
    return this.getXml('samples', id);
  }
  getRunXml(id: string): Observable<any> {
    return this.getXml('runs', id);
  }
  getExperimentXml(id: string): Observable<any> {
    return this.getXml('experiments', id);
  }
  getAnalysisXml(id: string): Observable<any> {
    return this.getXml('analyses', id);
  }
  getDacXml(id: string): Observable<any> {
    return this.getXml('dacs', id);
  }
  getPolicyXml(id: string): Observable<any> {
    return this.getXml('policies', id);
  }
  getDatasetXml(id: string): Observable<any> {
    return this.getXml('datasets', id);
  }

  private getXml(xmlType: string, id: string): Observable<any> {
    const url: string = this._baseUrl + '/' + xmlType + '/' + id + '?format=xml';
    console.log(url);
    return this.http.get(url, {responseType: 'text' });
  }
}
