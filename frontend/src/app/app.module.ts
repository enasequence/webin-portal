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
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { UiModule } from './ui/ui.module';

import {HttpClientModule} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { XmlSubmissionComponent } from './xml-submission/xml-submission.component';
import { SubmissionResultComponent } from './submission-result/submission-result.component';
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

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'consent',
    component: GdprComponent,
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
    LogoutComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    ReportComponent,
    ReportEditDialogComponent,
    ReportActionComponent,
    GdprComponent,
    ChecklistComponent,
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
  ]
})
export class AppModule { }
