/*
 * Copyright 2024 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SignInResponse, SignInSignUpLocalRequest, WebinAuthenticationService} from "../webin-authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register-firebase.component.html',
  styleUrls: ['./register-firebase.component.css']
})
export class RegisterComponent implements OnInit {
  firebaseEmail: string = '';
  firebasePassword: string = '';
  webinSubmissionAccountIds: string[] = [];
  showLoginFields: boolean = true; // Initially show login fields
  selectedSubmissionAccount: string;
  selectedInvitedSubmissionAccount: string;
  invitedWebinSubmissionAccountIds: string[] = [];

  constructor(private _router: Router,
              private _webinAuthenticationService: WebinAuthenticationService) {
  }

  ngOnInit(): void {
  }

  register() {
    // Call the signup method
    if (this.firebaseEmail) {
      console.log("Registering " + this.firebaseEmail + " to firebase");
      this.firebaseSignUp();
    } else {
      console.log("Undefined email " + this.firebaseEmail);
    }
  }

  firebaseSignUp() {
    // Construct the signup request
    const signUpRequest = new SignInSignUpLocalRequest(this.firebaseEmail, this.firebasePassword);

    // Call the signup service method
    this._webinAuthenticationService.signUp(signUpRequest)
      .subscribe(
        (response: SignInResponse) => {
          // Handle successful signup response
          console.log('Signup successful:', response);
          console.log('WEBIN Submission IDs:', response.webinSubmissionAccountIds)

          this.showLoginFields = false;
          this.webinSubmissionAccountIds = response.webinSubmissionAccountIds;
          this.invitedWebinSubmissionAccountIds = response.invitedWebinSubmissionAccountIds;
        },
        (error) => {
          // Handle signup error
          console.error('Error:', error);

          this.handleError(error);
        }
      );
  }

  private handleError(error) {
    if (error.status === 400) {
      try {
        const errorBody = JSON.parse(error.error);

        if (errorBody.error && errorBody.error.message === "EMAIL_EXISTS") {
          // Handle the case where the email already exists
          console.log("Email already exists");
        } else {
          // Handle other types of errors
          console.error("Error:", errorBody.error.message);
        }
      } catch (e) {
        console.error("Error parsing error response:", e);
      }
    } else {
      // Handle other HTTP status codes
      console.error("HTTP error:", error.statusText);
    }
  }

  proceedWithSelectedAccount() {
    console.log("Proceed with " + this.selectedSubmissionAccount);

    // TODO: login
  }

  redirectToRegister() {
    // Navigate to the register page with query parameters
    this._router.navigate(['/accountInfo'], {
      queryParams: {
        email: this.firebaseEmail,
        password: this.firebasePassword,
        federated: false,
        local: true
      }
    });
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
}
