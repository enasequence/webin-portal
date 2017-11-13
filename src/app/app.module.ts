import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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

import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { SpreadsheetSubmissionComponent } from './spreadsheet-submission/spreadsheet-submission.component';
import { SubmissionTypeSelectorComponent } from './submission-type-selector/submission-type-selector.component';
import { SubmissionFormatSelectorComponent } from './submission-format-selector/submission-format-selector.component';
import { SubmissionSpreadsheetSelectorComponent } from './submission-spreadsheet-selector/submission-spreadsheet-selector.component';
import { XmlSubmissionComponent } from './xml-submission/xml-submission.component';

import { WebinRestService } from './webin-rest.service';
import { SpreadsheetService } from './spreadsheet.service';
import { AuthenticationService } from './authentication.service';

@NgModule({
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      HttpModule,
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
  ],
  declarations: [
    AppComponent,
    SpreadsheetSubmissionComponent,
    SubmissionTypeSelectorComponent,
    SubmissionFormatSelectorComponent,
    SubmissionSpreadsheetSelectorComponent,
    XmlSubmissionComponent
  ],
  bootstrap: [
      AppComponent
  ],
  providers: [
    WebinRestService,
    SpreadsheetService,
    AuthenticationService
  ]
})
export class AppModule { }
