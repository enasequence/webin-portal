import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseDatePopupComponent } from './release-date-popup.component';

describe('ReleaseDatePopupComponent', () => {
  let component: ReleaseDatePopupComponent;
  let fixture: ComponentFixture<ReleaseDatePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseDatePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseDatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
