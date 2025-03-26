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

import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatExpansionPanel} from '@angular/material/expansion';
import {saveAs} from 'file-saver';
import {mergeMap, retry} from 'rxjs/operators';
import {ChecklistType} from '../checklist-type.enum';
import {ChecklistInterface} from '../checklist.interface';
import {ChecklistGroupInterface} from '../checklist-group.interface';
import {ChecklistFieldGroupInterface} from '../checklist-field-group.interface';
import {ChecklistFieldInterface} from '../checklist-field.interface';
import {WebinAuthenticationService} from '../webin-authentication.service';
import {WebinReportService} from '../webin-report.service';
import {WebinRestService} from '../webin-rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {PopupMessageComponent} from '../popup-message/popup-message.component';
import {UtilService} from '../util/Util-services'
import {SubmissionResultDialogComponent} from '../submission-result-dialog/submission-result-dialog.component';
import {
  NonSubmissionResultDialogComponent
} from '../non-submission-result-dialog/non-submission-result-dialog.component';


interface BooleanFieldInterface {
  [key: string]: boolean;
}

export interface GroupBy {
  fieldType: string;
  isGroupBy: boolean;
}

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class ChecklistComponent implements OnInit {

  @ViewChild('customFieldsPanel', { static: false }) customFieldsPanel: MatExpansionPanel;
  //@ViewChild(MatExpansionPanel, { static: false }) customFieldsPanel: MatExpansionPanel;
  @Input() checklistType: ChecklistType;
  @Input() init = true;
  panelOpenState: boolean = false;

  //@ViewChildren(MatExpansionPanel) matExpansionPanelQueryList: QueryList<MatExpansionPanel>;
  //@ViewChild('itemDescInput', { static: true }) itemDescInput: ElementRef;


  ChecklistType = ChecklistType;   // Allows use in template

  private _checklistGroups: Array<ChecklistGroupInterface>;
  private _xmlDoc: Document;
  checklistGroupDisplayedColumns = ['name'];
  checklistGroupDataSource: MatTableDataSource<ChecklistGroupInterface>;
  checklistDataSource: MatTableDataSource<ChecklistInterface>;
  checklistDisplayedColumns = ['name'];
  selectedChecklistGroup: ChecklistGroupInterface;
  selectedChecklist: ChecklistInterface;
  selectedChecklistObject = {};

  selectedFields: BooleanFieldInterface;
  mandatoryFields: BooleanFieldInterface;
  active: boolean;
  dataError: string;
  spreadSheet: File;
  checklistFields = [];

  mandatoryFieldsDataSource: MatTableDataSource<any>;
  recommendedFieldsDataSource: MatTableDataSource<any>;
  optionalFieldsDataSource: MatTableDataSource<any>;
  customFields: ChecklistFieldInterface;
  customFieldsDataSource: MatTableDataSource<any>;
  submitEnabled = true;
  fieldsDisplayedColumns: string[] = [
    "selection",
    "fieldName",
    "validation",
    "units",
    "description"
  ];
  showDescription = true;
  isShowDiscriptionChecked = true;
  constructor(
    private _webinAuthenticationService: WebinAuthenticationService,
    private _webinReportService: WebinReportService,
    private _webinRestService: WebinRestService,
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private util: UtilService,
    private router: Router,

  ) {
    if (_route) {
      switch (_route.snapshot.data.checklistType) {
        case 'sample': {
          this.checklistType = ChecklistType.sample;
          break;
        }
        case 'sequence': {
          this.checklistType = ChecklistType.sequence;
          break;
        }
      }
    }
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit(): void {
    this.checklistType = this._route.snapshot.params.checklistType;

    console.log("this.checklistType : " + this.checklistType)

    this.init = this._route.snapshot.params.init;

    if (this.init) {
      this.initChecklists();
    }

    // Adding fieldLabel only for sequence.
    if (this.checklistType === ChecklistType.sequence) {
      this.insertAt(this.fieldsDisplayedColumns, 1, "fieldLabel");
    }
  }

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
    fieldGroup.fields.forEach((field) => {
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
    // Add sample related fields when checklist type is sample.
    if (this.checklistType === ChecklistType.sample) {
      this.selectedChecklist.fieldGroups.unshift(this.getSampleSpecificFields())
    }
    this.selectedChecklist.fieldGroups.forEach((fieldGroup) => {
      fieldGroup.fields.forEach((field) => {
        this.selectedFields[field.label] = (field.mandatory === 'mandatory' || field.mandatory === 'recommended');
        this.mandatoryFields[field.label] = (field.mandatory === 'mandatory');
      });
    });


    /** Code for checklist table view */

    let mandatoryChecklistFields = [];
    let recommendedChecklistFields = [];
    let optionalChecklistFields = [];
    this.selectedChecklist.fieldGroups.forEach((fieldGroup) => {
      this.getValidFields(fieldGroup, 'mandatory') ? mandatoryChecklistFields = mandatoryChecklistFields.concat(this.getValidFields(fieldGroup, 'mandatory')) : "do nothing";
      this.getValidFields(fieldGroup, 'recommended') ? recommendedChecklistFields = recommendedChecklistFields.concat(this.getValidFields(fieldGroup, 'recommended')) : "do nothing";
      this.getValidFields(fieldGroup, 'optional') ? optionalChecklistFields = optionalChecklistFields.concat(this.getValidFields(fieldGroup, 'optional')) : "do nothing";
    });

    /** Spilit the  fields based on their type */
    this.mandatoryFieldsDataSource = new MatTableDataSource<any>(mandatoryChecklistFields);
    this.recommendedFieldsDataSource = new MatTableDataSource<any>(recommendedChecklistFields);
    this.optionalFieldsDataSource = new MatTableDataSource<any>(optionalChecklistFields);


    // Setting filterPredicate that is used for filtering.
    this.mandatoryFieldsDataSource.filterPredicate = this.getPredicate();
    this.recommendedFieldsDataSource.filterPredicate = this.getPredicate();
    this.optionalFieldsDataSource.filterPredicate = this.getPredicate();

    stepper.next();
  }

  getXmlTextValue(xmlDoc, xpath: string): string {
    return this._xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.STRING_TYPE, null).stringValue;
  }

  getXmlNodes(xmlDoc, xpath: string) {
    return this._xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
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
    console.log(' ** initChecklists **');

    this.active = true;
    this.dataError = undefined;
    this._checklistGroups = new Array<ChecklistGroupInterface>();

    const checklistGroups = this._webinReportService.getChecklistGroups(this.getChecklistTypeParamValue());
    if (!checklistGroups) {
      return;
    }

    checklistGroups.
      pipe(
        retry(3),
        mergeMap(data => {
          this.setChecklistGroups(data);
          if (this.checklistType == ChecklistType.sample) {
            return this._webinReportService.getChecklistSchemasFromJsonSchemaStore();
          } else {
            return this._webinReportService.getChecklistXmls(this.getChecklistTypeParamValue());
          }
        })
      ).
      subscribe(
        data => {
          if (this.checklistType == ChecklistType.sample) {
            this.setChecklistSchemas(data);
          } else {
            this.setChecklistXmls(data);
          }
        }
        ,
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

    data.forEach((checklistGroupData) => {
      const report = checklistGroupData.report;
      this._checklistGroups.push({
        name: report.name,
        description: report.description,
        checklistIds: report.checklist,
        checklists: new Array<ChecklistInterface>()
      });
    });

    if (this.isEga()) {
      // Remove non EGA checklists
      this._checklistGroups = this._checklistGroups.filter(fieldGroup => fieldGroup.name === "EGA Checklists");
    } else {
      // Remove EGA checklists
      this._checklistGroups.splice(this._checklistGroups.findIndex(group => group.name === "EGA Checklists"), 1);
    }
  }

  setChecklistXmls(data): void {
    // console.log('** setChecklistXmls **', data);
    this._xmlDoc = (new DOMParser()).parseFromString(data.body, 'text/xml');
    const checklistNodes = this.getXmlNodes(this._xmlDoc, '/CHECKLIST_SET/CHECKLIST');

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
          fields: new Array<ChecklistFieldInterface>()
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

      this._checklistGroups.forEach(checklistGroup => {
        checklistGroup.checklistIds.forEach(id => {
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

  private setChecklistSchemas(data: any): void {
    const schemas = data.body._embedded.mongoJsonSchemas;
    const nextPageLink = data.body._links?.next?.href;

    schemas.forEach((schema) => {
      const checklist: ChecklistInterface = {
        id: schema.accession,
        name: schema.title,
        description: schema.description,
        type: schema.version,
        fieldGroups: new Array<ChecklistFieldGroupInterface>(),
      };

      const fieldGroup: ChecklistFieldGroupInterface = {
        name: 'Characteristics',
        fields: [],
      };

      const schemaId = `${schema.accession}:${schema.version}`;
      this._webinReportService.getSchemaFields(schemaId).subscribe(
        (fieldsResponse: any) => {
          const fields = fieldsResponse.body._embedded.fields;

          schema.schemaFieldAssociations.forEach((assoc) => {
            const fieldName = assoc.fieldId.split(':')[0];
            const fieldInfo = fields.find((field: any) => field.name === fieldName);

            if (fieldInfo) {
              const field: ChecklistFieldInterface = {
                name: fieldName,
                label: fieldInfo.label || fieldName,
                description: fieldInfo.description || 'No description available',
                mandatory: assoc.requirementType === 'MANDATORY' ? 'mandatory' :
                  assoc.requirementType === 'RECOMMENDED' ? 'recommended' : 'optional',
                type: fieldInfo.type === 'choice' ? 'TEXT_CHOICE_FIELD' : 'TEXT_FIELD',
                textChoice: fieldInfo.choices || [],
                units: fieldInfo.units || [],
                regexValue: fieldInfo.pattern || ''
              };

              fieldGroup.fields.push(field);
            }
          });

          checklist.fieldGroups.push(fieldGroup);

          this._checklistGroups.forEach((checklistGroup) => {
            checklistGroup.checklistIds.forEach((id) => {
              if (checklist.id === id) {
                checklistGroup.checklists.push(checklist);
              }
            });
          });

          this.checklistGroupDataSource = new MatTableDataSource<ChecklistGroupInterface>(this._checklistGroups);
        },
        (err: HttpErrorResponse) => {
          console.log('** Failed to fetch fields for schema **', schemaId, err);
        }
      );
    });

    if (nextPageLink) {
      this._webinReportService.getPaginatedSchemas(nextPageLink).subscribe(
        (nextPageData: any) => this.setChecklistSchemas(nextPageData),
        (err: HttpErrorResponse) => {
          console.log('** Failed to fetch next page of schemas **', err);
        }
      );
    }
  }

  isEga(): boolean {
    return this._webinAuthenticationService.ega;
  }

  buildSelectedChecklistRequestObject(callback) {
    let selectedChecklistArray = [];
    let fieldGroups = this.selectedChecklist.fieldGroups;
    let selectedFieldsCnt = 0;
    fieldGroups.forEach(fieldGroup => {
      fieldGroup.fields.forEach(field => {
        if (this.selectedFields[field.name] || this.selectedFields[field.label]) {
          if (field.name != null) {
            field.name = field.label;
          }

          if (field.textChoice) {
            field["value_choice"] = field.textChoice;
          } else {
            delete field.textChoice;
          }

          if (field.regexValue) {
            field["regex_value"] = field.regexValue;
          } else {
            delete field.regexValue;
          }

          field["mandatory_field"] = (field.mandatory === "mandatory");
          // delete field.label;
          selectedChecklistArray.push(field);
        }
      });
    });

    this.selectedChecklistObject["checklistType"] = "Checklist";
    this.selectedChecklistObject["checklistFieldValue"] = this.selectedChecklist.id;
    this.selectedChecklistObject["checklistFieldName"] = this.selectedChecklist.name;
    this.selectedChecklistObject["checklistFieldDescription"] = this.selectedChecklist.description;
    this.selectedChecklistObject["type"] = this.selectedChecklist.type;
    this.selectedChecklistObject["fields"] = selectedChecklistArray;
    this.selectedChecklistObject["displayChecklistRow"] = true;
    this.selectedChecklistObject["displayUnitRow"] = true;
    callback(this.util, this.selectedChecklistObject);
  }


  getSequenceSpreadsheetText(): string {
    let spreadsheetText = '#template_accession ' + this.selectedChecklist.id + '\n';
    spreadsheetText += 'ENTRYNUMBER\t';

    const { fieldGroups } = this.selectedChecklist;

    let selectedFieldsCnt = 0;
    fieldGroups.forEach(fieldGroup => {
      fieldGroup.fields.forEach(field => {
        if (this.selectedFields[field.label]) {
          selectedFieldsCnt++;
        }
      });
    });

    let i = 0;
    fieldGroups.forEach(fieldGroup => {
      fieldGroup.fields.forEach(field => {
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


  downloadExcelSpreadsheet() {
    this.buildSelectedChecklistRequestObject(function (util, selectedChecklistObject) {
      console.log(selectedChecklistObject);
      util.downloadExcelTemplate(selectedChecklistObject).
        subscribe((data) => {
          let blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
          saveAs(blob, util.getFileName(selectedChecklistObject, ".xlsx"));
        }, (error) => {
          console.log('Error', error);
        });
    });

  }

  downloadTsvSpreadsheet() {
    this.buildSelectedChecklistRequestObject(function (util, selectedChecklistObject) {
      console.log(selectedChecklistObject)

      if (selectedChecklistObject.checklistType == ChecklistType.sample) {
        util.downloadSampleTsvTemplate(selectedChecklistObject).subscribe((data) => {
          let blob = new Blob([data], {type: "text/plain;charset=utf-8'"});
          saveAs(blob, util.getFileName(selectedChecklistObject, ".tsv"));
        }, (error) => {
          console.log('Error', error);
        });
      } else {
        util.downloadTsvTemplate(selectedChecklistObject).subscribe((data) => {
          let blob = new Blob([data], {type: "text/plain;charset=utf-8'"});
          saveAs(blob, util.getFileName(selectedChecklistObject, ".tsv"));
        }, (error) => {
          console.log('Error', error);
        });
      }
    });
  }

  getPredicate() {
    return (data: ChecklistFieldInterface, filter: string) => data.label.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) != -1;
  }

  applyFilter(filterValue: string, accordion: any) {
    // If the filter text is empty close all expansion panel.
    if (filterValue != "") {
      accordion.multi = true;
      accordion.openAll();
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
    } else {
      // Open all expansions while filter text is not empty.
      accordion.closeAll();
      accordion.multi = false;
    }

    this.mandatoryFieldsDataSource.filter = filterValue;
    this.recommendedFieldsDataSource.filter = filterValue;
    this.optionalFieldsDataSource.filter = filterValue;
    this.customFieldsDataSource.filter = filterValue;
  }

  addCustomField(customField: string, customText, accordion, form) {

    if (!form.invalid) {
      this.customFields = this.getCustomField(customField);
      this.selectedFields[customField] = true;

      // Get custom field group if already added to selectedChecklist.fieldGroups
      let customFieldGroup: ChecklistFieldGroupInterface = this.selectedChecklist.fieldGroups.filter(fieldGroup => fieldGroup.name === "custom_fields")[0];
      if (customFieldGroup) {
        customFieldGroup.fields.push(this.customFields);
      } else {
        // create new custom field group
        customFieldGroup = { "name": "custom_fields", fields: [this.customFields] };
        this.selectedChecklist.fieldGroups.push(customFieldGroup);
      }

      this.customFieldsDataSource = new MatTableDataSource<any>(customFieldGroup.fields);
      this.customFieldsDataSource.filterPredicate = this.getPredicate();
      this.showSuccessPopup("Successfully added custom field '" + customField + "'. The field can be viewed in custom fields grouping below.", "Custom field");
      customText.value = "";

      //opening custom panal is not woeking as expected so closing all the panels after adding custom field.
      accordion.multi = true;
      accordion.closeAll();
      accordion.multi = false;
      //this.customFieldsPanel.open();
    }
  }

  showSuccessPopup(message, title) {
    const dialogRef = this.dialog.open(PopupMessageComponent, {
      width: '500px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { 'action': 'SuccessAndClose', 'message': message, 'title': title }
    });
  }

  getValidFields(fieldGroup, fieldType) {
    let fieldArr = fieldGroup.fields.filter(field => field.mandatory === fieldType);
    if (fieldArr && fieldArr.length > 0) {
      return fieldArr;
    }
  }

  addDescription(isShowDiscriptionChecked) {

    if (isShowDiscriptionChecked) {
      if (this.fieldsDisplayedColumns.indexOf("fieldsDisplayedColumns") == -1) {
        this.fieldsDisplayedColumns.push("description");
      }
      this.showDescription = true;
    } else {
      this.fieldsDisplayedColumns.pop()
      this.showDescription = false;
    }
  }

  // The below method is used to insert value to exact position of an array.
  insertAt(array, index, elementsArray) {
    array.splice(index, 0, elementsArray);
  }


  uploadFile(form) {

    if (!this._webinRestService.isValidTabSubmissionFile(form.spreadSheet)) {
      this.util.showError(this, NonSubmissionResultDialogComponent, "You have used an unsupported spreadsheet format. Please submit a tab-separated (.tsv or .tab) file.", "Submission Result")
    } else {
      this.submitEnabled = false;
      const formData: FormData = new FormData();
      const observable: Observable<string> =
        this._webinRestService.submitXml(
          null,
          null,
          null,
          form.spreadSheet,
          null,
          null,
          null,
          null,
          null,
          null,
          form.value.centerName);
      let redirectPath = "/app-checklist/sample/true"
      this.util.showSubmissionResponse(this, SubmissionResultDialogComponent, observable, redirectPath);
    }
  }

  getCustomField(customFieldValue) {
    return {
      "name": customFieldValue,
      "label": customFieldValue,
      "type": "TEXT_FIELD",
      "mandatory": "recommended",
      "description": "custom field",
      "units": [],
      "textChoice": []
    };
  }

  getSampleSpecificFields() {
    let sampleSpecificFields = {
      name: "Sample Details",
      fields: [
        {
          name: "tax_id",
          label: "NCBI Taxonomy",
          description: "Taxonomy ID of the organism as in the <a href='https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi'> NCBI Taxonomy database</a>. Entries in the NCBI Taxonomy database have integer taxon IDs. See our tips for sample taxonomy <a href='https://ena-docs.readthedocs.io/en/latest/faq/taxonomy.html'>here</a>",
          mandatory: "mandatory",
          textChoice: [],
          type: "TEXT_FIELD",
          units: [],
          isVisible: true
        },
        {
          name: "scientific_name",
          label: "Scientific name",
          description: "Scientific name of the organism as in the <a href='https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi'> NCBI Taxonomy database</a>. Scientific names typically follow the binomial nomenclature. For example, the scientific name for humans is Homo sapiens.",
          mandatory: "mandatory",
          textChoice: [],
          type: "TEXT_FIELD",
          units: [],
          isVisible: true
        },
        {
          name: "sample_alias",
          label: "Sample alias (unique name)",
          description: "Unique name of the sample. If not selected system will auto generate an unique alias",
          mandatory: "mandatory",
          textChoice: [],
          type: "TEXT_FIELD",
          units: [],
          isVisible: true
        },
        {
          name: "sample_title",
          label: "Sample title",
          description: "Title of the sample",
          mandatory: "mandatory",
          textChoice: [],
          type: "TEXT_FIELD",
          units: [],
          isVisible: true
        },
        {
          name: "sample_description",
          label: "Sample description",
          description: "Description of the sample",
          mandatory: "mandatory",
          textChoice: [],
          type: "TEXT_FIELD",
          units: [],
          isVisible: true
        }]
    }
    return sampleSpecificFields;
  }

  isBroker(): boolean {
    return this._webinAuthenticationService.isBroker();
  }
}
