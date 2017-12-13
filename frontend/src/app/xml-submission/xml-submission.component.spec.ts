import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlSubmissionComponent } from './xml-submission.component';

describe('XmlSubmissionComponent', () => {
  let component: XmlSubmissionComponent;
  let fixture: ComponentFixture<XmlSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XmlSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
