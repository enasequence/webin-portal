/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ContactDialogModalComponent } from "../contact-dialog-modal/contact-dialog-modal.component";
import { MatTableDataSource } from "@angular/material";
import { UtilService } from "../util/Util-services";
import { getLocaleDayNames } from "@angular/common";
import { mergeMap, catchError } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { WebinAuthenticationService } from "../webin-authentication.service";
import { Compiler } from "@angular/core";
import { ResetPasswordRequestDialogComponent } from "../reset-password-request-dialog/reset-password-request-dialog.component";
import { NonSubmissionResultDialogComponent } from "../non-submission-result-dialog/non-submission-result-dialog.component";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-main",
  templateUrl: "./accountInfo.component.html",
  styleUrls: ["./accountInfo.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AccountInfoComponent {
  id: string;
  centerName: string;
  address: string;
  laboratoryName: string;
  country: string;
  contactArray = [];
  deletedContacts = [];
  newContacts = [];
  mainContact: number;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    "firstName",
    "emailAddress",
    "mainContact",
    "edit",
    "remove",
  ];
  metagenomeSubmitter = false;
  metagenomicsConsented = false;
  noEffectCheckbox = false;

  /* Used for storing added emails, this will be used for validation */
  emails = [];

  countries = <any>[];

  editMode = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private util: UtilService,
    private _webinAuthenticationService: WebinAuthenticationService,
    private _compiler: Compiler
  ) {
    _compiler.clearCache();
    this.mainContact = 0;
    if (_webinAuthenticationService.authenticated) {
      this.loadUserInfo(_webinAuthenticationService.username);
      this.editMode = true;
      this.noEffectCheckbox = true;
    }
  }

  ngOnInit() {
    this.util.getCountries(null);
    this._activatedRoute.fragment.subscribe((fragment: string) => {
      if (fragment === "metagenome_registration") {
        this.metagenomeSubmitter = true;
      }
    });
  }

  ngOnDestroy() { }

  openDialog(action, obj): void {
    const dialogRef = this.dialog.open(ContactDialogModalComponent, {
      width: "500px",
      backdropClass: "custom-dialog-backdrop-class",
      panelClass: "custom-dialog-panel-class",
      data: { action: action, emailList: this.emails, contactObj: obj },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event != "close") {
        let contactObj = result.data;
        if (result.event === "Add") {
          this.addContactRow(contactObj);
          if (this.editMode) {
            this.newContacts.push(contactObj);
          }
        }
        if (result.event === "Update") {
          this.updateContactRow(contactObj);
        }
        if (result.event === "Delete") {
          this.deleteContactRow(contactObj);
        }

        if (typeof contactObj != "undefined") {
          this.updateMainContact(contactObj);
          this.dataSource = new MatTableDataSource<any>(this.contactArray);
        }

        this.updateEmailsArray();
      }
    });
  }

  addContactRow(contact) {
    this.contactArray.push(contact);
  }

  updateContactRow(contact) {
    var index = this.contactArray
      .map(function (item) {
        return item.id;
      })
      .indexOf(contact.id);
    this.contactArray[index].emailAddress = contact.emailAddress;
    this.contactArray[index].firstName = contact.firstName;
    this.contactArray[index].middleInitials = contact.middleInitials;
    this.contactArray[index].surname = contact.surname;
    this.contactArray[index].consortium = contact.consortium;
    this.contactArray[index].mainContact = contact.mainContact;
    this.contactArray[index].consortiumContact = contact.consortiumContact;
    this.contactArray[index].name = contact.name;
    this.contactArray[index].submissionAccountId = contact.submissionAccountId;
  }

  deleteContactRow(contact) {
    var index = this.contactArray
      .map(function (item) {
        return item.id;
      })
      .indexOf(contact.id);
    this.deletedContacts.push(this.contactArray[index]);
    this.contactArray.splice(index, 1);
  }

  updateMainContact(contactObj) {
    if (contactObj.mainContact) {
      for (var i in this.contactArray) {
        if (this.contactArray[i].id != contactObj.id) {
          this.contactArray[i].mainContact = false;
        }
      }
      this.mainContact = 1;
    }
    if (this.contactArray.length === 1) {
      this.contactArray[0].mainContact = true;
      this.mainContact = 1;
    }
  }

  updateMainContactCount() {
    this.mainContact = 0;
    for (var i in this.contactArray) {
      if (this.contactArray[i].mainContact) this.mainContact++;
    }
  }

  updateEmailsArray() {
    this.emails = [];
    for (var i in this.contactArray) {
      this.emails.push(this.contactArray[i].emailAddress);
    }
  }

  submitAccount(form) {
    var submissionAccount = form.value;
    submissionAccount["metagenomeSubmitter"] = this.metagenomeSubmitter;
    if (!this.metagenomeSubmitter) {
      submissionAccount["metagenomeSubmitter"] = this.metagenomicsConsented
        ? true
        : false;
    }
    submissionAccount["submissionContacts"] = this.contactArray;
    this.deleteServerContacts();
    this.saveNewContacts();
    let title = "Account Management";
    let redirectPage = "";
    this.util.saveSubmissionAccount(submissionAccount, this.editMode).subscribe(
      (data: any) => {
        this.deletedContacts = [];
        this.util.showSuccess(
          this,
          NonSubmissionResultDialogComponent,
          "Successfully saved account with submission account id : " + data.id,
          title,
          redirectPage
        );
      },
      (error) => {
        if (typeof error.error === "string") {
          this.util.showError(
            this,
            NonSubmissionResultDialogComponent,
            error.error,
            title
          );
        } else {
          this.util.showHttpError(
            this,
            NonSubmissionResultDialogComponent,
            error,
            title
          );
        }
      }
    );
  }

  getCountries(prefix) {
    this.util.getCountries(prefix).subscribe((data: any) => {
      this.countries = data;
    });
  }

  loadUserInfo(username) {
    this.util.getAccountDetails().subscribe((data: any) => {
      this.setAccountInformation(data);
    });
  }

  saveNewContacts() {
    for (const contact of this.newContacts) {
      this.util.saveNewContact(contact).subscribe((data: any) => {
        if (data) {
          console.log("Created " + contact.emailAddress);
        }
      });
    }
  }

  deleteServerContacts() {
    for (const contact of this.deletedContacts) {
      this.util.deleteContact(contact).subscribe((data: any) => {
        if (data) {
          console.log("Deleted " + contact.emailAddress);
        }
      });
    }
  }

  setAccountInformation(data) {
    this.id = data.id;
    this.centerName = data.centerName;
    this.address = data.address;
    this.laboratoryName = data.laboratoryName;
    this.country = data.country;
    this.metagenomeSubmitter = data.metagenomeSubmitter;
    this.metagenomicsConsented = data.metagenomicsConsented;

    data.submissionContacts.forEach((contact) => {
      contact.id = this.util.getId();
      if (contact.consortium) {
        contact.name = contact.consortium;
        contact.consortiumContact = true;
      } else {
        contact.name =
          contact.firstName +
          " " +
          (contact.middleInitials || "") +
          " " +
          contact.surname;
      }
    });

    this.contactArray = data.submissionContacts;
    this.dataSource = new MatTableDataSource<any>(this.contactArray);
    this.updateMainContactCount();
  }

  openResetPasswordRequestDialog(obj) {
    const dialogRef = this.dialog.open(ResetPasswordRequestDialogComponent, {
      width: "400px",
      backdropClass: "custom-dialog-backdrop-class",
      panelClass: "custom-dialog-panel-class",
      data: { resetObj: obj },
    });
  }
}
