import { Component, OnInit } from "@angular/core";
import {
  MatStepper,
  MatTableDataSource,
  MatDialog,
  MatExpansionPanel,
} from "@angular/material";
import { WebinRestService } from "../webin-rest.service";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { PopupMessageComponent } from "../popup-message/popup-message.component";
import { TaxonomyDialogModalComponent } from "../taxonomy-dialog-modal/taxonomy-dialog-modal.component";
import { utils } from "protractor";
import { UtilService } from "../util/Util-services";
import { WebinAuthenticationService } from "../webin-authentication.service";
import { TagContentType, ThrowStmt } from "@angular/compiler";
import { CustomValidationService } from "../validation/custom-validation.service";
import { environment } from "../../environments/environment";
import { SubmissionResultDialogComponent } from "../submission-result-dialog/submission-result-dialog.component";
import { NonSubmissionResultDialogComponent } from "../non-submission-result-dialog/non-submission-result-dialog.component";
import { getTreeMissingMatchingNodeDefError } from "@angular/cdk/tree";

@Component({
  selector: "app-taxonomy-management",
  templateUrl: "./taxonomy-management.component.html",
  styleUrls: ["./taxonomy-management.component.css"],
})
export class TaxonomyManagementComponent implements OnInit {
  showLoadingFlag = false;
  panelOpenState: boolean = false;
  validSpreadsheetArray = [];
  invalidSpreadsheetArray = [];
  validFormArray = [];
  invalidFormArray = [];
  fromProposedNameArr = [];
  spreadsheetProposedNameArr = [];
  panelOpenedByConfirmation = false;
  validSpreadsheetDataSource: MatTableDataSource<any>;
  invalidSpreadsheetDataSource: MatTableDataSource<any>;
  validFormDataSource: MatTableDataSource<any>;
  invalidFormDataSource: MatTableDataSource<any>;
  nameSubmissionFlag: boolean;
  submissionAccount: {};
  stepper: MatStepper;
  displayedColumnsForValidTaxonomy: string[] = [
    "proposedName",
    "nameType",
    "host",
    "projectId",
    "description",
    "edit",
    "remove",
  ];
  displayedColumnsForInvalidTaxonomy: string[] = [
    "proposedName",
    "nameType",
    "host",
    "projectId",
    "description",
    "message",
  ];

  constructor(
    private _webinRestService: WebinRestService,
    private _webinAuthService: WebinAuthenticationService,
    public dialog: MatDialog,
    private util: UtilService
  ) { }

  ngOnInit() { }

  uploadFile(form, stepper: MatStepper) {
    this.showLoading();
    this.stepper = stepper;
    const observable: Observable<string> = this._webinRestService.uploadTaxonTemplate(
      form.spreadSheet
    );
    this.handleServerResponse(observable, true);
  }

  handleServerResponse(observable, isUploaded) {
    if (observable) {
      observable.pipe(retry(3)).subscribe(
        (data) => {
          if (data.indexOf("TaxonomyError") > -1) {
            data = data.replace("TaxonomyError:", "");
            this.showErrorPopup(data);
          } else {
            let result = JSON.parse(data);
            this.setDatasource(result, isUploaded);
            if (this.stepper) {
              this.stepper.next();
            }
          }
          this.hideLoading();
        },
        (err: HttpErrorResponse) => {
          this.util.showHttpError(
            this,
            NonSubmissionResultDialogComponent,
            err,
            'Taxonomy Registration'
          );
        }
      );
    }
  }

