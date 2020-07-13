import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDialogModalComponent } from './contact-dialog-modal.component';

describe('ContactDialogModalComponent', () => {
  let component: ContactDialogModalComponent;
  let fixture: ComponentFixture<ContactDialogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDialogModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
