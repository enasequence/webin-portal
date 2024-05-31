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
import {ActivatedRoute, Router} from '@angular/router';
import {SignInResponse, SignInSignUpLocalRequest, WebinAuthenticationService} from "../webin-authentication.service";
import {UtilService} from "../util/Util-services";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-accept-invite',
  templateUrl: './accept-invite.component.html',
  styleUrls: ['./accept-invite.component.css']
})
export class AcceptInviteComponent implements OnInit {
  firstName: any;
  middleInitials: any;
  surname: any;
  emailAddress: any;
  submissionAccountId: any;
  successMessage: string;
  errorMessage: string;

  constructor(private _router: Router,
              private webinAuthenticationService: WebinAuthenticationService,
              private _activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe(params => {
      this.emailAddress = params.get('email');
      this.submissionAccountId = params.get('selectedInvitedSubmissionAccount');
    });
  }

  acceptInvite() {
    console.log("Email is " + this.emailAddress + " and subs account is " + this.submissionAccountId);

    const newContact = {
      emailAddress: this.emailAddress,
      firstName: this.firstName,
      surname: this.surname,
      middleInitials: this.middleInitials,
      submissionAccountId: this.submissionAccountId,
      mainContact: 0
    };

    this.webinAuthenticationService.acceptInvite(newContact).subscribe(
      (data: object) => {
        console.log("Response from server: ", data);

        this.successMessage = "Successfully added " + data + " to Webin account.";
        this.errorMessage = null;  // Clear error message if success
      },
      (error: HttpErrorResponse) => {
        this.successMessage = null;  // Clear success message if error
        this.errorMessage = "Failed to create contact: " + (error.error?.message || error.message || "Unknown error");
        console.error("Error: ", error);
      }
    );
  }
}
