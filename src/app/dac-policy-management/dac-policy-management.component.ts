import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material';
import { getEnabledCategories } from 'trace_events';
import { ReportType } from '../report-type.enum';

@Component({
  selector: 'app-dac-policy-management',
  templateUrl: './dac-policy-management.component.html',
  styleUrls: ['./dac-policy-management.component.css']
})
export class DacPolicyManagementComponent implements OnInit {

  constructor() { }
  reportType = ReportType.dacs;
  selectedDAC: string;

  ngOnInit() {

  }

  getSelectedDac(studyAlias: object, stepper: MatStepper) {
    this.selectedDAC = studyAlias["accession"];
    stepper.next();
  }

}
