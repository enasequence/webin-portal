import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDialogModalComponent } from './contact-dialog-modal.component';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UniqueContactEmailDirective } from '../directives/unique-contact-email.directive';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContactDialogModalComponent', () => {
  let component: ContactDialogModalComponent;
  let fixture: ComponentFixture<ContactDialogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactDialogModalComponent, UniqueContactEmailDirective],
      imports: [BrowserAnimationsModule, MatFormFieldModule, MatInputModule, FormsModule, MatCheckboxModule, HttpClientModule, MatDialogModule],
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: { "contactObj": { "id": 123 } } }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
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
