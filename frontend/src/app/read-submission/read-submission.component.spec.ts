import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadSubmissionComponent } from './read-submission.component';

describe('ReadSubmissionComponent', () => {
  let component: ReadSubmissionComponent;
  let fixture: ComponentFixture<ReadSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
