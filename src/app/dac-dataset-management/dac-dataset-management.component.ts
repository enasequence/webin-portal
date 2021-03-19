import { Component, OnInit } from '@angular/core';
import { MatDialog, MatStepper } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReportType } from '../report-type.enum';
import { SubmissionResultDialogComponent } from '../submission-result-dialog/submission-result-dialog.component';
import { UtilService } from '../util/Util-services';
import { XmlService } from '../util/xml.service';

@Component({
  selector: 'app-dac-dataset-management',
  templateUrl: './dac-dataset-management.component.html',
  styleUrls: ['./dac-dataset-management.component.css']
})
export class DacDatasetManagementComponent implements OnInit {

  constructor(private xmlUtil: XmlService,
    private util: UtilService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,) { }

  ReportType = ReportType;
  selectedDacPolicyId: string;

  action: string;
  id: string;
  showLoadingFlag = false;
  xmlString: string;
  title: string;
  description: string;
  accessions: string;
  typeArr = [];
  refArr = [];
  selectedTypeArr = [];

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id) {
      this.action = "Edit";
      this.initEdit(this.id);
    }
  }

  getSelectedPolicy(reportObj: object, stepper: MatStepper) {
    this.selectedDacPolicyId = reportObj["id"];
    stepper.next();
  }

  submitDacDataset(form) {
    var observable: Observable<string>;
    let redirectPath = "";
    this.accessions = this.accessions.replace(/\s/g, '');
    this.refArr = this.accessions.split(",").filter(val => val != "").sort();
    if (this.action != "Edit") {
      observable = this.xmlUtil.generateDacDatasetXml(
        form.value,
        this.typeArr,
        this.refArr
      );

    } else {
      observable = this.xmlUtil.updateDacDatasetXml(
        this.xmlString,
        form.value,
        this.typeArr,
        this.refArr
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
    this.util.getDacDatasetXml(id).subscribe((xmlString: any) => {
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
    this.description = xmlDoc.getElementsByTagName("DESCRIPTION")[0].childNodes[0].nodeValue;
    this.getAndSetAccession(xmlDoc);
    this.setDatasetType(xmlDoc);
    this.hideLoading();
  }

  typeSelected(event, type) {
    if (event.checked) {
      if (this.typeArr.indexOf(type) === -1) {
        this.typeArr.push(type);
      }
    } else {
      this.typeArr.splice(this.typeArr.indexOf(type), 1);
    }
  }

  getAndSetAccession(xmlDoc) {
    let accessionArr = [];
    let runRef = xmlDoc.getElementsByTagName("RUN_REF");
    let analysisRef = xmlDoc.getElementsByTagName("ANALYSIS_REF");
    for (var i = 0; i < runRef.length; i++) {
      accessionArr.push(runRef[i].getAttribute("accession"));
    }
    for (var i = 0; i < analysisRef.length; i++) {
      accessionArr.push(analysisRef[i].getAttribute("accession"));
    }
    this.accessions = accessionArr.join(",");
  }

  setDatasetType(xmlDoc) {
    let datasetType = xmlDoc.getElementsByTagName("DATASET_TYPE");
    for (var i = 0; i < datasetType.length; i++) {
      if (this.typeArr.indexOf(datasetType[i].childNodes[0].nodeValue) < 0) {
        this.typeArr.push(datasetType[i].childNodes[0].nodeValue);
      }

    }
  }

  datasetTypes1 = ["Whole genome sequencing", "Exome sequencing",
    "Genotyping by array", "Transcriptome profiling by high-throughput sequencing",
    "Transcriptome profiling by array",
    "Amplicon sequencing",
    "Methylation binding domain sequencing"
  ]

  datasetTypes2 = ["Methylation profiling by high-throughput sequencing",
    "Phenotype information", "Study summary information",
    "Genomic variant calling", "Chromatin accessibility profiling by high-throughput sequencing", "Histone modification profiling by high-throughput sequencing", "Chip-Seq"
  ]
}
