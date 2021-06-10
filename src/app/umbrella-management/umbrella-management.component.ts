import { Component, OnInit } from "@angular/core";
import { UtilService } from "../util/Util-services";
import { XmlService } from "../util/xml.service";
import { WebinRestService } from "../webin-rest.service";

import { getMatIconNoHttpProviderError, MatTableDataSource, MAT_DATE_LOCALE } from "@angular/material";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import * as _moment from "moment";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { PopupMessageComponent } from "../popup-message/popup-message.component";
import { MatDialog } from "@angular/material/dialog";
import { environment } from "../../environments/environment";
import { WebinAuthenticationService } from "../webin-authentication.service";
import { SubmissionResultDialogComponent } from "../submission-result-dialog/submission-result-dialog.component";
import { ReportType } from "../report-type.enum";
import { WebinReportService } from "../webin-report.service";
import { ExecOptionsWithStringEncoding } from "child_process";

const moment = _moment;
export const CUSTOM_FORMATS = {
  parse: {
    dateInput: "LL",
  },
  display: {
    dateInput: "DD-MM-YYYY",
    monthYearLabel: "YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "YYYY",
  },
};

@Component({
  selector: "app-umbrella-management",
  templateUrl: "./umbrella-management.component.html",
  styleUrls: ["./umbrella-management.component.css"],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },

    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_FORMATS },
  ],
})
export class UmbrellaManagementComponent implements OnInit {

  ReportType = ReportType;
  /*Page fields*/
  releaseDate: any;
  studyName: string;
  studyTitle: string;
  description: string;
  provideGenomeAnnotation: boolean;
  releaseStatus: string;
  xmlString: string;
  tag: string;
  tagValue: string;
  editMode: string;

  pubMedArray: [];
  attributeArray = [];
  selectedPubMedArray = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["id", "title", "remove"];
  attributeDataSource: MatTableDataSource<any>;
  attributeDisplayColumn: string[] = ["tag", "tagValue", "remove"];
  showPubMedSearch = false;
  showDuplicatePubMedErr = false;
  showAttributeAdd = false;
  isProductionEnv = environment.production;

  pubMedSearch = "";
  today = new Date();
  maxDate: any;
  id: any;
  action: string;
  showLoadingFlag = false;

  parentSearch: string;
  childSearch: string;
  selectedParentProject: string;
  projectData: any;
  parentProjectDatasource = new MatTableDataSource<any>();
  parentProjectDisplayColumn: string[] = ["projectId", "remove"];
  parentNotExist = false;
  showSearchParentFlag = false;

  childProjectDatasource = new MatTableDataSource<any>();
  childProjectDisplayColumn: string[] = ["projectId", "remove"];
  childNotExist = false;
  showSearchChildFlag = false;
  parentErrorMessage: string;
  childErrorMessage: string;
  removedParentProject: string;
  removedChildProject = [];

