import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class WebinReportService {

  private _baseUrl = environment.webinReportServiceUrl;

  constructor(private http: HttpClient) { }

  getStudiesAll(status: string, rows: string): Observable<any> {
    return this.getAll('studies', status, rows);
  }
  getStudies(id: string, rows: string): Observable<any> {
    return this.get('studies', id, rows);
  }

  getSamplesAll(status: string, rows: string): Observable<any> {
    return this.getAll('samples', status, rows);
  }
  getSamples(id: string, rows: string): Observable<any> {
    return this.get('samples', id, rows);
  }

  getRunsAll(status: string, rows: string): Observable<any> {
    return this.getAll('runs', status, rows);
  }
  getRuns(id: string, rows: string): Observable<any> {
    return this.get('runs', id, rows);
  }

  getAnalysesAll(status: string, analysisType: string, rows: string): Observable<any> {
    var params = {};
    if (status) {
      params["status"] = status;
    }
    if (analysisType) {
      params["analysis-type"] = analysisType;
    }
    return this.getAllParams('analyses', params, rows);
  }
  getAnalyses(id: string, rows: string): Observable<any> {
    return this.get('analyses', id, rows);
  }

  getRunFilesAll(archiveStatus: string, rows: string): Observable<any> {
    var params = {};
    if (archiveStatus) {
      params["archive-status"] = archiveStatus;
    }
    return this.getAllParams('run-files', params, rows);
  }
  getRunFiles(id: string, rows: string): Observable<any> {
    return this.get('run-files', id, rows);
  }

  getAnalysisFilesAll(analysisType: string, archiveStatus: string, rows: string): Observable<any> {
    var params = {};
    if (analysisType) {
      params["analysis-type"] = analysisType;
    }
    if (archiveStatus) {
      params["archive-status"] = archiveStatus;
    }
    return this.getAllParams('analysis-files', params, rows);
  }
  getAnalysisFiles(id: string, rows: string): Observable<any> {
    return this.get('analysis-files', id, rows);
  }

  getRunProcessAll(processStatus: string, rows: string): Observable<any> {
    var params = {};
    if (processStatus) {
      params["process-status"] = processStatus;
    }
    return this.getAllParams('run-process', params, rows);
  }

  getRunProcess(id: string, rows: string): Observable<any> {
    return this.get('run-process', id, rows);
  }

  getAnalysisProcessAll(analysisType: string, processStatus: string, rows: string): Observable<any> {
    var params = {};
    if (analysisType) {
      params["analysis-type"] = analysisType;
    }
    if (processStatus) {
      params["process-status"] = processStatus;
    }
    return this.getAllParams('analysis-process', params, rows);
  }

  getAnalysisProcess(id: string, rows: string): Observable<any> {
    return this.get('analysis-process', id, rows);
  }

  getDacsAll(status: string, rows: string): Observable<any> {
    return this.getAll('dacs', status, rows);
  }
  getDacs(id: string, rows: string): Observable<any> {
    return this.get('dacs', id, rows);
  }

  getPoliciesAll(status: string, rows: string): Observable<any> {
    return this.getAll('policies', status, rows);
  }
  getPolicies(id: string, rows: string): Observable<any> {
    return this.get('policies', id, rows);
  }

  getDatasetsAll(status: string, rows: string): Observable<any> {
    return this.getAll('datasets', status, rows);
  }
  getDatasets(id: string, rows: string): Observable<any> {
    return this.get('datasets', id, rows);
  }




  private getAll(reportType: string, status: string, rows: string): Observable<any> {
    var params = {};
    if (status) {
      params["status"] = status;
    }
    params["max-results"] = rows;
    const url: string = this._baseUrl + '/' + reportType + '?' + this.getUrlParams(params);
    console.log(url);
    return this.http.get(url);
  }

  private getAllParams(reportType: string, params, rows: string): Observable<any> {
    params["max-results"] = rows;
    const url: string = this._baseUrl + '/' + reportType + '?' + this.getUrlParams(params);
    console.log(url);
    return this.http.get(url);
  }

  private getUrlParams(params) {
    let ret = [];
    for (let d in params)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(params[d]));
    return ret.join('&');
  }


  private get(reportType: string, id: string, rows: string): Observable<any> {
    const url: string = this._baseUrl + '/' + reportType + '/' + encodeURIComponent(id.trim()) + '?max-results=' + rows;
    console.log(url);
    return this.http.get(url);
  }
}
