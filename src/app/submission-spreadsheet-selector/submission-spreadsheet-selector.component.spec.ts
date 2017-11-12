import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionSpreadsheetSelectorComponent } from './submission-spreadsheet-selector.component';

describe('SubmissionSpreadsheetSelectorComponent', () => {
  let component: SubmissionSpreadsheetSelectorComponent;
  let fixture: ComponentFixture<SubmissionSpreadsheetSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionSpreadsheetSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionSpreadsheetSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
