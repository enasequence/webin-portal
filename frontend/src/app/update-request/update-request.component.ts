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
    console.log("Submit");
    if (this.canSubmit()) {
      // TODO: call a service to create and send the e-mail
      // this.email.value
      console.log("Send email");
      }
  }
}
