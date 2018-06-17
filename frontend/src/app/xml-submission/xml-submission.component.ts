import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import {MatTableDataSource} from '@angular/material';
import { MatStepper } from '@angular/material';

import { SubmissionResultComponent } from '../submission-result/submission-result.component';
import { ChecklistType } from '../checklist-type.enum';

import { WebinAuthenticationService } from '../webin-authentication.service';
import { WebinRestService } from '../webin-rest.service';
import { WebinReportService } from '../webin-report.service';

@Component({
  selector: 'app-xml-submission',
  templateUrl: './xml-submission.component.html',
  styleUrls: ['./xml-submission.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class XmlSubmissionComponent implements OnInit {

  @ViewChild(SubmissionResultComponent) submissionResult: SubmissionResultComponent;

  submissionFile: File;
  studyFile: File;
  projectFile: File;
  sampleFile: File;
  experimentFile: File;
  runFile: File;
  analysisFile: File;
  dacFile: File;
  policyFile: File;
  datasetFile: File;

  // Checklists
  //

  checklistType: ChecklistType = ChecklistType.sample; // 'sequence'

  // Sample checklist
  //

  // field group restriction type (not supported for spreadsheets)
  // -----------------------------
  // Any number or none of the fields
  // One of the fields
  // At least one of the fields
  // One or none of the fields
  //
  // field type
  // -----------------------------
  // TEXT_FIELD
  // TEXT_AREA_FIELD
  // TEXT_CHOICE_FIELD
  // DATE_FIELD
  // TAXON_FIELD
  // ONTOLOGY_FIELD
  //
  // field mandatory
  // -----------------------------
  // mandatory
  // recommended
  // optional
  //
  // field multiplicity (not supported for spreadsheets)
  // -----------------------------
  // single
  // multiple

  getFieldTypeDisplayText(field): string {
    switch(field.type) {
      case 'TEXT_FIELD':
      case 'TEXT_AREA_FIELD':
      case 'TEXT_CHOICE_FIELD': {
        return 'text field';
      }
      case 'DATE_FIELD': {
        return 'date field';
      }
      case 'TAXON_FIELD': {
        return 'taxon field';
      }
      case 'ONTOLOGY_FIELD': {
         return 'ontology field';
      }
      default: {
        return "field";
      }
    }
  }

  getSelectedFieldsDisplayText(fieldGroup): string {
    let cnt = 0;
    fieldGroup.fields.forEach( function(field) {
      if (this.selectedFields[field.name]) {
        cnt++;
      }
    }, this);
    return '(' + cnt + ' of ' + fieldGroup.fields.length + ' fields selected)';
  }

  checklistGroups;
  checklistGroupDisplayedColumns = ['name'];
  checklistGroupDataSource;
  checklistDataSource;
  checklistDisplayedColumns = ['name'];
  selectedChecklistGroup;
  selectedChecklist;

  selectedFields;
  mandatoryFields;

  setChecklistGroup(checklistGroup, stepper) {
      this.selectedChecklistGroup = checklistGroup;
      this.checklistDataSource = new MatTableDataSource<any>(this.selectedChecklistGroup.checklists);
    stepper.next();
  }

  setChecklist(checklist, stepper) {
    this.selectedChecklist = checklist;
    console.log('DEBUG:',this.selectedChecklist);
    this.selectedFields = {};
    this.mandatoryFields = {};
    this.selectedChecklist.fieldGroups.forEach( function(fieldGroup) {
      fieldGroup.fields.forEach( function(field) {
        this.selectedFields[field.name] = (field.mandatory == 'mandatory');
        this.mandatoryFields[field.name] = (field.mandatory == 'mandatory');
      }, this);
    }, this);
    stepper.next();
  }

  private xmlParser = new DOMParser();


  getXmlTextValue(xmlDoc, xpath: string) {
    return document.evaluate(xpath, xmlDoc, null, XPathResult.STRING_TYPE, null).stringValue;
  }

  getXmlNodes(xmlDoc, xpath: string) {
    return document.evaluate(xpath, xmlDoc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
  }

  initChecklists() {

    this.checklistGroups = [];

    console.log(" ** initChecklists **");

    const observable: Observable<any> = this.webinReportService.getChecklists();

    if (observable != null) {
      // this.active = true;

      observable.subscribe(
        // Success
        data => {

          // TODO: filter checklists by type


          // Initialize checklist groups.
          //

          let checklistGroupMap = {};
          let checklistGroupIndex = 0;
          let checklistToGroupMap = {};
          for (let i = 0; i < data.length; i++) {
            if (checklistGroupMap[ data[i].report.groupName ]) {
              checklistToGroupMap[ data[i].report.id ] = checklistGroupMap[ data[i].report.groupName ];
              continue;
            }
            checklistGroupMap[ data[i].report.groupName ] = checklistGroupIndex++;
            checklistToGroupMap[ data[i].report.id ] = checklistGroupMap[ data[i].report.groupName ];

            console.log('** add checklist group **', data[i].report.groupName);
            this.checklistGroups.push({
              name: data[i].report.groupName,
              description: data[i].report.groupDescription,
              checklists: []
            });
          }

          // Initialize checklists.
          //

          // this.active = false;

          const id = data.map(checklist => checklist.report.id).join();
          console.log('** initChecklists **', id);
          const xmlObservable: Observable<any> = this.webinReportService.getChecklistXml(id);

          if (xmlObservable != null) {
            xmlObservable.subscribe(
            // Success
            xmlData => {
              // this.active = false;
              console.log('** initChecklists **', xmlData);

              const xmlDoc = this.xmlParser.parseFromString(xmlData.body, 'text/xml');

              const checklistNodes = this.getXmlNodes(xmlDoc, 'CHECKLIST_SET/CHECKLIST');
              let checklistNode = checklistNodes.iterateNext();
              while (checklistNode) {
                let checklist = {
                    id: this.getXmlTextValue(checklistNode, '@accession'),
                    name: this.getXmlTextValue(checklistNode, 'DESCRIPTOR/NAME/text()'),
                    description: this.getXmlTextValue(checklistNode, 'DESCRIPTOR/DESCRIPTION/text()'),
                    type: this.getXmlTextValue(checklistNode, '@checklistType'),
                    fieldGroups: []
                };

                const fieldGroupNodes = this.getXmlNodes(checklistNode, 'DESCRIPTOR/FIELD_GROUP');
                let fieldGroupNode = fieldGroupNodes.iterateNext();
                while (fieldGroupNode) {
                  let fieldGroup = {
                    name: this.getXmlTextValue(fieldGroupNode, 'NAME/text()'),
                    fields : []
                  };

                  const fieldNodes = this.getXmlNodes(fieldGroupNode, 'FIELD');
                  let fieldNode = fieldNodes.iterateNext();
                  while (fieldNode) {
                    let field = {
                      name: this.getXmlTextValue(fieldNode, 'NAME/text()'),
                      description: this.getXmlTextValue(fieldNode, 'DESCRIPTION/text()'),
                      mandatory: this.getXmlTextValue(fieldNode, 'MANDATORY/text()'),
                      type: this.getXmlTextValue(fieldNode, 'name(FIELD_TYPE/*[1])'),
                      regexValue: undefined,
                      ontologyId: undefined,
                      units: [],
                      textChoice: [],
                    };

                    // Regex
                    //

                    const regexNodes = this.getXmlNodes(fieldNode, 'FIELD_TYPE/*/REGEX_VALUE[1]');
                    if (regexNodes) {
                      let regexNode = regexNodes.iterateNext();
                      while (regexNode) {
                        field.regexValue = this.getXmlTextValue(regexNode, 'text()');
                        regexNode = regexNodes.iterateNext();
                      };
                    }

                    // CV
                    //

                    const cvNodes = this.getXmlNodes(fieldNode, 'FIELD_TYPE/TEXT_CHOICE_FIELD/TEXT_VALUE/VALUE');
                    if (cvNodes) {
                      let cvNode = cvNodes.iterateNext();
                      while (cvNode) {
                        field.textChoice.push(this.getXmlTextValue(cvNode, 'text()'));
                        cvNode = cvNodes.iterateNext();
                      };
                    }

                    // Ontology
                    //

                    const ontologyNodes = this.getXmlNodes(fieldNode, 'FIELD_TYPE/ONTOLOGY_FIELD/ONTOLOGY_ID');
                    if (ontologyNodes) {
                      let ontologyNode = ontologyNodes.iterateNext();
                      while (ontologyNode) {
                        field.ontologyId = this.getXmlTextValue(ontologyNode, 'text()');
                        ontologyNode = ontologyNodes.iterateNext();
                      };
                    }

                    // Units
                    //

                    const unitNodes = this.getXmlNodes(fieldNode, 'UNITS/UNIT');
                    if (unitNodes) {
                      let unitNode = unitNodes.iterateNext();
                      while (unitNode) {
                        field.units.push(this.getXmlTextValue(unitNode, 'text()'));
                        unitNode = unitNodes.iterateNext();
                      };
                    }

                    fieldGroup.fields.push(field);
                    fieldNode = fieldNodes.iterateNext();

                  }

                  checklist.fieldGroups.push(fieldGroup);
                  fieldGroupNode = fieldGroupNodes.iterateNext();
                }

                this.checklistGroups[ checklistToGroupMap[ checklist.id ] ].checklists.push(checklist);
                checklistNode = checklistNodes.iterateNext();
              }

              console.log('** Sample checklists **', this.checklistGroups );
              this.checklistGroupDataSource = new MatTableDataSource<any>(this.checklistGroups);

              // this.dataError = undefined;
            },

            // Errors
            (err: HttpErrorResponse) => {
              // this.active = false;
              console.log('** initChecklists failed **', err);
              const msg = 'Webin checklist service failed. Please try again later. If the problem persists please contact the helpdesk.';
              // this.dataError = msg;
          });
        };


        },
        // Errors
        (err: HttpErrorResponse) => {
          // this.active = false;
          console.log('** initChecklists failed **', err);
          const msg = 'Webin checklist service failed. Please try again later. If the problem persists please contact the helpdesk.';
          // this.dataError = msg;
      });
    };
  }

  constructor(
    private webinAuthenticationService: WebinAuthenticationService,
    private webinRestService: WebinRestService,
    private webinReportService: WebinReportService
    ) {
  }

  ngOnInit() {
    this.initChecklists();
  }

  isEga(): boolean {
    return this.webinAuthenticationService.ega;
  }

  onChangeSubmissionFile(files) {
    this.submissionFile = files[0];
    // console.log("Submission file: " + this.submissionFile);
  }

  onChangeStudyFile(files) {
    this.studyFile = files[0];
    // console.log("Study file: " + this.studyFile);
  }

  onChangeProjectFile(files) {
    this.projectFile = files[0];
    // console.log("Project file: " + this.projectFile);
  }

  onChangeSampleFile(files) {
    this.sampleFile = files[0];
    // console.log("Sample file: " + this.sampleFile);
  }

  onChangeExperimentFile(files) {
    this.experimentFile = files[0];
    // console.log("Experiment file: " + this.experimentFile);
  }

  onChangeRunFile(files) {
    this.runFile = files[0];
    // console.log("Run file: " + this.runFile);
  }

  onChangeAnalysisFile(files) {
    this.analysisFile = files[0];
    // console.log("Analysis file: " + this.analysisFile);
  }

  onChangeDacFile(files) {
    this.dacFile = files[0];
    // console.log("Dac file: " + this.dacFile);
  }

  onChangePolicyFile(files) {
    this.policyFile = files[0];
    // console.log("Policy file: " + this.policyFile);
  }

  onChangeDatasetFile(files) {
    this.datasetFile = files[0];
    // console.log("Dataset file: " + this.datasetFile);
  }

  canSubmit() {
    return this.submissionFile !== undefined;
  }

  submit() {
    console.log('** Webin XML submission **');

    const observable: Observable<any> =
      this.webinRestService.submitXml(
        this.submissionFile,
        this.studyFile,
        this.projectFile,
        this.sampleFile,
        this.experimentFile,
        this.runFile,
        this.analysisFile,
        this.dacFile,
        this.policyFile,
        this.datasetFile);

    this.submissionResult.submit(observable);
  }
}
