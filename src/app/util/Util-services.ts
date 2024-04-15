import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, startWith, map, debounceTime, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor(private httpClient: HttpClient,
  ) { }

  getCountries(prefix) {
    var url = environment.webinAdminServiceUrl + "/country" + "?partialCountry=" + prefix;
    return this.httpClient.get<string[]>(url, { responseType: 'json' });
  }

  saveSubmissionAccount(payload, editMode) {
    if (editMode) {
      return this.httpClient.put(environment.webinAdminServiceUrl + '/' + 'submission-account', payload);
    } else {
      return this.httpClient.post(environment.webinAdminServiceUrl + '/' + 'submission-account', payload);
    }
  }

  getAccountDetails() {
    return this.httpClient.get(environment.webinAdminServiceUrl + '/' + 'submission-account');
  }

  deleteContact(contact) {
    return this.httpClient.delete(environment.webinAdminServiceUrl + '/' + 'submission-contact/' + contact["emailAddress"]);
  }

  saveNewContact(contact) {
    return this.httpClient.post(environment.webinAdminServiceUrl + '/' + 'submission-contact', contact);
  }

  sendResetPasswordRequest(resetPassReq) {
    return this.httpClient.post(environment.webinAdminServiceUrl + '/' + 'request-password-change', resetPassReq);
  }

  resetPassword(resetPassReq, token) {
    return this.httpClient.put(environment.webinAdminServiceUrl + '/' + 'change-password?token=' + token, resetPassReq);
  }

  getPubMed(prefix) {
    var url = environment.pupMedUrl + "?query=" + prefix + "&resultType=lite&cursorMark=*&format=json";
    return this.httpClient.get(url);
  }

  getPubMedById(id) {
    var url = environment.pupMedUrl + "?query=ext_id:" + id + "&resultType=lite&cursorMark=*&format=json";
    return this.httpClient.get(url);
  }

  getProjectDetails(projectId) {
    var url = environment.webinReportServiceUrl + "/projects/" + projectId;
    return this.httpClient.get(url);
  }

  getProjectXml(projectId) {
    var url = environment.webinReportServiceUrl + "/projects/xml/" + projectId;
    return this.httpClient.get(url, { responseType: 'text' })
  }

  getDacXml(dacId) {
    var url = environment.webinReportServiceUrl + "/dacs/xml/" + dacId;
    return this.httpClient.get(url, { responseType: 'text' })
  }

  getDacPolicyXml(policyId) {
    var url = environment.webinReportServiceUrl + "/policies/xml/" + policyId;
    return this.httpClient.get(url, { responseType: 'text' })
  }

  getDacDatasetXml(datasetId) {
    var url = environment.webinReportServiceUrl + "/datasets/xml/" + datasetId;
    return this.httpClient.get(url, { responseType: 'text' })
  }

  downloadExcelTemplate(checklistJson) {
    return this.httpClient.post(environment.webinRestUrl + '/tab/spreadsheet', checklistJson, { responseType: 'arraybuffer' });
  }

  downloadTsvTemplate(checklistJson) {
    return this.httpClient.post(environment.webinRestUrl + '/tab/tsv', checklistJson, { responseType: 'arraybuffer' });
  }

  getFileName(checklist, extension) {
    return checklist.checklistType + "_" + checklist.checklistFieldName.replace(" ", "-") + "_" + new Date().getTime() + extension;
  }

  getFileNameByTemplate(template, extension) {
    return template.replace(/\s/g, "-") + "_template_" + new Date().getTime() + extension;
  }

  getId() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  showSubmissionResponse(component, popupComponent, observable, redirectPath?: string) {
    component.dialog.open(popupComponent, {
      disableClose: true,
      width: '600px',
      data: { "observable": observable, "redirectPath": redirectPath }

    });
  }

  showSubmissionResponseForUmbrellaProject(component, popupComponent, observable, projectLinkJsonForUpdate, projectLinkJsonForDelete, redirectPath?: string) {
    component.dialog.open(popupComponent, {
      disableClose: true,
      width: '600px',
      data: { "observable": observable, "redirectPath": redirectPath, "projectLinkJsonForUpdate": projectLinkJsonForUpdate, "projectLinkJsonForDelete": projectLinkJsonForDelete }

    });
  }

  showHttpError(component, popupComponent, err, title) {
    console.error('** Webin submission service failed **', err);
    const message = 'Webin submission service failed. Please try again later. If the problem persists please contact the helpdesk.';
    component.dialog.open(popupComponent, {
      width: '600px',
      data: this.getMessage(true, title, message)
    });
  }

  showError(component, popupComponent, message, title) {
    component.dialog.open(popupComponent, {
      width: '600px',
      data: this.getMessage(true, title, message)
    });
  }

  showSuccess(component, popupComponent, message, title, redirectPath?: string) {
    component.dialog.open(popupComponent, {
      disableClose: true,
      width: '600px',
      data: this.getMessage(false, title, message, redirectPath)
    });
  }

  getMessage(isError, title, message, redirectPath?: string) {
    return { "isError": isError, "title": title, "message": message, "redirectPath": redirectPath }
  }

  getServerMessage() {
    var url = environment.webinRestUrl + "/cli/comment";
    return this.httpClient.get(url, {
      responseType: 'text'
    })
  }




}
