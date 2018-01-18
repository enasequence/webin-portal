import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionResultComponent } from './submission-result.component';

describe('SubmissionResultComponent', () => {
  let component: SubmissionResultComponent;
  let fixture: ComponentFixture<SubmissionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
