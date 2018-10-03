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

import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { WebinRestService } from '../webin-rest.service';

@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.css']
})
export class UpdateRequestComponent implements OnInit {

  accession: string;
  email = new FormControl('', [Validators.required, Validators.email]);
  status: string;
  authority: string;
  affects: string;
  reason: string;
  currentValue: string;
  newValue: string;
  dataSuccess = false;
  dataError: string;


  constructor(
    private _webinRestService: WebinRestService) { }

  ngOnInit() {
  }

  canSubmit() {
  return (
      this.accession &&
      this.email.valid &&
      this.status &&
      this.authority &&
      this.affects &&
      this.reason &&
      this.currentValue &&
      this.newValue);
  }

  submit() {
    this.dataSuccess = false;
    this.dataError = undefined;
    console.log('Submit update request');
    if (!this.canSubmit()) {
      return;
    }

    // console.log('Send update request email');

    const request = {
       email: this.email.value,
       accession: this.accession,
       status: this.status,
       authority: this.authority,
       affects: this.affects,
       reason: this.reason,
       currentValue: this.currentValue,
       newValue: this.newValue
    };

    const observable = this._webinRestService.updateRequest( request );

    observable.pipe(
        retry(3)
    ).subscribe(
        data => {
        this.dataSuccess = true;
        },
        (err: HttpErrorResponse) => {
          console.log('** Webin update request failed **', err);
          const msg = 'Webin update request service failed. Please try again later. If the problem persists please contact the helpdesk.';
          this.dataError = msg;
        },
        () => {
        }
    );
  }
}
