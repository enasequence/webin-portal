import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule } from '@angular/flex-layout';

import {CdkTableModule} from '@angular/cdk/table';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

import {HttpClientModule} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginAccountComponent } from './login-account/login-account.component';
import { TitleComponent } from './title/title.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { XmlSubmissionComponent } from './xml-submission/xml-submission.component';
import { SubmissionResultComponent } from './submission-result/submission-result.component';
import { ReportComponent } from './report/report.component';
import { ReportActionComponent } from './report-action/report-action.component';

import { WebinRestService } from './webin-rest.service';
import { WebinReportService } from './webin-report.service';
import { WebinXmlReportService } from './webin-xml-report.service';
import { WebinAuthenticationService } from './webin-authentication.service';
import { WebinAuthenticationGuardService } from './webin-authentication-guard.service';

import { WebinAuthenticationInterceptor } from './webin-authentication.interceptor';

import { RouterModule, Routes } from '@angular/router';
import { ReportEditDialogComponent } from './report-edit-dialog/report-edit-dialog.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '**',
    component: DashboardComponent,
    canActivate: [WebinAuthenticationGuardService],
  }
];

@NgModule({
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FlexLayoutModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,

      // Material
      CdkTableModule,
      MatAutocompleteModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatStepperModule,
      MatDatepickerModule,
      MatDialogModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,

      // Router
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      ),

  ],
  declarations: [
    AppComponent,
    XmlSubmissionComponent,
    SubmissionResultComponent,
    LoginComponent,
    LoginAccountComponent,
    DashboardComponent,
    TitleComponent,
    ReportComponent,
    ReportEditDialogComponent,
    ReportActionComponent,
  ],
  bootstrap: [
      AppComponent,
      TitleComponent,
      LoginAccountComponent
  ],
  providers: [
    WebinRestService,
    WebinReportService,
    WebinXmlReportService,
    WebinAuthenticationService,
    WebinAuthenticationGuardService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: WebinAuthenticationInterceptor,
        multi: true,
    }
  ],
  entryComponents: [
    ReportEditDialogComponent,
  ]
})
export class AppModule { }
