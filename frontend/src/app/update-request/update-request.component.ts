import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.css']
})
export class UpdateRequestComponent implements OnInit {

  id: string;
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
      this.status &&
      this.authority &&
      this.affects &&
      this.reason &&
      this.currentValue &&
      this.newValue);
  }

  submit() {
    console.log("Submit");
    if (canSubmit()) {
      // TODO: call a service to create and send the e-mail
      console.log("Send email");
      }
  }
}
