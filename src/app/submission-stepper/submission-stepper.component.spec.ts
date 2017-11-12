import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { submissionStepperComponent } from './submission-stepper.component';

describe('submissionStepperComponent', () => {
  let component: submissionStepperComponent;
  let fixture: ComponentFixture<submissionStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ submissionStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(submissionStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
