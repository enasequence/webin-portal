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

import {Component, ViewEncapsulation, ViewChild} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {ContactDialogModalComponent} from "../contact-dialog-modal/contact-dialog-modal.component";
import {MatTableDataSource} from "@angular/material/table";
import {UtilService} from "../util/Util-services";
import {Router, ActivatedRoute} from "@angular/router";
import {SignInResponse, SignInSignUpLocalRequest, WebinAuthenticationService} from "../webin-authentication.service";
import {Compiler} from "@angular/core";
import {
  ResetPasswordRequestDialogComponent
} from "../reset-password-request-dialog/reset-password-request-dialog.component";
import {
  NonSubmissionResultDialogComponent
} from "../non-submission-result-dialog/non-submission-result-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: "app-main",
  templateUrl: "./accountInfo.component.html",
  styleUrls: ["./accountInfo.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AccountInfoComponent {
  submissionAccountId: string;
  centerName: string;
  fullCenterName: string;
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
  metagenomicsAnalysis = false;
  noEffectCheckbox = false;
  countryErr = false;
  /* Used for storing added emails, this will be used for validation */
  emails = [];
  countries = <any>[];
  editMode = false;

  private firebaseEmail: string;
  private password: string;
  private firebaseFederatedUserName: string;

  private federated: boolean = false;
  private local: boolean = false;

  hideFeatureLocalLogin: boolean = environment.hideFeatureLocalLogin;
  hideFeatureInvitation: boolean = environment.hideFeatureInvitation;

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
    this._activatedRoute.queryParamMap.subscribe(params => {
      this.firebaseEmail = params.get('email');
      this.password = params.get('password');
      this.firebaseFederatedUserName = params.get('firebaseFederatedUserName');

      const federatedParam = params.get('federated');
      const localParam = params.get('local');
      // Convert string values to boolean
      this.federated = federatedParam === 'true';
      this.local = localParam === 'true';

      console.log("Email is " + this.firebaseEmail + " password is " +
        this.password + " and user is federated " + this.federated
        + " and federated user name is " + this.firebaseFederatedUserName
        + " user is local " + this.local);
    });

    if (this.federated) {
      console.log("Adding federated contact");

      let newContact = {
        emailAddress: this.firebaseEmail,
        firstName: this.firebaseFederatedUserName,
        surname: this.firebaseFederatedUserName,
        mainContact: 1
      };

      this.mainContact = 1;
      this.contactArray.push(newContact);
    }

    if (this.local) {
      console.log("Adding local contact");

      let newContact = {
        emailAddress: this.firebaseEmail,
        firstName: this.firebaseEmail,
        surname: this.firebaseEmail,
        mainContact: 1
      };

      this.mainContact = 1;
      this.contactArray.push(newContact);
    }

    this._activatedRoute.fragment.subscribe((fragment: string) => {
      if (fragment === "metagenome_registration") {
        this.metagenomeSubmitter = true;
      }
    });
  }

  ngOnDestroy() {
  }

  openDialog(action, obj): void {
    const dialogRef = this.dialog.open(ContactDialogModalComponent, {
      width: "500px",
      backdropClass: "custom-dialog-backdrop-class",
      panelClass: "custom-dialog-panel-class",
      data: {action: action, emailList: this.emails, contactObj: obj},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event != "close") {
        let contactObj = result.data;

        console.log("Contact object " + contactObj)

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
    if (this.federated || this.local) {
      this.mainContact = 1;
    }

    var submissionAccount = form.value;
    var webinPassword = submissionAccount["webinPassword"];

    submissionAccount["metagenomeSubmitter"] = this.metagenomeSubmitter;

    if (!this.metagenomeSubmitter) {
      submissionAccount["metagenomeSubmitter"] = this.metagenomicsAnalysis;
    }

    submissionAccount["submissionContacts"] = this.contactArray;

    this.deleteServerContacts();

    console.log("Saving contacts now");

    this.saveNewContacts(webinPassword);
    let title = "Account Management";
    let redirectPage = "";

    this.util.saveSubmissionAccount(submissionAccount, this.editMode, this.hideFeatureInvitation).subscribe(
      (data: any) => {
        this.deletedContacts = [];
        this.util.showSuccess(
          this,
          NonSubmissionResultDialogComponent,
          'Successfully saved account with submission account id : ' + data.submissionAccountId,
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

    /*for (var i in this.contactArray) {
      if (this.contactArray[i].emailAddress !== this.firebaseEmail) {
        this.register(this.contactArray[i].emailAddress, webinPassword);
      }
    }*/
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

  saveNewContacts(webinPassword) {
    console.log("Saving contacts");

    for (const contact of this.newContacts) {
      console.log("Contact " + contact.emailAddress);

      this.util.saveNewContact(contact).subscribe((data: any) => {
        if (data) {
          console.log("Created " + contact.emailAddress);
        }
      });

      this.register(contact.emailAddress, webinPassword);
    }
  }

  register(email, password) {
    // Call the signup method
    if (email) {
      console.log("Registering " + email + " to firbase");
      this.firebaseSignUp(email, password);
    } else {
      console.log("Undefined email " + email);
    }
  }

  firebaseSignUp(email, password) {
    // Construct the signup request
    const signUpRequest = new SignInSignUpLocalRequest(email, password);

    // Call the signup service method
    this._webinAuthenticationService.signUp(signUpRequest)
      .subscribe(
        (response: SignInResponse) => {
          // Handle successful signup response
          console.log('Signup successful:', response);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400 && error.error && error.error.includes("EMAIL_EXISTS")) {
            console.warn("Email already exists during registration for " + email + ", ignoring.");
          }
        }
      );
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
    this.submissionAccountId = data.submissionAccountId;
    this.centerName = data.centerName;
    this.fullCenterName = data.fullCenterName;
    this.address = data.address;
    this.laboratoryName = data.laboratoryName;
    this.country = data.country;
    this.metagenomeSubmitter = data.metagenomeSubmitter;
    this.metagenomicsAnalysis = data.metagenomicsAnalysis;

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
      data: {resetObj: obj},
    });
  }

  selectCountryOption(event: any): void {
    this.countryErr = event.target.value != "" && this.countries.indexOf(event.target.value) === -1;
  }
}
