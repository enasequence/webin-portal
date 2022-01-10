import { Component, OnInit } from "@angular/core";
import { UtilService } from "../util/Util-services";
import { XmlService } from "../util/xml.service";
import { WebinRestService } from "../webin-rest.service";

import { MatTableDataSource, MAT_DATE_LOCALE } from "@angular/material";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import * as _moment from "moment";
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { PopupMessageComponent } from "../popup-message/popup-message.component";
import { MatDialog } from "@angular/material/dialog";
import { environment } from "../../environments/environment";
import { WebinAuthenticationService } from "../webin-authentication.service";
import { SubmissionResultDialogComponent } from "../submission-result-dialog/submission-result-dialog.component";

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
  selector: "app-study-management",
  templateUrl: "./study-management.component.html",
  styleUrls: ["./study-management.component.css"],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },

    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_FORMATS },
  ],
})
export class StudyManagementComponent implements OnInit {
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
  locustag: string;
  editMode: string;

  pubMedArray: [];
  attributeArray = [];
  locusTagArray = [];
  selectedPubMedArray = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["id", "title", "remove"];
  attributeDataSource: MatTableDataSource<any>;
  attributeDisplayColumn: string[] = ["tag", "tagValue", "remove"];
  locusTagDataSource: MatTableDataSource<any>;
  locusTagDisplayColumn: string[] = ["locusTag", "remove"];
  showPubMedSearch = false;
  showDuplicatePubMedErr = false;
  showAttributeAdd = false;
  showLocusTagAdd = false;
  isProductionEnv = environment.production;
  submitEnabled = true;

  pubMedSearch = "";
  today = new Date();
  maxDate: any;
  id: any;
  action: string;
  showLoadingFlag = false;

  constructor(
    public dialog: MatDialog,
    private util: UtilService,
    private xmlUtil: XmlService,
    private activatedRoute: ActivatedRoute,
    private _webinRestService: WebinRestService,
    private _webinAuthenticationService: WebinAuthenticationService
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

  showLocusTagAddPanel() {
    this.showLocusTagAdd = true;
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

  submitStudy(form) {
    this.submitEnabled = false;
    var observable: Observable<string>;
    let redirectPath = ""
    if (this.action != "Edit") {
      observable = this.xmlUtil.generateStudyXml(
        form.value,
        this.selectedPubMedArray,
        this.attributeArray,
        this.locusTagArray
      );

    } else {
      observable = this.xmlUtil.updateProjectXml(
        this.xmlString,
        form.value,
        this.selectedPubMedArray,
        this.attributeArray,
        this.locusTagArray
      );
      redirectPath = null;
    }

    this.util.showSubmissionResponse(
      this,
      SubmissionResultDialogComponent,
      observable,
      redirectPath
    );
  }

  initEdit(id) {
    this.showLoading();
    this.util.getProjectDetails(id).subscribe((data: any) => {
      this.setPageValuesfromReport(data[0].report);
    });

    this.util.getProjectXml(id).subscribe((xmlString: any) => {
      this.xmlString = xmlString;
      this.setPageValuesfromXml();
      this.hideLoading();
    });
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
    this.setLocusTagDetails(xmlDoc);
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

  setLocusTagDetails(xmlDoc) {
    var locusTagPrefix = xmlDoc.getElementsByTagName("LOCUS_TAG_PREFIX");
    var locusTagPrefixLen = locusTagPrefix.length;
    for (var i = 0; i < locusTagPrefixLen; i++) {
      var locusTag = locusTagPrefix[i].childNodes[0].nodeValue;
      this.locusTagArray.push({ id: this.util.getId(), locusTag: locusTag });
    }
    if (this.locusTagArray.length > 0) {
      this.provideGenomeAnnotation = true;
      this.locusTagDataSource = new MatTableDataSource<any>(this.locusTagArray);
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

  addlocusTag() {
    this.locusTagArray.push({ id: this.util.getId, locusTag: this.locustag });
    this.locusTagDataSource = new MatTableDataSource<any>(this.locusTagArray);
    this.locustag = "";
    this.showLocusTagAdd = false;
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

  removeLocusTag(element) {
    var index = this.attributeArray
      .map(function (item) {
        return item.id;
      })
      .indexOf(element.id);
    this.locusTagArray.splice(index, 1);
    this.locusTagDataSource = new MatTableDataSource<any>(this.locusTagArray);
  }

  showLoading() {
    this.showLoadingFlag = true;
  }

  hideLoading() {
    this.showLoadingFlag = false;
  }
  setGenomeAnotation(event) {
    if (!event.target.checked) {
      this.locusTagArray = [];
      this.locusTagDataSource = new MatTableDataSource<any>(this.locusTagArray);
    }
  }

  displayReleaseDate() {
    // Show release_date if the action is not edit
    if (!this.isEga() && this.action != 'Edit') {
      return true;
    }

    // While study edit show release_ate field only if the study status is PRIVATE or TEMPORARY_SUPPRESSED
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
