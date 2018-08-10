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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiModule } from '../ui/ui.module';
import { WebinAuthenticationService } from '../webin-authentication.service';
import { MockWebinAuthenticationService } from '../mock/mock-webin-authentication.service';
import { WebinReportService } from '../webin-report.service';
import { MockWebinReportService } from '../mock/mock-webin-report.service';

import { ChecklistComponent } from './checklist.component';

describe('ChecklistComponent', () => {
  let component: ChecklistComponent;
  let fixture: ComponentFixture<ChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistComponent ],
      imports: [ UiModule ],
      providers: [
        {
          provide: WebinAuthenticationService,
          useClass: MockWebinAuthenticationService
        },
        {
          provide: WebinReportService,
          useClass: MockWebinReportService
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getSequenceSpreadsheetText()', () => {

    component.selectedFields = {};
    component.selectedFields['TEST_FIELD_1'] = true;
    component.selectedFields['TEST_FIELD_2'] = true;
    component.selectedFields['TEST_FIELD_3'] = false;

    component.selectedChecklist = {
      id: 'TEST_ID',
      fieldGroups: [
        {
          fields: [
            {
              label: 'TEST_FIELD_1'
            }
          ]
        },
        {
          fields: [
            {
              label: 'TEST_FIELD_2'
            },
            {
              label: 'TEST_FIELD_3'
            }
          ]
        }
      ]
    };

    const spreadsheetText = '#template_accession TEST_ID\nENTRYNUMBER\tTEST_FIELD_1\tTEST_FIELD_2\n';

    expect(component.getSequenceSpreadsheetText()).toBe(spreadsheetText);
  });
});
