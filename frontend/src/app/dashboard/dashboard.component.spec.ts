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
import { UpdateRequestComponent } from '../update-request/update-request.component';
import { MockReportComponent } from '../mock/mock-report.component';
import { MockSubmitComponent } from '../mock/mock-submit.component';
import { WebinRestService } from '../webin-rest.service';
import { MockWebinRestService } from '../mock/mock-webin-rest.service';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        UpdateRequestComponent,
        MockReportComponent,
        MockSubmitComponent,
      ],
      imports: [ UiModule, RouterTestingModule ],
      providers: [
        {
          provide: WebinAuthenticationService,
          useClass: MockWebinAuthenticationService
        },
        {
          provide: WebinRestService,
          useClass: MockWebinRestService
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
