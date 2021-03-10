import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material';
import { getEnabledCategories } from 'trace_events';
import { ReportType } from '../report-type.enum';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-dac-policy-management',
  templateUrl: './dac-policy-management.component.html',
  styleUrls: ['./dac-policy-management.component.css']
})
export class DacPolicyManagementComponent implements OnInit {

  constructor() { }
  reportType = ReportType.dacs;
  selectedDacId: string;
  textSelected: boolean;
  urlSelected: boolean;
  text: string;
  url: string;
  ngOnInit() {

  }

  getSelectedDac(reportObj: object, stepper: MatStepper) {
    this.selectedDacId = reportObj["id"];
    stepper.next();
  }

  submitDacPolicy(form) {

  }

}
