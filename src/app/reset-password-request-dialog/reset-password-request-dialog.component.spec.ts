import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordRequestDialogComponent } from './reset-password-request-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ResetPasswordRequestComponent', () => {
  let component: ResetPasswordRequestDialogComponent;
  let fixture: ComponentFixture<ResetPasswordRequestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordRequestDialogComponent,],
      imports: [FormsModule, MatFormFieldModule, HttpClientModule, MatInputModule, BrowserAnimationsModule],
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MatDialog, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: { "contactObj": { "id": 123 } } }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
