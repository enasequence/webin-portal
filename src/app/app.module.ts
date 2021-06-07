/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { UiModule } from './ui/ui.module';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubmitComponent } from './submit/submit.component';
import { SubmissionResultComponent } from './submission-result/submission-result.component';
import { SubmissionResultDialogComponent } from './submission-result-dialog/submission-result-dialog.component';
import { ReportComponent } from './report/report.component';
import { ReportActionComponent } from './report-action/report-action.component';
import { ReportEditDialogComponent } from './report-edit-dialog/report-edit-dialog.component';
import { GdprComponent } from './gdpr/gdpr.component';
import { ChecklistComponent } from './checklist/checklist.component';

import { WebinRestService } from './webin-rest.service';
import { WebinReportService } from './webin-report.service';
import { WebinXmlReportService } from './webin-xml-report.service';
import { WebinAuthenticationService } from './webin-authentication.service';
import { WebinGdprService } from './webin-gdpr.service';
import { WebinAuthenticationGuardService } from './webin-authentication-guard.service';
import { WebinGdprGuardService } from './webin-gdpr-guard.service';

import { WebinAuthenticationInterceptor } from './webin-authentication.interceptor';

import { RouterModule, Routes } from '@angular/router';
import { AccountInfoComponent } from './accountInfo/accountInfo.component';
import { ContactDialogModalComponent } from './contact-dialog-modal/contact-dialog-modal.component';
import { UniqueContactEmailDirective } from './directives/unique-contact-email.directive';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { ResetPasswordRequestDialogComponent } from './reset-password-request-dialog/reset-password-request-dialog.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { StudyManagementComponent } from './study-management/study-management.component';
import { PopupMessageComponent } from './popup-message/popup-message.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatCardSubtitle, MatSidenavModule } from '@angular/material';
import { FileInputValueAccessor } from './directives/file-input.accessor.directive';
import { DiableAutofillDirective } from './directives/app-disable-autofill.directive';
import { ReleaseDatePopupComponent } from './release-date-popup/release-date-popup/release-date-popup.component';
import { SidenavComponent } from './sidenav/sidenav/sidenav.component';
import { ReadSubmissionComponent } from './read-submission/read-submission.component';
import { TaxonomyManagementComponent } from './taxonomy-management/taxonomy-management.component';
import { TaxonomyDialogModalComponent } from './taxonomy-dialog-modal/taxonomy-dialog-modal.component';
import { UniqueNameByArrayDirective } from './directives/unique-name-by-array.directive';
import { NonSubmissionResultDialogComponent } from './non-submission-result-dialog/non-submission-result-dialog.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { DacManagementComponent } from './dac-management/dac-management.component';
import { DacPolicyManagementComponent } from './dac-policy-management/dac-policy-management.component';
import { DacDatasetManagementComponent } from './dac-dataset-management/dac-dataset-management.component';
import { UmbrellaManagementComponent } from './umbrella-management/umbrella-management.component';


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'resetPassword',
    component: ResetPasswordPageComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'sample-checklist',
    component: ChecklistComponent,
    data: { checklistType: 'sample' }
  },
  {
    path: 'sequence-checklist',
    component: ChecklistComponent,
    data: { checklistType: 'sequence' }
  },
  {
    path: 'consent',
    component: GdprComponent,
    canActivate: [WebinAuthenticationGuardService],
  },
  {
    path: 'report/:reportType',
    component: ReportComponent,
    canActivate: [WebinAuthenticationGuardService],
  },
  {
    path: 'report/:reportType/:id',
    component: ReportComponent,
    canActivate: [WebinAuthenticationGuardService],
  },
  {
    path: 'app-submit',
    component: SubmitComponent,
    canActivate: [WebinAuthenticationGuardService],
  },
  {
    path: 'app-checklist/:checklistType/:init',
    component: ChecklistComponent,
    canActivate: [WebinAuthenticationGuardService],

  },
  {
    path: 'account',
    component: AccountInfoComponent,
  },
  {
    path: 'accountInfo',
    component: AccountInfoComponent,
  },
  {
    path: 'study',
    component: StudyManagementComponent,
    canActivate: [WebinAuthenticationGuardService],
  },
  {
    path: 'study/:id',
    component: StudyManagementComponent,
    canActivate: [WebinAuthenticationGuardService],
  },
  {
    path: 'umbrella',
    component: UmbrellaManagementComponent,
    canActivate: [WebinAuthenticationGuardService],
  },
  {
    path: 'umbrella/:id',
    component: UmbrellaManagementComponent,
    canActivate: [WebinAuthenticationGuardService],
  },
  {
    path: 'read-submission',
    component: ReadSubmissionComponent,
    canActivate: [WebinAuthenticationGuardService],
  },
  {
    path: 'taxonomy',
    component: TaxonomyManagementComponent,
    canActivate: [WebinAuthenticationGuardService],
  },
  {
    path: 'dac',
    component: DacManagementComponent,
    canActivate: [WebinAuthenticationGuardService],
  },
  {
    path: 'dac/:id',
    component: DacManagementComponent,
    canActivate: [WebinAuthenticationGuardService],
  },
  {
    path: 'dac-policy',
    component: DacPolicyManagementComponent,
    canActivate: [WebinAuthenticationGuardService],
  },
  {
    path: 'dac-policy/:id',
    component: DacPolicyManagementComponent,
    canActivate: [WebinAuthenticationGuardService],
  },
  {
    path: 'dac-dataset',
    component: DacDatasetManagementComponent,
    canActivate: [WebinAuthenticationGuardService],
  },
  {
    path: 'dac-dataset/:id',
    component: DacDatasetManagementComponent,
    canActivate: [WebinAuthenticationGuardService],
  },
  {
    path: '**',
    component: DashboardComponent,
    canActivate: [WebinAuthenticationGuardService, WebinGdprGuardService],
  }
];

