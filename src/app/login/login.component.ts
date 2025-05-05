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

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SignInFederatedRequest, SignInResponse, WebinAuthenticationService} from '../webin-authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {mergeMap} from 'rxjs/operators';
import {RouterModule} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {
  ResetPasswordRequestDialogComponent
} from '../reset-password-request-dialog/reset-password-request-dialog.component'
import {
  ForgotFirebasePasswordResetDialogComponent
} from '../forgot-firebase-password-request-dialog/forgot-firebase-password-reset-dialog.component';
import {UtilService} from '../util/Util-services';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {SignInSignUpLocalRequest} from '../webin-authentication.service';
import {of} from "rxjs";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  error = false;
  errorMessage = "Invalid Webin submission account or password";
  serverMessage: string;

  firebaseEmail: string = '';
  firebasePassword: string = '';
  webinSubmissionAccountIds: string[] = [];
  invitedWebinSubmissionAccountIds: string[] = [];
  selectedSubmissionAccount: string | null = null;
  selectedInvitedSubmissionAccount: string | null = null;
  showLoginFields: boolean = true; // Initially show login fields
  firebaseFederatedUserName: string;

  hideFeatureLocalLogin: boolean = environment.hideFeatureLocalLogin;
  hideFeatureInvitation: boolean = environment.hideFeatureInvitation;

  constructor(
    private _router: Router,
    private _webinAuthenticationService: WebinAuthenticationService,
    public dialog: MatDialog,
    private util: UtilService,
    private afAuth: AngularFireAuth
  ) {
  }

  ngOnInit() {
    //  console.log('LoginComponent.ngOnInit');
    if (this._webinAuthenticationService.authenticated) {
      //this._router.navigateByUrl('');
    }

    this.getServerMessage();
  }

  firebaseLocalAccountLogin() {
    const signInRequest = new SignInSignUpLocalRequest(this.firebaseEmail, this.firebasePassword);

    this._webinAuthenticationService.signInLocalAccount(signInRequest)
      .subscribe(
        (response: SignInResponse) => {
          this.error = false;
          // Handle successful response
          console.log('Response:', response);
          console.log('Webin Submission Account IDs:', response.webinSubmissionAccountIds);

          // Set the property to populate the dropdown
          this.webinSubmissionAccountIds = response.webinSubmissionAccountIds;
          this.invitedWebinSubmissionAccountIds = response.invitedWebinSubmissionAccountIds;
          this.showLoginFields = false;
        },
        (error) => {
          this.error = true;
          // Handle error
          console.error('Error:', error);

          if (error.status === 404) {
            this.errorMessage = 'User not found.';
          } else if (error.status === 403) {
            this.errorMessage = 'Invalid credentials.';
          } else {
            this.errorMessage = error.message || 'An unexpected error occurred.';
          }
        }
      );
  }

  firebaseGoogleSignIn() {
    (async () => {
      try {
        const result = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        // Handle successful Google sign-in
        console.log(result);

        // Get the ID token from the user
        const idToken = await result.user?.getIdToken();

        // Check if idToken is null or undefined
        if (!idToken) {
          console.error('ID token not found.');
          return;
        }

        // Create an instance of SignInFederatedRequest
        const request = new SignInFederatedRequest(idToken, 'google.com');

        // Call the signInFederatedAccount endpoint
        this._webinAuthenticationService.signInFederatedAccount(request)
          .subscribe(
            (response: SignInResponse) => {
              // Handle successful response
              console.log('Response:', response);
              console.log('Webin Submission Account IDs:', response.webinSubmissionAccountIds);

              // Set the property to populate the dropdown
              this.webinSubmissionAccountIds = response.webinSubmissionAccountIds;
              this.invitedWebinSubmissionAccountIds = response.invitedWebinSubmissionAccountIds;
              this.showLoginFields = false;
              this.firebaseEmail = response.email;
              this.firebaseFederatedUserName = response.fullName;
            },
            (error) => {
              // Handle error
              console.error('Error:', error);

              // Display the error message
              this.errorMessage = error.message || 'An unexpected error occurred.';
            }
          );
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    })();
  }

  proceedWithSelectedAccount() {
    console.log("Proceed with " + this.selectedSubmissionAccount);

    this.loginWithWebinToken();
  }

  proceedWithSelectedInvitedAccount() {
    console.log("Proceed with " + this.selectedInvitedSubmissionAccount);

    this.redirectToCreateNewComtact();
  }

  redirectToCreateNewComtact() {
    // Navigate to the register page with query parameters
    this._router.navigate(['/accept-invite'], {
      queryParams: {
        email: this.firebaseEmail,
        selectedInvitedSubmissionAccount: this.selectedInvitedSubmissionAccount,
      }
    });
  }

  onSubmissionAccountSelected(accountId: string) {
    this.selectedSubmissionAccount = accountId;
  }

  openForgotPasswordDialog() {
    const dialogRef = this.dialog.open(ForgotFirebasePasswordResetDialogComponent);
  }

  login() {
    this._webinAuthenticationService.logout();

    this._webinAuthenticationService.login(this.username, this.password).pipe(
      mergeMap(data => {
        // console.log('WebinAuthenticationService.login succeeded');
        this._webinAuthenticationService.ega = data.roles.EGA;
        this._webinAuthenticationService.superUser = data.roles.SUPER_USER;
        this._webinAuthenticationService.account = data.principle;
        return this._webinAuthenticationService.loginToken(this.username, this.password);
      })
    ).subscribe(
      data => {
        // console.log('WebinAuthenticationService.loginToken succeeded');
        this._webinAuthenticationService.token = data;
        const redirectUrl = this._webinAuthenticationService.redirectUrl;
        if (redirectUrl) {
          this._router.navigateByUrl(redirectUrl);
          this._webinAuthenticationService.redirectUrl = null;
        } else {
          this._router.navigateByUrl('');
          if (!this._webinAuthenticationService.ega) {
            this._webinAuthenticationService.setSubmissionAccount();
          } else {
            this._webinAuthenticationService.setEgaSubmissionAccount();
          }
        }
      },
      // Errors.
      (err: HttpErrorResponse) => {
        this.error = true;
        this._webinAuthenticationService.authenticated = false;

        if (err.status === 403) {
          this.errorMessage = err.error;
        }
        console.error(err);
      },
      () => {
        this.error = false;
        this._webinAuthenticationService.authenticated = true;
      }
    );
  }

  loginWithWebinToken() {
    this._webinAuthenticationService.logout();

    this._webinAuthenticationService.getOneWebinToken(this.firebaseEmail, this.selectedSubmissionAccount).pipe(
      mergeMap(data => {
        // Set the values
        this._webinAuthenticationService.ega = data.ega;
        this._webinAuthenticationService.superUser = data.superUser;
        this._webinAuthenticationService.account = data.submissionAccountId;
        this._webinAuthenticationService.token = data.webinToken;

        // Return a new observable with the values set
        return of({
          ega: data.ega,
          superUser: data.superUser,
          account: data.submissionAccountId,
          token: data.webinToken
        });
      })
    ).subscribe(
      data => {
        // console.log('WebinAuthenticationService.loginToken succeeded');
        this._webinAuthenticationService.token = data.token;
        const redirectUrl = this._webinAuthenticationService.redirectUrl;
        if (redirectUrl) {
          this._router.navigateByUrl(redirectUrl);
          this._webinAuthenticationService.redirectUrl = null;
        } else {
          this._router.navigateByUrl('');
          if (!this._webinAuthenticationService.ega) {
            this._webinAuthenticationService.setSubmissionAccount();
          } else {
            this._webinAuthenticationService.setEgaSubmissionAccount();
          }
        }
      },
      // Errors.
      (err: HttpErrorResponse) => {
        this.error = true;
        this._webinAuthenticationService.authenticated = false;

        if (err.status === 403) {
          this.errorMessage = err.error;
        }
        console.error(err);
      },
      () => {
        this.error = false;
        this._webinAuthenticationService.authenticated = true;
      }
    );
  }

  openResetPasswordRequestDialog(obj) {
    const dialogRef = this.dialog.open(ResetPasswordRequestDialogComponent, {
      width: '400px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: {resetObj: obj}
    });
  }

  redirectToRegister() {
    let federated = false;
    let local = false;
    // Navigate to the register page with query parameters
    if (this.firebaseFederatedUserName) {
      federated = true;
    } else {
      local = true;
    }
    this._router.navigate(['/accountInfo'], {
      queryParams: {
        email: this.firebaseEmail,
        password: this.firebasePassword,
        firebaseFederatedUserName: this.firebaseFederatedUserName,
        federated: federated,
        local: local
      }
    });
  }


  getServerMessage() {
    this.util.getServerMessage().subscribe((versionData: any) => {
      this.serverMessage = versionData;
    });
  }
}
