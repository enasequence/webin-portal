import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionTypeSelectorComponent } from './submission-type-selector.component';

describe('SubmissionTypeSelectorComponent', () => {
  let component: SubmissionTypeSelectorComponent;
  let fixture: ComponentFixture<SubmissionTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionTypeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
