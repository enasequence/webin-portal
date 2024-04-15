import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { getEnabledCategories } from 'trace_events';
import { ReportType } from '../report-type.enum';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { XmlService } from '../util/xml.service';
import { UtilService } from '../util/Util-services';
import { SubmissionResultDialogComponent } from '../submission-result-dialog/submission-result-dialog.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dac-policy-management',
  templateUrl: './dac-policy-management.component.html',
  styleUrls: ['./dac-policy-management.component.css']
})
export class DacPolicyManagementComponent implements OnInit {

  constructor(private xmlUtil: XmlService,
    private util: UtilService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,) { }

  ReportType = ReportType;
  selectedDacId: string;
  textSelected: boolean;
  urlSelected: boolean;
  text: string;
  url: string;
  action: string;
  id: string;
  showLoadingFlag = false;
  xmlString: string;
  title: string;
  policyText: string;
  policyUrl = false;
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id) {
      this.action = "Edit";
      this.initEdit(this.id);
    }
  }

  getSelectedDac(reportObj: object, stepper: MatStepper) {
    this.selectedDacId = reportObj["id"];
    stepper.next();
  }

  submitDacPolicy(form) {
    var observable: Observable<string>;
    let redirectPath = ""
    if (this.action != "Edit") {
      observable = this.xmlUtil.generateDacPolicyXml(
        form.value,
      );

    } else {
      observable = this.xmlUtil.updateDacPolicyXml(
        this.xmlString,
        form.value,
      );
      redirectPath = null;
    }

    this.util.showSubmissionResponse(
      this,
      SubmissionResultDialogComponent,
      observable,
      redirectPath
    );
  }

  initEdit(id) {
    this.showLoading();
    this.util.getDacPolicyXml(id).subscribe((xmlString: any) => {
      this.xmlString = xmlString;
      this.setPageValuesfromXml();

    });
  }
  showLoading() {
    this.showLoadingFlag = true;
  }

  hideLoading() {
    this.showLoadingFlag = false;
  }

  setPageValuesfromXml() {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(this.xmlString, "text/xml");

    this.title = xmlDoc.getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
    this.policyText = xmlDoc.getElementsByTagName("POLICY_TEXT")[0].childNodes[0].nodeValue;

    if (this.policyText.startsWith("http")) {
      this.policyUrl = true;
    }
    this.hideLoading();

  }

}
