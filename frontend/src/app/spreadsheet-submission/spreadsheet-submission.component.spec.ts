import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadsheetSubmissionComponent } from './spreadsheet-submission.component';

describe('SpreadsheetSubmissionComponent', () => {
  let component: SpreadsheetSubmissionComponent;
  let fixture: ComponentFixture<SpreadsheetSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpreadsheetSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadsheetSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
