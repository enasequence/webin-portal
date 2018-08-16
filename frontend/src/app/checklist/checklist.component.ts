/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import { Component, Input, ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { saveAs } from 'file-saver';
import { retry, mergeMap } from 'rxjs/operators';
import { ChecklistType } from '../checklist-type.enum';
import { ChecklistInterface } from '../checklist.interface';
import { ChecklistGroupInterface } from '../checklist-group.interface';
import { ChecklistFieldGroupInterface } from '../checklist-field-group.interface';
import { ChecklistFieldInterface } from '../checklist-field.interface';
import { WebinAuthenticationService } from '../webin-authentication.service';
import { WebinReportService } from '../webin-report.service';

interface BooleanFieldInterface {
  [key: string]: boolean;
}

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChecklistComponent {

  @Input() checklistType: ChecklistType = ChecklistType.sample;

  ChecklistType = ChecklistType;   // Allows use in template

  private _checklistGroups: Array<ChecklistGroupInterface>;
  private _xmlParser = new DOMParser();
  checklistGroupDisplayedColumns = ['name'];
  checklistGroupDataSource: MatTableDataSource<ChecklistGroupInterface>;
  checklistDataSource: MatTableDataSource<ChecklistInterface>;
  checklistDisplayedColumns = ['name'];
  selectedChecklistGroup: ChecklistGroupInterface;
  selectedChecklist: ChecklistInterface;
  selectedFields: BooleanFieldInterface;
  mandatoryFields: BooleanFieldInterface;
  active: boolean;
  dataError: string;

  constructor(
    private _webinAuthenticationService: WebinAuthenticationService,
    private _webinReportService: WebinReportService) { }

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

  getFieldTypeDisplayText(field: ChecklistFieldInterface): string {
    switch (field.type) {
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
        return 'field';
      }
    }
  }

  getSelectedFieldsDisplayText(fieldGroup: ChecklistFieldGroupInterface): string {
    let cnt = 0;
    fieldGroup.fields.forEach( (field) => {
      if (this.selectedFields[field.label]) {
        cnt++;
      }
    });
    return '(' + cnt + ' of ' + fieldGroup.fields.length + ' fields selected)';
  }

  setChecklistGroup(checklistGroup: ChecklistGroupInterface, stepper): void {
      this.selectedChecklistGroup = checklistGroup;
      this.checklistDataSource = new MatTableDataSource<ChecklistInterface>(this.selectedChecklistGroup.checklists);
    stepper.next();
  }

  setChecklist(checklist: ChecklistInterface, stepper): void {
    this.selectedChecklist = checklist;
    this.selectedFields = {};
    this.mandatoryFields = {};
    this.selectedChecklist.fieldGroups.forEach( (fieldGroup) => {
      fieldGroup.fields.forEach( (field) => {
        this.selectedFields[field.label] = (field.mandatory === 'mandatory');
        this.mandatoryFields[field.label] = (field.mandatory === 'mandatory');
      });
    });
    stepper.next();
  }

  getXmlTextValue(xmlDoc, xpath: string): string {
    return document.evaluate(xpath, xmlDoc, null, XPathResult.STRING_TYPE, null).stringValue;
  }

  getXmlNodes(xmlDoc, xpath: string) {
    return document.evaluate(xpath, xmlDoc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
  }

  getChecklistTypeParamValue(): string {
    switch (this.checklistType) {
      case ChecklistType.sample:
        return 'sample';
      case ChecklistType.sequence:
        return 'sequence';
    }
  }

  initChecklists(): void {
    // console.log(' ** initChecklists **');

    this.active = true;
    this.dataError = undefined;
    this._checklistGroups = new Array<ChecklistGroupInterface>();

    this._webinReportService.getChecklistGroups(this.getChecklistTypeParamValue()).
    pipe(
      retry(3),
      mergeMap(data => {
        this.setChecklistGroups(data);
        return this._webinReportService.getChecklistXmls(this.getChecklistTypeParamValue());
      })
    ).
    subscribe(
      data => this.setChecklistXmls(data),
      (err: HttpErrorResponse) => {
        console.log('** Webin checklist service failed **', err);
        this.dataError = 'Webin checklist service failed. Please try again later. If the problem persists please contact the helpdesk.';
      },
      () => {
        this.active = false;
      }
    );
  }

  private setChecklistGroups(data): void {
     // console.log('** checklistGroupData **', data);

    data.forEach( (checklistGroupData) => {
      const report = checklistGroupData.report;
      this._checklistGroups.push({
        name: report.name,
        description: report.description,
        checklistIds: report.checklist,
        checklists: new Array<ChecklistInterface>()
      });
    });
  }

  setChecklistXmls(data): void {
    // console.log('** setChecklistXmls **', data);

    const xmlDoc = this._xmlParser.parseFromString(data.body, 'text/xml');

    const checklistNodes = this.getXmlNodes(xmlDoc, 'CHECKLIST_SET/CHECKLIST');
    let checklistNode = checklistNodes.iterateNext();
    while (checklistNode) {
      const checklist: ChecklistInterface = {
          id: this.getXmlTextValue(checklistNode, '@accession'),
          name: this.getXmlTextValue(checklistNode, 'DESCRIPTOR/NAME/text()'),
          description: this.getXmlTextValue(checklistNode, 'DESCRIPTOR/DESCRIPTION/text()'),
          type: this.getXmlTextValue(checklistNode, '@checklistType'),
          fieldGroups: new Array<ChecklistFieldGroupInterface>()
      };

      const fieldGroupNodes = this.getXmlNodes(checklistNode, 'DESCRIPTOR/FIELD_GROUP');
      let fieldGroupNode = fieldGroupNodes.iterateNext();
      while (fieldGroupNode) {
        const fieldGroup: ChecklistFieldGroupInterface = {
          name: this.getXmlTextValue(fieldGroupNode, 'NAME/text()'),
          fields : new Array<ChecklistFieldInterface>()
        };

        const fieldNodes = this.getXmlNodes(fieldGroupNode, 'FIELD');
        let fieldNode = fieldNodes.iterateNext();
        while (fieldNode) {
          const field: ChecklistFieldInterface = {
            name: this.getXmlTextValue(fieldNode, 'NAME/text()'),
            label: this.getXmlTextValue(fieldNode, 'LABEL/text()'),
            description: this.getXmlTextValue(fieldNode, 'DESCRIPTION/text()'),
            mandatory: this.getXmlTextValue(fieldNode, 'MANDATORY/text()'),
            type: this.getXmlTextValue(fieldNode, 'name(FIELD_TYPE/*[1])'),
            units: new Array<string>(),
            textChoice: new Array<string>(),
          };

          // Regex
          //

          const regexNodes = this.getXmlNodes(fieldNode, 'FIELD_TYPE/*/REGEX_VALUE[1]');
          if (regexNodes) {
            let regexNode = regexNodes.iterateNext();
            while (regexNode) {
              field.regexValue = this.getXmlTextValue(regexNode, 'text()');
              regexNode = regexNodes.iterateNext();
            }
          }

          // CV
          //

          const cvNodes = this.getXmlNodes(fieldNode, 'FIELD_TYPE/TEXT_CHOICE_FIELD/TEXT_VALUE/VALUE');
          if (cvNodes) {
            let cvNode = cvNodes.iterateNext();
            while (cvNode) {
              field.textChoice.push(this.getXmlTextValue(cvNode, 'text()'));
              cvNode = cvNodes.iterateNext();
            }
          }

          // Ontology
          //

          const ontologyNodes = this.getXmlNodes(fieldNode, 'FIELD_TYPE/ONTOLOGY_FIELD/ONTOLOGY_ID');
          if (ontologyNodes) {
            let ontologyNode = ontologyNodes.iterateNext();
            while (ontologyNode) {
              field.ontologyId = this.getXmlTextValue(ontologyNode, 'text()');
              ontologyNode = ontologyNodes.iterateNext();
            }
          }

          // Units
          //

          const unitNodes = this.getXmlNodes(fieldNode, 'UNITS/UNIT');
          if (unitNodes) {
            let unitNode = unitNodes.iterateNext();
            while (unitNode) {
              field.units.push(this.getXmlTextValue(unitNode, 'text()'));
              unitNode = unitNodes.iterateNext();
            }
          }

          fieldGroup.fields.push(field);
          fieldNode = fieldNodes.iterateNext();
        }

        checklist.fieldGroups.push(fieldGroup);
        fieldGroupNode = fieldGroupNodes.iterateNext();
      }

      this._checklistGroups.forEach( checklistGroup => {
        checklistGroup.checklistIds.forEach ( id => {
          if (checklist.id === id) {
            checklistGroup.checklists.push(checklist);
          }
        });
      });

      checklistNode = checklistNodes.iterateNext();
    }

    // console.log('** Checklists **', this._checklistGroups );
    this.checklistGroupDataSource = new MatTableDataSource<ChecklistGroupInterface>(this._checklistGroups);
  }

  isEga(): boolean {
    return this._webinAuthenticationService.ega;
  }


  getSequenceSpreadsheetText(): string {
    let spreadsheetText = '#template_accession ' + this.selectedChecklist.id + '\n';
    spreadsheetText += 'ENTRYNUMBER\t';

    const { fieldGroups } = this.selectedChecklist;

    let selectedFieldsCnt = 0;
    fieldGroups.forEach( fieldGroup => {
      fieldGroup.fields.forEach( field => {
        if (this.selectedFields[field.label]) {
          selectedFieldsCnt++;
        }
      });
    });

    let i = 0;
    fieldGroups.forEach( fieldGroup => {
      fieldGroup.fields.forEach( field => {
        if (this.selectedFields[field.label]) {
          spreadsheetText += field.label;
          if (++i < selectedFieldsCnt) {
            spreadsheetText += '\t';
          }
        }
      });
    });

    spreadsheetText += '\n';
    return spreadsheetText;
  }

  download() {

    const dateText = (new Date()).toISOString();

    const blob = new Blob([this.getSequenceSpreadsheetText()], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'Sequence-' + this.selectedChecklist.id + '-' + dateText + '.tsv');
  }
}