@NgModule({
  imports: [
    BrowserModule,
    UiModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    MatIconModule,
    MatSidenavModule,

    // Router
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
        onSameUrlNavigation: "reload"
      }
    ),
    AceEditorModule,
  ],
  declarations: [
    AppComponent,
    SubmitComponent,
    SubmissionResultComponent,
    SubmissionResultDialogComponent,
    LoginComponent,
    LogoutComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    ReportComponent,
    ReportEditDialogComponent,
    ReportActionComponent,
    GdprComponent,
    ChecklistComponent,
    AccountInfoComponent,
    ContactDialogModalComponent,
    UniqueContactEmailDirective,
    MatchPasswordDirective,
    ResetPasswordRequestDialogComponent,
    ResetPasswordPageComponent,
    StudyManagementComponent,
    PopupMessageComponent,
    FileInputValueAccessor,
    DiableAutofillDirective,
    ReleaseDatePopupComponent,
    SidenavComponent,
    ReadSubmissionComponent,
    TaxonomyManagementComponent,
    TaxonomyDialogModalComponent,
    UniqueNameByArrayDirective,
    NonSubmissionResultDialogComponent,
    DacManagementComponent,
    DacPolicyManagementComponent,
    DacDatasetManagementComponent,
    UmbrellaManagementComponent,


  ],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  providers: [
    WebinRestService,
    WebinReportService,
    WebinXmlReportService,
    WebinAuthenticationService,
    WebinGdprService,
    WebinAuthenticationGuardService,
    WebinGdprGuardService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: WebinAuthenticationInterceptor,
      multi: true,
    }
  ],
  entryComponents: [
    ReportEditDialogComponent,
    SubmissionResultDialogComponent,
    ContactDialogModalComponent,
    ResetPasswordRequestDialogComponent,
    PopupMessageComponent,
    ReleaseDatePopupComponent,
    TaxonomyDialogModalComponent,
    NonSubmissionResultDialogComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
