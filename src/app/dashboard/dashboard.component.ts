import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { MatTabGroup } from '@angular/material/tabs';

import { ReportComponent } from '../report/report.component';
import { ReportType } from '../report-type.enum';

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

  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  @ViewChild('studies') studies: ReportComponent;
  @ViewChild('samples') samples: ReportComponent;
  @ViewChild('runs') runs: ReportComponent;
  @ViewChild('analyses') analyses: ReportComponent;
  @ViewChild('runFiles') runFiles: ReportComponent;
  @ViewChild('analysisFiles') analysisFiles: ReportComponent;

  consumeReportChange(event) {
    console.log("** consumeReportChange **", event);
    this[ReportType[event.report]].id = event.id;
    this[ReportType[event.report]].report();
    this.tabGroup.selectedIndex = event.report;
  }
}
