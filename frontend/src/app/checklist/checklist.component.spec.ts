import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { ChecklistComponent } from './checklist.component';
import { WebinAuthenticationService } from '../webin-authentication.service';
import { WebinReportService } from '../webin-report.service';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

describe('ChecklistComponent', () => {
  let component: ChecklistComponent;
  let fixture: ComponentFixture<ChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistComponent ]
      imports: [
        HttpClientModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatStepperModule,
        MatExpansionModule,
        FormsModule,
        MatSelectModule,
        MatCheckboxModule
      ],
      providers: [
        WebinAuthenticationService,
        WebinReportService
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
});
