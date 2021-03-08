import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DacPolicyManagementComponent } from './dac-policy-management.component';

describe('DacPolicyManagementComponent', () => {
  let component: DacPolicyManagementComponent;
  let fixture: ComponentFixture<DacPolicyManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DacPolicyManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DacPolicyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
