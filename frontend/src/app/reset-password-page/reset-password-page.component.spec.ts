import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordPageComponent } from './reset-password-page.component';
import { MatchPasswordDirective } from '../directives/match-password.directive';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatFormFieldModule, MatInputModule, MatFormFieldControl } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { WebinAuthenticationService } from '../webin-authentication.service';
import { subscribeOn } from 'rxjs/operators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ResetPasswordPageComponent', () => {
  let component: ResetPasswordPageComponent;
  let fixture: ComponentFixture<ResetPasswordPageComponent>;

  const fakeActivatedRoute = {
    queryParams: { subscribe: () => {} }
  } ;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordPageComponent,MatchPasswordDirective ],
      imports:[BrowserAnimationsModule,FormsModule,HttpClientModule,MatFormFieldModule,MatInputModule],
      providers:[WebinAuthenticationService,{provide: ActivatedRoute, useValue: fakeActivatedRoute},{provide:MatDialog, useValue:{} },{ provide: MAT_DIALOG_DATA, useValue: {"contactObj":{"id":123}}} ,],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
