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

@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.css']
})
export class UpdateRequestComponent implements OnInit {

  id: string;
  email = new FormControl('', [Validators.required, Validators.email]);
  status: string;
  authority: string;
  affects: string;
  reason: string;
  currentValue: string;
  newValue: string;

  constructor() { }

  ngOnInit() {
  }

  canSubmit() {
  return (
      this.id &&
      this.email.valid &&
      this.status &&
      this.authority &&
      this.affects &&
      this.reason &&
      this.currentValue &&
      this.newValue);
  }

  submit() {
    console.log('Submit update request');
    if (this.canSubmit()) {
      // TODO: call a service to create and send the e-mail
      // this.email.value
      console.log('Send update request email');
      }
  }
}
