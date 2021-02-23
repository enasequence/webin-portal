import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonSubmissionResultDialogComponent } from './non-submission-result-dialog.component';

describe('NonSubmissionResultDialogComponent', () => {
  let component: NonSubmissionResultDialogComponent;
  let fixture: ComponentFixture<NonSubmissionResultDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NonSubmissionResultDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonSubmissionResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
