import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseDatePopupComponent } from './release-date-popup.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule, MatInputModule, MatDatepicker, MatDatepickerModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { WebinAuthenticationService } from '../../webin-authentication.service';
import { WebinRestService } from '../../webin-rest.service';
import { ActivatedRoute } from '@angular/router';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CUSTOM_FORMATS } from '../../study-management/study-management.component';

describe('ReleaseDatePopupComponent', () => {
  let component: ReleaseDatePopupComponent;
  let fixture: ComponentFixture<ReleaseDatePopupComponent>;

  const fakeActivatedRoute = {
    snapshot: { params: {"id":123 } }
  } ;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseDatePopupComponent ],
      imports:[BrowserAnimationsModule,FormsModule,HttpClientModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,MatDialogModule],
      providers:[WebinAuthenticationService,WebinRestService,
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide:MatDialogRef, useValue:{} },{ provide: MAT_DIALOG_DATA, useValue: {"contactObj":{"id":123}}},
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]}, 
        {provide: MAT_DATE_FORMATS, useValue: CUSTOM_FORMATS}
      ]
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