  constructor(
    public dialog: MatDialog,
    private util: UtilService,
    private xmlUtil: XmlService,
    private activatedRoute: ActivatedRoute,
    private _webinRestService: WebinRestService,
    private _webinAuthenticationService: WebinAuthenticationService,
    private _webinReportService: WebinReportService,
    private router: Router
  ) {
    var date = new Date();
    this.maxDate = new Date(
      date.getFullYear() + 2,
      date.getMonth(),
      date.getDate()
    );
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id) {
      this.action = "Edit";
      this.initEdit(this.id);
    }
  }

  getPubMed(searchVal) {
    this.showLoading();
    this.util.getPubMed(searchVal).subscribe((data: any) => {
      this.pubMedArray = data.resultList.result;
      this.hideLoading();
    });
  }

  showExistingPubMed(id) {
    this.util.getPubMedById(id).subscribe((data: any) => {
      if (data.resultList.result.length > 0) {
        this.selectedPubMedArray.push(data.resultList.result[0]);
        this.dataSource = new MatTableDataSource<any>(this.selectedPubMedArray);
      } else {
        console.log("Invalid PubMed Id :'" + id + "' is ignored.");
      }
    });
  }

  getPubMedDisplayText(option) {
    if (option) {
      return option.id + " [ " + option.title + " ]";
    }
  }

  getProjectDisplayText(option) {
    if (option) {
      return option.accession + " [ " + option.title + " ]";
    }
  }

  selectedPubMed(event) {
    var index = this.selectedPubMedArray
      .map(function (item) {
        return item.id;
      })
      .indexOf(event.option.value.id);
    if (index === -1) {
      this.selectedPubMedArray.push(event.option.value);
      this.dataSource = new MatTableDataSource<any>(this.selectedPubMedArray);
      this.pubMedSearch = "";
      this.showPubMedSearch = false;
      this.showDuplicatePubMedErr = false;
    } else {
      this.showDuplicatePubMedErr = true;
    }
  }

  addPubMed() {
    this.showPubMedSearch = true;
  }

  showAttributeAddPanel() {
    this.showAttributeAdd = true;
  }

  removePubMed(pubMedObj) {
    var index = this.selectedPubMedArray
      .map(function (item) {
        return item.id;
      })
      .indexOf(pubMedObj.id);
    this.selectedPubMedArray.splice(index, 1);
    this.dataSource = new MatTableDataSource<any>(this.selectedPubMedArray);
  }

  submitUmbrellaProject(form) {
    var observable: Observable<string>;
    let redirectPath = ""
    let umbrellaType = true;
    if (this.action != "Edit") {
      observable = this.xmlUtil.generateStudyXml(
        form.value,
        this.selectedPubMedArray,
        this.attributeArray,
        null, // Locus tag is not applicable for umbrella project.
        umbrellaType
      );

    } else {
      observable = this.xmlUtil.updateProjectXml(
        this.xmlString,
        form.value,
        this.selectedPubMedArray,
        this.attributeArray,
        null // // Locus tag is not applicable for umbrella project.
      );
      redirectPath = null;
    }

    // Submit project and create project link
    this.util.showSubmissionResponseForUmbrellaProject(
      this,
      SubmissionResultDialogComponent,
      observable,
      this.getProjectLinkJsonForUpdate(),
      this.getProjectLinkJsonForDeletion(),
      redirectPath
    );
  }

  getProjectLinkJsonForUpdate() {
    let projectLinkObj = {};
    let parentId = "";
    let childIds = [];
    if (this.parentProjectDatasource.data[0]) {
      parentId = this.parentProjectDatasource.data[0].id;
    }

    if (this.childProjectDatasource.data.length > 0) {
      childIds = this.childProjectDatasource.data.map(x => x.id);
    }
    // Project id will be added to this object after project is created.
    projectLinkObj["parentId"] = parentId;
    projectLinkObj["childIds"] = childIds;
    return projectLinkObj;
  }

  getProjectLinkJsonForDeletion() {
    let projectLinkObj = {};
    let parentId = "";
    let childIds = [];

    // Set projectId and childIds for removal only in Edit mode.
    if (this.action === "Edit") {
      parentId = this.removedParentProject || "";
      childIds = this.removedChildProject || [];
    }
    projectLinkObj["parentId"] = parentId;
    projectLinkObj["childIds"] = childIds;
    return projectLinkObj;
  }

  initEdit(id) {
    this.showLoading();
    this.util.getProjectDetails(id).subscribe((data: any) => {
      this.setPageValuesfromReport(data[0].report);
    });

    this.util.getProjectXml(id).subscribe((xmlString: any) => {
      this.xmlString = xmlString;
      this.setPageValuesfromXml();
    });

    // Code to get project link
    const observable: Observable<any> = this._webinRestService.getProjectLink(id) as Observable<any>;
    if (observable) {
      this.showLoading();
      observable.pipe(
        retry(3)
      ).subscribe(
        data => {
          console.log('** Webin reports service **', data);
          let jsonData = JSON.parse(data.body);
          if (jsonData["parentId"]) {
            // Create an array of projectLink object acepted by MatTableDatasource.
            let parentArray = [this.getProjectLinkObj(jsonData["parentId"])]
            this.parentProjectDatasource = new MatTableDataSource<any>(parentArray);
          }
          if (jsonData["childIds"]) {
            // Create an array of projectLink object acepted by MatTableDatasource.
            let childArray = jsonData["childIds"].map(item => this.getProjectLinkObj(item));
            this.childProjectDatasource = new MatTableDataSource<any>(childArray);
          }
          this.hideLoading();
        },
        (err: HttpErrorResponse) => {
          this.hideLoading();
          console.log('** Webin reports service failed **', err);
          const msg = 'Webin reports service failed. Please try again later. If the problem persists please contact the helpdesk.';

          if (err.status === 401 || err.status === 403) {
            this.router.navigate(['/login']);
          }
        },
      );
    }
  }

  setPageValuesfromReport(data) {
    if (data["holdDate"]) {
      this.releaseDate = new Date(data["holdDate"]);
    }
    this.releaseStatus = data["releaseStatus"];
  }

  setPageValuesfromXml() {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(this.xmlString, "text/xml");
    var nameTag = xmlDoc.getElementsByTagName("NAME")[0];
    var titleTag = xmlDoc.getElementsByTagName("TITLE")[0];
    var descriptionTag = xmlDoc.getElementsByTagName("DESCRIPTION")[0];
    if (nameTag) {
      this.studyName = nameTag.hasChildNodes()
        ? nameTag.childNodes[0].nodeValue
        : "";
    }
    if (titleTag) {
      this.studyTitle = titleTag.hasChildNodes()
        ? titleTag.childNodes[0].nodeValue
        : "";
    }
    if (descriptionTag) {
      this.description = descriptionTag.hasChildNodes()
        ? descriptionTag.childNodes[0].nodeValue
        : "";
    }

    this.setPubMedDetails(xmlDoc);
    this.setAttributeDetails(xmlDoc);
  }

  setPubMedDetails(xmlDoc) {
    var projectLinks = xmlDoc.getElementsByTagName("PROJECT_LINKS")[0];
    if (projectLinks) {
      var xRefLink = projectLinks.getElementsByTagName("XREF_LINK");
      length = xRefLink.length;
      for (var i = 0; i < length; i++) {
        var dbTagValue = xRefLink[i].getElementsByTagName("DB")[0].childNodes[0]
          .nodeValue;
        if (dbTagValue === "PUBMED") {
          var pupMedId = xRefLink[i].getElementsByTagName("ID")[0].childNodes[0]
            .nodeValue;
          this.showExistingPubMed(pupMedId);
        }
      }
    }
  }

  setAttributeDetails(xmlDoc) {
    var projectAttributes = xmlDoc.getElementsByTagName("PROJECT_ATTRIBUTE");
    var projAttrLen = projectAttributes.length;
    for (var i = 0; i < projAttrLen; i++) {
      var tag = projectAttributes[i].getElementsByTagName("TAG")[0]
        .childNodes[0].nodeValue;
      var tagValue = projectAttributes[i].getElementsByTagName("VALUE")[0]
        .childNodes[0].nodeValue;
      this.attributeArray.push({
        id: this.util.getId(),
        tag: tag,
        tagValue: tagValue,
      });
    }
    if (this.attributeArray.length > 0) {
      this.attributeDataSource = new MatTableDataSource<any>(
        this.attributeArray
      );
    }
  }


  addAttribute() {
    this.attributeArray.push({
      id: this.util.getId(),
      tag: this.tag,
      tagValue: this.tagValue,
    });
    this.attributeDataSource = new MatTableDataSource<any>(this.attributeArray);
    this.tag = "";
    this.tagValue = "";
    this.showAttributeAdd = false;
  }

  removeAttribute(attr) {
    var index = this.attributeArray
      .map(function (item) {
        return item.id;
      })
      .indexOf(attr.id);
    this.attributeArray.splice(index, 1);
    this.attributeDataSource = new MatTableDataSource<any>(this.attributeArray);
  }

  showLoading() {
    this.showLoadingFlag = true;
  }

  hideLoading() {
    this.showLoadingFlag = false;
  }

  getSelectedParentProject(event) {

    this.parentProjectDatasource.data.push(event.option.value.projectId);
    this.hideLoading();

  }

  getSelectedChildProject(event) {

    this.childProjectDatasource.data.push(event.option.value.projectId);
    this.hideLoading();

  }

  getProjectId(searchVal, flag) {

    this.showLoading();

    const observable: Observable<any> = this._webinReportService.getProjects(searchVal, "10", "json") as Observable<any>;
    if (observable) {
      observable.pipe(
        retry(3)
      ).subscribe(
        data => {
          console.log('** Webin reports service **', data);
          if (data[0]) {
            // Valid data handling
            this.projectData = data[0].report;
            if (flag === 'PARENT') {
              this.parentProjectDatasource.data.push(data[0].report);
              this.showSearchParentFlag = false;
            } else {
              this.childProjectDatasource.data.push(data[0].report);
              this.childProjectDatasource = new MatTableDataSource<any>(this.childProjectDatasource.data);
              this.showSearchChildFlag = false;
            }
          } else {
            var msg = "Searched project accession " + searchVal + " does not exist. "
            flag === 'PARENT' ? this.parentNotExist = true : this.childNotExist = true;

          }
          this.hideLoading();
        },
        (err: HttpErrorResponse) => {
          console.log('** Webin reports service failed **', err);
          const msg = 'Webin reports service failed. Please try again later. If the problem persists please contact the helpdesk.';

          if (err.status === 401 || err.status === 403) {
            this.router.navigate(['/login']);
          }
        },
        () => {
          //this.active = false;
        }
      );
    }
  }

  addParentProjectId(searchVal) {

    if (this.isValidParentProject(searchVal)) {
      this.parentProjectDatasource.data.push(this.getProjectLinkObj(searchVal));
    }
  }

  addChildProjectId(searchVal) {

    if (this.isValidChildProject(searchVal)) {
      this.childProjectDatasource.data.push(this.getProjectLinkObj(searchVal));
      this.childProjectDatasource = new MatTableDataSource<any>(this.childProjectDatasource.data);
    }
    this.showSearchChildFlag = false;
  }

  getProjectLinkObj(searchVal) {
    return { "id": searchVal }
  }

  isValidParentProject(searchVal) {
    let isValidProject = this.checkIfProjectIsAlreadyAdded(searchVal, this.childProjectDatasource.data);
    if (!isValidProject) {
      this.parentErrorMessage = "Project accession " + searchVal + " is already configured as child project."
      return false;
    }
    return true;
  }

  isValidChildProject(searchVal) {

    let isValidProject = this.checkIfProjectIsAlreadyAdded(searchVal, this.childProjectDatasource.data);
    if (!isValidProject) {
      this.childErrorMessage = "Project accession " + searchVal + " is already configured as child project."
      return false;
    }

    isValidProject = this.checkIfProjectIsAlreadyAdded(searchVal, this.parentProjectDatasource.data);
    if (!isValidProject) {
      this.childErrorMessage = "Project accession " + searchVal + " is already configured as parent project."
      return false;
    }
    return true;
  }

  checkIfProjectIsAlreadyAdded(searchVal, projectArr) {
    // Check if the project is added in the given project array.
    var index = projectArr
      .map(function (item) {
        return item.id;
      })
      .indexOf(searchVal);
    if (index != -1) {
      return false;
    }
    return true;
  }

  showSearchChild() {
    this.childSearch = "";
    this.showSearchChildFlag = true;
    this.hideError();
  }

  showSearchParent() {
    this.parentSearch = "";
    this.showSearchParentFlag = true;
    this.hideError();
  }

  hideError() {
    this.parentErrorMessage = "";
    this.childErrorMessage = "";
  }

  deleteParentProject(parentProjectObj) {

    this.removedParentProject = parentProjectObj.id;
    this.parentProjectDatasource.data.pop;
    this.parentProjectDatasource = new MatTableDataSource<any>();
  }

  deleteChildProject(childProjectObj) {

    this.removedChildProject.push(childProjectObj.id);
    var index = this.childProjectDatasource.data
      .map(function (item) {
        return item.id;
      })
      .indexOf(childProjectObj.id);
    this.childProjectDatasource.data.splice(index, 1);
    this.childProjectDatasource = new MatTableDataSource<any>(this.childProjectDatasource.data);
  }

  displayReleaseDate() {
    // Show release_date if the action is not edit
    if (!this.isEga() && this.action != 'Edit') {
      return true;
    }

    // While umbrella edit show release_ate field only if the study status is PRIVATE or TEMPORARY_SUPPRESSED
    if (!this.isEga() && this.action === 'Edit' &&
      (this.releaseStatus === 'PRIVATE' || this.releaseStatus === 'TEMPORARY_SUPPRESSED')) {
      return true;
    }
    return false;
  }

  isEga(): boolean {
    return this._webinAuthenticationService.ega;
  }

  isBroker(): boolean {
    return this._webinAuthenticationService.isBroker();
  }
}
