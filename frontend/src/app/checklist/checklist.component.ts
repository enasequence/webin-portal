import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import {MatTableDataSource} from '@angular/material';
import { MatStepper } from '@angular/material';

import { ChecklistType } from '../checklist-type.enum';

import { WebinAuthenticationService } from '../webin-authentication.service';
import { WebinReportService } from '../webin-report.service';


@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChecklistComponent implements OnInit {

  @Input() checklistType: ChecklistType = ChecklistType.sample;

  checklistGroups;
  checklistGroupDisplayedColumns = ['name'];
  checklistGroupDataSource;
  checklistDataSource;
  checklistDisplayedColumns = ['name'];
  selectedChecklistGroup;
  selectedChecklist;

  selectedFields;
  mandatoryFields;

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

  getChecklistTypeParamValue() {
    switch(this.checklistType) {
      case ChecklistType.sample:
        return 'sample';
      case ChecklistType.sequence:
        return 'sequence';
    }
  }

  initChecklists() {
    // this.active = true;
    // this.dataError = undefined;

    this.checklistGroups = [];

    console.log(" ** initChecklists **");

    const observable: Observable<any> = this.webinReportService.getChecklistGroups(this.getChecklistTypeParamValue());

    observable.subscribe(
      // Success
      data => this.initChecklistGroups(data),
      // Error
      (err: HttpErrorResponse) => this.initChecklistsError(err));
  }

  initChecklistsError(err: HttpErrorResponse) {
      // this.active = false;
      console.log('** initChecklists failed **', err);
      const msg = 'Webin checklist service failed. Please try again later. If the problem persists please contact the helpdesk.';
      // this.dataError = msg;
  }

  initChecklistGroups(data) {
    for (let i = 0; i < data.length; i++) {
      this.checklistGroups.push({
        name: data[i].report.name,
        description: data[i].report.description,
        checklistIds: data[i].report.checklist,
        checklists: []
      });
    }

    const observable: Observable<any> = this.webinReportService.getChecklistXmls(this.getChecklistTypeParamValue());

    observable.subscribe(
      // Success
      data => this.initChecklistXmls(data),
      // Error
      (err: HttpErrorResponse) => this.initChecklistsError(err));
  }

  initChecklistXmls(data) {

    // console.log('** initChecklistXmls **', data);

    const xmlDoc = this.xmlParser.parseFromString(data.body, 'text/xml');

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

      for (let i = 0; i < this.checklistGroups.length; i++) {
        for (let j = 0; j < this.checklistGroups[i].checklistIds.length; j++) {
          if (checklist.id == this.checklistGroups[i].checklistIds[j]) {
            this.checklistGroups[i].checklists.push(checklist);
          }
        }
      }

      checklistNode = checklistNodes.iterateNext();
    }

    console.log('** Sample checklists **', this.checklistGroups );
    this.checklistGroupDataSource = new MatTableDataSource<any>(this.checklistGroups);

    // this.active = false;
    // this.dataError = undefined;
  }

  constructor(
    private webinAuthenticationService: WebinAuthenticationService,
    private webinReportService: WebinReportService
    ) {
  }

  ngOnInit() {
    this.initChecklists();
  }

  isEga(): boolean {
    return this.webinAuthenticationService.ega;
  }
}
