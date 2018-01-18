import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionFormatSelectorComponent } from './submission-format-selector.component';

describe('SubmissionFormatSelectorComponent', () => {
  let component: SubmissionFormatSelectorComponent;
  let fixture: ComponentFixture<SubmissionFormatSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionFormatSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionFormatSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
