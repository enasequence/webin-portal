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
import { ReportType } from '../report-type.enum';
import { ReportActionType } from '../report-action-type.enum';

import { ReportActionComponent } from './report-action.component';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, RouterModule } from '@angular/router';

describe('ReportActionComponent', () => {
  let component: ReportActionComponent;
  let fixture: ComponentFixture<ReportActionComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  const fakeRouter = {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportActionComponent],
      imports: [UiModule],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute },
      { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); routeReuseStrategy = {} } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportActionComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => ([
    {
      provide: Router,
      useClass: class { navigate = jasmine.createSpy("navigate"); }
    }]));
  it('should create', () => {
    // Set one XML and report change action.
    const actions = [];
    actions.push(ReportActionType.createEditXmlAction(ReportType.runs, 'Mock'));
    actions.push(ReportActionType.createChangeReportAction(ReportType.studies, 'Mock'));
    component.actions = actions;

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
