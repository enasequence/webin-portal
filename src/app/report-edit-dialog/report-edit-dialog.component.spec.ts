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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WebinRestService } from '../webin-rest.service';
import { MockWebinRestService } from '../mock/mock-webin-rest.service';
import { WebinXmlReportService } from '../webin-xml-report.service';
import { SubmissionResultComponent } from '../submission-result/submission-result.component';
import { MockWebinXmlReportService } from '../mock/mock-webin-xml-report.service';

import { ReportEditDialogComponent } from './report-edit-dialog.component';

describe('ReportEditDialogComponent', () => {
  let component: ReportEditDialogComponent;
  let fixture: ComponentFixture<ReportEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReportEditDialogComponent,
        SubmissionResultComponent],
      imports: [
        UiModule,
      ],
      providers: [
        {
          provide: WebinRestService,
          useClass: MockWebinRestService
        },
        {
          provide: WebinXmlReportService,
          useClass: MockWebinXmlReportService
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: (dialogResult: any) => { }
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: []
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