  setDatasource(result, isUploaded) {
    let validArr = isUploaded
      ? this.validSpreadsheetArray
      : this.validFormArray;
    let invalidArr = isUploaded
      ? this.invalidSpreadsheetArray
      : this.invalidFormArray;
    validArr = validArr.concat(
      result.taxonomyResp.filter((val) => val.registered == false)
    );
    invalidArr = invalidArr.concat(
      result.taxonomyResp.filter((val) => val.registered == true)
    );
    validArr.forEach((element) => {
      element["id"] = this.util.getId();
    });
    if (isUploaded) {
      this.validSpreadsheetArray = validArr;
      this.invalidSpreadsheetArray = invalidArr;
      this.validSpreadsheetDataSource = new MatTableDataSource<any>(validArr);
      this.invalidSpreadsheetDataSource = new MatTableDataSource<any>(
        invalidArr
      );
      this.spreadsheetProposedNameArr = this.spreadsheetProposedNameArr.concat(
        result.taxonomyResp.map((val) => val.proposedName)
      );
    } else {
      this.validFormArray = validArr;
      this.invalidFormArray = invalidArr;
      this.validFormDataSource = new MatTableDataSource<any>(validArr);
      this.invalidFormDataSource = new MatTableDataSource<any>(invalidArr);
      this.fromProposedNameArr = this.fromProposedNameArr.concat(
        result.taxonomyResp.map((val) => val.proposedName)
      );
    }
  }



  showErrorPopup(message) {
    const dialogRef = this.dialog.open(PopupMessageComponent, {
      width: "550px",
      backdropClass: "custom-dialog-backdrop-class",
      panelClass: "custom-dialog-panel-class",
      data: {
        action: "Error",
        message: message,
        title: "Taxonomy Registration Error",
      },
    });
  }

