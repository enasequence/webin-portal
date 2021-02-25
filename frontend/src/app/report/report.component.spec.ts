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
import { MockReportActionComponent } from '../mock/mock-report-action.component';
import { WebinReportService } from '../webin-report.service';
import { MockWebinReportService } from '../mock/mock-webin-report.service';
import { WebinAuthenticationService } from '../webin-authentication.service';
import { MockWebinAuthenticationService } from '../mock/mock-webin-authentication.service';
import { ReportComponent } from './report.component';
import { RouterTestingModule } from "@angular/router/testing";

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReportComponent,
        MockReportActionComponent
      ],
      imports: [UiModule, RouterTestingModule],

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
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
