import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { MatTabGroup } from '@angular/material/tabs';

import { ReportComponent } from '../report/report.component';

@Component({
  selector: 'app-main',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    ReportComponent
  ]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  @ViewChild(ReportComponent) studies: ReportComponent;
  @ViewChild(ReportComponent) samples: ReportComponent;
  @ViewChild(ReportComponent) runs: ReportComponent;
  @ViewChild(ReportComponent) analyses: ReportComponent;
  @ViewChild(ReportComponent) runFiles: ReportComponent;
  @ViewChild(ReportComponent) analysisFiles: ReportComponent;

  reportIndex = {
    studies: 2,
    samples: 3,
    runs: 4,
    analyses: 5,
    'run files': 6,
    'analysis files': 7
  };

  consumeReportChange(event) {
    console.log("** report change **", event, this.reportIndex[event.report]);
    this[event.report].id = event.id;
    this[event.report].report();
    this.tabGroup.selectedIndex = this.reportIndex[event.report];
  }
}
