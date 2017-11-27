import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportActionComponent } from './report-action.component';

describe('ReportActionComponent', () => {
  let component: ReportActionComponent;
  let fixture: ComponentFixture<ReportActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