  openDialog(action, obj, source): void {
    let proposedNameArr =
      source === "Form"
        ? this.fromProposedNameArr
        : this.spreadsheetProposedNameArr;
    const dialogRef = this.dialog.open(TaxonomyDialogModalComponent, {
      width: "500px",
      backdropClass: "custom-dialog-backdrop-class",
      panelClass: "custom-dialog-panel-class",
      data: {
        action: action,
        source: source,
        taxonRefObj: obj,
        proposedNameArr: proposedNameArr,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      let source = result.source;
      if (result.event != "close") {
        let taxonRefObj = result.data;
        let tableArr =
          source === "Form" ? this.validFormArray : this.validSpreadsheetArray;

        if (result.event === "Update") {
          this.updateTaxa(tableArr, taxonRefObj);
        }

        if (result.event === "Add") {
          var taxonTSV = this.objectToTsv(taxonRefObj);
          const bytes = new TextEncoder().encode(taxonTSV);
          const blob = new Blob([bytes]);
          const observable: Observable<string> = this._webinRestService.uploadTaxonTemplate(
            blob
          );
          this.handleServerResponse(observable, false);
        }

        if (result.event === "Delete") {
          var index = tableArr
            .map(function (item) {
              return item.id;
            })
            .indexOf(taxonRefObj.id);
          tableArr.splice(index, 1);
        }

        if (typeof taxonRefObj != "undefined") {
          if (source === "Form") {
            this.validFormDataSource = new MatTableDataSource<any>(tableArr);
          } else {
            this.validSpreadsheetDataSource = new MatTableDataSource<any>(
              tableArr
            );
          }
        }
      }
    });
  }

  updateTaxa(validArr, taxonRefObj) {
    var index = validArr
      .map(function (item) {
        return item.id;
      })
      .indexOf(taxonRefObj.id);
    this.setParentValues(taxonRefObj, validArr[index]);
  }

  objectToTsv(taxon) {
    let tsvContent =
      "proposed_name\tname_type\thost\tproject_id\tdescription" + "\n";
    return (
      tsvContent +
      taxon["proposedName"] +
      "\t" +
      (taxon["nameType"] || "") +
      "\t" +
      (taxon["host"] || "") +
      "\t" +
      (taxon["projectId"] || "") +
      "\t" +
      taxon["description"]
    );
  }

  downloadTaxonTsvTemplate() {
    let selObj = { fields: this.taxonomyFields.fields, displayUnits: false };
    selObj["displayChecklistRow"] = "false";
    this.util.downloadTsvTemplate(selObj).subscribe(
      (data) => {
        let blob = new Blob([data], { type: "text/plain;charset=utf-8'" });
        saveAs(blob, this.util.getFileNameByTemplate("taxonomy", ".tsv"));
      },
      (error) => {
        console.log("Error", error);
      }
    );
  }

  submitTaxonomyRequest(source) {
    this.submissionAccount = JSON.parse(
      this._webinAuthService.getSubmissionAccount()
    );
    let mail = {};
    mail["from"] = this.submissionAccount["submissionContacts"]
      .filter((contact) => contact.mainContact)
      .map((contact) => contact.emailAddress)[0];
    mail["subject"] = "Taxonomy Consultation";
    mail["to"] = environment.taxonomySubmissionEmail;
    this.constructTaxonContentAndSendMail(
      function (taxonContent, thisObj) {
        mail["content"] = taxonContent;
        console.log(taxonContent);
        const observable: Observable<string> = thisObj._webinRestService.sendTaxonEmail(
          mail
        );
        let title = "Taxonomy Registration";
        let redirect = "/taxonomy"
        if (observable) {
          observable.pipe(retry(3)).subscribe(
            (data) => {
              if (data["to"] === mail["to"]) {
                thisObj.util.showSuccess(
                  thisObj,
                  NonSubmissionResultDialogComponent,
                  "Your request has been send to the ENA helpdesk.",
                  title,
                  redirect
                );
              } else {
                thisObj.util.showError(
                  thisObj,
                  NonSubmissionResultDialogComponent,
                  "Failed to sent email to curators. Contact system administrator for assistance.",
                  title
                );
              }
            },
            (err: HttpErrorResponse) => {
              thisObj.util.showHttpError(
                thisObj,
                NonSubmissionResultDialogComponent,
                err,
                title
              );
            }
          );
        }
      },
      this,
      source
    );
  }

  async constructTaxonContentAndSendMail(callback, thisComponent, source) {
    let contentStr = "";
    let count = 0;
    let tableArr =
      source === "Form" ? this.validFormArray : this.validSpreadsheetArray;
    for (const taxon of tableArr) {
      contentStr += "\n";
      contentStr += "Number " + ++count + "\n";
      contentStr += "Name type: " + taxon.nameType + "\n";
      contentStr += "Proposed name: " + taxon.proposedName + "\n";
      contentStr += "Host: " + taxon.host + "\n";
      contentStr += "Project / Study id: " + taxon.projectId + "\n";
      contentStr += "Short description: " + taxon.description + "\n";
      contentStr += "\n";
    }

    contentStr += "Dear ENA" + "\n\n";
    contentStr += "Please examine above " + count + " organisms. " + "\n";
    contentStr += "Below are my contact details: " + "\n\n";
    contentStr += "Webin account id: " + this.submissionAccount["id"] + "\n";
    contentStr +=
      "Names: " +
      this.submissionAccount["submissionContacts"].map((contact) =>
        this.getContactName(contact)
      ) +
      "\n";
    contentStr +=
      "Emails: " +
      this.submissionAccount["submissionContacts"].map(
        (contact) => contact.emailAddress
      ) +
      "\n\n";
    contentStr += "Thank you and regards";
    callback(contentStr, thisComponent);
  }

  getContactName(contact) {
    if (contact.consortium) {
      return contact.consortium;
    } else {
      return contact.firstName + " " + (contact.surname || "");
    }
  }

  showLoading() {
    this.showLoadingFlag = true;
  }

  hideLoading() {
    this.showLoadingFlag = false;
  }

  setParentValues(from, to) {
    to.proposedName = from.proposedName;
    to.nameType = from.nameType;
    to.host = from.host;
    to.projectId = from.projectId;
    to.description = from.description;
  }

  taxonomySubmissionCheck(source): Boolean {
    let tableArr =
      source === "Form" ? this.validFormArray : this.validSpreadsheetArray;
    var retVal = true;
    if (tableArr.length === 0) {
      retVal = false;
    }
    for (const taxon of tableArr) {
      if (taxon.nameType && taxon.description) {
        continue;
      } else {
        retVal = false;
        break;
      }
    }
    return retVal;
  }

  // Added because util service method is not accessable from .html in prod build
  getId() {
    this.util.getId();
  }

  taxonomyFields = {
    fields: [
      {
        name: "proposed_name",
        mandatory: true,
      },
      {
        name: "name_type",
        mandatory: false,
      },
      {
        name: "host",
        mandatory: false,
      },
      {
        name: "project_id",
        mandatory: false,
      },
      {
        name: "description",
        mandatory: false,
      },
    ],
  };
}
