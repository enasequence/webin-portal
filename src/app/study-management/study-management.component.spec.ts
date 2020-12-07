import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyManagementComponent } from './study-management.component';
import { MatInputModule,MatFormFieldModule , MatIconModule, MatDividerModule,MatCardSubtitle, MatFormField,MatLabel,MatDatepickerModule, MatCardModule,MatAutocompleteModule, MatTableModule, MatError, MatProgressSpinnerModule,MatCheckboxModule  } from '@angular/material'
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, FormsModule} from '@angular/forms';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ObserversModule} from '@angular/cdk/observers';
import { HttpClientModule  } from '@angular/common/http';
import { WebinAuthenticationService } from '../webin-authentication.service';
import { WebinRestService } from '../webin-rest.service';



describe('StudyManagementComponent', () => {
  let component: StudyManagementComponent;
  let fixture: ComponentFixture<StudyManagementComponent>;
  const fakeActivatedRoute = {
    snapshot: { params: {"id":123 } }
  } ;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatCheckboxModule,BrowserAnimationsModule, MatInputModule,MatFormFieldModule , HttpClientModule ,ObserversModule, FormsModule, MatIconModule, MatDividerModule,MatDatepickerModule, MatCardModule, MatAutocompleteModule ,MatTableModule, MatProgressSpinnerModule],
      declarations: [ StudyManagementComponent ],
      providers:[WebinAuthenticationService,WebinRestService,
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
